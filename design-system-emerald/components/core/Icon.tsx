import type { LucideIcon, LucideProps } from "lucide-react";
import {
  ArrowRight,
  Calendar,
  Check,
  CheckCheck,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  MessageCircle,
  MoreVertical,
  Paperclip,
  Phone,
  Plus,
  Send,
  Smile,
  TrendingDown,
  TrendingUp,
  X,
} from "lucide-react";

/**
 * Source export loaded Lucide from a CDN and masked the raw SVG so it could
 * inherit currentColor. This project already ships `lucide-react`, so Icon
 * is a thin name -> component lookup instead — same call sites, no runtime
 * fetch, tree-shakeable.
 */
const ICONS: Record<string, LucideIcon> = {
  "arrow-right": ArrowRight,
  calendar: Calendar,
  check: Check,
  "check-check": CheckCheck,
  "chevron-down": ChevronDown,
  "chevron-right": ChevronRight,
  "chevron-up": ChevronUp,
  "message-circle": MessageCircle,
  "more-vertical": MoreVertical,
  paperclip: Paperclip,
  phone: Phone,
  plus: Plus,
  send: Send,
  smile: Smile,
  "trending-down": TrendingDown,
  "trending-up": TrendingUp,
  x: X,
};

export type IconName = keyof typeof ICONS;

export interface IconProps extends Omit<LucideProps, "ref"> {
  /** Lucide icon name in kebab-case, e.g. "chevron-right". */
  name: string;
  size?: number;
}

export function Icon({ name, size = 20, color = "currentColor", ...rest }: IconProps) {
  const Cmp = ICONS[name];
  if (!Cmp) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.warn(`[design-system] Icon "${name}" is not registered in design-system/components/core/Icon.tsx`);
    }
    return <span aria-hidden="true" style={{ display: "inline-block", width: size, height: size }} />;
  }
  return <Cmp aria-hidden="true" width={size} height={size} color={color} {...rest} />;
}
