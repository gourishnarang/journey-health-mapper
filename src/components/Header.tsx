
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <header className="w-full py-4 px-6 bg-white shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fin-purple to-fin-purple-dark">
              FinJourney
            </div>
          </Link>
        </div>
        
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-600 hover:text-fin-purple transition-colors">
            Home
          </Link>
          <Link to="/features" className="text-gray-600 hover:text-fin-purple transition-colors">
            Features
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-fin-purple transition-colors">
            About
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <Button variant="ghost" className="hover:bg-fin-purple-light hover:text-fin-purple">
              Dashboard
            </Button>
          ) : (
            <>
              <Button variant="ghost" className="hover:bg-fin-purple-light hover:text-fin-purple" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button className="bg-fin-purple hover:bg-fin-purple-dark text-white" asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
