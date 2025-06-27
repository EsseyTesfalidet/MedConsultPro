import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Search, AlertTriangle, CheckCircle, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertSymptomAnalysisSchema } from "@shared/schema";
import { z } from "zod";

const formSchema = insertSymptomAnalysisSchema.extend({
  additionalSymptoms: z.array(z.string()).optional(),
});

type FormData = z.infer<typeof formSchema>;

const additionalSymptomOptions = [
  "Fever", "Nausea", "Fatigue", "Dizziness", "Sleep Issues", "Appetite Loss"
];

const durationOptions = [
  "Less than 1 day", "1-3 days", "1 week", "More than 1 week"
];

export default function SymptomChecker() {
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [painLevel, setPainLevel] = useState([5]);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ageRange: "",
      gender: "",
      primarySymptoms: "",
      duration: "",
      painLevel: 5,
      additionalSymptoms: [],
      medicalHistory: "",
    },
  });

  const analyzeSymptoms = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await apiRequest("POST", "/api/symptom-analysis", data);
      return response.json();
    },
    onSuccess: (data) => {
      setAnalysisResult(data);
      toast({
        title: "Analysis Complete",
        description: "Your symptom analysis has been generated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your symptoms. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    const formattedData = {
      ...data,
      painLevel: painLevel[0],
      additionalSymptoms: data.additionalSymptoms || [],
    };
    analyzeSymptoms.mutate(formattedData);
  };

  return (
    <section id="symptom-checker" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Symptom Checker</h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Describe your symptoms and receive professional health recommendations. Our AI-powered system provides preliminary assessments based on medical expertise.
          </p>
        </div>

        <Card className="bg-gray-50 border border-gray-200">
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="ageRange"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">Age Range</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select age range" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="18-25">18-25</SelectItem>
                            <SelectItem value="26-35">26-35</SelectItem>
                            <SelectItem value="36-45">36-45</SelectItem>
                            <SelectItem value="46-55">46-55</SelectItem>
                            <SelectItem value="56-65">56-65</SelectItem>
                            <SelectItem value="65+">65+</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">Gender</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                            <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Primary Symptoms */}
                <FormField
                  control={form.control}
                  name="primarySymptoms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700">Primary Symptoms</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your main symptoms in detail (e.g., headache, fever, cough, etc.)"
                          className="h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Symptom Duration */}
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700">
                        How long have you had these symptoms?
                      </FormLabel>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {durationOptions.map((option) => (
                          <Button
                            key={option}
                            type="button"
                            variant={field.value === option ? "default" : "outline"}
                            className="h-auto py-3 text-center whitespace-normal"
                            onClick={() => field.onChange(option)}
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Pain Level */}
                <div className="space-y-3">
                  <FormLabel className="text-sm font-semibold text-gray-700">
                    Pain/Discomfort Level (1-10)
                  </FormLabel>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">Mild</span>
                    <div className="flex-1">
                      <Slider
                        value={painLevel}
                        onValueChange={setPainLevel}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                    </div>
                    <span className="text-sm text-gray-600">Severe</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium min-w-[2rem] text-center">
                      {painLevel[0]}
                    </span>
                  </div>
                </div>

                {/* Additional Symptoms */}
                <FormField
                  control={form.control}
                  name="additionalSymptoms"
                  render={() => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700 mb-4 block">
                        Additional Symptoms (Check all that apply)
                      </FormLabel>
                      <div className="grid md:grid-cols-3 gap-3">
                        {additionalSymptomOptions.map((symptom) => (
                          <FormField
                            key={symptom}
                            control={form.control}
                            name="additionalSymptoms"
                            render={({ field }) => {
                              return (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(symptom)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...(field.value || []), symptom])
                                          : field.onChange(
                                              field.value?.filter((value) => value !== symptom)
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {symptom}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                    </FormItem>
                  )}
                />

                {/* Medical History */}
                <FormField
                  control={form.control}
                  name="medicalHistory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700">
                        Relevant Medical History
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any chronic conditions, recent surgeries, medications, or allergies"
                          className="h-24"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-center pt-4">
                  <Button
                    type="submit"
                    disabled={analyzeSymptoms.isPending}
                    className="medical-button"
                    size="lg"
                  >
                    <Search className="h-5 w-5 mr-2" />
                    {analyzeSymptoms.isPending ? "Analyzing..." : "Analyze Symptoms"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        {analysisResult && (
          <Card className="mt-12 bg-blue-50 border border-blue-200">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                <AlertTriangle className="text-blue-600 h-6 w-6 mr-3" />
                Preliminary Assessment Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h5 className="font-semibold text-gray-900 mb-3">Possible Conditions</h5>
                  <div className="space-y-3">
                    {analysisResult.analysis?.possibleConditions?.map((condition: any, index: number) => (
                      <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium text-gray-900">{condition.name}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            condition.match >= 80 ? 'bg-red-100 text-red-800' :
                            condition.match >= 60 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {condition.match}% Match
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{condition.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-900 mb-3">Recommendations</h5>
                  <div className="space-y-3">
                    {analysisResult.analysis?.recommendations?.map((recommendation: string, index: number) => (
                      <div key={index} className="flex items-start space-x-3">
                        {recommendation.toLowerCase().includes('consult') || recommendation.toLowerCase().includes('doctor') ? (
                          <TriangleAlert className="text-amber-500 h-5 w-5 mt-0.5 flex-shrink-0" />
                        ) : (
                          <CheckCircle className="text-green-500 h-5 w-5 mt-0.5 flex-shrink-0" />
                        )}
                        <span className="text-sm text-gray-700">{recommendation}</span>
                      </div>
                    ))}
                  </div>
                  
                  {analysisResult.analysis?.urgencyLevel === 'high' && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <TriangleAlert className="text-red-600 h-5 w-5 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-red-900">High Priority</p>
                          <p className="text-sm text-red-800">
                            Based on your symptoms, we recommend seeking medical attention promptly.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
