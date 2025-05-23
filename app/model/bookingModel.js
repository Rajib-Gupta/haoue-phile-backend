const mongoose = require("mongoose");

const scheduleBookingSchema = new mongoose.Schema(
  {
    bookingType: {
      type: String,
      enum: ["Schedule a Tour", "Request Info"],
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    tourType: {
      type: String,
      enum: ["In Person", "Video Chat"],
      required: true,
    },
    timeSlot: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\+?\d{10,15}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    message: {
      type: String,
    },
    termsAccepted: {
      type: Boolean,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User schema
      required: true, // Ensure every booking is tied to a user
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ScheduleBooking", scheduleBookingSchema);
