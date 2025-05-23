const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, sparse: true },
    phoneNumber: { type: String, unique: true, sparse: true },
    password: { type: String, minlength: 6 },
    googleId: { type: String, unique: true, sparse: true },
    facebookId: { type: String, unique: true, sparse: true },
    isVerified: { type: Boolean, default: false },
    name: String,
    photoUrl: String,
    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ScheduleBooking", // Reference to ScheduleBooking
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
