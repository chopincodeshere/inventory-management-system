const express = require("express");

const { sendMail } = require("../controllers/email_controller");

const router = express.Router();

router.route("/").post(sendMail);

module.exports = router;
