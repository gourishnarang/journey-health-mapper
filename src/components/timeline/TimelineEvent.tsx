
import React from 'react';
import { Event } from './TimelineCanvas';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from '@/lib/utils';
import { Trash2 } from 'lucide-react';

interface TimelineEventProps {
  event: Event;
  onDelete: () => void;
}

const TimelineEvent: React.FC<TimelineEventProps> = ({ event, onDelete }) => {
  const cardClass = `timeline-card timeline-card-${event.side}`;
  
  const getTypeColor = () => {
    switch (event.type) {
      case 'income':
        return 'bg-green-100 text-green-800';
      case 'expense':
        return 'bg-red-100 text-red-800';
      case 'goal':
        return 'bg-fin-purple-light text-fin-purple-dark';
      case 'milestone':
        return 'bg-fin-orange/20 text-fin-orange';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className={cardClass} style={{ top: `${event.age * 40}px` }}>
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <CardTitle className="text-lg font-semibold">{event.title}</CardTitle>
              <span className="text-sm text-gray-500">Age {event.age}</span>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getTypeColor()}`}>
              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
            </span>
          </div>
        </CardHeader>
        <CardContent className="py-2">
          <p className="text-sm text-gray-600">{event.description}</p>
          {event.amount > 0 && (
            <p className="text-sm font-medium mt-2">
              {formatCurrency(event.amount)}
            </p>
          )}
        </CardContent>
        <CardFooter className="pt-0 flex justify-end">
          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TimelineEvent;
