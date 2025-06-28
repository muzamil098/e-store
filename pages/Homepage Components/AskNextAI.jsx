import React, { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import { IoMdChatbubbles, IoMdClose } from "react-icons/io";
import styles from "../../styles/shared.module.css";

function AskNextAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]); // {from: 'user'|'ai', text: string}
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const submitHandler = async (values, { resetForm }) => {
    const userMsg = values.AIPrompt.trim();
    if (!userMsg) return;
    setMessages((prev) => [...prev, { from: "user", text: userMsg }]);
    setIsLoading(true);
    try {
      const response = await fetch("/api/askAI", {
        method: "POST",
        body: JSON.stringify(userMsg),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        setMessages((prev) => [
          ...prev,
          { from: "ai", text: "Error occurred. Please try again." },
        ]);
      } else {
        const responseData = await response.json();
        setMessages((prev) => [
          ...prev,
          { from: "ai", text: responseData.message || "No response." },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: "ai", text: "Network error. Please try again." },
      ]);
    }
    setIsLoading(false);
    resetForm();
  };

  const formik = useFormik({
    initialValues: { AIPrompt: "" },
    onSubmit: submitHandler,
  });

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg p-4 flex items-center justify-center text-3xl transition-all duration-200"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI Chat"
        >
          <IoMdChatbubbles />
        </button>
      )}

      {/* Chat Container */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-fade-in">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-blue-600">
            <span className="text-white font-semibold text-lg">
              Ask Next AI
            </span>
            <button
              className="text-white text-2xl hover:text-gray-200 transition"
              onClick={() => setIsOpen(false)}
              aria-label="Close Chat"
            >
              <IoMdClose />
            </button>
          </div>
          <div
            className="flex-1 overflow-y-auto px-4 py-3 bg-gray-50"
            style={{ minHeight: 220, maxHeight: 320 }}
          >
            {messages.length === 0 && (
              <div className="text-gray-400 text-center mt-8">
                Ask me anything!
              </div>
            )}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-2 flex ${
                  msg.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-lg max-w-[80%] text-sm shadow-sm ${
                    msg.from === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="flex items-center gap-2 px-4 py-3 border-t border-gray-100 bg-white"
          >
            <input
              className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-sm"
              type="text"
              name="AIPrompt"
              onChange={formik.handleChange}
              placeholder="Type your message..."
              value={formik.values.AIPrompt}
              autoComplete="off"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 font-semibold text-sm transition disabled:opacity-60"
              disabled={isLoading || !formik.values.AIPrompt.trim()}
            >
              Send
            </button>
          </form>
          {isLoading && (
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
              <span className="loading loading-bars loading-xs"></span>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default AskNextAI;
