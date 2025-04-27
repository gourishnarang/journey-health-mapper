
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import TimelineNode from './TimelineNode';
import TimelineEvent from './TimelineEvent';
import AddEventModal from './AddEventModal';

export interface Event {
  id: string;
  type: 'income' | 'expense' | 'goal' | 'milestone';
  title: string;
  description: string;
  amount: number;
  age: number;
  side: 'top' | 'bottom';  // Changed from left/right to top/bottom
}

export default function TimelineCanvas() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAge] = useState(25);
  const [ages] = useState(Array.from({ length: 56 }, (_, i) => i + 15)); // 15 to 70
  
  // Sample data for demonstration
  useEffect(() => {
    const sampleEvents = [
      {
        id: '1',
        type: 'income' as const,
        title: 'First Job',
        description: 'Started career at Tech Company',
        amount: 60000,
        age: 22,
        side: 'top' as const
      },
      {
        id: '2',
        type: 'milestone' as const,
        title: 'Graduation',
        description: 'Graduated with Bachelor\'s degree',
        amount: 0,
        age: 21,
        side: 'bottom' as const
      },
      {
        id: '3',
        type: 'goal' as const,
        title: 'Buy a House',
        description: 'Purchase first home',
        amount: 300000,
        age: 30,
        side: 'top' as const
      },
      {
        id: '4',
        type: 'expense' as const,
        title: 'Car Purchase',
        description: 'New vehicle',
        amount: 25000,
        age: 26,
        side: 'bottom' as const
      }
    ];
    
    setEvents(sampleEvents);
  }, []);
  
  const addEvent = (newEvent: Omit<Event, 'id' | 'side'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const side = Math.random() > 0.5 ? 'top' : 'bottom';
    setEvents([...events, { ...newEvent, id, side }]);
    setIsModalOpen(false);
  };
  
  const deleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
  };
  
  return (
    <div className="relative bg-white rounded-xl shadow-lg p-6 w-full mx-auto">
      <div className="flex justify-between mb-6">
        <div>
          <span className="text-sm text-gray-500">Current Age:</span>
          <span className="ml-2 font-semibold">{currentAge}</span>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)} 
          className="bg-fin-purple hover:bg-fin-purple-dark"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>
      
      <div className="relative w-full h-[400px] overflow-x-auto p-4">
        <div className="timeline-line-horizontal"></div>
        
        {/* Age markers */}
        <div className="relative w-[2200px] h-full"> {/* 40px per year = 55 years * 40px */}
          {ages.map(age => (
            <div 
              key={age} 
              className={`absolute text-xs text-gray-500 ${age % 5 === 0 ? 'font-medium' : 'hidden'}`} 
              style={{ left: `${(age - 15) * 40}px`, top: '50%' }}
            >
              <div className="absolute top-[-4px] w-px h-2 bg-gray-200"></div>
              <div className="absolute mt-4">{age}</div>
            </div>
          ))}
          
          {/* Timeline nodes and events */}
          {events.map(event => (
            <div key={event.id} style={{ position: 'absolute', left: `${(event.age - 15) * 40}px` }}>
              <TimelineNode 
                age={event.age} 
                type={event.type}
                amount={event.amount}
              />
              <TimelineEvent event={event} onDelete={() => deleteEvent(event.id)} />
            </div>
          ))}
        </div>
      </div>
      
      <AddEventModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={addEvent} 
      />
    </div>
  );
}
