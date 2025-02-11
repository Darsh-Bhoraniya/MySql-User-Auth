import { db, admin } from "../config/db.js";
import { FieldValue } from "firebase-admin/firestore";

// Function to create or fetch a room for user chat history
const getOrCreateRoom = async (userId, participantId) => {
  const roomId = `room_${userId}`;
  const roomRef = db.collection("rooms").doc(roomId);
  const roomSnapshot = await roomRef.get();

  if (!roomSnapshot.exists) {
    // Create new room document
    await roomRef.set({
      userId,
      participants: [participantId],
      createdAt: FieldValue.serverTimestamp(),
    });
  } else {
    // If room exists, update participants list
    await roomRef.update({
      participants: FieldValue.arrayUnion(participantId),
    });
  }

  return roomId;
};

// Send Message & Store in "messages" collection
export const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, messageText } = req.body;
    if (!senderId || !receiverId || !messageText) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const roomId = await getOrCreateRoom(senderId, receiverId);

    // Store the message in "messages" collection
    await db.collection("messages").add({
      roomId,
      senderId,
      receiverId,
      messageText,
      timestamp: FieldValue.serverTimestamp(),
    });

    res.status(200).json({ success: true, message: "Message sent!" });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Fetch all chats of a user
export const fetchUserChats = async (req, res) => {
  try {
    const { userId } = req.params;
    const roomId = `room_${userId}`;

    // const query = `SELECT * FROM messages WHERE roomId = '${roomId}' ORDER BY timestamp ASC`;
    const querySnapshot = await db.collection("messages").where("roomId", "==", roomId).get();

    // console.log(query);
    // const querySnapshot = await db.collection("messages").get({ sql: query });
    console.log("querySnapshot", querySnapshot)
    if (querySnapshot.empty) {
      return res.status(404).json({ success: false, message: "No messages found." });
    }

    const messages = [];
    querySnapshot.forEach((doc) => messages.push({ id: doc.id, ...doc.data() }));

    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error("Error fetching user chats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const fetchMessagesBetweenUsers = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;

    const query = `SELECT * FROM messages WHERE (senderId = '${senderId}' AND receiverId = '${receiverId}') OR (senderId = '${receiverId}' AND receiverId = '${senderId}') ORDER BY timestamp ASC`;
    const querySnapshot = await db.collection("messages").get({ sql: query });

    if (querySnapshot.empty) {
      return res.status(404).json({ success: false, message: "No messages found." });
    }

    const messages = [];
    querySnapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const listenToUserChats = (req, res) => {
  try {
    const { userId } = req.params;
    const roomId = `room_${userId}`;

    // res.setHeader("Content-Type", "text/event-stream");
    // res.setHeader("Cache-Control", "no-cache");
    // res.setHeader("Connection", "keep-alive");

    db.collection("messages")
      .where("roomId", "==", roomId)
      .onSnapshot((snapshot) => {
        const messages = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        res.status(200).json({ success: true, messages });
      }, (error) => {
        console.error("Error listening to messages:", error);
        res.status(500).json({ error: "Internal Server Error" });
      });

  } catch (error) {
    console.error("Error setting up listener:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};