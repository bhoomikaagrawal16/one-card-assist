
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSendMessage, disabled = false }: ChatInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim() && !disabled) {
      onSendMessage(inputValue.trim());
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-6 bg-white border-t border-slate-200">
      <div className="flex space-x-3 items-end">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          disabled={disabled}
          className="flex-1 rounded-2xl border-slate-300 bg-slate-50 focus:bg-white focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-200 px-4 py-3 text-sm"
        />
        <Button
          onClick={handleSend}
          disabled={disabled || !inputValue.trim()}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-2xl px-6 py-3 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl border-0 disabled:opacity-50 disabled:hover:scale-100"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
