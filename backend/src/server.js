import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import chatHandler from "./socket/chat.js";
import express from "express";
import bodyParser from "body-parser";
import client from "./config/twilio.js";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});


app.post("/api/chat/send", async (req, res) => {
  const { to, body } = req.body;

  try {
    const message = await client.messages.create({
      from: "whatsapp:+14155238886", 
      to,                            
      body
    });

    console.log("📲 WhatsApp sent:", message.sid, message.status);
    res.json({ success: true, sid: message.sid, status: message.status });
  } catch (err) {
    console.error("Error sending WhatsApp:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});


app.post("/api/messages/receive", (req, res) => {
  const from = req.body.From;
  const msg = req.body.Body;

  console.log(` Incoming WhatsApp from ${from}: ${msg}`);

 
  io.emit("receiveMessage", { from, msg });

  //
  res.set("Content-Type", "text/xml");
  res.send(`<Response><Message>Got your message: ${msg}</Message></Response>`);
});


io.on("connection", (socket) => chatHandler(io, socket));


server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
