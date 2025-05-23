const { fastifyPassport } = require("@fastify/passport");

const GoogleStrategy = require("passport-google-oauth20").Strategy;

const googleAuth = () => {
  fastifyPassport?.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        // Handle Google user sign-in/sign-up logic here
        // You may want to check if the user exists in your DB or create a new user
        done(null, profile); // Pass profile to the next step (serialization)
      }
    )
  );
};

module.exports = { googleAuth };
