import { CTA_HREF, CTA_LABEL } from "@/components/landing/Hero";

const MobileCtaBar = () => {
  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 px-4 py-3"
      style={{
        background: "rgba(255,255,255,0.96)",
        borderTop: "1px solid #E5E7EB",
        paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))",
      }}
    >
      <a
        href={CTA_HREF}
        className="flex items-center justify-center w-full h-13 py-3.5 rounded-full gradient-brand text-white font-display text-[17px] font-bold text-center"
      >
        {CTA_LABEL}
      </a>
    </div>
  );
};

export default MobileCtaBar;
