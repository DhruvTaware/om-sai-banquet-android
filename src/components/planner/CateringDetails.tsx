import type { PackageCatering, StructuredMeal } from "@/data/packages/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const MEAL_CATEGORIES: Array<{ key: keyof StructuredMeal; label: string }> = [
  { key: "breads", label: "Breads" },
  { key: "dryBhaji", label: "Dry Bhaji" },
  { key: "wetBhaji", label: "Wet Bhaji" },
  { key: "salad", label: "Salad" },
  { key: "rice", label: "Rice" },
  { key: "dal", label: "Dal" },
  { key: "sweet", label: "Sweet" },
  { key: "dessert", label: "Dessert" },
];

const ItemPills = ({ items }: { items: string[] }) =>
  items.length === 0 ? (
    <span className="text-xs text-muted-foreground italic">Not included</span>
  ) : (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <span key={item} className="text-xs px-2.5 py-1 rounded-full bg-muted text-foreground/80">
          {item}
        </span>
      ))}
    </div>
  );

const StructuredMealBlock = ({ meal }: { meal: StructuredMeal }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
    {MEAL_CATEGORIES.map(({ key, label }) => (
      <div key={key}>
        <p className="text-xs font-medium text-muted-foreground mb-1.5">{label}</p>
        <ItemPills items={meal[key]} />
      </div>
    ))}
  </div>
);

const CateringDetails = ({ catering }: { catering: PackageCatering }) => (
  <Accordion type="multiple" defaultValue={["lunch", "dinner"]} className="w-full">
    <AccordionItem value="morningBreakfast">
      <AccordionTrigger className="text-sm font-semibold">Morning Breakfast</AccordionTrigger>
      <AccordionContent>
        <ItemPills items={catering.morningBreakfast} />
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="teaCoffee">
      <AccordionTrigger className="text-sm font-semibold">Tea / Coffee</AccordionTrigger>
      <AccordionContent>
        <ItemPills items={catering.teaCoffee} />
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="lunch">
      <AccordionTrigger className="text-sm font-semibold">Lunch</AccordionTrigger>
      <AccordionContent>
        <StructuredMealBlock meal={catering.lunch} />
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="eveningBreakfast">
      <AccordionTrigger className="text-sm font-semibold">Evening Breakfast</AccordionTrigger>
      <AccordionContent>
        <ItemPills items={catering.eveningBreakfast} />
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="eveningTeaCoffee">
      <AccordionTrigger className="text-sm font-semibold">Evening Tea / Coffee</AccordionTrigger>
      <AccordionContent>
        <ItemPills items={catering.eveningTeaCoffee} />
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="dinner">
      <AccordionTrigger className="text-sm font-semibold">Dinner</AccordionTrigger>
      <AccordionContent>
        <StructuredMealBlock meal={catering.dinner} />
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);

export default CateringDetails;
