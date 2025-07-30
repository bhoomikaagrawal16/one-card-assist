// src/pages/Index.tsx

import { useEffect, useState, useRef } from "react"; // <--- ADDED: useRef here
import ChatHeader from "@/components/ChatHeader";
import PaymentSection from "@/components/PaymentSection";
import ChatMessage from "@/components/ChatMessage";
import QuickActions from "@/components/QuickActions";
import ChatInput from "@/components/ChatInput";
import { useToast } from "@/hooks/use-toast";

interface UserData {
  realid: string;
  name: string;
  dueAmount: string;
  dueDate: string;
  minimumDue: string;
  emiAvailable: boolean;
  highlight_button?: boolean; // ← ✅ ADD THIS
}


interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Index = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();
  const [showPulse, setShowPulse] = useState(false); // ✅ Add this here


  // NEW: Create a ref for the messages container
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const realid = new URLSearchParams(window.location.search).get("realid");
  const sessionKeyKey = `n8nChatSessionKey_${realid}`;
  const sessionKey =
    localStorage.getItem(sessionKeyKey) ||
    (() => {
      const k = crypto.randomUUID();
      localStorage.setItem(sessionKeyKey, k);
      return k;
    })();


  const detailsURL = `[card_details_webhook]?realid=${encodeURIComponent(
    realid || ""
  )}`;
  const chatURL = `[chat_webhook]?action=sendMessage`;

  const addMessage = (text: string, isUser = false) => {
    const newMessage: Message = {
      id: crypto.randomUUID(),
      text,
      isUser,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const init = async () => {
    if (!realid) {
      toast({
        title: "Error",
        description: "Invalid realid provided",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(detailsURL);
      const data = await res.json();

      const rec = Array.isArray(data)
        ? data.find((r) => String(r.realid) === realid) || data[0]
        : data;

      if (!rec?.realid) {
        toast({
          title: "User Not Found",
          description:
            "हमें आपकी जानकारी नहीं मिल पाई, कृपया बाद में पुनः प्रयास करें।",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      setUserData(rec);
      addMessage(
        `Namaste ${rec.name}! आपका स्वागत है OneCard में। Would you like to continue in English or हिंदी?`
      );
    } catch (err) {
      console.error("Error loading user data:", err);
      toast({
          title: "Connection Error",
          description: "हमें आपकी जानकारी लोड करने में समस्या आ रही है।",
          variant: "destructive",
        });
    } finally {
      setIsLoading(false);
    }
  };

  const sendToBot = async (text: string) => {
    addMessage(text, true);
    setIsTyping(true);

    try {
      const res = await fetch(chatURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: sessionKey,
          chatInput: text,
          realid,
        }),
      });
      const js = await res.json();

      const answer =
        js.message ||
        js.OneCard ||
        js.response ||
        js.text ||
        "😞 Sorry, unexpected response.";

      // ✅ New: Check highlight flag and update userData state
      if (js.highlight_button && userData) {
        setUserData({ ...userData, highlight_button: true });

        // ✅ trigger temporary pulse
        setShowPulse(true);
        setTimeout(() => {
          setShowPulse(false);
        }, 3000); // pulse for 3 seconds
      }

      setTimeout(() => {
        addMessage(answer);
        setIsTyping(false);
      }, 1000);
    } catch (e) {
      console.error("Error sending message:", e);
      setTimeout(() => {
        addMessage("😞 Something went wrong. Please try again.");
        setIsTyping(false);
      }, 1000);
    }
  };


  const getQuickActions = (lastMessage: Message | undefined) => {
    if (!lastMessage || lastMessage.isUser) return [];

    const text = lastMessage.text.toLowerCase();

    if (text.includes("payment") || text.includes("due") || text.includes("amount")) {
      return [
        { label: "Full Payment", action: "I want to make full payment" },
        { label: "Partial Payment", action: "I want to make partial payment" },
        { label: "Get into a call", action: "I want to speak with customer service" },
      ];
    }

    if (text.includes("help") || text.includes("support")) {
      return [
        { label: "Payment Help", action: "I need help with payment" },
        { label: "Account Info", action: "Show my account information" },
        { label: "Contact Support", action: "I want to speak with customer service" },
      ];
    }

    if (text.includes("language") || text.includes("hindi") || text.includes("english")) {
      return [
        { label: "English", action: "Continue in English" },
        { label: "हिंदी", action: "हिंदी में जारी रखें" },
      ];
    }

    return [
      { label: "Payment Options", action: "Show me payment options" },
      { label: "Account Details", action: "Show my account details" },
      { label: "Need Help", action: "I need help" },
    ];
  };

  useEffect(() => {
    init();
  }, []);

  // NEW: Scroll to the bottom of the messages whenever `messages` state updates
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]); // Dependency array: This effect runs when `messages` array changes.

  const lastMessage = messages[messages.length - 1];
  const quickActions = getQuickActions(lastMessage);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-blue-200"></div>
              <div
                className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"
              ></div>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-slate-800">
              Loading your OneCard account
            </h3>
            <p className="text-slate-600">
              Please wait while we fetch your details...
            </p>
          </div>
        </div>
      </div>
    );
  }
  const handlePayNow = () => {
    if (!userData) return;

    const amountInPaise = Math.round(parseFloat(userData.minimumDue) * 100);

    if (!(window as any).Razorpay) {
      alert("Razorpay not loaded. Please try again.");
      return;
    }

    const options = {
      key: " ", // 🔑 Replace this
      amount: amountInPaise,
      currency: "INR",
      name: "OneCard",
      description: "Credit Card Payment",
      handler: function (response: any) {
        console.log("Payment successful:", response);

        fetch("[payment_workflow_webhook]", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: sessionKey, // ✅ use the local variable
            realid: userData.realid,
            payment_id: response.razorpay_payment_id
          }),
        });
      },
      prefill: {
        name: userData.name || "Customer",
        email: "customer@example.com", // Replace if you have user email
        contact: "9123456789",         // Replace if you have user phone
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
  };


  return (
    <div className="h-screen bg-gray-100 flex flex-col items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-md mx-auto flex flex-col flex-grow rounded-3xl shadow-xl bg-white min-h-0 overflow-hidden">
          <ChatHeader
            userName={userData?.name || "OneCard User"}
            userData={userData}
          />

          {userData && (
            <PaymentSection
              userData={userData}
              onPayNow={handlePayNow} // ✅ this now runs Razorpay
              highlightButton={showPulse}
            />
          )}

          {/* Attach the ref to the scrollable message area */}
          <div ref={messagesEndRef} className="flex-1 overflow-y-auto px-6 py-4 space-y-4"> {/* <--- MODIFIED: ref={messagesEndRef} added here */}
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isTyping && (
              <div className="flex items-center space-x-3 px-4 py-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <span className="text-sm text-slate-500 font-medium">
                  OneCard Assistant is typing...
                </span>
              </div>
            )}
          </div>

          {quickActions.length > 0 && !isTyping && (
            <QuickActions actions={quickActions} onActionClick={sendToBot} />
          )}

          <ChatInput onSendMessage={sendToBot} disabled={isTyping} />
      </div>
    </div>
  );
};

export default Index;