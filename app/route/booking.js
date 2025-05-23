const bookingController = require("../controller/bookingController");
const { verifyToken } = require("../middleware/authMiddleware");
const {
  getBookingsSchema,
  createBookingSchema,
} = require("../schema/bookingSchemas");

/**
 * Defines booking routes.
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {Object} options - Additional options for the routes.
 */
async function bookingRoutes(fastify, options) {
  // Route for fetching bookings
  fastify.get(
    "/booking",
    { schema: getBookingsSchema, preHandler: verifyToken },
    bookingController.getBookings
  );

  // Route for creating a new booking
  fastify.post(
    "/booking",
    { schema: createBookingSchema, preHandler: verifyToken },
    bookingController.createBooking
  );
}

module.exports = { bookingRoutes };
