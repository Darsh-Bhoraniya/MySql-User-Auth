import express from "express";
import { sendMessage, fetchUserChats, fetchMessagesBetweenUsers, listenToUserChats } from '../controller/chat_controller.js';
import { db, admin } from "../config/db.js"
const router = express.Router();

router.post('/send-message', sendMessage);
router.get('/user-chats/:userId', fetchUserChats);
router.get('/messages/:senderId/:receiverId', fetchMessagesBetweenUsers);
router.get("/listen-user-chats/:userId", listenToUserChats);


router.post("/create-user", async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: "Name and Email are required" });
        }

        // Generate unique user ID (Firestore auto ID)
        const newUserRef = db.collection("users").doc();

        // Insert user data
        await newUserRef.set({
            id: newUserRef.id, // Store generated ID
            name,
            email,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        res.status(201).json({ message: "User created successfully", userId: newUserRef.id });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
export default router;