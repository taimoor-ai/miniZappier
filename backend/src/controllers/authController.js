const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

// 🔐 Initialize Google Client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// 🔐 Generate JWT
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
      issuer: "your-app-name",
    }
  );
};

//////////////////////////////////////////////////////
// 🟢 REGISTER (Email/Password)
//////////////////////////////////////////////////////
const register = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "Request body is missing",
      });
    }

    const { name, email, password } = req.body;

    // 🔒 Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    let existingUser = await User.findOne({ email: normalizedEmail });

    // 🔥 If user exists via Google only
    if (existingUser && existingUser.googleId && !existingUser.password) {
      return res.status(400).json({
        message: "This account is registered with Google. Please login with Google.",
      });
    }

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // 🔐 Hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      provider: "local",
    });

    const token = generateToken(user._id);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

//////////////////////////////////////////////////////
// 🔵 LOGIN (Email/Password)
//////////////////////////////////////////////////////
const login = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "Request body is missing",
      });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // 🔥 If Google-only account
    if (!user.password) {
      return res.status(400).json({
        message: "This account uses Google login. Please login with Google.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user._id);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

//////////////////////////////////////////////////////
// 🔴 GOOGLE LOGIN
//////////////////////////////////////////////////////
const googleLogin = async (req, res) => {
  try {
    console.log("GOOGLE LOGIN CALLED");
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        message: "Google token missing",
      });
    }

    // 🔐 Verify token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { sub, name, email, picture } = payload;

    const normalizedEmail = email.toLowerCase().trim();

    let user = await User.findOne({ email: normalizedEmail });

    //////////////////////////////////////////////////////
    // 🔥 ACCOUNT MERGING LOGIC
    //////////////////////////////////////////////////////
    if (!user) {
      // 🆕 Create new user
      user = await User.create({
        name,
        email: normalizedEmail,
        googleId: sub,
        picture,
        provider: "google",
      });
    } else {
      // 🔗 Link Google if not already linked
      if (!user.googleId) {
        user.googleId = sub;
        user.picture = picture;
        user.provider = "google";
        await user.save();
      }
    }

    const appToken = generateToken(user._id);

    res.json({
      message: "Google login successful",
      token: appToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
      },
    });
  } catch (error) {
    console.error("GOOGLE LOGIN ERROR:", error);
    res.status(401).json({
      message: "Google authentication failed",
    });
  }
};

//////////////////////////////////////////////////////
// 📦 EXPORTS
//////////////////////////////////////////////////////
module.exports = {
  register,
  login,
  googleLogin,
};