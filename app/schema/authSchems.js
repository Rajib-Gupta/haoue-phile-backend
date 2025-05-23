const signUpSchema = {
  description: "User registration",
  tags: ["Auth"],
  body: {
    type: "object",
    required: ["email", "phoneNumber", "name"],
    properties: {
      email: { type: "string", format: "email" },
      phoneNumber: { type: "string", minLength: 10 },
      name: { type: "string", minLength: 1 },
    },
  },
  response: {
    201: {
      description: "User registered successfully",
      type: "object",
      properties: {
        statusCode: { type: "integer" },
        message: { type: "string" },
        token: { type: "string" },
        user: {
          type: "object",
          properties: {
            email: { type: "string" },
            name: { type: "string" },
            id: { type: "string" },
          },
        },
      },
    },
    400: {
      description: "Bad Request",
      type: "object",
      properties: {
        message: { type: "string" },
        statusCode: { type: "integer" },
      },
    },
    409: {
      description: "Conflict: Email already exists",
      type: "object",
      properties: {
        message: { type: "string" },
        statusCode: { type: "integer" },
      },
    },
    500: {
      description: "Internal Server Error",
      type: "object",
      properties: {
        message: { type: "string" },
        statusCode: { type: "integer" },
      },
    },
  },
};

const signInSchema = {
  description: "User login",
  tags: ["Auth"],
  body: {
    type: "object",
    required: ["email", "phoneNumber"],
    properties: {
      email: { type: "string", format: "email" },
      phoneNumber: { type: "string" },
    },
  },
  response: {
    200: {
      description: "Sign-in successful",
      type: "object",
      properties: {
        statusCode: { type: "integer" },
        message: { type: "string" },
        token: { type: "string" },
        user: {
          type: "object",
          properties: {
            email: { type: "string" },
            name: { type: "string" },
            id: { type: "string" },
          },
        },
      },
    },
    400: {
      description: "Bad Request",
      type: "object",
      properties: { message: { type: "string" } },
    },
    401: {
      description: "Unauthorized",
      type: "object",
      properties: { message: { type: "string" } },
    },
    500: {
      description: "Internal Server Error",
      type: "object",
      properties: { message: { type: "string" } },
    },
  },
};
const emailVerification = {
  description: "User Email Verification",
  tags: ["Auth"],
  body: {
    type: "object",
    required: ["email"],
    properties: {
      email: { type: "string", format: "email" },
    },
  },
  response: {
    200: {
      description: "Verify successful",
      type: "object",
      properties: {
        statusCode: { type: "integer" },
        message: { type: "string" },
      },
    },
    400: {
      description: "Bad Request",
      type: "object",
      properties: { message: { type: "string" } },
    },
    409: {
      description: "User exist",
      type: "object",
      properties: { message: { type: "string" }, status: {type:"integer"} },
    },
    500: {
      description: "Internal Server Error",
      type: "object",
      properties: { message: { type: "string" } },
    },
  },
};

const googleLoginSchema = {
  description: "Google login authentication",
  tags: ["Auth"],
  body: {
    type: "object",
    required: ["token"],
    properties: {
      token: { type: "string" },
    },
  },
  response: {
    200: {
      description: "Successfully authenticated with Google",
      type: "object",
      properties: {
        statusCode: { type: "integer" },
        message: { type: "string" },
        user: {
          type: "object",
          properties: {
            googleId: { type: "string" },
            email: { type: "string", format: "email" },
            displayName: { type: "string" },
            photoUrl: { type: "string" },
            // Add other user fields as needed
          },
        },
      },
    },
    401: {
      description: "Unauthorized: Invalid Google token",
      type: "object",
      properties: {
        error: { type: "string" },
        message: { type: "string" },
      },
    },
    500: {
      description: "Internal Server Error",
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};

module.exports = {
  signUpSchema,
  signInSchema,
  googleLoginSchema,
  emailVerification,
};
