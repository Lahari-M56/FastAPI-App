import { useState } from "react";
import { askCareerChat } from "../Services/ChatService";
import type { ChatMessage } from "../types/chat";

function Chat() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [sessionId] = useState(() => "session_" + Date.now());

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!input.trim()) return;

        const userMessage: ChatMessage = {
            role: "user",
            content: input,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const response = await askCareerChat(input, sessionId);

            const botMessage: ChatMessage = {
                role: "bot",
                content: response,
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Chat error:", error);

            setMessages((prev) => [
                ...prev,
                {
                    role: "bot",
                    content: "Error: Could not get response.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                width: "700px",
                margin: "20px auto",
            }}
        >
            <h2 style={{ marginBottom: "10px" }}>Career Chat</h2>

            {/* Chat Area */}
            <div
                style={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    height: "120px", // Reduced from 180px
                    padding: "10px",
                    overflowY: "auto",
                    backgroundColor: "#fff",
                    marginBottom: "15px",
                }}
            >
                {messages.length === 0 ? (
                    <p
                        style={{
                            margin: 0,
                            color: "#666",
                            fontSize: "16px",
                        }}
                    >
                        Ask me anything about your career!
                    </p>
                ) : (
                    messages.map((msg, index) => (
                        <div key={index} style={{ marginBottom: "10px" }}>
                            <strong>{msg.role === "user" ? "You" : "Bot"}:</strong>
                            <p style={{ margin: "5px 0" }}>{msg.content}</p>
                        </div>
                    ))
                )}

                {loading && (
                    <p>
                        <em>Thinking...</em>
                    </p>
                )}
            </div>

            {/* Input */}
            <form
                onSubmit={handleSend}
                style={{
                    display: "flex",
                    gap: "10px",
                }}
            >
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    disabled={loading}
                    style={{
                        flex: 1,
                        height: "50px", // Increased height
                        padding: "0 15px",
                        fontSize: "16px",
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                    }}
                />

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: "90px",
                        height: "50px",
                        fontSize: "16px",
                        cursor: "pointer",
                        borderRadius: "6px",
                    }}
                >
                    Send
                </button>
            </form>
        </div>
    );
}

export default Chat;