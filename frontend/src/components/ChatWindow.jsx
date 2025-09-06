const ChatWindow = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-100 space-y-2 h-96 border border-gray-300 rounded-lg">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`max-w-xs px-4 py-2 rounded-lg break-words ${
            msg.from === "me"
              ? "bg-indigo-500 text-white self-end ml-auto"
              : "bg-white text-gray-800 self-start mr-auto"
          }`}
        >
          {msg.body}
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
