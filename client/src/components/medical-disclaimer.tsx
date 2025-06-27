import { Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function MedicalDisclaimer() {
  return (
    <section className="py-12 bg-amber-50 border-t border-amber-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-white border border-amber-200">
          <CardContent className="p-8">
            <div className="flex items-start space-x-4">
              <div className="bg-amber-100 rounded-lg p-3 flex-shrink-0">
                <Info className="text-amber-600 h-6 w-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-3">Important Medical Disclaimer</h4>
                <div className="text-sm text-gray-700 leading-relaxed space-y-3">
                  <p>
                    <strong>This platform is for informational purposes only</strong> and should not be considered as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of qualified healthcare providers with any questions you may have regarding a medical condition.
                  </p>
                  <p>
                    The symptom checker and health recommendations provided are based on general medical knowledge and should not be used as the sole basis for medical decisions. Individual health conditions vary significantly, and proper medical evaluation is essential for accurate diagnosis and treatment.
                  </p>
                  <p>
                    <strong>In case of emergency, call 911 immediately.</strong> Do not rely on this platform for emergency medical situations or urgent health concerns that require immediate attention.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
