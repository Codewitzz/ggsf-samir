import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Sparkles, Clock, HelpCircle } from "lucide-react";

const ChatbotInfo = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "24/7 Availability",
      description: "Get instant answers to your questions anytime, anywhere. Our AI assistant is always ready to help.",
    },
    {
      icon: Sparkles,
      title: "Smart Assistance",
      description: "Powered by advanced AI technology to provide accurate and helpful information about admissions, programs, and campus life.",
    },
    {
      icon: Clock,
      title: "Quick Responses",
      description: "No waiting time. Get immediate answers to common questions about courses, fees, facilities, and more.",
    },
    {
      icon: HelpCircle,
      title: "Comprehensive Support",
      description: "Ask about admissions, programs, campus facilities, events, scholarships, and any other queries you may have.",
    },
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">AI Chatbot Assistant</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get instant answers to your questions with our AI-powered chatbot. Available 24/7 to assist you with admissions, programs, and campus information.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="bg-card border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <MessageCircle className="h-6 w-6 text-primary" />
              How to Use the Chatbot
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Click the Chat Icon</h3>
                  <p className="text-muted-foreground text-sm">
                    Look for the chat icon in the bottom-right corner of any page on our website.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Ask Your Question</h3>
                  <p className="text-muted-foreground text-sm">
                    Type your question in the chat window. You can ask about admissions, programs, fees, facilities, or any other queries.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Get Instant Answers</h3>
                  <p className="text-muted-foreground text-sm">
                    Receive immediate, accurate responses from our AI assistant. If you need more help, you can always contact our admissions office.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            <strong className="text-foreground">Note:</strong> The chatbot is designed to provide general information. 
            For specific queries or detailed assistance, please contact our admissions office directly.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ChatbotInfo;


