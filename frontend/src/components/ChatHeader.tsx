
import React from "react";

interface ChatHeaderProps {
  userName: string;
  userData?: {
    dueAmount: string;
    dueDate: string;
    minimumDue: string;
    emiAvailable: boolean;
  };
}

const ChatHeader = ({ userName, userData }: ChatHeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-t-3xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <img 
              src="/lovable-uploads/81a6d83a-5272-41e1-8e7b-fe640f127ea0.png" 
              alt="OneCard Logo" 
              className="w-6 h-6 rounded"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold">{userName}</h2>
            <p className="text-blue-100 text-xs">OneCard Assistant</p>
          </div>
        </div>
        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
      </div>
      
      {userData && (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-blue-100 text-xs mb-1">Outstanding Amount</p>
              <p className="text-2xl font-bold">{userData.dueAmount}</p>
            </div>
            <div>
              <p className="text-blue-100 text-xs mb-1">Due Date</p>
              <p className="text-lg font-semibold">{userData.dueDate}</p>
            </div>
            <div>
              <p className="text-blue-100 text-xs mb-1">Minimum Due</p>
              <p className="text-lg font-semibold">{userData.minimumDue}</p>
            </div>
            <div>
              <p className="text-blue-100 text-xs mb-1">EMI Status</p>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${userData.emiAvailable ? 'bg-green-400' : 'bg-red-400'}`}></div>
                <p className="text-sm">{userData.emiAvailable ? 'Available' : 'Not Available'}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatHeader;
