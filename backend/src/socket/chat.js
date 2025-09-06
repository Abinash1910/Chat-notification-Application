import Message from "../models/Message.js";
import client from "../config/twilio.js";

const chatHandler = (io, socket) => {
  console.log("🔗 New client connected:", socket.id);

  socket.on("chatMessage", async (msg) => {
    try {
      // Save chat to DB
      const newMsg = new Message(msg);
      await newMsg.save();

      // Send to all frontend clients
      io.emit("chatMessage", msg);

      // 🟢 Send WhatsApp via Twilio
      await client.messages.create({
        from: process.env.TWILIO_WHATSAPP_NUMBER, // your Twilio sandbox "from"
        to: msg.to || process.env.MY_WHATSAPP_NUMBER, // ✅ take from frontend if provided
        body: msg.text, // ✅ send actual text only
      });

      console.log("📲 WhatsApp message sent to:", msg.to || process.env.MY_WHATSAPP_NUMBER);
    } catch (err) {
      console.error("❌ Error in chatMessage handler:", err.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
};

export default chatHandler;
