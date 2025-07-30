
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
      <div className="max-w-[85%]">
        {!message.isUser && (
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold">AI</span>
            </div>
            <span className="text-xs font-medium text-slate-500">OneCard Assistant</span>
          </div>
        )}
        
        <div
          className={`px-4 py-3 rounded-2xl shadow-sm ${
            message.isUser
              ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-br-md ml-8'
              : 'bg-white border border-slate-200 text-slate-800 rounded-bl-md shadow-md'
          }`}
        >
          <div 
            className="text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: message.text }}
          />
        </div>
        
        <div className={`text-xs mt-2 ${message.isUser ? 'text-right text-slate-400' : 'text-slate-400'} ml-2`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
