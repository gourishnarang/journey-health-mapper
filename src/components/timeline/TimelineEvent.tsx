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
  const getCardPosition = () => {
    // Determine position based on event type
    if (event.type === 'income') {
      return 'absolute -translate-x-1/2 -top-4 -translate-y-full';
    } else if (event.type === 'expense') {
      return 'absolute -translate-x-1/2 top-4';
    } else {
      // For milestone/goal use the side property
      return event.side === 'top'
        ? 'absolute -translate-x-1/2 -top-4 -translate-y-full'
        : 'absolute -translate-x-1/2 top-4';
    }
  };
  
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
    <div className={`${getCardPosition()} z-30 w-48 shadow-lg transition-opacity duration-200`}>
      <Card className="border border-gray-200">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <CardTitle className="text-sm font-semibold">{event.title}</CardTitle>
              <span className="text-xs text-gray-500">Age {event.age}</span>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getTypeColor()}`}>
              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
            </span>
          </div>
        </CardHeader>
        <CardContent className="py-2">
          <p className="text-xs text-gray-600">{event.description}</p>
          {event.amount > 0 && (
            <p className="text-xs font-medium mt-2">
              {formatCurrency(event.amount)}
            </p>
          )}
        </CardContent>
        <CardFooter className="pt-0 flex justify-end">
          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50 h-7 px-2" onClick={onDelete}>
            <Trash2 className="h-3 w-3" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TimelineEvent;
