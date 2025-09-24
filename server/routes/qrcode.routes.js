const express = require("express");
const router = express.Router();
const auth = require('../middleware/Auth.middleware');
const role = require('../middleware/role.middleware');
const qrController = require('../controllers/qrcode.controller');
// const validators = require('../utils/validators'); // Add this import

// For users/dashboard: Get current QR code for org
router.get('/active', auth, qrController.getActiveQRCode);

// For org/admin: Trigger manual QR code generation (with validation)
router.post('/generate', 
  auth, 
  role(['organization']), 
//   validators.generateQRValidation, // Add validation
  qrController.generateNewQRCode
);

module.exports = router;