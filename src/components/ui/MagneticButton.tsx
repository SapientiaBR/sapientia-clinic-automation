import { forwardRef } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";

type Variant = "primary" | "ghost";
type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  asButton?: boolean;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-[12px] font-sans font-semibold text-[13px] tracking-[0.02em] uppercase transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6C63FF]/50";

const variants: Record<Variant, string> = {
  primary:
    "gradient-brand text-white px-7 py-[15px] shadow-[0_12px_32px_rgba(91,108,255,0.28)] hover:shadow-[0_16px_40px_rgba(91,108,255,0.4)] hover:-translate-y-0.5",
  ghost:
    "bg-white border border-[#D8E2F0] text-[#5B6CFF] px-7 py-[15px] hover:bg-[#EEF3FF] hover:border-[#6C63FF]",
};

export const MagneticAnchor = forwardRef<HTMLAnchorElement, Props>(
  ({ variant = "primary", className = "", children, ...rest }, _ref) => {
    const magnetRef = useMagnetic<HTMLAnchorElement>(0.18);
    return (
      <a ref={magnetRef} className={`${base} ${variants[variant]} ${className}`} {...rest}>
        {children}
      </a>
    );
  }
);
MagneticAnchor.displayName = "MagneticAnchor";

export default MagneticAnchor;
