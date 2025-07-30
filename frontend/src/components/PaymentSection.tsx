import { Button } from "@/components/ui/button";

interface UserData {
  dueAmount: string;
  dueDate: string;
  minimumDue: string;
  emiAvailable: boolean;
  name?: string;
}

interface PaymentSectionProps {
  userData: UserData;
  onPayNow: () => void;
  highlightButton?: boolean;
}

const PaymentSection = ({ userData, onPayNow, highlightButton }: PaymentSectionProps) => {
  return (
    <div className="px-6 py-4 bg-white border-b border-gray-100">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600 mb-1">Quick Payment</p>
          <p className="text-lg font-semibold text-gray-800">
            Pay ₹{userData.dueAmount}
          </p>
        </div>
        <Button
          onClick={onPayNow}
          className={`px-6 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 
            bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white 
            ${highlightButton ? "animate-custompulse" : ""}
          `}
        >
          Pay Now
        </Button>
      </div>
    </div>
  );
};

export default PaymentSection;
