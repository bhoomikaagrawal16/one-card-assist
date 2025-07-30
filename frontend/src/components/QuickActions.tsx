
import { Button } from "@/components/ui/button";

interface QuickAction {
  label: string;
  action: string;
}

interface QuickActionsProps {
  actions: QuickAction[];
  onActionClick: (action: string) => void;
}

const QuickActions = ({ actions, onActionClick }: QuickActionsProps) => {
  return (
    <div className="px-6 py-4 bg-gradient-to-r from-slate-50 to-blue-50 border-t border-slate-200">
      <p className="text-xs font-semibold text-slate-600 mb-3 uppercase tracking-wide">Quick Actions</p>
      <div className="flex flex-wrap gap-2">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onActionClick(action.action)}
            className="bg-white/80 backdrop-blur-sm border-slate-300 text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200 hover:scale-105 text-xs px-4 py-2 rounded-full font-medium shadow-sm hover:shadow-md"
          >
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
