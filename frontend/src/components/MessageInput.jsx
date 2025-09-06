import { useState } from "react";

function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSend = async () => {
    if (!text.trim()) return;
    await fetch("http://localhost:5000/api/chat/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to: "whatsapp:+91**********", body: text }),
    });
    onSend({ from: "me", body: text });
    setText("");
  };

  return (
    <div className="flex gap-3 p-4 bg-gray-100 border-t border-gray-300">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
      />
      <button
        onClick={handleSend}
        className="px-5 py-2 bg-indigo-500 text-white font-semibold rounded-full hover:bg-indigo-600 transition duration-200 shadow-md"
      >
        Send
      </button>
    </div>
  );
}

export default MessageInput;
