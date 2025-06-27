import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Heart, Droplet, Brain, Apple, Dumbbell, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { HealthTopic } from "@shared/schema";

const categoryIcons: Record<string, any> = {
  "Cardiovascular Health": Heart,
  "Diabetes Care": Droplet,
  "Mental Health": Brain,
  "Nutrition": Apple,
  "Fitness": Dumbbell,
  "Prevention": Shield,
};

const categoryColors: Record<string, string> = {
  "Cardiovascular Health": "text-red-500",
  "Diabetes Care": "text-blue-500",
  "Mental Health": "text-purple-500",
  "Nutrition": "text-green-500",
  "Fitness": "text-orange-500",
  "Prevention": "text-teal-500",
};

export default function HealthInfo() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<HealthTopic[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const { data: healthTopics, isLoading } = useQuery<HealthTopic[]>({
    queryKey: ["/api/health-topics"],
  });

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(`/api/health-topics/search?q=${encodeURIComponent(searchQuery)}`);
      if (response.ok) {
        const results = await response.json();
        setSearchResults(results);
      }
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const topicsToDisplay = searchResults.length > 0 ? searchResults : (healthTopics || []);

  const featuredArticles = [
    {
      title: "Understanding Hypertension: The Silent Killer",
      description: "High blood pressure affects millions worldwide. Learn about symptoms, risks, and management strategies.",
      author: "Dr. Sarah Johnson",
      readTime: "5 min read",
      publishedAt: "Dec 15, 2024",
      icon: Heart,
      iconColor: "text-red-500"
    },
    {
      title: "Natural Remedies for Common Cold Symptoms",
      description: "Explore evidence-based natural treatments that can help alleviate cold symptoms safely.",
      author: "Dr. Michael Chen",
      readTime: "7 min read",
      publishedAt: "Dec 12, 2024",
      icon: Shield,
      iconColor: "text-green-500"
    },
    {
      title: "Sleep Hygiene: Your Guide to Better Rest",
      description: "Quality sleep is essential for health. Discover tips for improving your sleep quality and duration.",
      author: "Dr. Emily Rodriguez",
      readTime: "6 min read",
      publishedAt: "Dec 10, 2024",
      icon: Brain,
      iconColor: "text-purple-500"
    }
  ];

  return (
    <section id="health-info" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Health Information Center</h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore comprehensive health resources, condition guides, and wellness tips from medical professionals.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search health topics, conditions, or symptoms..."
              className="w-full px-6 py-4 pr-12 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button
              onClick={handleSearch}
              disabled={isSearching}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              size="icon"
              variant="ghost"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Health Topics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="medical-card">
                <Skeleton className="w-full h-48" />
                <CardContent className="p-6">
                  <Skeleton className="h-4 w-24 mb-3" />
                  <Skeleton className="h-6 w-full mb-3" />
                  <Skeleton className="h-16 w-full mb-4" />
                  <Skeleton className="h-4 w-32" />
                </CardContent>
              </Card>
            ))
          ) : (
            topicsToDisplay.map((topic) => {
              const IconComponent = categoryIcons[topic.category] || Heart;
              const iconColor = categoryColors[topic.category] || "text-blue-500";
              
              return (
                <Card key={topic.id} className="medical-card">
                  {topic.imageUrl && (
                    <img 
                      src={topic.imageUrl} 
                      alt={topic.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      <IconComponent className={`h-5 w-5 mr-2 ${iconColor}`} />
                      <Badge variant="secondary" className="text-xs">
                        {topic.category}
                      </Badge>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">{topic.title}</h4>
                    <p className="text-gray-600 mb-4 line-clamp-3">{topic.description}</p>
                    <div className="flex items-center justify-between">
                      <Button variant="link" className="p-0 text-blue-600 hover:text-blue-700">
                        Read More →
                      </Button>
                      {topic.readTime && (
                        <span className="text-xs text-gray-500">{topic.readTime}</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {/* Featured Articles */}
        <Card className="bg-white shadow-lg border border-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">Featured Health Articles</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              {featuredArticles.map((article, index) => (
                <article key={index} className="flex items-start space-x-4 pb-6 border-b border-gray-100 last:border-b-0">
                  <div className="bg-gray-100 rounded-lg p-3 flex-shrink-0">
                    <article.icon className={`${article.iconColor} h-6 w-6`} />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-gray-900 mb-2">{article.title}</h5>
                    <p className="text-gray-600 text-sm mb-2">{article.description}</p>
                    <div className="flex items-center text-xs text-gray-500 space-x-2">
                      <span>{article.author}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                      <span>•</span>
                      <span>{article.publishedAt}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
