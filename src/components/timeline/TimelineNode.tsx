import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface TimelineNodeProps {
  age: number;
  type: 'income' | 'expense' | 'goal' | 'milestone';
  amount: number;
  heightPercentage: number;
}

const TimelineNode: React.FC<TimelineNodeProps> = ({ type, amount, heightPercentage }) => {
  // Get arrow height scaled by percentage of max amount
  // Minimum height of 24px, scales up based on percentage
  const getArrowHeight = () => {
    return Math.max(24, (heightPercentage * 200) / 100); // Max height of 200px
  };

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
        marginTop: `-${getArrowHeight()}px`, // Move up from the x-axis
      }}>
        <ArrowUp 
          className="text-green-500" 
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
          className="text-red-500" 
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

  // For other types (goal, milestone), keep the original dot
  return (
    <div 
      className="w-3 h-3 bg-fin-purple rounded-full absolute"
      style={{ 
        transform: 'translate(-50%, -50%)',
        zIndex: 10
      }}
    />
  );
};

export default TimelineNode;
