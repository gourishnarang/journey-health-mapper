
import React from 'react';

interface TimelineNodeProps {
  age: number;
}

const TimelineNode: React.FC<TimelineNodeProps> = ({ age }) => {
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
