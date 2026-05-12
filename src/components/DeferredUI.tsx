import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

const DeferredUI = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
  </TooltipProvider>
);

export default DeferredUI;
