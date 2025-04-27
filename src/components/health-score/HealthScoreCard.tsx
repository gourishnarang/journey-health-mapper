
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Share2 } from "lucide-react";
import { toast } from "sonner";

interface HealthScoreProps {
  events?: any[];
}

export default function HealthScoreCard({ events = [] }: HealthScoreProps) {
  const [score, setScore] = useState(0);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    // For demo purposes, we'll calculate a score based on the number of events
    // In a real app, this would use more sophisticated calculations
    calculateScore(events);
  }, [events]);
  
  const calculateScore = (events: any[]) => {
    // Demo calculation - this would be more complex in a real application
    const baseScore = 50;
    const eventBonus = events.length * 8;
    const finalScore = Math.min(baseScore + eventBonus, 100);
    
    setScore(finalScore);
    
    // Set a title based on the score range
    if (finalScore < 40) {
      setTitle('Financial Beginner');
      setMessage('You\'re taking the first steps in your financial journey!');
    } else if (finalScore < 60) {
      setTitle('Money Explorer');
      setMessage('You\'re on the right track towards financial stability.');
    } else if (finalScore < 80) {
      setTitle('Wealth Voyager');
      setMessage('Great planning! You\'re well on your way to financial freedom.');
    } else {
      setTitle('Fiscal Master');
      setMessage('Exceptional financial planning! You\'re a true financial strategist.');
    }
  };
  
  const handleShare = () => {
    // In a real app, this would generate a social media-friendly card
    toast.success('Your financial health badge is ready to share!');
  };
  
  // Calculate color based on score
  const getScoreColor = () => {
    if (score < 40) return 'from-red-500 to-orange-500';
    if (score < 60) return 'from-orange-500 to-yellow-500';
    if (score < 80) return 'from-yellow-500 to-green-500';
    return 'from-green-500 to-emerald-500';
  };
  
  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-0 bg-white overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-center">Financial Health Score</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-40 h-40 mb-4">
            <div className="absolute inset-0 rounded-full bg-gray-100"></div>
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              <circle 
                className="text-gray-200" 
                strokeWidth="8" 
                stroke="currentColor" 
                fill="transparent" 
                r="42" 
                cx="50" 
                cy="50" 
              />
              <circle 
                className={`text-transparent stroke-current bg-gradient-to-r ${getScoreColor()}`}
                strokeWidth="8" 
                strokeDasharray={`${score * 2.64}, 1000`}
                strokeLinecap="round" 
                stroke="currentColor" 
                fill="transparent" 
                r="42" 
                cx="50" 
                cy="50" 
                style={{
                  filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
                  transition: 'stroke-dasharray 1s ease-in-out',
                }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fin-purple to-fin-purple-dark">
                {score}
              </span>
              <span className="text-gray-500 text-sm">out of 100</span>
            </div>
          </div>
          
          <div className="badge-glow px-4 py-2 bg-fin-purple-light rounded-full text-fin-purple-dark font-semibold text-lg">
            {title}
          </div>
          
          <p className="mt-4 text-center text-gray-600">{message}</p>
          
          <div className="w-full mt-8">
            <div className="flex justify-between text-sm mb-1">
              <span>Improvement Areas</span>
              <span>Progress</span>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Saving Rate</span>
                  <span>65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Emergency Fund</span>
                  <span>40%</span>
                </div>
                <Progress value={40} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Goal Planning</span>
                  <span>80%</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
            </div>
          </div>
          
          <Button 
            onClick={handleShare} 
            className="mt-8 bg-fin-purple hover:bg-fin-purple-dark w-full flex items-center justify-center"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share Your Score
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
