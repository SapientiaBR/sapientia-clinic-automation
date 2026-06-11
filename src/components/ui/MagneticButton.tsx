import { forwardRef } from "react";
import { ArrowRight } from "lucide-react";
import { useMagnetic } from "@/hooks/useMagnetic";

type Variant = "primary" | "ghost";
type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  asButton?: boolean;
  /** Hide the circular arrow on the primary variant (e.g. compact header CTA). */
  noArrow?: boolean;
};

const base =
  "group inline-flex items-center font-sans font-semibold text-[13px] tracking-[0.01em] uppercase transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0FB5A3]/50";

const variants: Record<Variant, string> = {
  primary:
    "gradient-brand text-white rounded-full pl-6 pr-2 py-2 gap-3 shadow-[0_16px_34px_rgba(138,124,246,0.28)] hover:shadow-[0_20px_42px_rgba(138,124,246,0.38)] hover:-translate-y-0.5",
  ghost:
    "bg-white border border-[#E9E0D6] text-[#0A8C7E] rounded-full px-6 py-3 gap-2 hover:bg-[#F3F4F6] hover:border-[#0FB5A3]",
};

export const MagneticAnchor = forwardRef<HTMLAnchorElement, Props>(
  ({ variant = "primary", className = "", children, noArrow = false, onClick, href, ...rest }, _ref) => {
    const magnetRef = useMagnetic<HTMLAnchorElement>(0.18);
    const isPrimary = variant === "primary";

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (onClick) onClick(e);
      if (e.defaultPrevented) return;
      if (typeof href === "string" && href.startsWith("#") && href.length > 1) {
        const target = document.getElementById(href.slice(1));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    return (
      <a
        ref={magnetRef}
        href={href}
        onClick={handleClick}
        className={`${base} ${variants[variant]} ${className}`}
        {...rest}
      >
        <span className={isPrimary ? "py-2" : ""}>{children}</span>
        {isPrimary && !noArrow && (
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white shadow-[0_4px_10px_rgba(70,55,35,0.10)] transition-transform duration-300 group-hover:rotate-12">
            <ArrowRight size={16} className="text-[#0A8C7E]" />
          </span>
        )}
      </a>
    );
  }
);
MagneticAnchor.displayName = "MagneticAnchor";

export default MagneticAnchor;
