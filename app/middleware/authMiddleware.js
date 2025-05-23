const { verifyToken, getUserDetails } = require("../helper/authHelper");
const User = require("../model/userModel");
const UserToken = require("../model/userTokenModel");

exports.verifyToken = async (req, reply) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return reply.status(401).send({ message: "Not authorized" });
    }
    await req.jwtVerify(); // Assuming this is a Fastify plugin to verify JWT.
  } catch (err) {
    console.log("err", err);
    return reply.status(401).send({ message: "Invalid token" });
  }
};

exports.authMiddleware = async (request, response) => {
  const token = request.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return response.code(401).send({ message: "Unauthorized" });
  }

  try {
    const decodedUser = verifyToken(request, token);
    console.log("decodedUser", decodedUser);

    if (decodedUser && decodedUser.email) {
      // Get the latest user data from the database using decodedUser's email
      const user = await User.findOne({ email: decodedUser.email });
      console.log("user", user);

      if (user) {
        // Check if there's an active token for the user
        const userToken = await UserToken.findOne({
          token: token,
        });
        console.log("userToken", userToken);

        if (userToken) {
          const currentTime = Date.now();
          console.log("currentTime", currentTime);
          const tokenExpiryTime = new Date(userToken.expireAt).getTime();
          console.log("tokenExpiryTime", tokenExpiryTime);

          if (currentTime > tokenExpiryTime) {
            return response.code(401).send({ message: "Token expired" });
          }

          // Update the user's IP address with the latest one
          await UserToken.updateOne(
            { userId: userToken.userId },
            { $set: { ip: request.ip } }
          );

          request.user = {
            ...getUserDetails(user),
          };

          // Proceed to the next step
          return;
        } else {
          return response
            .code(401)
            .send({ message: "No active session found" });
        }
      } else {
        return response.code(404).send({ message: "User not found" });
      }
    } else {
      return response.code(401).send({ message: "Invalid token" });
    }
  } catch (err) {
    console.error("Error in authMiddleware:", err);
    return response.code(500).send({ message: "Internal server error" });
  }
};
