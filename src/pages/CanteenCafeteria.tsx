import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Coffee, Sandwich, UtensilsCrossed } from "lucide-react";

type MenuItem = {
  icon: string;
  title: string;
};

const CanteenCafeteria = () => {
  const [active, setActive] = useState<"breakfast" | "lunch" | "dinner">("breakfast");

  const menu = useMemo<Record<typeof active, { left: MenuItem[]; right: MenuItem[] }>>(
    () => ({
      breakfast: {
        left: [
          { icon: "🥣", title: "Poha" },
          { icon: "💧", title: "Sabudana Khichdi" },
          { icon: "🫓", title: "Thalipeeth" },
          { icon: "🍔", title: "Vada Pav" },
          { icon: "🥗", title: "Sabzi with Bhakri or Chapati" },
        ],
        right: [
          { icon: "🍚", title: "Upma" },
          { icon: "🌶️", title: "Misal Pav" },
          { icon: "🍮", title: "Sheera (Sooji Halwa)" },
          { icon: "🍽️", title: "Idli with Coconut Chutney and Sambar" },
          { icon: "☕", title: "Tea / Coffee" },
        ],
      },
      lunch: {
        left: [
          { icon: "🍚", title: "Steamed Rice" },
          { icon: "🥬", title: "Bhaji (Vegetable Curry)" },
          { icon: "🌶️", title: "Pithla Bhakri (Gram flour curry with flatbread)" },
          { icon: "🥗", title: "Koshimbir (Salad)" },
          { icon: "🥛", title: "Buttermilk / Chaas" },
        ],
        right: [
          { icon: "🍲", title: "Dal Tadka (Lentil Curry)" },
          { icon: "🫓", title: "Chapati / Bhakri" },
          { icon: "🥣", title: "Varan (Simple lentil soup)" },
          { icon: "🫕", title: "Sambhar" },
        ],
      },
      dinner: {
        left: [
          { icon: "🫓", title: "Chapati / Bhakri" },
          { icon: "🍲", title: "Dal Fry / Varan" },
          { icon: "🌶️", title: "Pithla Bhakri" },
          { icon: "🥗", title: "Koshimbir (Salad)" },
          { icon: "🍮", title: "Kheer / Sheera (sweet dish)" },
        ],
        right: [
          { icon: "🍚", title: "Steamed Rice" },
          { icon: "🥬", title: "Seasonal Vegetable Curry (Bhaji)" },
          { icon: "🫕", title: "Sambhar" },
          { icon: "🥛", title: "Buttermilk / Chaas" },
        ],
      },
    }),
    [],
  );

  const ActiveIcon = active === "breakfast" ? Coffee : active === "lunch" ? Sandwich : UtensilsCrossed;

  const renderList = (items: MenuItem[]) => (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.title} className="flex items-center gap-3 border-b border-border/60 pb-3 last:border-b-0 last:pb-0">
          <span className="text-lg leading-none">{item.icon}</span>
          <span className="text-sm sm:text-base font-medium text-foreground">{item.title}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />

      <section className="py-14 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8">
            <p className="text-sm sm:text-base font-semibold tracking-wide text-primary">CHECK OUR YUMMY MENU</p>
            <div className="mt-3 flex justify-center gap-2">
              <span className="h-1 w-8 rounded-full bg-destructive" />
              <span className="h-1 w-8 rounded-full bg-destructive/70" />
            </div>
          </div>

          <Card className="border border-border/80">
            <CardContent className="p-5 sm:p-8">
              <Tabs value={active} onValueChange={(v) => setActive(v as typeof active)}>
                <div className="flex items-center justify-center mb-8">
                  <TabsList className="grid grid-cols-3 bg-transparent gap-3">
                    <TabsTrigger
                      value="breakfast"
                      className={cn(
                        "border rounded-md px-4 py-2 text-sm sm:text-base font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                        "data-[state=inactive]:bg-background data-[state=inactive]:text-foreground",
                      )}
                    >
                      <Coffee className="h-4 w-4 mr-2" />
                      Breakfast
                    </TabsTrigger>
                    <TabsTrigger
                      value="lunch"
                      className={cn(
                        "border rounded-md px-4 py-2 text-sm sm:text-base font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                        "data-[state=inactive]:bg-background data-[state=inactive]:text-foreground",
                      )}
                    >
                      <Sandwich className="h-4 w-4 mr-2" />
                      Launch
                    </TabsTrigger>
                    <TabsTrigger
                      value="dinner"
                      className={cn(
                        "border rounded-md px-4 py-2 text-sm sm:text-base font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                        "data-[state=inactive]:bg-background data-[state=inactive]:text-foreground",
                      )}
                    >
                      <UtensilsCrossed className="h-4 w-4 mr-2" />
                      Dinner
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="flex items-center justify-center mb-6 text-muted-foreground">
                  <ActiveIcon className="h-4 w-4 mr-2" />
                  <span className="text-sm">Today’s menu</span>
                </div>

                {(["breakfast", "lunch", "dinner"] as const).map((key) => (
                  <TabsContent key={key} value={key} className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                      {renderList(menu[key].left)}
                      {renderList(menu[key].right)}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CanteenCafeteria;

