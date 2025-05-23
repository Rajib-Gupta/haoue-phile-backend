const User = require("../model/userModel");
const ScheduleBooking = require("../model/bookingModel");

/**
 * Create a new booking for the user.
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Promise} - Resolves with a 201 status code and a message
 */
exports.createBooking = async (req, response) => {
  try {
    // Extract the relevant fields from the request body
    const {
      bookingType,
      date,
      tourType,
      timeSlot,
      name,
      phone,
      email,
      message,
    } = req.body;

    console.log('req.user', req)
    // Find the user (assume userId is provided)
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Create a new booking
    const newBooking = new ScheduleBooking({
      bookingType: bookingType,
      date: new Date(date),
      tourType: tourType,
      timeSlot: timeSlot,
      name: name, // Optional: pre-fill with user's name
      phone: phone, // Optional: pre-fill with user's phone
      email: email, // Optional: pre-fill with user's email
      message: message,
      termsAccepted: true,
      user: user._id, // Reference the user
    });

    // Save the booking
    await newBooking.save();

    // Add the booking to the user's bookings array
    user.bookings.push(newBooking._id);
    await user.save();

    return res.status(201).send({ message: "Booking created successfully" });
  } catch (error) {
    console.error("Error creating booking:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

/**
 * Get all bookings for the user.
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Promise} - Resolves with a 200 status code and an array of bookings
 */
exports.getBookings = async (req, response) => {
  try {
    // Find the user (assume userId is provided)
    const user = await User.findById(req.user.id);

    if (!user) {
      return response.status(404).send({ message: "User not found" });
    }

    // Find all bookings for the user
    const bookings = await ScheduleBooking.find({ user: user._id });

    // Return the bookings
    return response.status(200).send({ bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return response.status(500).send({ message: "Internal Server Error" });
  }
};

/**
 * Delete a booking by ID for the authenticated user.
 * @param {Object} req - Request object containing the booking ID in params and user ID in the JWT token.
 * @param {Object} response - Response object to send back the result.
 * @returns {Promise} - Resolves with a status code and message indicating the result.
 */
exports.deleteBooking = async (req, response) => {
  try {
    const { id } = req.params; // Get booking ID from request parameters
    const user = await User.findById(req.user.id); // Find the user by ID

    if (!user) {
      // If user not found, return 404
      return response.status(404).send({ message: "User not found" });
    }

    // Find and delete the booking by ID
    const deletedBooking = await ScheduleBooking.findByIdAndDelete(id);

    if (!deletedBooking) {
      // If booking not found, return 404
      return response.status(404).send({ message: "Booking not found" });
    }

    // Remove the deleted booking from the user's bookings array
    user.bookings = user.bookings.filter(
      (booking) => booking.toString() !== id
    );
    await user.save(); // Save the updated user document

    // Return success message
    return response.status(200).send({ message: "Booking deleted successfully" });
  } catch (error) {
    // Log and return internal server error
    console.error("Error deleting booking:", error);
    return response.status(500).send({ message: "Internal Server Error" });
  }
};