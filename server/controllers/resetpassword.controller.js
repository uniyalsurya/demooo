const jwt = require("jsonwebtoken");
const User = require("../models/user.models");
const bcrypt = require("bcrypt");
const { sendMail } = require("../utils/mailer");

// Request password reset (send email with token)
const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate reset token (JWT, valid for 15 min)
    const resetToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_RESET_SECRET,
      { expiresIn: "15m" }
    );

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    // Send reset email
    await sendMail(
      user.email,
      "Password Reset Request",
      `<h3>Password Reset</h3>
       <p>Click below to reset your password:</p>
       <a href="${resetLink}">${resetLink}</a>
       <p>This link will expire in 15 minutes.</p>`
    );

    res.json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Request password reset error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Reset password (verify token & update password)
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ message: "Token and new password required" });
    }

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_RESET_SECRET);
    } catch (err) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const user = await User.findById(payload.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash new password and save
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  requestPasswordReset,
  resetPassword,
};
