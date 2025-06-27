import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Phone, Mail, Video, TriangleAlert, Tag, Shield, UserCheck, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";

const formSchema = insertContactMessageSchema.extend({
  phone: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactSection() {
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      consentGiven: false,
    },
  });

  const submitMessage = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Message Sent Successfully",
        description: data.message,
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Failed to Send Message",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    submitMessage.mutate(data);
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      info: "+1 (555) 123-HEALTH",
      details: "Mon-Fri, 8:00 AM - 8:00 PM EST",
      color: "text-blue-600"
    },
    {
      icon: Mail,
      title: "Email Support",
      info: "support@medconsultpro.com",
      details: "Response within 24 hours",
      color: "text-blue-600"
    },
    {
      icon: Video,
      title: "Video Consultation",
      info: "Schedule online appointments",
      details: "Available 7 days a week",
      color: "text-blue-600"
    }
  ];

  const certifications = [
    { icon: Tag, label: "HIPAA Compliant" },
    { icon: Shield, label: "SOC 2 Certified" },
    { icon: UserCheck, label: "Licensed MDs" },
    { icon: Lock, label: "SSL Encrypted" }
  ];

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Get Professional Support</h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have specific health questions or need personalized guidance? Our medical professionals are here to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-gray-50 border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700">First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700">Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john.doe@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">Phone Number (Optional)</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="+1 (555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">Subject</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                            <SelectItem value="Symptom Consultation">Symptom Consultation</SelectItem>
                            <SelectItem value="Follow-up Question">Follow-up Question</SelectItem>
                            <SelectItem value="Technical Support">Technical Support</SelectItem>
                            <SelectItem value="Appointment Request">Appointment Request</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Please describe your question or concern in detail..."
                            className="h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="consentGiven"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm text-gray-600 leading-relaxed">
                            I consent to the collection and processing of my health information for consultation purposes, in accordance with HIPAA regulations.
                          </FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={submitMessage.isPending}
                    className="w-full medical-button"
                    size="lg"
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    {submitMessage.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h4>
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-blue-100 rounded-lg p-3 flex-shrink-0">
                      <method.icon className={`h-5 w-5 ${method.color}`} />
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900">{method.title}</h5>
                      <p className="text-gray-600">{method.info}</p>
                      <p className="text-sm text-gray-500">{method.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Notice */}
            <Card className="bg-red-50 border border-red-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <TriangleAlert className="text-red-600 h-6 w-6 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-bold text-red-900 mb-2">Medical Emergency</h5>
                    <p className="text-red-800 text-sm leading-relaxed">
                      If you're experiencing a medical emergency, please call 911 immediately or visit your nearest emergency room. This service is not intended for emergency medical situations.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trust Badges */}
            <Card className="bg-gray-50">
              <CardContent className="p-6">
                <h5 className="font-semibold text-gray-900 mb-4">Our Certifications</h5>
                <div className="grid grid-cols-2 gap-4">
                  {certifications.map((cert, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <cert.icon className="h-5 w-5 text-green-600" />
                      <span className="text-sm text-gray-700">{cert.label}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
