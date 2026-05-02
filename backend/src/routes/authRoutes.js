const express = require("express");
const router = express.Router();

const {
  register,
  login,
  googleLogin,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
router.post("/register", register);
router.post("/login", login);
router.post("/google", googleLogin);
router.get("/profile", authMiddleware, (req, res) => {
  res.json(req.user);
});
module.exports = router;