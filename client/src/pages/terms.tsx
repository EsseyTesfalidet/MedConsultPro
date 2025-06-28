import { Stethoscope, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Stethoscope className="text-blue-600 h-8 w-8 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">MedConsult Pro</h1>
            </div>
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Terms of Use */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">Terms of Use</CardTitle>
              <p className="text-gray-600">Last updated: June 27, 2025</p>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <div className="space-y-6">
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Educational Purpose Only</h3>
                  <p className="text-gray-700 leading-relaxed">
                    MedConsult Pro is designed exclusively for educational purposes. All information, suggestions, and content provided through this platform are intended to educate users about general health topics and should not be used as a substitute for professional medical advice, diagnosis, or treatment.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Not Medical Prescriptions</h3>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Important:</strong> Health suggestions provided by our platform are NOT medical prescriptions. They are general recommendations based on publicly available medical information and should never replace consultation with a licensed healthcare provider. Any treatment decisions should be made in consultation with qualified medical professionals.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">3. Medical Disclaimer</h3>
                  <p className="text-gray-700 leading-relaxed">
                    The information provided is for informational purposes only and does not constitute medical advice. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this platform.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">4. Emergency Situations</h3>
                  <p className="text-gray-700 leading-relaxed">
                    In case of a medical emergency, call 911 immediately or go to the nearest emergency room. This platform is not intended for emergency medical situations and should never be used as a substitute for emergency medical care.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">5. User Responsibilities</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Use the platform responsibly and only for educational purposes</li>
                    <li>• Provide accurate information when using our symptom checker</li>
                    <li>• Consult healthcare professionals before making any medical decisions</li>
                    <li>• Do not rely solely on our recommendations for health decisions</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">6. Privacy and Data</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We process health information temporarily and anonymously to provide educational content. We do not store personally identifiable health information. All data processing complies with HIPAA guidelines and privacy regulations.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">7. Limitation of Liability</h3>
                  <p className="text-gray-700 leading-relaxed">
                    MedConsult Pro and its operators shall not be liable for any damages arising from the use of this platform. Users acknowledge that they use this service at their own risk and that all medical decisions should be made with qualified healthcare providers.
                  </p>
                </section>
              </div>
            </CardContent>
          </Card>

          {/* Refund Policy */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">Refund Policy</CardTitle>
              <p className="text-gray-600">Payment and refund terms</p>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <div className="space-y-6">
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Non-Refundable Services</h3>
                  <p className="text-gray-700 leading-relaxed">
                    All consultation and subscription payments made through MedConsult Pro are <strong>non-refundable</strong>. This includes:
                  </p>
                  <ul className="space-y-2 text-gray-700 mt-3">
                    <li>• One-time consultation payments ($2-$5)</li>
                    <li>• Monthly premium subscriptions ($5-$10)</li>
                    <li>• Any additional premium features or services</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Rationale for Non-Refund Policy</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Due to the immediate nature of educational health information delivery and the digital format of our services, all sales are final. Once you receive access to our educational content, symptom analysis, or premium features, the service has been rendered.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">3. Subscription Cancellation</h3>
                  <p className="text-gray-700 leading-relaxed">
                    While payments are non-refundable, you may cancel your subscription at any time to prevent future charges. Cancellation will take effect at the end of your current billing period, and you will retain access to premium features until that time.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">4. Technical Issues</h3>
                  <p className="text-gray-700 leading-relaxed">
                    In the rare event of technical issues preventing service delivery, we will work to resolve the problem promptly. However, technical difficulties do not constitute grounds for refunds under our policy.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">5. Dispute Resolution</h3>
                  <p className="text-gray-700 leading-relaxed">
                    For any payment-related concerns or disputes, please contact our support team at support@medconsultpro.com. We will review each case individually, though refunds are not guaranteed under our policy.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">6. Acknowledgment</h3>
                  <p className="text-gray-700 leading-relaxed">
                    By making a payment for our services, you acknowledge that you have read, understood, and agreed to this refund policy. You confirm that all payments are made voluntarily with full understanding that they are non-refundable.
                  </p>
                </section>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Questions About These Terms?</h3>
              <p className="text-gray-700 mb-4">
                If you have any questions about our Terms of Use or Refund Policy, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p>Email: support@medconsultpro.com</p>
                <p>Phone: +1 (555) 123-HEALTH</p>
                <p>Hours: Monday-Friday, 8:00 AM - 8:00 PM EST</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}