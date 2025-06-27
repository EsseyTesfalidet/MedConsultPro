import { useState } from "react";
import { Menu, X, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Stethoscope className="text-blue-600 h-8 w-8 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">MedConsult Pro</h1>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('symptom-checker')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Symptom Checker
            </button>
            <button
              onClick={() => scrollToSection('health-info')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Health Info
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Contact
            </button>
          </nav>
          
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => scrollToSection('home')}
                className="text-blue-600 font-medium py-2 px-4 text-left hover:bg-gray-50 rounded-lg"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('symptom-checker')}
                className="text-gray-700 py-2 px-4 text-left hover:bg-gray-50 rounded-lg"
              >
                Symptom Checker
              </button>
              <button
                onClick={() => scrollToSection('health-info')}
                className="text-gray-700 py-2 px-4 text-left hover:bg-gray-50 rounded-lg"
              >
                Health Info
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 py-2 px-4 text-left hover:bg-gray-50 rounded-lg"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
