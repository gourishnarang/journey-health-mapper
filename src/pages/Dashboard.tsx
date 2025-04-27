
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import TimelineCanvas from "@/components/timeline/TimelineCanvas";
import HealthScoreCard from "@/components/health-score/HealthScoreCard";
import { Button } from "@/components/ui/button";
import { PlusCircle, Copy } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function Dashboard() {
  const handleCreateNewProject = () => {
    toast.success('New project created!');
  };
  
  const handleCloneProject = () => {
    toast.success('Project cloned! Now you can simulate "What If" scenarios.');
  };
  
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{message: string, isUser: boolean}[]>([]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!chatMessage.trim()) return;
    
    // Add user message to chat history
    setChatHistory([...chatHistory, {message: chatMessage, isUser: true}]);
    
    // Mock AI response
    setTimeout(() => {
      setChatHistory(prev => [
        ...prev, 
        {message: "I've updated your timeline based on your request. Check it out above!", isUser: false}
      ]);
    }, 1000);
    
    setChatMessage('');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-fin-dark">My Financial Journey</h1>
              <p className="text-gray-600 mt-1">Plan, visualize, and achieve your financial goals</p>
            </div>
            
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Button variant="outline" className="border-fin-purple text-fin-purple hover:bg-fin-purple-light" onClick={handleCloneProject}>
                <Copy className="mr-2 h-4 w-4" />
                Clone Project
              </Button>
              <Button className="bg-fin-purple hover:bg-fin-purple-dark" onClick={handleCreateNewProject}>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="timeline" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="timeline">Financial Timeline</TabsTrigger>
              <TabsTrigger value="health-score">Health Score</TabsTrigger>
            </TabsList>
            
            <TabsContent value="timeline" className="w-full">
              <TimelineCanvas />
            </TabsContent>
            
            <TabsContent value="health-score">
              <div className="max-w-md mx-auto">
                <HealthScoreCard events={[1, 2, 3, 4]} />
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Chatbot Section */}
          <div className="mt-8 border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h3 className="font-semibold text-lg">Financial Assistant</h3>
              <p className="text-sm text-gray-600">Tell me what you want to do with your timeline</p>
            </div>
            
            <div className="h-64 overflow-y-auto p-4 flex flex-col gap-3">
              {chatHistory.length > 0 ? (
                chatHistory.map((chat, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-lg max-w-[80%] ${
                      chat.isUser 
                        ? 'bg-fin-purple-light text-fin-purple-dark ml-auto' 
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {chat.message}
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 italic mt-16">
                  Try asking "Add a new income event at age 30 for $75,000" or "What happens if I buy a house at 35?"
                </div>
              )}
            </div>
            
            <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4 flex gap-2">
              <input 
                type="text"
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fin-purple focus:border-transparent"
                placeholder="Type your message..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
              />
              <Button type="submit" className="bg-fin-purple hover:bg-fin-purple-dark">
                Send
              </Button>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
