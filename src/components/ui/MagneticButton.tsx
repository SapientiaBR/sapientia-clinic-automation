import { forwardRef } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";

type Variant = "primary" | "ghost";
type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  asButton?: boolean;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-[10px] font-sans font-semibold text-[13px] tracking-[0.02em] uppercase transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60";

const variants: Record<Variant, string> = {
  primary:
    "gradient-brand text-white px-7 py-[15px] shadow-[0_0_40px_rgba(124,58,237,0.4)] hover:shadow-[0_0_55px_rgba(124,58,237,0.55)] hover:-translate-y-0.5",
  ghost:
    "bg-transparent border border-cyan-300/20 text-cyan-300 px-7 py-[15px] hover:bg-cyan-300/10 hover:border-cyan-300",
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
