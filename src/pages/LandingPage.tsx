import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { toast } from "sonner";

export default function LandingPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thanks for joining the waitlist! We'll be in touch soon.");
      setEmail("");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-fin-purple-light to-white py-20 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-10 animate-fade-in" style={{animationDelay: "0.2s"}}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-fin-dark mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-fin-purple-dark to-fin-purple">
                    Visualize
                  </span>{" "}
                  your financial future
                </h1>
                <p className="text-lg md:text-xl text-gray-700 mb-8">
                  FinJourney helps you map out your life's financial milestones in a fun, visual way. Build your timeline, set goals, and see your financial health score in real-time.
                </p>
              </div>
              <div className="md:w-1/2 mt-12 md:mt-0 animate-fade-in" style={{animationDelay: "0.4s"}}>
                <div className="relative">
                  <div className="bg-white rounded-2xl shadow-xl p-6 transform rotate-2 z-20 max-w-lg mx-auto">
                    <div className="bg-gradient-to-r from-fin-purple-light to-white rounded-lg p-4 mb-4">
                      <div className="h-16 bg-fin-purple/10 rounded-lg mb-2 flex items-center justify-center">
                        <span className="text-fin-purple-dark font-medium">TIMELINE VIEW</span>
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 bg-fin-purple/20 rounded-full w-3/4"></div>
                        <div className="h-4 bg-fin-purple/30 rounded-full w-1/2"></div>
                        <div className="h-4 bg-fin-purple/10 rounded-full w-5/6"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="rounded-full bg-fin-orange/20 px-4 py-2 text-sm font-medium text-fin-orange">Financial Health: 84</div>
                      <div className="text-fin-purple-dark font-medium">Wealth Voyager</div>
                    </div>
                  </div>
                  <div className="absolute top-4 -left-4 bg-fin-pink-light rounded-2xl shadow-lg p-4 transform -rotate-6 z-10 w-28 h-28 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-lg font-bold text-fin-purple-dark">+23%</div>
                      <div className="text-xs text-gray-600">Net Worth</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Waitlist Section - Centered and Bigger */}
            <div className="mt-16 flex flex-col items-center">
              <div id="waitlist-section" className="w-full max-w-2xl transition-all duration-300">
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="email"
                    placeholder="happyuser@finjourney.com"
                    className="rounded-full px-8 py-7 bg-white text-gray-800 flex-grow border-2 border-fin-purple/20 focus:border-fin-purple text-xl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button 
                    type="submit" 
                    className="bg-fin-purple hover:bg-fin-purple-dark text-white font-medium px-10 py-7 text-xl rounded-full whitespace-nowrap"
                  >
                    Join Waitlist
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Your Financial Journey, <span className="text-fin-purple">Visualized</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Take control of your financial future with our intuitive tools that make planning fun and insightful.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="bg-white rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="w-14 h-14 rounded-full bg-fin-purple-light flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-fin-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Timeline Builder</h3>
                <p className="text-gray-600">
                  Craft your financial life story on our intuitive canvas. Plot your journey from age 0 to 90 with key milestones.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="w-14 h-14 rounded-full bg-fin-orange/20 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-fin-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Goal Setting</h3>
                <p className="text-gray-600">
                  Set financial goals and dreams with our easy-to-use interface. We'll help you track and achieve them.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="w-14 h-14 rounded-full bg-fin-blue/20 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-fin-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Health Scoring</h3>
                <p className="text-gray-600">
                  Get real-time feedback on your financial health with our scoring system. Know exactly where you stand.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
