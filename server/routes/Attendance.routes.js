const express = require("express");
const router = express.Router();
const auth = require("../middleware/Auth.middleware");
const attendanceController = require("../controllers/Attendance.controller");
const upload = require("../middleware/multer.middleware");
const qrRateLimiter = require("../middleware/qrRateLimiter.middleware");
const {
  downloadDailyReport,
  downloadWeeklyReport,
} = require("../controllers/download.controller");
const antiSpoofingMiddleware = require("../middleware/DIstance.middleware");

// Scan QR
// router.post("/scan", auth, attendanceController.scanQRCode);
router.post(
  "/scan",
  auth,
  qrRateLimiter,
  antiSpoofingMiddleware,
  attendanceController.scanQRCode
);

// Get past attendance for logged-in user
router.get("/past", auth, attendanceController.getUserPastAttendance);

// POST /attendance/upload
// router.post("/upload", upload.single("file"), attendanceController.uploadAttendanceFile);

// //download daily attenadance
router.get("/download-daily", auth, downloadDailyReport);

//download weekly attenadance
router.get("/download-weekly", auth, downloadWeeklyReport);

//get daily report
router.get("/daily-report", auth, attendanceController.getDailyReport);

//get daily report
router.get("/weekly-report", auth, attendanceController.getDailyReport);

// GET date=2025-08-15
router.get("/check", attendanceController.checkWorkingDay);

module.exports = router;
