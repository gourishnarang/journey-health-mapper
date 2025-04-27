
import React from 'react';

interface TimelineNodeProps {
  age: number;
}

const TimelineNode: React.FC<TimelineNodeProps> = ({ age }) => {
  return (
    <div className="timeline-node" style={{ top: `${age * 40}px` }}></div>
  );
};

export default TimelineNode;
