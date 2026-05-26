import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Sparkles, User, GraduationCap, Flame, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { ChatMessage, CareerRecommendation } from "../types";

interface AIMentorChatProps {
  chatMessages: ChatMessage[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  activeRecommendation: CareerRecommendation | null;
}

const quickPrompts = [
  "So sánh triển vọng cốt lõi giữa ngành AI và Web?",
  "Tôi muốn bắt đầu học Hệ thống Nhúng thì cần chuẩn bị kit gì?",
  "Nên học Flutter hay React Native cho lập trình di động?",
  "Cần chuẩn bị kỹ năng gì để ứng tuyển实习 Cybersecurity?",
  "Mẹo tự học lập trình hiệu quả cho sinh viên năm nhất?"
];

export const AIMentorChat: React.FC<AIMentorChatProps> = ({
  chatMessages,
  setChatMessages,
  activeRecommendation,
}) => {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isLoading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: "user",
      content: textToSend,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);
    setSubmitError(null);

    // Prepare full conversation logs to feed the API securely
    // In compliance with our endpoint, send only required history logs
    const conversationHistory = [...chatMessages, userMsg].map((msg) => ({
      role: msg.role === "user" ? "user" : "assistant",
      content: msg.content,
    }));

    try {
      const response = await fetch("/api/chat-mentor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: conversationHistory,
          userProfile: activeRecommendation?.matchedDomain || null,
        }),
      });

      if (!response.ok) {
        throw new Error("Không phản hồi từ máy chủ trí tuệ nhân tạo.");
      }

      const data = await response.json();

      setChatMessages((prev) => [
        ...prev,
        {
          id: `ast-${Date.now()}`,
          role: "assistant",
          content: data.reply,
          timestamp: new Date(),
        },
      ]);
    } catch (err: any) {
      console.error("Chat fetch failed:", err);
      setSubmitError("Giao thức kết nối bị ngắt quãng. Đang hiển thị kết quả ngoại tuyến.");
      
      // Local fallback reply based on keywords
      const lowerText = textToSend.toLowerCase();
      let fallbackText = "Cảm ơn câu hỏi của bạn! Do kết nối AI bị gián đoạn, EduMentor khuyên bạn nên tập trung tìm kiếm các dự án thực tế trên GitHub và kết hợp đọc các tài liệu hướng dẫn học (Docs) chính thức của thư viện bạn đang học.";
      
      if (lowerText.includes("web") || lowerText.includes("next")) {
        fallbackText = "Về **Lập trình Web**: Đừng quên làm chủ vững vàng **React.js** và **Node.js**. Tập trung xây dựng các RESTful API có phân quyền bảo mật JWT và cơ sở dữ liệu PostgreSQL để làm dự án Portfolio nổi bật.";
      } else if (lowerText.includes("ai") || lowerText.includes("toán") || lowerText.includes("học máy")) {
        fallbackText = "Về **AI & Học máy**: Cần ôn tập kỹ các phép toán tích phân, xác suất thống kê và đại số ma trận. Hãy bắt đầu viết code Python cùng thư viện **Scikit-Learn** để giải quyết các bài toán hồi quy phân loại trước khi lao vào Học Sâu (Deep Learning).";
      } else if (lowerText.includes("nhúng") || lowerText.includes("embedded") || lowerText.includes("esp32")) {
        fallbackText = "Về **Hệ thống Nhúng**: Cần mua một bộ kit phát triển ESP32 hoặc STM32, tự lập trình C bật tắt led, đọc cảm biến qua I2C/SPI và tìm hiểu hệ điều hành thời gian thực **FreeRTOS** để rèn luyện kỹ năng đa nhiệm.";
      } else if (lowerText.includes("flutter") || lowerText.includes("di động")) {
        fallbackText = "Về **Lập trình Di động**: Lựa chọn **Flutter** giúp phát triển nhanh giao diện đẹp cho cả iOS và Android bản địa. Tập trung rèn luyện quản lý State thông minh sử dụng **Riverpod** hoặc **Bloc**.";
      } else if (lowerText.includes("bảo mật") || lowerText.includes("cyber") || lowerText.includes("security")) {
        fallbackText = "Về **Cybersecurity**: Gốc rễ nằm ở quản trị hệ thống Linux nâng cao và mạng máy tính CCNA. Hãy dành thời gian giải các đề bài Capture The Flag (CTF) trên TryHackMe để trau dồi phản xạ rà lỗ hổng.";
      }

      setChatMessages((prev) => [
        ...prev,
        {
          id: `ast-offline-${Date.now()}`,
          role: "assistant",
          content: fallbackText,
          timestamp: new Date(),
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend(inputText);
    }
  };

  // Safe lightweight Vietnamese Markdown renderer convert bold and list formatting
  const renderFormattedText = (text: string) => {
    let html = text;
    // Replace markdown bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900 bg-slate-100 px-1 py-0.5 rounded border border-slate-200">$1</strong>');
    // Replace bullet points starting with * or -
    html = html.replace(/^\s*[\-\*]\s+(.*)$/gm, '<li class="ml-4 list-disc pl-1 py-0.5 text-slate-600">$1</li>');
    // Clean code blocks
    html = html.replace(/```(.*?)```/gs, '<pre class="bg-slate-900 border border-slate-750 p-3 rounded-lg font-mono text-[11px] text-teal-300 overflow-x-auto my-2">$1</pre>');
    // Clean inline code backticks
    html = html.replace(/`(.*?)`/g, '<code class="bg-slate-50 font-mono text-[11px] px-1.5 py-0.5 rounded text-blue-700 border border-slate-200">$1</code>');
    
    return (
      <div 
        className="space-y-1 text-slate-655 text-xs md:text-sm leading-relaxed"
        dangerouslySetInnerHTML={{ __html: html.replace(/\n/g, "<br/>") }}
      />
    );
  };

  return (
    <div className="py-8 px-4 md:px-8 max-w-4xl mx-auto flex flex-col h-[calc(100vh-10rem)]">
      {/* Visual Header */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex-1 flex flex-col overflow-hidden">
        
        <div className="bg-slate-50/80 border-b border-slate-200 p-4 shrink-0 flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="p-2.5 bg-gradient-to-tr from-blue-600 to-indigo-650 rounded-xl border border-blue-500/20 text-white">
              <GraduationCap className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <span className="font-sans font-bold text-sm text-slate-900 block">EduMentor AI</span>
              <span className="font-mono text-[9px] text-emerald-700 tracking-wider flex items-center space-x-1 uppercase font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping mr-1" />
                <span>Trực tuyến cố vấn 24/7</span>
              </span>
            </div>
          </div>
          {activeRecommendation && (
            <span className="text-[9px] font-mono tracking-wider bg-blue-50 border border-blue-150 text-blue-705 rounded px-2.5 py-1 uppercase max-w-[150px] truncate font-bold hidden sm:inline">
              Học Sinh: {activeRecommendation.matchedDomain.toUpperCase()}
            </span>
          )}
        </div>

        {/* Message Feeds Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 shadow-inner bg-slate-50/40">
          {chatMessages.map((msg) => {
            const isUser = msg.role === "user";
            return (
              <div
                key={msg.id}
                className={`flex ${isUser ? "justify-end" : "justify-start"} items-start space-x-3 max-w-[90%] md:max-w-[85%] ${
                  isUser ? "ml-auto" : "mr-auto"
                }`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-650 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <GraduationCap className="h-4 w-4 text-white" />
                  </div>
                )}
                
                <div className={`p-4 rounded-2xl border text-xs md:text-sm font-sans space-y-1 ${
                  isUser
                    ? "bg-blue-600 border-blue-505 text-white rounded-tr-none shadow-xs"
                    : "bg-white border-slate-200 text-slate-700 rounded-tl-none shadow-2xs"
                }`}>
                  {isUser ? (
                    <p className="leading-relaxed whitespace-pre-wrap font-medium">{msg.content}</p>
                  ) : (
                    renderFormattedText(msg.content)
                  )}
                  <span className={`text-[9px] font-mono block text-right pt-1 select-none ${
                    isUser ? "text-blue-200" : "text-slate-405 font-medium"
                  }`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing IndicatorLoader */}
          {isLoading && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-650 text-white flex items-center justify-center shrink-0 shadow-xs">
                <GraduationCap className="h-4 w-4 text-white" />
              </div>
              <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none flex items-center space-x-2 shadow-2xs">
                <div className="flex space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-550 animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-550 animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-550 animate-bounce" />
                </div>
                <span className="font-sans text-[11px] text-slate-500 font-bold">EduMentor AI đang soạn câu trả lời...</span>
              </div>
            </div>
          )}

          {submitError && (
            <div className="p-2.5 bg-amber-50 border border-amber-200 text-amber-800 text-[10px] rounded-lg flex items-center space-x-1.5 max-w-fit mx-auto select-none font-medium">
              <AlertCircle className="h-3.5 w-3.5 shrink-0 text-amber-750" />
              <span>{submitError}</span>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Quick suggester chips block */}
        <div className="px-4 py-3 border-t border-slate-200 bg-slate-50/50 shrink-0">
          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-2 font-bold select-none">
            Gợi ý chủ đề thường hỏi:
          </span>
          <div className="flex flex-wrap gap-1.5" id="chat-prompts-suggesters">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                id={`chat-prompt-chip-${idx}`}
                onClick={() => handleSend(p)}
                disabled={isLoading}
                className="px-2.5 py-1 text-[10px] md:text-xs font-sans text-slate-655 bg-white hover:bg-slate-100 hover:text-slate-900 border border-slate-200 hover:border-slate-350 rounded-md transition-all text-left truncate max-w-[280px] cursor-pointer inline-flex items-center space-x-1 shadow-2xs font-semibold"
              >
                <Sparkles className="h-2.5 w-2.5 text-blue-500 shrink-0" />
                <span>{p}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Form Interactive Input Control */}
        <div className="p-4 bg-white border-t border-slate-200 shrink-0 flex items-center space-x-3">
          <input
            id="chat-user-input"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isLoading}
            placeholder="Đặt câu hỏi về học tập, lập trình, xin việc cho EduMentor..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs md:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 font-sans shadow-inner font-medium"
          />
          <button
            id="chat-send-btn"
            onClick={() => handleSend(inputText)}
            disabled={!inputText.trim() || isLoading}
            className={`p-3 rounded-xl transition-all shadow-md flex items-center justify-center shrink-0 cursor-pointer ${
              !inputText.trim() || isLoading
                ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                : "bg-blue-600 hover:bg-blue-700 text-white border border-blue-550/30 hover:scale-[1.01] active:scale-95"
            }`}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
