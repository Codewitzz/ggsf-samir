import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "What are the eligibility criteria for MBA admissions?",
      answer: "Candidates must have a bachelor's degree in any discipline with a minimum of 50% marks. Valid scores in CAT/MAT/CMAT or equivalent entrance exams are required.",
    },
    {
      question: "Does the Engineering college provide hostel facilities?",
      answer: "Yes, we provide separate hostel facilities for boys and girls with all modern amenities including Wi-Fi, mess, gym, and 24/7 security.",
    },
    {
      question: "What is the duration of Polytechnic diploma programs?",
      answer: "Our polytechnic diploma programs are typically 3 years after 10th standard. We offer various specializations in mechanical, civil, electrical, and computer engineering.",
    },
    {
      question: "Are there placement opportunities for all programs?",
      answer: "Yes, we have a dedicated placement cell that works with top companies. We maintain a placement rate of over 85% across all programs with competitive packages.",
    },
    {
      question: "What kind of scholarships are available?",
      answer: "We offer merit-based scholarships, need-based financial aid, and special scholarships for outstanding academic and sports achievements. Government scholarships are also facilitated.",
    },
    {
      question: "Can I visit the campus before applying?",
      answer: "Absolutely! We encourage prospective students to visit our campus. You can schedule a campus tour by contacting our admissions office. Virtual tours are also available.",
    },
    {
      question: "What is the faculty-to-student ratio?",
      answer: "We maintain an optimal faculty-to-student ratio of 1:15 to ensure personalized attention and quality education. All our faculty members are highly qualified and experienced.",
    },
    {
      question: "Are there opportunities for international exposure?",
      answer: "Yes, we have partnerships with international universities for student exchange programs, internships abroad, and collaborative research projects.",
    },
  ];

  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about our programs and admissions
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border border-border rounded-lg px-6"
            >
              <AccordionTrigger className="text-left hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
