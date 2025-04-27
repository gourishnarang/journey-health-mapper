
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import TimelineCanvas from "@/components/timeline/TimelineCanvas";
import HealthScoreCard from "@/components/health-score/HealthScoreCard";
import { Button } from "@/components/ui/button";
import { PlusCircle, Copy } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";

export default function Dashboard() {
  const handleCreateNewProject = () => {
    toast.success('New project created!');
  };
  
  const handleCloneProject = () => {
    toast.success('Project cloned! Now you can simulate "What If" scenarios.');
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
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <TimelineCanvas />
              
              <Card className="mt-8">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm text-gray-500">Total Events</p>
                      <p className="text-2xl font-semibold">4</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Timeline Span</p>
                      <p className="text-2xl font-semibold">21-30 yrs</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Net Worth Projection</p>
                      <p className="text-2xl font-semibold text-green-600">+$425k</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-1">
              <HealthScoreCard events={[1, 2, 3, 4]} />
              
              <Card className="mt-8">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Improvement Tips</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-fin-purple-light flex items-center justify-center mr-2 flex-shrink-0">
                        <span className="text-fin-purple text-xs font-bold">1</span>
                      </div>
                      <p className="text-sm text-gray-600">Add a monthly savings goal to boost your emergency fund</p>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-fin-purple-light flex items-center justify-center mr-2 flex-shrink-0">
                        <span className="text-fin-purple text-xs font-bold">2</span>
                      </div>
                      <p className="text-sm text-gray-600">Consider adding retirement planning milestones</p>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-fin-purple-light flex items-center justify-center mr-2 flex-shrink-0">
                        <span className="text-fin-purple text-xs font-bold">3</span>
                      </div>
                      <p className="text-sm text-gray-600">Add more detail about your expected income growth</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
