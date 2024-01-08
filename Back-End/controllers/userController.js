import { User, Promotion, Notification, Transaction } from "../models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import {
  getPendingNotifications,
  clearPendingNotifications,
  storePendingNotification,
} from "../middleware/socket.js";

import { Server } from "socket.io";

export const io = new Server({
  cors: { origin: "http://localhost:5173" },
});

let onlineUsers = [];
let sharedSocket;
var sendOfflineUserNotifications;

const addNewUser = (email, socketId) => {
  !onlineUsers.some((user) => user.email === email) &&
    onlineUsers.push({ email, socketId });
};
const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};
const getUser = (email) => {
  return onlineUsers.find((user) => user.email === email);
};

io.on("connection", (socket) => {
  sharedSocket = socket;
  socket.on("newUser", (email) => {
    addNewUser(email, socket.id);
    console.log("socket: " + socket);
    console.log("id: " + socket?.id);
    console.log("userEmail: " + email);
    onlineUsers.forEach((each) => {
      console.log("---", each.email);
    });
  });
  socket.on(
    "sendNotification",
    ({ senderName, receiverName, amount, time, moneyType }) => {
      const receiver = getUser(receiverName);
      if (receiver) {
        io.to(receiver.socketId).emit("getNotification", {
          senderName,
          amount,
          time,
          moneyType,
        });
        console.log("sendDirectly to:", receiver.email);
      } else {
        storePendingNotification(receiverName, {
          senderName,
          amount,
          time,
          moneyType,
        });
      }
    }
  );

  sendOfflineUserNotifications = async (email) => {
    console.log("Socket connected:", socket.connected);

    const pendingNotifications = await getPendingNotifications(email);
    console.log(
      "Number of pending notifications:",
      pendingNotifications.length
    );

    if (socket.connected && pendingNotifications.length > 0) {
      setTimeout(() => {
        pendingNotifications.forEach((notification) => {
          console.log("storedNFioID:", socket.id);

          io.to(socket.id).emit("getNotification", notification);

          console.log("storedNFio:", notification);
        });
      }, 20);

      clearPendingNotifications(email);
    }
  };

  socket.on("delUser", () => {
    removeUser(socket.id);
    console.log("delUser");
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log("disconnect");
  });
});

io.listen(5000);

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ order: [["id", "DESC"]] });
    res.json(users);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Get a single user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Create a new user
const createUser = async (req, res) => {
  const userData = req.body;
  try {
    const user = await User.create(userData);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error.errors[0].message);
  }
};

// Update a user by ID
const updateUser = async (req, res) => {
  const { id } = req.params;
  const updatedFields = req.body;
  try {
    const user = await User.findByPk(id);
    if (user) {
      Object.assign(user, updatedFields);
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.status(204).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      return res.status(404).json("Email not found");
    }

    // Verify password
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(404).json("Incorrect password");
    }

    // Authenticate user with jwt
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRATION,
      }
    );

    sendOfflineUserNotifications(user.email);

    res.status(200).json({
      success: true,
      email: user.email,
      accessToken: token,
      role: user.role,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  signInUser,
};
