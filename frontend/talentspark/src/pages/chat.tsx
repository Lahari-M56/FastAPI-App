import { useState, useRef, useEffect } from "react";
import { askCareerChatbot } from "../Services/ChatService";

interface Message {
  sender: "user" | "bot";
  text: string;
}

function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState<string>(() => {
    const existing = localStorage.getItem("chat_session_id");
    if (existing) return existing;
    const newId = "session_" + Date.now();
    localStorage.setItem("chat_session_id", newId);
    return newId;
  });

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const reply = await askCareerChatbot(text, sessionId);
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Something went wrong.";
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: `Error: ${msg}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div style={styles.container}>
      <h2>Career Guidance Chatbot</h2>

      <div style={styles.chatBox}>
        {messages.length === 0 && (
          <div style={styles.placeholder}>
            Ask me anything about careers, skills, or job paths.
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.message,
              textAlign: msg.sender === "user" ? "right" : "left",
              color: msg.sender === "user" ? "#0b5ed7" : "#222",
            }}
          >
            <strong>{msg.sender === "user" ? "You" : "Bot"}:</strong>{" "}
            {msg.text}
          </div>
        ))}

        {loading && <div style={styles.typing}>Bot is typing...</div>}
        <div ref={bottomRef} />
      </div>

      <div style={styles.inputRow}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your question..."
          style={styles.input}
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          style={{
            ...styles.button,
            opacity: loading ? 0.6 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: 600,
    margin: "40px auto",
    fontFamily: "Arial, sans-serif",
  },
  chatBox: {
    background: "#fff",
    borderRadius: 8,
    padding: 20,
    height: 400,
    overflowY: "auto",
    boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
  },
  placeholder: {
    color: "#999",
    textAlign: "center",
    marginTop: 150,
  },
  message: {
    margin: "10px 0",
    lineHeight: 1.4,
  },
  typing: {
    color: "#888",
    fontStyle: "italic",
  },
  inputRow: {
    display: "flex",
    marginTop: 15,
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 6,
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    marginLeft: 8,
    border: "none",
    background: "#0b5ed7",
    color: "white",
    borderRadius: 6,
  },
};

export default Chat;