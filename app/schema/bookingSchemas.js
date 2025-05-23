const createBookingSchema = {
  type: "object",
  required: [
    "bookingType",
    "date",
    "tourType",
    "timeSlot",
    "name",
    "phone",
    "email",
    "termsAccepted",
    "message",
  ],
  properties: {
    bookingType: {
      type: "string",
      enum: ["Schedule a Tour", "Request Info"],
    },
    date: {
      type: "string",
      format: "date",
    },
    tourType: {
      type: "string",
      enum: ["In Person", "Video Chat"],
    },
    timeSlot: {
      type: "string",
    },
    name: {
      type: "string",
    },
    phone: {
      type: "string",
      format: "phone",
    },
    email: {
      type: "string",
      format: "email",
    },
    termsAccepted: {
      type: "boolean",
    },
    message: {
      type: "string",
    },
  },
  response: {
    201: {
      description: "Booking created successfully",
      type: "object",
      properties: {
        statusCode: { type: "integer" },
        message: { type: "string" },
      },
    },
    400: {
      description: "Bad request",
      type: "object",
      properties: {
        statusCode: { type: "integer" },
        message: { type: "string" },
      },
    },

    500: {
      description: "Internal server error",
      type: "object",
      properties: {
        statusCode: { type: "integer" },
        message: { type: "string" },
      },
    },
  },
  message: {
    type: "string",
  },
  termsAccepted: {
    type: "boolean",
  },
  user: {
    type: "object",
    properties: {
      email: { type: "string" },
      name: { type: "string" },
      id: { type: "string" },
    },
  },
};

const getBookingsSchema = {
  type: "object",
  required: ["user"],
  properties: {
    user: {
      type: "object",
      properties: {
        email: { type: "string" },
        name: { type: "string" },
        id: { type: "string" },
      },
    },
  },
  response: {
    200: {
      description: "Bookings fetched successfully",
      type: "object",
      properties: {
        statusCode: { type: "integer" },
        message: { type: "string" },
        booking: {
          type: "array",
          items: {
            type: "object",
            properties: {
              _id: { type: "string" },
              bookingType: { type: "string" },
              date: { type: "string" },
              tourType: { type: "string" },
              timeSlot: { type: "string" },
              name: { type: "string" },
              phone: { type: "string" },
              email: { type: "string" },
              message: { type: "string" },
              termsAccepted: { type: "boolean" },
              createdAt: { type: "string" },
              updatedAt: { type: "string" },
            },
          },
        },
      },
    },
    400: {
      description: "Bad request",
      type: "object",
      properties: {
        statusCode: { type: "integer" },
        message: { type: "string" },
      },
    },

    500: {
      description: "Internal server error",
      type: "object",
      properties: {
        statusCode: { type: "integer" },
        message: { type: "string" },
      },
    },
  },
  message: {
    type: "string",
  },
};

module.exports = { createBookingSchema, getBookingsSchema };
