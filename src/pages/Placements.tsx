import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import ImageSlider from "@/components/ImageSlider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Briefcase, Mail, Phone, Users, TrendingUp, Building2 } from "lucide-react";
import { Cell, Pie, PieChart } from "recharts";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const Placements = () => {
  const sliderImages = [
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600&h=900&fit=crop&q=80",
  ];

  const stats = [
    { icon: Building2, label: "Partner Companies", value: "300+" },
    { icon: TrendingUp, label: "Placement Rate", value: "85%+" },
    { icon: Users, label: "Students Placed", value: "1000+" },
    { icon: Award, label: "Highest Package", value: "₹15 LPA" },
  ];

  const placementObjective = [
    {
      title: "Bridge industry & institute",
      description:
        "The T & P Cell strives to bridge the gap between industries and the institute by fostering effective interaction and meaningful education.",
    },
    {
      title: "Provide placement-ready guidance",
      description:
        "It provides guidance to students for career planning and personality development, with regular workshops in soft skills and technical skills.",
    },
    {
      title: "Enable real industry experience",
      description:
        "The cell aims to provide students with a platform to apply their technical acumen and gain valuable experience by working in mainstream industry.",
    },
    {
      title: "Strengthen industry collaboration",
      description:
        "GCOERC has MoUs and institutional memberships that support industry-sponsored training, consultancy, and entrepreneurship opportunities.",
    },
  ];

  const trainingPlacementPartners = [
    { name: "TCS", color: "hsl(0 72% 51%)", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Tata_Consultancy_Services_old_logo.svg/3840px-Tata_Consultancy_Services_old_logo.svg.png" },
    { name: "Infosys", color: "hsl(187 65% 42%)", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/3840px-Infosys_logo.svg.png" },
    { name: "Wipro", color: "hsl(197 100% 38%)", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Wipro_new_logo.svg/3840px-Wipro_new_logo.svg.png" },
    { name: "Accenture", color: "hsl(227 75% 36%)", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Accenture.svg/3840px-Accenture.svg.png" },
    { name: "Cognizant", color: "hsl(210 100% 35%)", logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgis1F4ulSuj4dJ3gS5I6AIx6nn1rp7sXtYQ&s" },
    { name: "Capgemini", color: "hsl(32 96% 60%)", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Capgemini_201x_logo.svg" },
    { name: "L&T", color: "hsl(160 60% 34%)", logoUrl: "https://i.logos-download.com/64183/14525-og-609e0b9cc22d9ac2dc04da1ba010de28.png/Larsen__Toubro_Logo_og.png" },
    { name: "Mahindra", color: "hsl(240 70% 65%)", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/8/82/Mahindra_Auto.png" },
    { name: "Bosch", color: "hsl(140 55% 35%)", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Bosch_logo.png" },
    { name: "Siemens", color: "hsl(30 70% 45%)", logoUrl: "https://download.logo.wine/logo/Siemens/Siemens-Logo.wine.png" },
    { name: "Amazon", color: "hsl(220 60% 50%)", logoUrl: "https://logo.clearbit.com/amazon.com?size=128" },
    { name: "Microsoft", color: "hsl(197 90% 40%)", logoUrl: "https://logo.clearbit.com/microsoft.com?size=128" },
    { name: "Google", color: "hsl(50 100% 50%)", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/960px-Google_2015_logo.svg.png" },
    { name: "IBM", color: "hsl(210 20% 35%)", logoUrl: "https://logo.clearbit.com/ibm.com?size=128" },
    { name: "Oracle", color: "hsl(20 90% 45%)", logoUrl: "https://logo.clearbit.com/oracle.com?size=128" },
  ];

  const staffDetails = [
    {
      name: "Dr. N. G. Nikam",
      designation: "Principal",
      role: "Chairman",
      contactNo: "",
    },
    {
      name: "Dr. V. B. Sarode",
      designation: "Asst. Professor- Mechanical Engg.",
      role: "T & P Officer & Member Secretary",
      contactNo: "9922081518",
    },
    {
      name: "Mr. P. B. Shinde",
      designation: "Asst. Professor- Civil Engg.",
      role: "Placement Coordinator for Civil Engineering",
      contactNo: "7709512367",
    },
    {
      name: "Mr. K. V. Dhande",
      designation: "Asst. Professor- Mechanical Engg",
      role: "Training Coordinator for Mechanical Engineering",
      contactNo: "9923209706",
    },
    {
      name: "Mr. P.R.Kulkarni",
      designation: "Asst. Professor- Computer Engg",
      role: "Training Coordinator for Computer Engg",
      contactNo: "7066755750",
    },
    {
      name: "Mr.S.M.More",
      designation: "Asst. Professor- Electrical Engg,",
      role: "T & P Coordinator for Electrical Engineering",
      contactNo: "8806664612",
    },
    {
      name: "Mr. N.S.Sonawane",
      designation: "Asst. Professor- AIDS Engg.",
      role: "T & P Coordinator for AIDS Engineering",
      contactNo: "9922043745",
    },
    {
      name: "Mr. A.V.Khirsiggar",
      designation: "Asst. Professor- Management Studies",
      role: "T & P Coordinator for Management Studies",
      contactNo: "8378988864",
    },
  ];

  const placementProcess = [
    {
      step: "1",
      title: "Registration",
      description: "Students register with the Training & Placement Cell",
    },
    {
      step: "2",
      title: "Pre-Placement Training",
      description: "Aptitude tests, technical interviews, and soft skills workshops",
    },
    {
      step: "3",
      title: "Company Visits",
      description: "Leading companies visit campus for recruitment drives",
    },
    {
      step: "4",
      title: "Selection & Offer",
      description: "Selected students receive offer letters from companies",
    },
  ];

  const academicYearPlacement = [
    { academicYear: "2020-2021", placedPercent: 35 },
    { academicYear: "2021-2022", placedPercent: 30 },
    { academicYear: "2022-2023", placedPercent: 50 },
    { academicYear: "2023-2024", placedPercent: 10 },
    { academicYear: "2024-2025", placedPercent: 80 },
  ];

  const placementChartConfig = {
    "2020-2021": { label: "2020-2021", color: "hsl(352 80% 45%)" },
    "2021-2022": { label: "2021-2022", color: "hsl(177 72% 42%)" },
    "2022-2023": { label: "2022-2023", color: "hsl(220 60% 45%)" },
    "2023-2024": { label: "2023-2024", color: "hsl(20 70% 85%)" },
    "2024-2025": { label: "2024-2025", color: "hsl(155 48% 28%)" },
  } as const;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />
      
      {/* Hero Section with Image Slider */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageSlider 
            images={sliderImages} 
            height="h-[500px]"
            className="rounded-none"
          />
        </div>
        <div className="relative h-[500px] z-10 bg-black/50 py-20 px-4">
          <div className="container mt-20 mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Placements</h1>
            <p className="text-xl max-w-3xl mx-auto text-white/90">
              Connecting talented students with leading companies for successful career launches
            </p>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-primary">{stat.value}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{stat.label}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Placement Objective */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Objective of Placements</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A focused approach to make students industry-ready while building strong collaboration between industry and the institute.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {placementObjective.map((obj) => (
              <Card key={obj.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">{obj.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  {obj.description}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Placement Process */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Placement Process</h2>
            <p className="text-muted-foreground">
              A structured approach to ensure successful placements for all students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {placementProcess.map((item, index) => (
              <Card key={index} className="relative">
                <CardHeader>
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                    {item.step}
                  </div>
                  <CardTitle className="text-xl mt-4">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Training & Placement Partners */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Briefcase className="h-6 w-6" />
                Training & Placement Partners
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {trainingPlacementPartners.map((partner) => (
                  <div
                    key={partner.name}
                    className="p-4 border border-border rounded-lg hover:bg-muted transition-colors flex flex-col items-center gap-3"
                  >
                    <div
                      className=" flex items-center justify-center  overflow-hidden"
                      title={`${partner.name} logo`}
                    >
                      <img
                        src={partner.logoUrl}
                        alt={`${partner.name} logo`}
                        className="h-full w-full object-contain"
                        loading="lazy"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                    <p className="font-medium text-center">{partner.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Academic Year Wise Placement */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Academic Year Wise Students Placed</CardTitle>
              <CardDescription>Placed % in various years (as reported data)</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="overflow-x-auto">
                  <div className="text-lg font-semibold mb-4">Placed % by Academic Year</div>
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 pr-4 font-semibold">Academic Year</th>
                        <th className="text-left py-3 font-semibold">Placed %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {academicYearPlacement.map((row) => (
                        <tr key={row.academicYear} className="border-b border-border/60">
                          <td className="py-3 pr-4 text-muted-foreground">{row.academicYear}</td>
                          <td className="py-3 font-medium">{row.placedPercent}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="w-full">
                  <div className="text-lg font-semibold mb-4">Placement Graph</div>
                  <ChartContainer
                    id="placements-academic-year"
                    config={placementChartConfig}
                    className="w-full"
                  >
                    <PieChart>
                      <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                      <Pie
                        data={academicYearPlacement.map((d) => ({
                          ...d,
                          // recharts expects a numeric value key
                          value: d.placedPercent,
                        }))}
                        dataKey="value"
                        nameKey="academicYear"
                        outerRadius={95}
                        stroke="var(--background)"
                        strokeWidth={2}
                      >
                        {academicYearPlacement.map((d) => (
                          <Cell
                            key={d.academicYear}
                            fill={(placementChartConfig as unknown as Record<string, { color: string }>)[d.academicYear]?.color}
                          />
                        ))}
                      </Pie>
                      <ChartLegend content={<ChartLegendContent nameKey="academicYear" />} />
                    </PieChart>
                  </ChartContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Training & Placement Officer */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Training & Placement Officer</CardTitle>
              <CardDescription>Contact and responsibilities</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                <div className="md:col-span-1">
                  <img
                    src="/Faculty/sarode-vijay.jpg"
                    alt="Training and Placement staff details"
                    className="w-full h-auto rounded-lg border border-border/60"
                    loading="lazy"
                  />
                </div>

                <div className="md:col-span-2 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">Mr. Vijay B. Sarode</h3>
                    <p className="text-muted-foreground">Training and Placement Officer</p>
                  </div>

                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      The T & P Cell aims to provide students with a platform for using their technical acumen to gain
                      valuable experience by working in main stream industry. It also acts as interface for companies
                      seeking talented young graduates in various disciplines.
                    </p>
                    <p>
                      It also provides necessary guidance to the students for career planning and personality development.
                      In this regard workshop on soft skill as well as technical skills are being arranged on regular basis to
                      unable the students to acquire the necessary traits to become useful to industry.
                    </p>
                    <p>
                      T & P Cell striving hard to bridge the gap between Industries & Institute, to foster effective
                      interaction between Industry and Institute to impart meaningful education and to promote industrial
                      consultancy & entrepreneurship.
                    </p>
                    <p>
                      GCOERC has Memorandum of Understanding with Siemens, BOSCH, MSEDCL’s Institute of Training & Safety,
                      Nashik Engineering Cluster (NEC) and GCOERC has institutional membership with Indian Society for
                      Technical Education (ISTE), Delhi .
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="font-semibold">Contact us</div>
                    <div className="space-y-2 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>7768004581 / 82, 0253-2372766 / 2372666</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>Mobile: 09028160711 / 09922081518</span>
                      </div>
                      <div className="flex items-center gap-2 break-all">
                        <Mail className="h-4 w-4" />
                        <span>tpo.gcoerc@ggsf.edu.in, vijay.sarode@ggsf.edu.in</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Staff Details */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Training & Placement Staff Details</CardTitle>
              <CardDescription>Roles and contact numbers</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 pr-4 font-semibold">Name of Staff</th>
                      <th className="text-left py-3 pr-4 font-semibold">Designation</th>
                      <th className="text-left py-3 pr-4 font-semibold">Role & Responsibility</th>
                      <th className="text-left py-3 font-semibold">Contact No.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staffDetails.map((s) => (
                      <tr key={s.name} className="border-b border-border/60">
                        <td className="py-3 pr-4 text-muted-foreground whitespace-nowrap">{s.name}</td>
                        <td className="py-3 pr-4 text-muted-foreground">{s.designation}</td>
                        <td className="py-3 pr-4 text-muted-foreground">{s.role}</td>
                        <td className="py-3 font-medium whitespace-nowrap">{s.contactNo || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Placements;


