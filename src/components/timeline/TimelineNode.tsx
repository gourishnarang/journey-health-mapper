import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface TimelineNodeProps {
  age: number;
  type: 'income' | 'expense' | 'goal' | 'milestone';
  amount: number;
}

const TimelineNode: React.FC<TimelineNodeProps> = ({ age, type, amount }) => {
  // Scale the arrow height based on amount (1px = $1000)
  const getArrowHeight = () => {
    const baseHeight = Math.max(24, Math.min(100, amount / 1000));
    return baseHeight;
  };

  if (type === 'income') {
    return (
      <div className="absolute" style={{ 
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 10,
        height: `${getArrowHeight()}px`,
        display: 'flex',
        alignItems: 'flex-end'
      }}>
        <ArrowUp 
          className="text-green-500" 
          size={24}
          style={{ height: `${getArrowHeight()}px` }}
        />
      </div>
    );
  }

  if (type === 'expense') {
    return (
      <div className="absolute" style={{ 
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 10,
        height: `${getArrowHeight()}px`,
        display: 'flex',
        alignItems: 'flex-start'
      }}>
        <ArrowDown 
          className="text-red-500" 
          size={24}
          style={{ height: `${getArrowHeight()}px` }}
        />
      </div>
    );
  }

  // For other types (goal, milestone), keep the original dot
  return (
    <div 
      className="w-3 h-3 bg-fin-purple rounded-full absolute"
      style={{ 
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 10
      }}
    />
  );
};

export default TimelineNode;
