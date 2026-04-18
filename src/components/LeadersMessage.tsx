import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { getAdminImageUrl } from "@/lib/adminImages/getAdminImageUrl";

const LeadersMessage = () => {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Leadership Messages</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Messages from our esteemed leaders
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* President's Message */}
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <img
                    src={getAdminImageUrl("/Faculty/president.jpg")}
                    alt="S. BALBIR SINGH CHHABRA - President"
                    className="w-32 h-32 rounded-lg object-cover border-2 border-primary/20"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg";
                    }}
                  />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl mb-1">S. BALBIR SINGH CHHABRA</CardTitle>
                  <CardDescription className="text-base font-semibold text-primary">
                    President
                  </CardDescription>
                  <CardDescription className="text-sm">
                    Guru Gobind Singh Foundation, Nashik
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-2 text-muted-foreground">
                <Quote className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <p className="leading-relaxed italic">
                  Welcome to Guru Gobind Singh College of Engineering and Research Centre. 
                  Our institution is committed to providing quality education and fostering 
                  innovation. We strive to create an environment where students can excel 
                  academically and develop into well-rounded professionals who contribute 
                  meaningfully to society.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Secretary's Message */}
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <img
                    src={getAdminImageUrl("/Faculty/secretary.jpg")}
                    alt="S. KULJEET SINGH BIRDI - Secretary"
                    className="w-32 h-32 rounded-lg object-cover border-2 border-primary/20"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg";
                    }}
                  />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl mb-1">S. KULJEET SINGH BIRDI</CardTitle>
                  <CardDescription className="text-base font-semibold text-primary">
                    Secretary
                  </CardDescription>
                  <CardDescription className="text-sm">
                    Guru Gobind Singh Foundation, Nashik
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-2 text-muted-foreground">
                <Quote className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <p className="leading-relaxed italic">
                  At Guru Gobind Singh Foundation, we are dedicated to nurturing talent and 
                  empowering students with the knowledge and skills needed for success in 
                  today's competitive world. Our focus on academic excellence, research, and 
                  industry collaboration ensures that our graduates are well-prepared to meet 
                  the challenges of the future and make significant contributions to their 
                  chosen fields.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LeadersMessage;
