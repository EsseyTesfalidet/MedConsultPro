import { Stethoscope, Phone, Mail, Clock } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  const services = [
    "Symptom Checker",
    "Health Consultations", 
    "Medical Information",
    "Preventive Care"
  ];

  const resources = [
    "Health Articles",
    "Condition Guides",
    "Wellness Tips",
    "FAQ"
  ];

  const legalLinks = [
    "Privacy Policy",
    "Terms of Service", 
    "Medical Disclaimer"
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <Stethoscope className="text-blue-400 h-8 w-8 mr-3" />
              <h3 className="text-xl font-bold">MedConsult Pro</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Professional medical consultation platform providing reliable health information and personalized care recommendations.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {services.map((service, index) => (
                <li key={index}>
                  <button className="hover:text-white transition-colors text-left">
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {resources.map((resource, index) => (
                <li key={index}>
                  <button className="hover:text-white transition-colors text-left">
                    {resource}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                +1 (555) 123-HEALTH
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                support@medconsultpro.com
              </li>
              <li className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                24/7 Support Available
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © 2024 MedConsult Pro. All rights reserved. | HIPAA Compliant | Licensed Medical Professionals
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/terms">
              <button className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms & Refund Policy
              </button>
            </Link>
            {legalLinks.slice(0, 2).map((link, index) => (
              <button
                key={index}
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                {link}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
