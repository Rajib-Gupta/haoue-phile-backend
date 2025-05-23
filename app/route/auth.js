const authController = require("../controller/authController");
const {
  signInSchema,
  signUpSchema,
  emailVerification,
} = require("../schema/authSchems");
const { verifyEmail, verifyToken } = require("../helper/authHelper");
const { authMiddleware } = require("../middleware/authMiddleware");

/**
 * Defines authentication routes.
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {Object} options - Additional options for the routes.
 */
async function authRoutes(fastify, options) {
  // Route for user sign-up
  fastify.post("/auth/signup", { schema: signUpSchema }, authController.signUp);

  // Route for user sign-in
  fastify.post("/auth/signin", { schema: signInSchema }, authController.signIn);

  
  fastify.post(
    "/auth/verifyEmail",
    { schema: emailVerification },
    authController.verifyEmail
  );

  // Route for user social login
  fastify.post("/auth/socialLogin", authController.socialLogin);

  // Route for user sign-out
  fastify.delete("/auth/signout", authController.logout);

  // Route for user details
  fastify.get(
    "/auth/me",
    {
      preHandler: authMiddleware,
      schema: {
        description: "Get User API",
        tags: ["Auth"],
        summary: "Get User",
        security: [{ bearerAuth: [] }],
      },
    },
    authController.me
  );

  // Route for email verification
  fastify.get(
    "/auth/verify-email",
    {
      schema: {
        querystring: {
          type: "object",
          properties: { token: { type: "string" } },
        },
      },
    },
    verifyEmail
  );
}
/******  2f8b5b95-c7e9-448b-8578-e4fa5eb6d199  *******/

module.exports = authRoutes;
