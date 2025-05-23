const bcrypt = require("bcrypt");
const User = require("../model/userModel");
const {
  generateToken,
  verifyToken,
  sendVerificationEmail,
  destroyToken,
} = require("../helper/authHelper");
const { app } = require("firebase-admin");

// User sign-up
exports.signUp = async (req, response) => {
  const { email, phoneNumber, name } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response.status(409).send({ message: "Email already exists" });
    }

    // Hash the user's password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user, but set isVerified to false
    const user = new User({
      email,
      phoneNumber,
      name,
      isVerified: false,
    });

    await user.save();

    // Create a token for email verification
    const verificationToken = await generateToken(req, {
      email: user.email,
      id: user.id,
    });

    // Send verification email
    await sendVerificationEmail(user.email, name, verificationToken);

    return response.status(201).send({
      statusCode: 201,
      message:
        "User registered successfully. Please check your email to verify your account.",
      token: verificationToken,
      user: {
        email: user.email,
        name: user.name,
        id: user.id,
      },
    });
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Internal Server Error" });
  }
};

// User sign-in
exports.signIn = async (req, response) => {
  const { email, phoneNumber } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists and password is valid
    // const isPasswordValid =
    //   user && (await bcrypt.compare(password, user.password));
    // if (!user || !isPasswordValid) {
    //   return response.status(401).send({ message: "Invalid credentials" });
    // }

    // Check if email is verified
    // if (!user.isVerified) {
    //   // Create a token for email verification
    //   const verificationToken = generateToken(req, {
    //     email: user.email,
    //     id: user.id,
    //   });

    //   // Send verification email
    //   await sendVerificationEmail(user.email, verificationToken);

    //   return response.status(403).send({
    //     message:
    //       "Email not verified. Please verify your email before signing in.",
    //   });
    // }

    if (!user) {
      return response.status(404).send({ message: "Invalid Credentials!" });
    }

    // Generate JWT token for authenticated user
    const token = await generateToken(req, { email: user.email, id: user._id });

    return response.status(200).send({
      statusCode: 200,
      message: "User logged in successfully",
      token,
      user: {
        email: user.email,
        name: user.name,
        id: user._id,
      },
    });
  } catch (error) {
    console.error("Error during sign-in:", error);
    return response.status(500).send({ message: "Internal Server Error" });
  }
};
exports.socialLogin = async (req, response) => {
  const { email, name } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      // Create the new user, but set isVerified to false
      const user = new User({
        email,
        name,
        isVerified: true,
      });

      await user.save();

      // Create a token for email verification
      const verificationToken = generateToken(req, {
        email: user.email,
        id: user.id,
      });

      return response.status(201).send({
        statusCode: 201,
        message:
          "User registered successfully. Please check your email to verify your account.",
        token: verificationToken,
        user: {
          email: user.email,
          name: user.name,
          id: user.id,
        },
      });
    }

    // Generate JWT token for authenticated user
    const token = await generateToken(req, { email: user.email, id: user._id });

    return response.status(200).send({
      statusCode: 200,
      message: "User logged in successfully",
      token,
      user: {
        email: user.email,
        name: user.name,
        id: user._id,
      },
    });
  } catch (error) {
    console.error("Error during sign-in:", error);
    return response.status(500).send({ message: "Internal Server Error" });
  }
};

exports.me = async (request, response) => {
  return response.status(200).send({ user: request.user });
};

exports.logout = async (req, response) => {
  const userToken = req.headers["authorization"]?.split(" ")[1];
  console.log("userToken", userToken);
  await destroyToken(req.user.userId, userToken);
  return response.status(200).send({ message: "Logout successful" });
};

exports.verifyEmail = async (req, response) => {
  const { email } = req.body;
  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return response
        .status(200)
        .send({ status: 200, message: "Email accepted." });
    }

    return response
      .status(409)
      .send({ message: "Email Already Exist!", status: 409 });
  } catch {
    console.error("Error during sign-in:", error);
    return response.status(500).send({ message: "Internal Server Error" });
  }
};
