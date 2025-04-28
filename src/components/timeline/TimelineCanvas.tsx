import { useState, useEffect, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle, ZoomIn, ZoomOut, Maximize2, Minimize2 } from "lucide-react";
import TimelineNode from './TimelineNode';
import TimelineEvent from './TimelineEvent';
import AddEventModal from './AddEventModal';
import { Slider } from "@/components/ui/slider";

export interface Event {
  id: string;
  type: 'income' | 'expense' | 'goal' | 'milestone';
  title: string;
  description: string;
  amount: number;
  age: number;
  side: 'top' | 'bottom';
  isRecurring?: boolean;
  frequency?: 'monthly' | 'yearly';
  endAge?: number;
}

export default function TimelineCanvas() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAge] = useState(25);
  const [ages] = useState(Array.from({ length: 56 }, (_, i) => i + 15)); // 15 to 70
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1); // 1 = yearly view, 12 = monthly view
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  // Add zoom range state
  const [zoomStart, setZoomStart] = useState(15); // Start at age 15
  const [zoomEnd, setZoomEnd] = useState(70); // End at age 70
  
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
        position: 100 - (i * 20)
      });
    }
    return labels;
  }, [maxAmount]);
  
  // Calculate the height percentage for an amount
  const getHeightPercentage = (amount: number) => {
    return (amount / maxAmount) * 100;
  };

  // Calculate pixel width per unit based on zoom level
  const getPixelWidth = () => {
    const baseWidth = 40; // Base width for yearly view
    return baseWidth * zoomLevel;
  };

  // Generate recurring events
  const generateRecurringEvents = (event: Omit<Event, 'id' | 'side'>) => {
    if (!event.isRecurring || !event.frequency || !event.endAge) {
      return [event];
    }

    const events: Omit<Event, 'id' | 'side'>[] = [];
    const startAge = event.age;
    const endAge = event.endAge;
    const frequency = event.frequency === 'monthly' ? 1/12 : 1;

    for (let age = startAge; age <= endAge; age += frequency) {
      events.push({
        ...event,
        age: Number(age.toFixed(2))
      });
    }

    return events;
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
    const generatedEvents = generateRecurringEvents(newEvent);
    
    const eventsWithIds = generatedEvents.map(event => {
      const id = Math.random().toString(36).substr(2, 9);
      const side: 'top' | 'bottom' = event.type === 'income' ? 'top' : 
                                    event.type === 'expense' ? 'bottom' :
                                    Math.random() > 0.5 ? 'top' : 'bottom';
      return { ...event, id, side };
    });
    
    setEvents([...events, ...eventsWithIds]);
    setIsModalOpen(false);
  };
  
  const deleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const handleZoomIn = () => {
    // Smooth zoom in by using a smaller factor
    setZoomLevel(prev => Math.min(prev * 1.5, 12));
    
    // Adjust zoom range when zooming in
    const center = (zoomStart + zoomEnd) / 2;
    const range = (zoomEnd - zoomStart) / 1.5;
    setZoomStart(Math.max(15, center - range / 2));
    setZoomEnd(Math.min(70, center + range / 2));
  };

  const handleZoomOut = () => {
    // Smooth zoom out by using a smaller factor
    setZoomLevel(prev => Math.max(prev / 1.5, 1));
    
    // Adjust zoom range when zooming out
    const center = (zoomStart + zoomEnd) / 2;
    const range = (zoomEnd - zoomStart) * 1.5;
    setZoomStart(Math.max(15, center - range / 2));
    setZoomEnd(Math.min(70, center + range / 2));
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };
  
  // Add function to generate age labels
  const generateAgeLabels = (startAge: number, endAge: number) => {
    const labels = [];
    for (let age = startAge; age <= endAge; age++) {
      labels.push({
        age,
        label: age.toString(),
        isYear: true
      });
    }
    return labels;
  };
  
  // Add this function to generate month labels
  const generateMonthLabels = (startAge: number, endAge: number) => {
    const labels = [];
    const startYear = Math.floor(startAge);
    const endYear = Math.ceil(endAge);
    
    for (let year = startYear; year <= endYear; year++) {
      for (let month = 0; month < 12; month++) {
        const age = year + (month / 12);
        if (age >= startAge && age <= endAge) {
          // Only show month labels when zoomed in enough
          const shouldShowMonth = zoomLevel >= 6;
          
          labels.push({
            age,
            label: shouldShowMonth 
              ? new Date(2000, month, 1).toLocaleString('default', { month: 'short' })
              : month === 0 ? year.toString() : '',
            isYear: month === 0
          });
        }
      }
    }
    
    return labels;
  };

  // Modify the renderTimeline function
  const renderTimeline = () => {
    const startAge = Math.floor(zoomStart);
    const endAge = Math.ceil(zoomEnd);
    const ageRange = endAge - startAge;
    
    // Determine if we should show months (when zoomed in to 2 years or less)
    const showMonths = ageRange <= 2;
    
    // Generate appropriate labels based on zoom level
    const labels = showMonths 
      ? generateMonthLabels(zoomStart, zoomEnd)
      : generateAgeLabels(startAge, endAge);
    
    return (
      <div className="relative w-full h-full">
        {/* Age markers */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gray-50 border-r border-gray-200">
          {Array.isArray(labels) && labels.map(({ age, label, isYear }) => (
            <div
              key={age}
              className="absolute text-xs text-gray-500"
              style={{
                top: `${((age - zoomStart) / (zoomEnd - zoomStart)) * 100}%`,
                transform: 'translateY(-50%)',
                fontWeight: isYear ? 'bold' : 'normal',
                opacity: label ? 1 : 0.3
              }}
            >
              {label || '•'}
            </div>
          ))}
        </div>
        
        {/* Timeline content */}
        <div className="absolute left-16 right-0 top-0 bottom-0">
          {/* Grid lines */}
          {Array.isArray(labels) && labels.map(({ age, isYear }) => (
            <div
              key={age}
              className={`absolute left-0 right-0 border-t ${isYear ? 'border-gray-300' : 'border-gray-100'}`}
              style={{
                top: `${((age - zoomStart) / (zoomEnd - zoomStart)) * 100}%`,
              }}
            />
          ))}
          
          {/* Events */}
          {events.map((event) => (
            <TimelineEvent
              key={event.id}
              event={event}
              onDelete={() => deleteEvent(event.id)}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`relative bg-white rounded-xl shadow-lg p-6 w-full mx-auto ${isFullScreen ? 'fixed inset-0 z-50' : ''}`}>
      <div className="flex justify-between mb-6">
        <div>
          <span className="text-sm text-gray-500">Current Age:</span>
          <span className="ml-2 font-semibold">{currentAge}</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleZoomOut}
              disabled={zoomLevel <= 1}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Slider
              value={[zoomLevel]}
              min={1}
              max={12}
              step={1}
              onValueChange={([value]) => setZoomLevel(value)}
              className="w-32"
            />
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleZoomIn}
              disabled={zoomLevel >= 12}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={toggleFullScreen}
          >
            {isFullScreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
          
          <Button 
            onClick={() => setIsModalOpen(true)} 
            className="bg-fin-purple hover:bg-fin-purple-dark"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>
      </div>
      
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
            <div className="relative h-full" style={{ width: `${ages.length * getPixelWidth()}px` }}>
              {ages.map(age => (
                <div 
                  key={age} 
                  className={`absolute text-xs text-gray-500 ${age % 5 === 0 ? 'font-medium' : 'hidden'}`} 
                  style={{ 
                    left: `${(age - 15) * getPixelWidth()}px`, 
                    top: '50%', 
                    marginTop: '12px' 
                  }}
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
                    left: `${(event.age - 15) * getPixelWidth()}px`,
                    top: '50%'
                  }}
                  onMouseEnter={() => setHoveredEvent(event.id)}
                  onMouseLeave={() => setHoveredEvent(null)}
                >
                  <TimelineNode 
                    age={event.age} 
                    type={event.type}
                    amount={event.amount}
                    heightPercentage={getHeightPercentage(event.amount)}
                    title={event.title}
                    description={event.description}
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
