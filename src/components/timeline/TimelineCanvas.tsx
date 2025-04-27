import { useState, useEffect, useMemo } from 'react';
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
  side: 'top' | 'bottom';  // Determines whether the card appears above or below the node
}

export default function TimelineCanvas() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAge] = useState(25);
  const [ages] = useState(Array.from({ length: 56 }, (_, i) => i + 15)); // 15 to 70
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);
  
  // Amount scale calculation
  const maxAmount = useMemo(() => {
    return Math.max(100000, ...events.map(e => e.amount));
  }, [events]);
  
  // Generate amount labels for Y-axis
  const amountLabels = useMemo(() => {
    const labels = [];
    const step = maxAmount / 5;
    for (let i = 0; i <= 5; i++) {
      labels.push({
        amount: i * step,
        position: 100 - (i * 20) // 0% to 100% from bottom to top
      });
    }
    return labels;
  }, [maxAmount]);
  
  // Calculate the height percentage for an amount
  const getHeightPercentage = (amount: number) => {
    return (amount / maxAmount) * 100;
  };
  
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
    // For non-milestone events, set side based on type (income=top, expense=bottom)
    const side = newEvent.type === 'income' ? 'top' : 
                 newEvent.type === 'expense' ? 'bottom' :
                 Math.random() > 0.5 ? 'top' : 'bottom';
    
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
      
      {/* Timeline canvas with fixed height and x-axis scrolling only */}
      <div className="relative w-full h-[450px] overflow-x-auto overflow-y-hidden">
        <div className="flex h-full">
          {/* Y-axis (Amount) */}
          <div className="flex flex-col justify-between h-full py-4 pr-2 border-r border-gray-200 bg-white sticky left-0 z-20">
            {amountLabels.map((label, index) => (
              <div key={index} className="flex items-center">
                <span className="text-xs text-gray-500 w-16 text-right pr-2">
                  ${(label.amount / 1000).toFixed(0)}k
                </span>
                <div className="w-2 h-px bg-gray-200"></div>
              </div>
            ))}
          </div>
          
          {/* Timeline content */}
          <div className="relative flex-1 h-full ml-2">
            {/* Horizontal line (X-axis) */}
            <div className="absolute left-0 right-0 h-px bg-gray-300 z-10" style={{ top: '50%' }}></div>
            
            {/* Horizontal grid lines */}
            {amountLabels.map((label, index) => (
              <div 
                key={index}
                className="absolute left-0 right-0 h-px bg-gray-100 z-0"
                style={{ top: `${label.position}%` }}
              ></div>
            ))}
            
            {/* Age markers */}
            <div className="relative w-[2200px] h-full"> {/* 40px per year = 55 years * 40px */}
              {ages.map(age => (
                <div 
                  key={age} 
                  className={`absolute text-xs text-gray-500 ${age % 5 === 0 ? 'font-medium' : 'hidden'}`} 
                  style={{ left: `${(age - 15) * 40}px`, top: '50%', marginTop: '12px' }}
                >
                  {age % 5 === 0 && (
                    <>
                      <div className="absolute top-[-16px] w-px h-4 bg-gray-200"></div>
                      {age}
                    </>
                  )}
                </div>
              ))}
              
              {/* Timeline nodes and events */}
              {events.map(event => (
                <div 
                  key={event.id} 
                  style={{ 
                    position: 'absolute', 
                    left: `${(event.age - 15) * 40}px`,
                    top: '50%' // All events start from the x-axis
                  }}
                  onMouseEnter={() => setHoveredEvent(event.id)}
                  onMouseLeave={() => setHoveredEvent(null)}
                >
                  <TimelineNode 
                    age={event.age} 
                    type={event.type}
                    amount={event.amount}
                    heightPercentage={getHeightPercentage(event.amount)}
                  />
                  {(hoveredEvent === event.id || window.innerWidth > 768) && (
                    <TimelineEvent event={event} onDelete={() => deleteEvent(event.id)} />
                  )}
                </div>
              ))}
            </div>
          </div>
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
