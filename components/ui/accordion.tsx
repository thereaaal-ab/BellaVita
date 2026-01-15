import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface AccordionContextValue {
  openItems: Set<string>;
  toggleItem: (value: string) => void;
}

const AccordionContext = React.createContext<AccordionContextValue | null>(
  null
);

interface AccordionProps {
  children: React.ReactNode;
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  className?: string;
}

const Accordion = ({ children, type = "single", defaultValue, className }: AccordionProps) => {
  const [openItems, setOpenItems] = React.useState<Set<string>>(() => {
    if (defaultValue) {
      return new Set(Array.isArray(defaultValue) ? defaultValue : [defaultValue]);
    }
    return new Set();
  });

  const toggleItem = React.useCallback((value: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(value)) {
        next.delete(value);
      } else {
        if (type === "single") {
          next.clear();
        }
        next.add(value);
      }
      return next;
    });
  }, [type]);

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className={cn("space-y-2", className)}>{children}</div>
    </AccordionContext.Provider>
  );
};

interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const AccordionItem = ({ value, children, className }: AccordionItemProps) => {
  return (
    <div
      className={cn("border rounded-lg overflow-hidden", className)}
      data-value={value}
    >
      {children}
    </div>
  );
};

interface AccordionTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const AccordionTrigger = ({ value, children, className }: AccordionTriggerProps) => {
  const context = React.useContext(AccordionContext);
  if (!context) throw new Error("AccordionTrigger must be used within Accordion");

  const isOpen = context.openItems.has(value);

  return (
    <button
      type="button"
      onClick={() => context.toggleItem(value)}
      className={cn(
        "flex w-full items-center justify-between p-4 text-left font-medium transition-all hover:bg-accent [&[data-state=open]>svg]:rotate-180",
        className
      )}
      aria-expanded={isOpen}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </button>
  );
};

interface AccordionContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const AccordionContent = ({ value, children, className }: AccordionContentProps) => {
  const context = React.useContext(AccordionContext);
  if (!context) throw new Error("AccordionContent must be used within Accordion");

  const isOpen = context.openItems.has(value);

  return (
    <div
      className={cn(
        "overflow-hidden transition-all",
        isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0",
        className
      )}
    >
      <div className={cn("p-4 pt-0", className)}>{children}</div>
    </div>
  );
};

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

