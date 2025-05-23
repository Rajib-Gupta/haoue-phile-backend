const transporter = require("../config/nodeMailer");
const User = require("../model/userModel");
const UserToken = require("../model/userTokenModel");

// Function to generate a JWT token
const generateToken = async (req, payload, expiresIn = "1h") => {
  const generatedToken = req.server.jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });
  const userToken = new UserToken({
    userId: payload.id,
    token: generatedToken,
    ip: req.ip,
    expireAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15),
  });

  await userToken.save();
  return generatedToken;
};

// Function to verify a JWT token
const verifyToken = (req, token) => {
  return req.server.jwt.verify(token, process.env.JWT_SECRET);
};

// Function to send verification email
const sendVerificationEmail = async (email, name, token) => {
  const verificationUrl = `${process.env.BASE_URL}/auth/verify-email?token=${token}`;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Account activation",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
          <h2 style="text-align: center; color: #333;">Hi ${name}</h2>
          <p style="font-size: 16px; color: #333;">Hi,</p>
          <p style="font-size: 16px; color: #333;">Thank you for signing up.</p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="${verificationUrl}" style="display: inline-block; padding: 12px 20px; font-size: 16px; color: white; background-color: #007bff; text-decoration: none; border-radius: 5px;">Verify Email</a>
          </div>
          <p style="font-size: 16px; color: #333;">If the button above doesn’t work, copy and paste the following link into your browser:</p>
          <p style="font-size: 14px; color: #555; word-break: break-all;">${verificationUrl}</p>
          <p style="font-size: 16px; color: #333;">Thank you,<br>Housephile</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 12px; color: #999; text-align: center;">If you didn’t request this email, you can safely ignore it.</p>
        </div>
      `,
    });
    // await transporter.sendMail({
    //   from: process.env.EMAIL_USER,
    //   to: process.env.EMAIL_USER,
    //   subject: "Account activation",
    //   html: `
    //     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
    //       <h2 style="text-align: center; color: #333;">"Hi "${name}</h2>
    //       <p style="font-size: 16px; color: #333;">Hi,</p>
    //       <p style="font-size: 16px; color: #333;">Thank you for signing up.</p>
    //       <div style="text-align: center; margin: 20px 0;">
    //         <a href="${verificationUrl}" style="display: inline-block; padding: 12px 20px; font-size: 16px; color: white; background-color: #007bff; text-decoration: none; border-radius: 5px;">Verify Email</a>
    //       </div>
    //       <p style="font-size: 16px; color: #333;">If the button above doesn’t work, copy and paste the following link into your browser:</p>
    //       <p style="font-size: 14px; color: #555; word-break: break-all;">${verificationUrl}</p>
    //       <p style="font-size: 16px; color: #333;">Thank you,<br>Housephile</p>
    //       <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
    //       <p style="font-size: 12px; color: #999; text-align: center;">If you didn’t request this email, you can safely ignore it.</p>
    //     </div>
    //   `,
    // });
    console.log("Verification email sent to:", email);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Could not send verification email");
  }
};

// Email verification route
const verifyEmail = async (req, response) => {
  const { token } = req.query;

  try {
    const decodedToken = req.server.jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decodedToken.email });

    if (!user) {
      return response.status(404).send({ message: "User not found" });
    }

    if (user.isVerified) {
      return response
        .status(200)
        .send({ message: "Email is already verified" });
    }

    // Update user's isVerified status
    user.isVerified = true;
    await user.save();

    return response
      .status(200)
      .send({ message: "Email verified successfully" });
  } catch (error) {
    return response.status(400).send({ message: "Invalid or expired token" });
  }
};

const destroyToken = async (userId, userToken) => {
  console.log("userId", userId);
  const userTokenObject = await UserToken.findOne({
    where: {
      userId,
      token: userToken,
    },
  });

  if (userTokenObject) {
    await UserToken.destroy({
      where: {
        id: userTokenObject.id,
      },
    });
    return true;
  }
  return false;
};

const getUserDetails = (user) => {
  return {
    userId: user._id,
    name: user.name,
    email: user.email,
    isVerified: user.isVerified,
  };
};

module.exports = {
  generateToken,
  verifyToken,
  sendVerificationEmail,
  verifyEmail,
  destroyToken,
  getUserDetails,
};
