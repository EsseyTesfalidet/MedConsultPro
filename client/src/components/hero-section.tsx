import { SearchCheck, ShieldCheck, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const scrollToSymptomChecker = () => {
    const element = document.getElementById('symptom-checker');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="medical-gradient py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Professional Medical 
                <span className="text-blue-600"> Consultation</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Get personalized health recommendations and professional medical guidance from the comfort of your home. Our advanced symptom checker provides reliable health insights.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={scrollToSymptomChecker}
                className="medical-button flex items-center gap-2"
                size="lg"
              >
                <SearchCheck className="h-5 w-5" />
                Start Symptom Check
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Learn More
              </Button>
            </div>

            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center text-green-600">
                <ShieldCheck className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">HIPAA Compliant</span>
              </div>
              <div className="flex items-center text-green-600">
                <UserCheck className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">Licensed Professionals</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="medical-card p-8">
              <img 
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Professional medical consultation" 
                className="rounded-xl w-full h-64 object-cover" 
              />
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Consultation Status</span>
                  <span className="trust-badge">Available</span>
                </div>
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-700 flex items-center">
                    <SearchCheck className="text-blue-600 h-4 w-4 mr-2" />
                    Next available: Today at 2:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
