const express = require("express");
const router = express.Router();
const auth = require("../middleware/Auth.middleware");
const role = require("../middleware/role.middleware");
const upload = require("../middleware/multer.middleware");
const bulkUserController = require("../controllers/bulkUser.controller");

// Bulk user registration via Excel upload
router.post(
  "/upload-users", 
  auth, 
  role(["organization"]), 
  upload.single("excel"), 
  bulkUserController.bulkRegisterUsers
);

// Get upload template
router.get(
  "/template", 
  auth, 
  role(["organization"]), 
  bulkUserController.downloadTemplate
);

module.exports = router;
