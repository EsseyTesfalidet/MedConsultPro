import { useState, useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

export default function DisclaimerPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [understood, setUnderstood] = useState(false);

  useEffect(() => {
    // Check if user has already seen disclaimer
    const hasSeenDisclaimer = localStorage.getItem('medconsult-disclaimer-accepted');
    if (!hasSeenDisclaimer) {
      setIsOpen(true);
    }
  }, []);

  const handleAccept = () => {
    if (understood) {
      localStorage.setItem('medconsult-disclaimer-accepted', 'true');
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-red-600 font-bold">
            <AlertTriangle className="h-6 w-6 mr-2" />
            Important Medical Disclaimer
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-gray-800 leading-relaxed">
              <strong>This app is not a substitute for professional medical advice.</strong> Always consult a licensed physician before taking any action based on the suggestions provided.
            </p>
          </div>
          
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              The information provided by this platform is for educational purposes only and should not be used as a replacement for professional medical diagnosis, treatment, or advice.
            </p>
            <p>
              <strong>In case of medical emergency, call 911 immediately.</strong>
            </p>
          </div>

          <div className="flex items-start space-x-3 pt-2">
            <Checkbox
              id="understood"
              checked={understood}
              onCheckedChange={(checked) => setUnderstood(checked === true)}
            />
            <label 
              htmlFor="understood" 
              className="text-sm text-gray-700 leading-relaxed cursor-pointer"
            >
              I understand and acknowledge that this platform is for educational purposes only and does not replace professional medical advice.
            </label>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              onClick={handleAccept}
              disabled={!understood}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              I Understand, Continue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}