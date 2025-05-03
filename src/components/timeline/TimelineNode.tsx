import React, { useState } from 'react';
import { ArrowUp, ArrowDown, Circle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TimelineNodeProps {
  age: number;
  type: 'income' | 'expense' | 'goal' | 'milestone';
  amount: number;
  heightPercentage: number;
  title?: string;
  description?: string;
}

const TimelineNode: React.FC<TimelineNodeProps> = ({ 
  type, 
  amount, 
  heightPercentage,
  title,
  description 
}) => {
  // Constants for arrow scaling
  const MIN_ARROW_HEIGHT = 40;
  const MAX_ARROW_HEIGHT = 300;
  const MIN_AMOUNT = 100;
  const MAX_AMOUNT = 1000000;

  // Get arrow height scaled by percentage of max amount
  const getArrowHeight = () => {
    // Scale based on amount, with minimum and maximum caps
    const scaledAmount = Math.min(Math.max(amount, MIN_AMOUNT), MAX_AMOUNT);
    const scaleFactor = (scaledAmount - MIN_AMOUNT) / (MAX_AMOUNT - MIN_AMOUNT);
    return Math.max(MIN_ARROW_HEIGHT, MIN_ARROW_HEIGHT + (scaleFactor * (MAX_ARROW_HEIGHT - MIN_ARROW_HEIGHT)));
  };

  const getNodeContent = () => {
    if (type === 'income') {
      return (
        <div className="absolute" style={{ 
          transform: 'translateX(-50%)',
          zIndex: 10,
          height: `${getArrowHeight()}px`,
          width: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: `-${getArrowHeight()}px`,
        }}>
          <ArrowUp 
            className="text-green-500 transition-all duration-300 hover:scale-110" 
            size={24}
            style={{ 
              position: 'absolute',
              top: '0',
              height: `${getArrowHeight()}px`,
              width: '100%'
            }}
          />
          {amount > 0 && (
            <div className="absolute text-xs font-medium text-green-600" style={{ top: '4px' }}>
              ${(amount / 1000).toFixed(0)}k
            </div>
          )}
        </div>
      );
    }

    if (type === 'expense') {
      return (
        <div className="absolute" style={{ 
          transform: 'translateX(-50%)',
          zIndex: 10,
          height: `${getArrowHeight()}px`,
          width: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <ArrowDown 
            className="text-red-500 transition-all duration-300 hover:scale-110" 
            size={24}
            style={{ 
              position: 'absolute',
              top: '0',
              height: `${getArrowHeight()}px`,
              width: '100%'
            }}
          />
          {amount > 0 && (
            <div className="absolute text-xs font-medium text-red-600" style={{ bottom: '4px' }}>
              ${(amount / 1000).toFixed(0)}k
            </div>
          )}
        </div>
      );
    }

    // For goals and milestones
    return (
      <div 
        className="w-3 h-3 bg-fin-purple rounded-full absolute transition-all duration-300 hover:scale-125"
        style={{ 
          transform: 'translate(-50%, -50%)',
          zIndex: 10
        }}
      />
    );
  };

  const tooltipContent = (
    <div className="p-2 max-w-[200px]">
      {title && <div className="font-semibold mb-1">{title}</div>}
      {description && <div className="text-sm text-gray-600">{description}</div>}
      {amount > 0 && (
        <div className="text-sm font-medium mt-1">
          Amount: ${amount.toLocaleString()}
        </div>
      )}
    </div>
  );

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {getNodeContent()}
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-white shadow-lg">
          {tooltipContent}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TimelineNode;
