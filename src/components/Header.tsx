import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="w-full py-4 px-6 bg-white shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fin-purple to-fin-purple-dark">
            FinJourney
          </div>
        </Link>
        
        <Button 
          className="bg-fin-purple hover:bg-fin-purple-dark text-white px-8 py-6 text-lg rounded-full"
          onClick={() => {
            const waitlistSection = document.getElementById('waitlist-section');
            if (waitlistSection) {
              waitlistSection.classList.add('animate-shake');
              setTimeout(() => {
                waitlistSection.classList.remove('animate-shake');
              }, 500);
            }
          }}
        >
          Join Waitlist
        </Button>
      </div>
    </header>
  );
}
