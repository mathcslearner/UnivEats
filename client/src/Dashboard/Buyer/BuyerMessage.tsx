import { useState, useEffect, useRef } from "react";
import { Search, Send } from "lucide-react";

interface User {
  id: string;
  username: string;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
}

const WS_URL = "wss://localhost:3001/ws"; 

const BuyerMessage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [conversations, setConversations] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const wsRef = useRef<WebSocket | null>(null);

  // 1. Connect to WebSocket server
  useEffect(() => {
    const token = localStorage.getItem("token"); 
    const ws = new WebSocket(`${WS_URL}?token=${token}`);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log(" WebSocket connected");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        // Handle events
        if (data.op === "message") {
          setMessages((prev) => [
            ...prev,
            {
              id: data.server_msg_id,
              sender: data.sender_user_id,
              content: data.plaintext ?? "[Encrypted message]",
              timestamp: new Date().toLocaleTimeString(),
            },
          ]);
        } else if (data.op === "ack") {
          console.log("Message delivered:", data);
        } else if (data.op === "auth.ok") {
          console.log("Authenticated as", data.user_id);
        }
      } catch (err) {
        console.error("WebSocket message parse error:", err);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket closed. Attempting reconnect...");
      // Optional: implement exponential backoff reconnection
    };

    return () => ws.close();
  }, []);

  //2. Search users 
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      // Replace with real API
      const mockResults = [
        { id: "1", username: "alice" },
        { id: "2", username: "bob" },
        { id: "3", username: "charlie" },
      ].filter((u) => u.username.includes(searchTerm.toLowerCase()));

      setSearchResults(mockResults);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setSearchResults([]);
    setSearchTerm("");
    // Fetch messages for this conversation
    setMessages([
      { id: "m1", sender: user.username, content: "Hey!", timestamp: "10:00" },
      { id: "m2", sender: "me", content: "Hi there!", timestamp: "10:01" },
    ]);
  };

  //3. Send a message
  const handleSend = () => {
    if (!newMessage.trim() || !selectedUser || !wsRef.current) return;

    const tempId = `temp-${Date.now()}`;
    const msg: Message = {
      id: tempId,
      sender: "me",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString(),
    };

    // Optimistic update
    setMessages((prev) => [...prev, msg]);

    // Build WebSocket payload
    const payload = {
      op: "send",
      conversation_id: selectedUser.id, // For 1:1 chat, can just use user ID
      ciphertext: newMessage, // TODO: replace with encrypted text
      cipher_meta: {},
      client_msg_id: tempId,
    };

    wsRef.current.send(JSON.stringify(payload));
    setNewMessage("");
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <div className="w-1/3 border-r border-gray-300 flex flex-col">
        {/* Search bar */}
        <div className="p-3 border-b border-gray-300">
          <div className="flex items-center bg-white rounded-xl px-3 py-2">
            <Search className="text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 ml-2 bg-transparent outline-none"
            />
          </div>

          {/* Search results */}
          {searchResults.length > 0 && (
            <div className="mt-2 bg-white rounded-xl shadow border">
              {searchResults.map((user) => (
                <div
                  key={user.id}
                  onClick={() => handleSelectUser(user)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {user.username}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <p className="text-gray-400 text-center mt-6">
              No conversations yet
            </p>
          ) : (
            conversations.map((user) => (
              <div
                key={user.id}
                onClick={() => handleSelectUser(user)}
                className={`px-4 py-3 cursor-pointer hover:bg-gray-200 ${
                  selectedUser?.id === user.id ? "bg-gray-200" : ""
                }`}
              >
                {user.username}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat window */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-300 bg-white flex items-center">
          {selectedUser ? (
            <h2 className="font-semibold text-lg">{selectedUser.username}</h2>
          ) : (
            <h2 className="text-gray-400">Select a user to start chatting</h2>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {selectedUser &&
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "me" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl ${
                    msg.sender === "me"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-900"
                  }`}
                >
                  {msg.content}
                  <div className="text-xs mt-1 opacity-70">{msg.timestamp}</div>
                </div>
              </div>
            ))}
        </div>

        {/* Input */}
        {selectedUser && (
          <div className="p-3 border-t border-gray-300 bg-white flex items-center">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-gray-100 rounded-xl px-4 py-2 outline-none"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="ml-2 bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-600"
            >
              <Send size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerMessage;
