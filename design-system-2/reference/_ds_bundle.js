/* @ds-bundle: {"format":4,"namespace":"SecretRiaInvisVelDesignSystem_fc77d1","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Logo","sourcePath":"components/core/Logo.jsx"},{"name":"SectionLabel","sourcePath":"components/core/SectionLabel.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"EmptySlot","sourcePath":"components/data/EmptySlot.jsx"},{"name":"InsightCard","sourcePath":"components/data/InsightCard.jsx"},{"name":"ListRow","sourcePath":"components/data/ListRow.jsx"},{"name":"MetricCard","sourcePath":"components/data/MetricCard.jsx"},{"name":"ScoreDonut","sourcePath":"components/data/ScoreDonut.jsx"},{"name":"TrendChart","sourcePath":"components/data/TrendChart.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"SidebarNav","sourcePath":"components/navigation/SidebarNav.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"TopBar","sourcePath":"components/navigation/TopBar.jsx"},{"name":"AgendaDay","sourcePath":"components/product/AgendaDay.jsx"},{"name":"AppointmentCard","sourcePath":"components/product/AppointmentCard.jsx"},{"name":"ChatBubble","sourcePath":"components/product/ChatBubble.jsx"},{"name":"ChatThread","sourcePath":"components/product/ChatThread.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"7b397fb113ad","components/core/Badge.jsx":"b0adf03762ec","components/core/Button.jsx":"4589efecde2a","components/core/Card.jsx":"e1f053a00bf1","components/core/Icon.jsx":"57da951aff1c","components/core/IconButton.jsx":"6df58703b3b9","components/core/Logo.jsx":"b7d311146207","components/core/SectionLabel.jsx":"6351987f88a0","components/core/Tag.jsx":"c458673d42f7","components/data/EmptySlot.jsx":"464ee4152ca3","components/data/InsightCard.jsx":"be297a8a12ef","components/data/ListRow.jsx":"b63e031bf89c","components/data/MetricCard.jsx":"c6d3a1082f85","components/data/ScoreDonut.jsx":"c1658e6b4018","components/data/TrendChart.jsx":"bf3c6a3060b8","components/forms/Checkbox.jsx":"87523d56b68a","components/forms/Input.jsx":"993ab7ac4e49","components/forms/Radio.jsx":"88f10a05f46b","components/forms/Select.jsx":"9435bdd2f8f4","components/forms/Switch.jsx":"dd95221e8018","components/navigation/SidebarNav.jsx":"5b08f628118b","components/navigation/Tabs.jsx":"6f711d3c079e","components/navigation/TopBar.jsx":"4c20242d044d","components/product/AgendaDay.jsx":"4b85a815ebbe","components/product/AppointmentCard.jsx":"66236f8f0094","components/product/ChatBubble.jsx":"67f5dd50b785","components/product/ChatThread.jsx":"219ec9f5fd55","ui_kits/landing/LandingBody.jsx":"a39d6868118c","ui_kits/landing/LandingChrome.jsx":"733637ab9a2e","ui_kits/landing/LandingHero.jsx":"ca35be8d3ed6","ui_kits/landing/LandingOffer.jsx":"89a8b97fa7c2","ui_kits/painel/AgendaScreen.jsx":"fab32dd10a52","ui_kits/painel/InboxScreen.jsx":"57d3e6f4ec4c","ui_kits/painel/OverviewScreen.jsx":"29c78468e027","ui_kits/painel/PanelShell.jsx":"473c86120d40","ui_kits/painel/ReportsScreen.jsx":"4ccdea55c926"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.SecretRiaInvisVelDesignSystem_fc77d1 = window.SecretRiaInvisVelDesignSystem_fc77d1 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const BOX = {
  sm: 28,
  md: 36,
  lg: 48
};
function Avatar({
  name = '',
  src,
  size = 'md',
  tone = 'mint',
  style,
  ...rest
}) {
  const px = typeof size === 'number' ? size : BOX[size];
  const initials = name.trim().split(/\s+/).slice(0, 2).map(w => w[0] || '').join('').toUpperCase();
  const tones = {
    mint: ['var(--si-mint)', 'var(--si-emerald-700)'],
    ink: ['var(--si-emerald-700)', 'var(--si-white)'],
    gray: ['var(--si-gray-100)', 'var(--text-secondary)']
  };
  const [bg, fg] = tones[tone] || tones.mint;
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      width: px,
      height: px,
      borderRadius: 'var(--radius-circle)',
      flex: '0 0 auto',
      display: 'grid',
      placeItems: 'center',
      overflow: 'hidden',
      background: bg,
      color: fg,
      font: `var(--weight-medium) ${Math.round(px * 0.38)}px/1 var(--font-sans)`,
      ...style
    }
  }), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initials);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONE = {
  plain: {
    background: 'var(--surface-card)',
    color: 'var(--text-primary)',
    boxShadow: 'var(--shadow-sm)'
  },
  outline: {
    background: 'var(--surface-card)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-subtle)'
  },
  mint: {
    background: 'var(--surface-mint)',
    color: 'var(--si-emerald-900)'
  },
  gradient: {
    background: 'var(--gradient-mint)',
    color: 'var(--si-emerald-900)'
  },
  ink: {
    background: 'var(--surface-ink)',
    color: 'var(--text-on-ink)'
  },
  dark: {
    background: 'var(--gradient-ink)',
    color: 'var(--text-on-ink)'
  }
};
function Card({
  tone = 'plain',
  padding = 'md',
  radius = 'xl',
  title,
  subtitle,
  action,
  children,
  style,
  ...rest
}) {
  const pad = padding === 'none' ? 0 : padding === 'lg' ? 'var(--card-pad-lg)' : padding === 'sm' ? 'var(--space-4)' : 'var(--card-pad)';
  return /*#__PURE__*/React.createElement("section", _extends({}, rest, {
    style: {
      borderRadius: `var(--radius-${radius})`,
      padding: pad,
      ...TONE[tone],
      ...style
    }
  }), (title || action) && /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 12,
      marginBottom: subtitle ? 4 : 14
    }
  }, /*#__PURE__*/React.createElement("div", null, title && /*#__PURE__*/React.createElement("h4", {
    style: {
      font: 'var(--type-h5)',
      letterSpacing: 'var(--tracking-heading)'
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-label)',
      fontWeight: 'var(--weight-regular)',
      color: tone === 'ink' || tone === 'dark' ? 'var(--text-on-ink-muted)' : 'var(--text-secondary)',
      marginTop: 2
    }
  }, subtitle)), action), subtitle && (title || action) && /*#__PURE__*/React.createElement("div", {
    style: {
      height: 10
    }
  }), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const BASE = 'https://unpkg.com/lucide-static@0.454.0/icons/';

/* Lucide line icons, masked so they inherit currentColor.
   Matches the 1.5-2px stroke line-icon style of the reference UI. */
function Icon({
  name,
  size = 20,
  strokeWidth,
  color = 'currentColor',
  style,
  ...rest
}) {
  const url = `url("${BASE}${name}.svg")`;
  return /*#__PURE__*/React.createElement("span", _extends({
    "aria-hidden": "true"
  }, rest, {
    style: {
      display: 'inline-block',
      width: size,
      height: size,
      flex: '0 0 auto',
      background: color,
      WebkitMask: url + ' center / contain no-repeat',
      mask: url + ' center / contain no-repeat',
      ...style
    }
  }));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONE = {
  neutral: ['var(--si-gray-100)', 'var(--text-secondary)'],
  brand: ['var(--si-mint)', 'var(--si-emerald-700)'],
  good: ['var(--si-tint-good)', '#1C7A55'],
  warn: ['var(--si-tint-warn)', '#9A6412'],
  alert: ['var(--si-tint-alert)', '#A8352D'],
  info: ['var(--si-tint-info)', '#4A3AC4'],
  ink: ['var(--si-emerald-700)', 'var(--si-white)']
};
function Badge({
  tone = 'neutral',
  icon,
  dot,
  children,
  style,
  ...rest
}) {
  const [bg, fg] = TONE[tone] || TONE.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '4px 10px',
      background: bg,
      color: fg,
      font: 'var(--type-caption)',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-medium)',
      borderRadius: 'var(--radius-pill)',
      whiteSpace: 'nowrap',
      ...style
    }
  }), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'currentColor'
    }
  }), icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 14
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const PAD = {
  sm: '8px 14px',
  md: '11px 18px',
  lg: '14px 24px'
};
const FS = {
  sm: 'var(--text-sm)',
  md: 'var(--text-body)',
  lg: 'var(--text-body-lg)'
};
const LOOK = {
  primary: {
    background: 'var(--action-primary-bg)',
    color: 'var(--action-primary-fg)',
    border: '1px solid transparent'
  },
  secondary: {
    background: 'var(--action-secondary-bg)',
    color: 'var(--action-secondary-fg)',
    border: '1px solid transparent'
  },
  outline: {
    background: 'transparent',
    color: 'var(--si-emerald-700)',
    border: '1px solid var(--border-ink)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-primary)',
    border: '1px solid transparent'
  },
  dark: {
    background: 'var(--action-dark-bg)',
    color: 'var(--si-white)',
    border: '1px solid transparent'
  },
  inverse: {
    background: 'var(--si-white)',
    color: 'var(--si-emerald-700)',
    border: '1px solid transparent'
  }
};
const HOVER = {
  primary: 'var(--action-primary-bg-hover)',
  secondary: 'var(--si-emerald-200)',
  outline: 'var(--si-emerald-050)',
  ghost: 'var(--si-gray-100)',
  dark: '#171717',
  inverse: 'var(--si-mint)'
};
function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconAfter,
  fullWidth,
  disabled,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [down, setDown] = React.useState(false);
  const look = LOOK[variant] || LOOK.primary;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setDown(false);
    },
    onMouseDown: () => setDown(true),
    onMouseUp: () => setDown(false)
  }, rest, {
    style: {
      display: fullWidth ? 'flex' : 'inline-flex',
      width: fullWidth ? '100%' : undefined,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      padding: PAD[size],
      font: 'var(--type-label)',
      fontSize: FS[size],
      fontWeight: 'var(--weight-medium)',
      letterSpacing: 'var(--tracking-body)',
      borderRadius: 'var(--radius-md)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      transform: down && !disabled ? 'scale(0.985)' : 'none',
      transition: 'var(--transition-control), transform var(--duration-instant) var(--ease-standard)',
      ...look,
      background: hover && !disabled ? HOVER[variant] : look.background,
      ...style
    }
  }), icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: size === 'lg' ? 20 : 16
  }), children, iconAfter && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconAfter,
    size: size === 'lg' ? 20 : 16
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const BOX = {
  sm: 32,
  md: 38,
  lg: 44
};
function IconButton({
  icon,
  variant = 'ghost',
  size = 'md',
  label,
  active,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const box = BOX[size];
  const filled = variant === 'filled';
  const bg = filled ? 'var(--si-emerald-700)' : active ? 'var(--si-mint)' : hover ? 'var(--si-gray-100)' : 'transparent';
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, rest, {
    style: {
      width: box,
      height: box,
      display: 'grid',
      placeItems: 'center',
      cursor: 'pointer',
      background: filled && hover ? 'var(--si-emerald-800)' : bg,
      color: filled ? 'var(--si-white)' : active ? 'var(--si-emerald-700)' : 'var(--text-secondary)',
      border: variant === 'outline' ? '1px solid var(--border-subtle)' : '1px solid transparent',
      borderRadius: 'var(--radius-md)',
      transition: 'var(--transition-control)',
      ...style
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: size === 'sm' ? 16 : 20
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Secretária Invisível lockup. The mark is a WhatsApp-style speech bubble
   enclosing a caduceus; on dark/emerald grounds use variant="light" so the
   mark sits on a white disc (the mark itself is teal + slate, not monochrome). */
function Logo({
  src = 'assets/logo-si-mark.png',
  variant = 'dark',
  size = 36,
  showWordmark = true,
  wordmark = 'Secretária Invisível',
  style,
  ...rest
}) {
  const light = variant === 'light';
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: Math.round(size * 0.33),
      ...style
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      borderRadius: 'var(--radius-circle)',
      flex: '0 0 auto',
      background: light ? 'var(--si-white)' : 'transparent',
      display: 'grid',
      placeItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: "",
    style: {
      width: light ? size * 0.82 : size,
      height: light ? size * 0.82 : size,
      display: 'block'
    }
  })), showWordmark && /*#__PURE__*/React.createElement("span", {
    style: {
      font: `var(--weight-medium) ${Math.round(size * 0.5)}px / 1 var(--font-display)`,
      letterSpacing: 'var(--tracking-heading)',
      color: light ? 'var(--si-white)' : 'var(--si-emerald-700)',
      whiteSpace: 'nowrap'
    }
  }, wordmark));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Logo.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionLabel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* The reference boards number every section: "01 // Typography".
   Same device for slide eyebrows and marketing section headers. */
function SectionLabel({
  number,
  children,
  tone = 'brand',
  style,
  ...rest
}) {
  const color = tone === 'light' ? 'var(--text-on-ink)' : 'var(--si-emerald-700)';
  return /*#__PURE__*/React.createElement("p", _extends({}, rest, {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      color,
      font: 'var(--type-label)',
      fontWeight: 'var(--weight-medium)',
      letterSpacing: 'var(--tracking-eyebrow)',
      ...style
    }
  }), number && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, number), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.5
    }
  }, "//")), /*#__PURE__*/React.createElement("span", null, children));
}
Object.assign(__ds_scope, { SectionLabel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionLabel.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tag({
  children,
  onRemove,
  selected,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '6px 12px',
      background: selected ? 'var(--si-emerald-700)' : 'var(--surface-card)',
      color: selected ? 'var(--si-white)' : 'var(--text-primary)',
      border: `1px solid ${selected ? 'transparent' : 'var(--border-subtle)'}`,
      borderRadius: 'var(--radius-pill)',
      font: 'var(--type-label)',
      cursor: rest.onClick ? 'pointer' : 'default',
      transition: 'var(--transition-control)',
      ...style
    }
  }), children, onRemove && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onRemove,
    "aria-label": "Remover",
    style: {
      display: 'grid',
      placeItems: 'center',
      background: 'none',
      border: 0,
      padding: 0,
      cursor: 'pointer',
      color: 'inherit',
      opacity: 0.6
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 13
  })));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/data/EmptySlot.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function EmptySlot({
  time,
  label = 'Horário livre',
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, rest, {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      width: '100%',
      textAlign: 'left',
      padding: '12px 14px',
      borderRadius: 'var(--radius-lg)',
      cursor: 'pointer',
      background: hover ? 'var(--si-emerald-050)' : 'transparent',
      border: '1px dashed ' + (hover ? 'var(--si-emerald-400)' : 'var(--border-strong)'),
      color: 'var(--text-muted)',
      font: 'var(--type-label)',
      transition: 'var(--transition-control)',
      ...style
    }
  }), time && /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 48,
      color: 'var(--text-secondary)'
    }
  }, time), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "plus",
    size: 15
  }), /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { EmptySlot });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/EmptySlot.jsx", error: String((e && e.message) || e) }); }

// components/data/InsightCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* The mint "AI Insight" panel: gradient mint ground, soft emerald blob,
   eyebrow + headline + one sentence + a dark CTA. */
function InsightCard({
  eyebrow = 'Insight da IA',
  title,
  body,
  cta,
  onCta,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("section", _extends({}, rest, {
    style: {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: 'var(--radius-2xl)',
      background: 'var(--gradient-mint)',
      color: 'var(--si-emerald-900)',
      padding: 'var(--card-pad-lg)',
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      right: -60,
      top: -40,
      width: 260,
      height: 260,
      borderRadius: '50%',
      background: 'radial-gradient(circle at 40% 40%, rgba(0,104,81,.22), rgba(0,104,81,0) 68%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 420
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-label)',
      color: 'var(--si-emerald-700)',
      marginBottom: 10
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h4", {
    style: {
      font: 'var(--type-h4)',
      letterSpacing: 'var(--tracking-heading)'
    }
  }, title), body && /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body)',
      color: 'var(--si-emerald-800)',
      marginTop: 8
    }
  }, body), cta && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "dark",
    iconAfter: "arrow-right",
    onClick: onCta
  }, cta))));
}
Object.assign(__ds_scope, { InsightCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/InsightCard.jsx", error: String((e && e.message) || e) }); }

// components/data/ListRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TINT = {
  good: 'var(--si-tint-good)',
  warn: 'var(--si-tint-warn)',
  alert: 'var(--si-tint-alert)',
  info: 'var(--si-tint-info)',
  neutral: 'var(--si-gray-100)'
};
const INK = {
  good: '#1C7A55',
  warn: '#9A6412',
  alert: '#A8352D',
  info: '#4A3AC4',
  neutral: 'var(--text-secondary)'
};
function ListRow({
  icon,
  iconTone = 'good',
  leading,
  title,
  meta,
  trailing,
  chevron = true,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    role: onClick ? 'button' : undefined,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, rest, {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '10px 8px',
      borderRadius: 'var(--radius-md)',
      background: hover && onClick ? 'var(--si-gray-100)' : 'transparent',
      cursor: onClick ? 'pointer' : 'default',
      transition: 'var(--transition-control)',
      ...style
    }
  }), leading || icon && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 36,
      height: 36,
      flex: '0 0 auto',
      display: 'grid',
      placeItems: 'center',
      borderRadius: 'var(--radius-sm)',
      background: TINT[iconTone],
      color: INK[iconTone]
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 18
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-label)',
      fontWeight: 'var(--weight-bold)',
      color: 'var(--text-primary)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, title), meta && /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-caption)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-secondary)',
      marginTop: 2
    }
  }, meta)), trailing, chevron && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-right",
    size: 16,
    color: "var(--si-gray-400)"
  }));
}
Object.assign(__ds_scope, { ListRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ListRow.jsx", error: String((e && e.message) || e) }); }

// components/data/MetricCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const DOT = {
  good: 'var(--si-status-good)',
  warn: 'var(--si-status-warn)',
  alert: 'var(--si-status-alert)',
  info: 'var(--si-status-info)',
  activity: 'var(--si-status-activity)'
};
function MetricCard({
  label,
  icon,
  iconTone = 'good',
  value,
  unit,
  status,
  statusTone = 'good',
  delta,
  aside,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("section", _extends({}, rest, {
    style: {
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-sm)',
      padding: 'var(--card-pad)',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      font: 'var(--type-label)',
      color: 'var(--text-secondary)'
    }
  }, icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 16,
    color: DOT[iconTone]
  }), label), aside), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--weight-bold) var(--text-h2) / 1 var(--font-display)',
      letterSpacing: 'var(--tracking-heading)'
    }
  }, value), unit && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-label)',
      color: 'var(--text-secondary)'
    }
  }, unit)), (status || delta) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, status && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      font: 'var(--type-label)',
      color: 'var(--text-primary)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: DOT[statusTone]
    }
  }), status), delta && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      font: 'var(--type-caption)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: String(delta).trim().startsWith('-') ? 'trending-down' : 'trending-up',
    size: 13
  }), delta)));
}
Object.assign(__ds_scope, { MetricCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/MetricCard.jsx", error: String((e && e.message) || e) }); }

// components/data/ScoreDonut.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ScoreDonut({
  value = 0,
  max = 100,
  size = 108,
  thickness = 13,
  label,
  style,
  ...rest
}) {
  const pct = Math.max(0, Math.min(1, value / max));
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      position: 'relative',
      width: size,
      height: size,
      ...style
    }
  }), /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: '0 0 ' + size + ' ' + size,
    style: {
      transform: 'rotate(-90deg)'
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: "var(--si-emerald-100)",
    strokeWidth: thickness
  }), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: "var(--si-emerald-600)",
    strokeWidth: thickness,
    strokeLinecap: "round",
    strokeDasharray: c,
    strokeDashoffset: c * (1 - pct),
    style: {
      transition: 'stroke-dashoffset var(--duration-slow) var(--ease-out)'
    }
  })), label && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'grid',
      placeItems: 'center',
      textAlign: 'center',
      font: 'var(--type-caption)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-secondary)'
    }
  }, label));
}
Object.assign(__ds_scope, { ScoreDonut });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ScoreDonut.jsx", error: String((e && e.message) || e) }); }

// components/data/TrendChart.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Smooth area+line chart. Emerald stroke over the --gradient-chart wash,
   dotted baseline grid and a filled dot on the last point. */
function TrendChart({
  data = [],
  height = 168,
  xLabels = [],
  yLabels = [],
  tone = 'light',
  style,
  ...rest
}) {
  const w = 100,
    h = 100;
  const max = Math.max(...data, 1),
    min = Math.min(...data, 0);
  const span = max - min || 1;
  const pts = data.map((v, i) => [i / Math.max(data.length - 1, 1) * w, h - (v - min) / span * h * 0.82 - h * 0.09]);
  const path = pts.map((p, i) => {
    if (!i) return 'M' + p[0] + ',' + p[1];
    const [px, py] = pts[i - 1];
    const cx = (px + p[0]) / 2;
    return 'C' + cx + ',' + py + ' ' + cx + ',' + p[1] + ' ' + p[0] + ',' + p[1];
  }).join(' ');
  const dark = tone === 'dark';
  const stroke = dark ? '#7FE9C8' : 'var(--si-emerald-700)';
  const last = pts[pts.length - 1] || [0, 0];
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, yLabels.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      font: 'var(--type-caption)',
      color: dark ? 'var(--text-on-ink-muted)' : 'var(--text-muted)',
      height,
      paddingBottom: 2
    }
  }, yLabels.map(l => /*#__PURE__*/React.createElement("span", {
    key: l
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      position: 'relative',
      height
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 100 100",
    preserveAspectRatio: "none",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      overflow: 'visible'
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "si-trend-fill",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: dark ? '#7FE9C8' : '#006851',
    stopOpacity: dark ? 0.35 : 0.16
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: dark ? '#7FE9C8' : '#006851',
    stopOpacity: "0"
  }))), [25, 50, 75].map(y => /*#__PURE__*/React.createElement("line", {
    key: y,
    x1: "0",
    y1: y,
    x2: "100",
    y2: y,
    stroke: dark ? 'rgba(255,255,255,.12)' : 'var(--si-gray-200)',
    strokeWidth: "0.4",
    strokeDasharray: "1.5 2",
    vectorEffect: "non-scaling-stroke"
  })), /*#__PURE__*/React.createElement("path", {
    d: path + ' L100,100 L0,100 Z',
    fill: "url(#si-trend-fill)"
  }), /*#__PURE__*/React.createElement("path", {
    d: path,
    fill: "none",
    stroke: stroke,
    strokeWidth: "2",
    vectorEffect: "non-scaling-stroke",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 'calc(' + last[0] + '% - 5px)',
      top: 'calc(' + last[1] + '% - 5px)',
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: dark ? '#FFFFFF' : 'var(--si-emerald-700)',
      boxShadow: dark ? 'none' : '0 0 0 3px var(--surface-card)'
    }
  }))), xLabels.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 8,
      font: 'var(--type-caption)',
      color: dark ? 'var(--text-on-ink-muted)' : 'var(--text-muted)'
    }
  }, xLabels.map(l => /*#__PURE__*/React.createElement("span", {
    key: l
  }, l))));
}
Object.assign(__ds_scope, { TrendChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/TrendChart.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Checkbox({
  label,
  description,
  checked,
  onChange,
  disabled,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: description ? 'flex-start' : 'center',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    checked: checked,
    onChange: onChange,
    disabled: disabled
  }, rest, {
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      flex: '0 0 auto',
      display: 'grid',
      placeItems: 'center',
      borderRadius: 'var(--radius-xs)',
      transition: 'var(--transition-control)',
      background: checked ? 'var(--si-emerald-700)' : 'var(--surface-card)',
      border: '1px solid ' + (checked ? 'var(--si-emerald-700)' : 'var(--border-strong)'),
      color: 'var(--si-white)',
      marginTop: description ? 2 : 0
    }
  }, checked && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 13
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body)'
    }
  }, label), description && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      font: 'var(--type-caption)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-secondary)',
      marginTop: 2
    }
  }, description)));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  label,
  hint,
  error,
  icon,
  id,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || rest.name || undefined;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      font: 'var(--type-label)',
      color: 'var(--text-primary)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '0 12px',
      background: 'var(--surface-card)',
      border: '1px solid ' + (error ? 'var(--si-status-alert)' : focus ? 'var(--si-emerald-700)' : 'var(--border-subtle)'),
      boxShadow: focus ? '0 0 0 3px var(--focus-ring)' : 'none',
      borderRadius: 'var(--radius-md)',
      transition: 'var(--transition-control)'
    }
  }, icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 16,
    color: "var(--text-muted)"
  }), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false)
  }, rest, {
    style: {
      flex: 1,
      minWidth: 0,
      border: 0,
      outline: 'none',
      background: 'transparent',
      padding: '11px 0',
      font: 'var(--type-body)',
      color: 'var(--text-primary)'
    }
  }))), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-caption)',
      fontSize: 'var(--text-sm)',
      color: error ? 'var(--si-status-alert)' : 'var(--text-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Radio({
  label,
  description,
  checked,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: description ? 'flex-start' : 'center',
      cursor: 'pointer',
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "radio",
    checked: checked
  }, rest, {
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      flex: '0 0 auto',
      display: 'grid',
      placeItems: 'center',
      borderRadius: '50%',
      background: 'var(--surface-card)',
      transition: 'var(--transition-control)',
      border: '1px solid ' + (checked ? 'var(--si-emerald-700)' : 'var(--border-strong)'),
      marginTop: description ? 2 : 0
    }
  }, checked && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: 'var(--si-emerald-700)'
    }
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body)'
    }
  }, label), description && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      font: 'var(--type-caption)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-secondary)',
      marginTop: 2
    }
  }, description)));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Select({
  label,
  hint,
  options = [],
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    style: {
      font: 'var(--type-label)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-md)',
      border: '1px solid ' + (focus ? 'var(--si-emerald-700)' : 'var(--border-subtle)'),
      boxShadow: focus ? '0 0 0 3px var(--focus-ring)' : 'none',
      transition: 'var(--transition-control)'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false)
  }, rest, {
    style: {
      appearance: 'none',
      width: '100%',
      border: 0,
      outline: 'none',
      background: 'transparent',
      padding: '11px 38px 11px 12px',
      font: 'var(--type-body)',
      color: 'var(--text-primary)',
      cursor: 'pointer'
    }
  }), options.map(o => typeof o === 'string' ? /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o) : /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label))), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 16,
    color: "var(--text-muted)",
    style: {
      position: 'absolute',
      right: 12,
      pointerEvents: 'none'
    }
  })), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-caption)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)'
    }
  }, hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Switch({
  checked,
  onChange,
  label,
  disabled,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    role: "switch",
    checked: checked,
    onChange: onChange,
    disabled: disabled
  }, rest, {
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 42,
      height: 24,
      borderRadius: 'var(--radius-pill)',
      padding: 3,
      flex: '0 0 auto',
      background: checked ? 'var(--si-emerald-700)' : 'var(--si-gray-300)',
      transition: 'background-color var(--duration-base) var(--ease-standard)',
      display: 'flex',
      justifyContent: checked ? 'flex-end' : 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      borderRadius: '50%',
      background: 'var(--si-white)',
      boxShadow: 'var(--shadow-xs)',
      transition: 'transform var(--duration-base) var(--ease-out)'
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body)'
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SidebarNav.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SidebarNav({
  items = [],
  activeId,
  onSelect,
  logoSrc,
  user,
  footer,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({}, rest, {
    style: {
      width: 'var(--sidebar-w)',
      flex: '0 0 auto',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--surface-card)',
      borderRight: '1px solid var(--border-subtle)',
      padding: 'var(--space-5) var(--space-4)',
      gap: 'var(--space-8)',
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingLeft: 6
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    size: 28,
    src: logoSrc,
    wordmark: "Secret\xE1ria Invis\xEDvel",
    style: {
      gap: 8
    }
  })), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      flex: 1
    }
  }, items.map(it => {
    const active = it.id === activeId;
    return /*#__PURE__*/React.createElement("li", {
      key: it.id
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => onSelect && onSelect(it.id),
      style: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 10px',
        background: active ? 'var(--si-mint)' : 'transparent',
        color: active ? 'var(--si-emerald-700)' : 'var(--text-secondary)',
        fontWeight: active ? 'var(--weight-medium)' : 'var(--weight-regular)',
        font: 'var(--type-body)',
        border: 0,
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'var(--transition-control)'
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: it.icon,
      size: 18
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, it.label), it.badge != null && /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--type-caption)',
        fontWeight: 'var(--weight-medium)',
        background: active ? 'var(--si-white)' : 'var(--si-mint)',
        color: 'var(--si-emerald-700)',
        borderRadius: 'var(--radius-pill)',
        padding: '2px 7px'
      }
    }, it.badge)));
  })), footer, user && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '8px 6px',
      borderTop: '1px solid var(--border-subtle)',
      paddingTop: 14
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    name: user.name,
    src: user.avatar
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-label)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, user.name), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-caption)',
      color: 'var(--text-muted)'
    }
  }, user.meta)), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-right",
    size: 16,
    color: "var(--text-muted)"
  })));
}
Object.assign(__ds_scope, { SidebarNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SidebarNav.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tabs({
  tabs = [],
  activeId,
  onSelect,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: 'inline-flex',
      gap: 2,
      padding: 3,
      background: 'var(--si-gray-100)',
      borderRadius: 'var(--radius-md)',
      ...style
    }
  }), tabs.map(t => {
    const id = typeof t === 'string' ? t : t.id;
    const label = typeof t === 'string' ? t : t.label;
    const active = id === activeId;
    return /*#__PURE__*/React.createElement("button", {
      key: id,
      type: "button",
      onClick: () => onSelect && onSelect(id),
      style: {
        padding: '7px 14px',
        border: 0,
        cursor: 'pointer',
        borderRadius: 'var(--radius-sm)',
        background: active ? 'var(--surface-card)' : 'transparent',
        boxShadow: active ? 'var(--shadow-xs)' : 'none',
        color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
        font: 'var(--type-label)',
        transition: 'var(--transition-control)'
      }
    }, label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TopBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function TopBar({
  title,
  subtitle,
  meta,
  actions,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("header", _extends({}, rest, {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 'var(--space-6)',
      padding: 'var(--space-6) var(--space-8)',
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", null, title && /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--type-h3)'
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-secondary)',
      marginTop: 4
    }
  }, subtitle)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)'
    }
  }, meta && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '9px 14px',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      font: 'var(--type-label)',
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "calendar",
    size: 16
  }), meta, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 14
  })), actions));
}
Object.assign(__ds_scope, { TopBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TopBar.jsx", error: String((e && e.message) || e) }); }

// components/product/AgendaDay.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Day column for the agenda view: header with weekday + date,
   then slots. Empty slots stay visible so gaps read as opportunity. */
function AgendaDay({
  weekday,
  date,
  today,
  occupancy,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("section", _extends({}, rest, {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      minWidth: 0,
      ...style
    }
  }), /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
      padding: '10px 12px',
      borderRadius: 'var(--radius-md)',
      background: today ? 'var(--si-emerald-700)' : 'var(--surface-card)',
      color: today ? 'var(--si-white)' : 'var(--text-primary)',
      border: today ? '1px solid transparent' : '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-label)'
    }
  }, weekday, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.6
    }
  }, " ", date)), occupancy != null && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-caption)',
      opacity: today ? 0.85 : 0.6
    }
  }, occupancy)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, children));
}
Object.assign(__ds_scope, { AgendaDay });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/AgendaDay.jsx", error: String((e && e.message) || e) }); }

// components/product/AppointmentCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STATE = {
  confirmado: ['good', 'Confirmado'],
  pendente: ['warn', 'Aguardando confirmação'],
  remarcado: ['info', 'Remarcado'],
  cancelado: ['alert', 'Cancelado']
};
function AppointmentCard({
  time,
  duration,
  patient,
  professional,
  service,
  state = 'confirmado',
  channel = 'WhatsApp',
  compact,
  style,
  ...rest
}) {
  const [tone, label] = STATE[state] || STATE.confirmado;
  return /*#__PURE__*/React.createElement("article", _extends({}, rest, {
    style: {
      display: 'flex',
      gap: 14,
      padding: compact ? '12px 14px' : 'var(--card-pad)',
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-xs)',
      borderLeft: '3px solid ' + (tone === 'good' ? 'var(--si-emerald-600)' : tone === 'warn' ? 'var(--si-status-warn)' : tone === 'alert' ? 'var(--si-status-alert)' : 'var(--si-status-info)'),
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 62
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--weight-bold) var(--text-h5) / 1.1 var(--font-sans)'
    }
  }, time), duration && /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-caption)',
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, duration)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body)',
      fontWeight: 'var(--weight-medium)'
    }
  }, patient), /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: tone,
    dot: true
  }, label)), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-label)',
      fontWeight: 'var(--weight-regular)',
      color: 'var(--text-secondary)',
      marginTop: 4
    }
  }, [service, professional].filter(Boolean).join(' · ')), channel && /*#__PURE__*/React.createElement("p", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      font: 'var(--type-caption)',
      color: 'var(--text-muted)',
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "message-circle",
    size: 13
  }), "agendado por ", channel)));
}
Object.assign(__ds_scope, { AppointmentCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/AppointmentCard.jsx", error: String((e && e.message) || e) }); }

// components/product/ChatBubble.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* WhatsApp-shaped message bubble. "in" = patient (white), "out" = the
   invisible secretary (mint), "system" = centred automation note. */
function ChatBubble({
  direction = 'in',
  children,
  time,
  status = 'read',
  quick,
  style,
  ...rest
}) {
  if (direction === 'system') {
    return /*#__PURE__*/React.createElement("p", _extends({}, rest, {
      style: {
        alignSelf: 'center',
        maxWidth: '80%',
        textAlign: 'center',
        padding: '6px 12px',
        background: 'var(--si-white)',
        color: 'var(--text-secondary)',
        font: 'var(--type-caption)',
        fontSize: 'var(--text-sm)',
        borderRadius: 'var(--radius-sm)',
        boxShadow: 'var(--shadow-xs)',
        ...style
      }
    }), children);
  }
  const out = direction === 'out';
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      alignSelf: out ? 'flex-end' : 'flex-start',
      maxWidth: '78%',
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: out ? 'var(--si-mint)' : 'var(--si-white)',
      color: out ? 'var(--si-emerald-900)' : 'var(--text-primary)',
      padding: '9px 12px 7px',
      font: 'var(--type-body)',
      boxShadow: 'var(--shadow-xs)',
      borderRadius: out ? '14px 14px 4px 14px' : '14px 14px 14px 4px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block'
    }
  }, children), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 4,
      marginTop: 3,
      font: 'var(--type-caption)',
      color: out ? 'var(--si-emerald-600)' : 'var(--text-muted)'
    }
  }, time, out && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: status === 'read' ? 'check-check' : 'check',
    size: 13,
    color: status === 'read' ? 'var(--si-teal)' : 'currentColor'
  }))), quick && quick.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 6,
      justifyContent: out ? 'flex-end' : 'flex-start'
    }
  }, quick.map(q => /*#__PURE__*/React.createElement("span", {
    key: q,
    style: {
      padding: '6px 12px',
      background: 'var(--si-white)',
      color: 'var(--si-emerald-700)',
      font: 'var(--type-label)',
      border: '1px solid var(--border-ink)',
      borderRadius: 'var(--radius-pill)'
    }
  }, q))));
}
Object.assign(__ds_scope, { ChatBubble });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/ChatBubble.jsx", error: String((e && e.message) || e) }); }

// components/product/ChatThread.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* WhatsApp conversation shell: contact header, message canvas, composer.
   Canvas is a warm-neutral wash, not mint, so bubbles stay legible. */
function ChatThread({
  contact = {},
  children,
  composerPlaceholder = 'Mensagem',
  footer,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      background: '#EDE7DF',
      borderRadius: 'var(--radius-xl)',
      border: '1px solid var(--border-subtle)',
      ...style
    }
  }), /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '12px 14px',
      background: 'var(--surface-card)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    name: contact.name,
    src: contact.avatar,
    size: "sm"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-label)',
      fontWeight: 'var(--weight-bold)'
    }
  }, contact.name), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-caption)',
      color: 'var(--si-emerald-600)'
    }
  }, contact.status || 'online')), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "phone",
    size: 17,
    color: "var(--text-muted)"
  }), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "more-vertical",
    size: 17,
    color: "var(--text-muted)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      padding: 'var(--space-4)'
    }
  }, children), footer || /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '10px 12px',
      background: 'var(--surface-card)',
      borderTop: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "smile",
    size: 19,
    color: "var(--text-muted)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      font: 'var(--type-body)',
      color: 'var(--text-muted)'
    }
  }, composerPlaceholder), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "paperclip",
    size: 18,
    color: "var(--text-muted)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      borderRadius: '50%',
      background: 'var(--si-emerald-700)',
      display: 'grid',
      placeItems: 'center',
      color: 'var(--si-white)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "send",
    size: 16
  }))));
}
Object.assign(__ds_scope, { ChatThread });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/ChatThread.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/LandingBody.jsx
try { (() => {
function HowItWorks() {
  const {
    SectionLabel,
    Card,
    Icon
  } = window.SecretRiaInvisVelDesignSystem_fc77d1;
  const steps = [['message-circle', 'O paciente manda mensagem', 'A qualquer hora, no número que sua clínica já usa. A secretária responde em segundos, com o tom da sua clínica.'], ['calendar-check', 'Ela agenda e confirma', 'Consulta os horários reais do profissional, marca, confirma na véspera e remarca quando o paciente pede.'], ['user-check', 'Sua equipe assume quando importa', 'Casos clínicos, orçamentos e exceções vão direto para a secretária humana, com todo o histórico da conversa.']];
  return /*#__PURE__*/React.createElement("section", {
    id: "como",
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: 'var(--section-pad-y) var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    number: "01"
  }, "Como funciona"), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--weight-medium) var(--text-h1) / var(--leading-tight) var(--font-display)',
      letterSpacing: 'var(--tracking-display)',
      marginTop: 16,
      maxWidth: '22ch'
    }
  }, "Tr\xEAs passos, nenhuma troca de sistema"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
      gap: 'var(--space-4)',
      marginTop: 'var(--space-10)'
    }
  }, steps.map(([icon, title, body], i) => /*#__PURE__*/React.createElement(Card, {
    key: title,
    padding: "lg"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'grid',
      placeItems: 'center',
      width: 44,
      height: 44,
      borderRadius: 'var(--radius-md)',
      background: 'var(--si-mint)',
      color: 'var(--si-emerald-700)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 22
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-caption)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)',
      marginTop: 20
    }
  }, "0", i + 1), /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--type-h4)',
      marginTop: 6
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-secondary)',
      marginTop: 10
    }
  }, body)))));
}
function AgendaFeature() {
  const {
    SectionLabel,
    AppointmentCard,
    EmptySlot,
    Card,
    Badge
  } = window.SecretRiaInvisVelDesignSystem_fc77d1;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--si-mint)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: 'var(--section-pad-y) var(--space-6)',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: 'var(--space-12)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionLabel, {
    number: "02"
  }, "Agenda cheia"), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--weight-medium) var(--text-h1) / var(--leading-tight) var(--font-display)',
      letterSpacing: 'var(--tracking-display)',
      marginTop: 16,
      color: 'var(--si-emerald-900)'
    }
  }, "Cada buraco na agenda \xE9 dinheiro parado"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body-lg)',
      color: 'var(--si-emerald-800)',
      marginTop: 18,
      maxWidth: '48ch'
    }
  }, "A secret\xE1ria confirma na v\xE9spera, recupera faltas no mesmo dia e oferece os hor\xE1rios vagos para quem est\xE1 na lista de espera \u2014 sem ningu\xE9m da equipe digitar uma mensagem."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginTop: 26,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "ink"
  }, "4% de faltas"), /*#__PURE__*/React.createElement(Badge, {
    tone: "brand",
    dot: true
  }, "82% de confirma\xE7\xE3o autom\xE1tica"))), /*#__PURE__*/React.createElement(Card, {
    padding: "lg",
    radius: "2xl"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-label)',
      color: 'var(--text-secondary)',
      marginBottom: 14
    }
  }, "Ter\xE7a, 23 de junho \xB7 Dra. Helena Rocha"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(AppointmentCard, {
    time: "09:00",
    duration: "30 min",
    patient: "Mariana Castro",
    service: "Retorno"
  }), /*#__PURE__*/React.createElement(AppointmentCard, {
    time: "10:30",
    duration: "45 min",
    patient: "Jo\xE3o Paulo",
    service: "Primeira consulta",
    state: "pendente"
  }), /*#__PURE__*/React.createElement(EmptySlot, {
    time: "11:30",
    label: "Livre \xB7 oferecido \xE0 lista de espera"
  }), /*#__PURE__*/React.createElement(AppointmentCard, {
    time: "15:00",
    duration: "30 min",
    patient: "Helena Braga",
    service: "Retorno"
  })))));
}
function Results() {
  const {
    SectionLabel,
    TrendChart
  } = window.SecretRiaInvisVelDesignSystem_fc77d1;
  const stats = [['11s', 'tempo médio de resposta'], ['82%', 'das confirmações sem intervenção'], ['46', 'consultas recuperadas por mês'], ['52h', 'devolvidas à equipe por mês']];
  return /*#__PURE__*/React.createElement("section", {
    id: "resultados",
    style: {
      position: 'relative',
      background: 'var(--si-emerald-700)',
      color: 'var(--text-on-ink)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(Blobs, {
    opacity: 0.07
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: 'var(--section-pad-y) var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    number: "03",
    tone: "light"
  }, "Resultados"), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--weight-medium) var(--text-h1) / var(--leading-tight) var(--font-display)',
      letterSpacing: 'var(--tracking-display)',
      marginTop: 16,
      color: '#EAF6F1',
      maxWidth: '24ch'
    }
  }, "Medido no painel, n\xE3o no discurso"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: 'var(--space-8)',
      marginTop: 'var(--space-12)'
    }
  }, stats.map(([v, l]) => /*#__PURE__*/React.createElement("div", {
    key: l
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--weight-medium) var(--text-h1) / 1 var(--font-display)',
      letterSpacing: 'var(--tracking-display)',
      color: '#FFFFFF'
    }
  }, v), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-label)',
      color: 'rgba(234,246,241,.76)',
      marginTop: 10
    }
  }, l)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-16)',
      padding: 'var(--space-6)',
      background: 'rgba(0,0,0,.14)',
      borderRadius: 'var(--radius-2xl)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-label)',
      color: 'rgba(234,246,241,.76)',
      marginBottom: 18
    }
  }, "Consultas confirmadas por semana \xB7 Cl\xEDnica Vida"), /*#__PURE__*/React.createElement(TrendChart, {
    tone: "dark",
    data: [58, 64, 61, 72, 78, 74, 86, 92, 88, 97, 104, 112],
    height: 180,
    yLabels: ['120', '80', '40'],
    xLabels: ['abr', 'mai', 'jun']
  }))));
}
function Quote() {
  const {
    Avatar
  } = window.SecretRiaInvisVelDesignSystem_fc77d1;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: 'var(--section-pad-y) var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: 'var(--space-12)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Photo, {
    label: "Recep\xE7\xE3o da cl\xEDnica ou secret\xE1ria ao telefone"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--weight-medium) var(--text-h2) / 1.25 var(--font-display)',
      letterSpacing: 'var(--tracking-heading)',
      color: 'var(--si-emerald-800)'
    }
  }, "\u201CMinha secret\xE1ria parou de correr atr\xE1s de confirma\xE7\xE3o e voltou a cuidar de quem est\xE1 na sala de espera.\u201D"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginTop: 26
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Helena Rocha",
    tone: "ink",
    size: "lg"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-label)',
      fontWeight: 'var(--weight-bold)'
    }
  }, "Dra. Helena Rocha"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-label)',
      fontWeight: 'var(--weight-regular)',
      color: 'var(--text-secondary)'
    }
  }, "Cl\xEDnica Vida \xB7 S\xE3o Paulo"))))));
}
Object.assign(window, {
  HowItWorks,
  AgendaFeature,
  Results,
  Quote
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/LandingBody.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/LandingChrome.jsx
try { (() => {
function Blobs({
  opacity = 0.1
}) {
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: '-8%',
      top: '-30%',
      width: 620,
      height: 620,
      borderRadius: '46% 54% 60% 40% / 52% 44% 56% 48%',
      background: '#FFFFFF',
      opacity
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: '-12%',
      bottom: '-42%',
      width: 720,
      height: 720,
      borderRadius: '58% 42% 38% 62% / 44% 58% 42% 56%',
      background: '#FFFFFF',
      opacity: opacity * 0.8
    }
  }));
}
function Photo({
  label,
  ratio = '4 / 3',
  tone = 'mint',
  style
}) {
  const bg = tone === 'mint' ? 'var(--gradient-mint)' : 'var(--si-gray-100)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: ratio,
      background: bg,
      borderRadius: 'var(--radius-2xl)',
      display: 'grid',
      placeItems: 'center',
      textAlign: 'center',
      padding: 24,
      border: '1px dashed var(--si-emerald-300)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-label)',
      color: 'var(--si-emerald-600)'
    }
  }, "Placeholder de imagem", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'var(--weight-regular)',
      color: 'var(--text-muted)'
    }
  }, label)));
}
function LandingNav() {
  const {
    Logo,
    Button
  } = window.SecretRiaInvisVelDesignSystem_fc77d1;
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 20,
      background: 'rgba(248,249,254,.82)',
      backdropFilter: 'var(--blur-glass)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: '14px var(--space-6)',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    size: 30,
    src: "../../assets/logo-si-mark.png"
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 'var(--space-6)',
      marginLeft: 'auto',
      font: 'var(--type-label)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#como",
    style: {
      color: 'var(--text-secondary)'
    }
  }, "Como funciona"), /*#__PURE__*/React.createElement("a", {
    href: "#resultados",
    style: {
      color: 'var(--text-secondary)'
    }
  }, "Resultados"), /*#__PURE__*/React.createElement("a", {
    href: "#planos",
    style: {
      color: 'var(--text-secondary)'
    }
  }, "Planos"), /*#__PURE__*/React.createElement("a", {
    href: "#duvidas",
    style: {
      color: 'var(--text-secondary)'
    }
  }, "D\xFAvidas")), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    iconAfter: "arrow-right"
  }, "Agendar demonstra\xE7\xE3o")));
}
function LandingFooter() {
  const {
    Logo
  } = window.SecretRiaInvisVelDesignSystem_fc77d1;
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--si-black)',
      color: 'var(--si-white)',
      padding: 'var(--space-16) var(--space-6) var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'minmax(220px,1.2fr) repeat(3, minmax(120px,1fr))',
      gap: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Logo, {
    size: 30,
    variant: "light",
    src: "../../assets/logo-si-mark.png"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body)',
      color: 'rgba(255,255,255,.62)',
      marginTop: 16,
      maxWidth: '34ch'
    }
  }, "Recepcionista de IA no WhatsApp para cl\xEDnicas. Um produto Sapient.IA.")), [['Produto', ['Como funciona', 'Planos', 'Painel do cliente']], ['Empresa', ['Sapient.IA', 'Contato', 'Trabalhe com a gente']], ['Legal', ['Termos de uso', 'Privacidade', 'LGPD']]].map(([t, links]) => /*#__PURE__*/React.createElement("div", {
    key: t
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-label)',
      marginBottom: 12
    }
  }, t), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, links.map(l => /*#__PURE__*/React.createElement("li", {
    key: l
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      font: 'var(--type-body)',
      color: 'rgba(255,255,255,.62)'
    }
  }, l))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      marginTop: 'var(--space-12)',
      paddingTop: 'var(--space-5)',
      borderTop: '1px solid rgba(255,255,255,.14)',
      display: 'flex',
      justifyContent: 'space-between',
      gap: 16,
      flexWrap: 'wrap',
      font: 'var(--type-caption)',
      fontSize: 'var(--text-sm)',
      color: 'rgba(255,255,255,.5)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Secret\xE1ria Invis\xEDvel \xB7 Sapient.IA"), /*#__PURE__*/React.createElement("span", null, "secretariainvisivel.com.br")));
}
Object.assign(window, {
  Blobs,
  Photo,
  LandingNav,
  LandingFooter
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/LandingChrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/LandingHero.jsx
try { (() => {
function LandingHero() {
  const {
    Button,
    Badge,
    ChatThread,
    ChatBubble
  } = window.SecretRiaInvisVelDesignSystem_fc77d1;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      background: 'var(--gradient-emerald)',
      color: 'var(--text-on-ink)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(Blobs, {
    opacity: 0.09
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: 'var(--space-24) var(--space-6)',
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1.05fr) minmax(0,.85fr)',
      gap: 'var(--space-12)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Badge, {
    tone: "ink",
    icon: "sparkles",
    style: {
      background: 'rgba(255,255,255,.16)',
      color: '#fff'
    }
  }, "IA no WhatsApp \xB7 24/7"), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--weight-medium) var(--text-display-3) / var(--leading-display) var(--font-display)',
      letterSpacing: 'var(--tracking-display)',
      marginTop: 22,
      color: '#EAF6F1'
    }
  }, "Sua cl\xEDnica responde", /*#__PURE__*/React.createElement("br", null), "em 11 segundos.", /*#__PURE__*/React.createElement("br", null), "Inclusive \xE0s 23h."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body-lg)',
      color: 'rgba(234,246,241,.86)',
      marginTop: 22,
      maxWidth: '46ch'
    }
  }, "A Secret\xE1ria Invis\xEDvel agenda, confirma e faz follow-up de consultas pelo WhatsApp \u2014 ao lado da sua secret\xE1ria humana, n\xE3o no lugar dela."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 32,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "inverse",
    size: "lg",
    iconAfter: "arrow-right"
  }, "Agendar demonstra\xE7\xE3o"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "lg",
    style: {
      color: '#EAF6F1',
      borderColor: 'rgba(255,255,255,.38)'
    }
  }, "Ver o painel")), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-label)',
      color: 'rgba(234,246,241,.7)',
      marginTop: 22
    }
  }, "Implanta\xE7\xE3o em 7 dias \xB7 sem trocar seu sistema de agenda")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 330,
      padding: 12,
      background: 'rgba(255,255,255,.14)',
      borderRadius: 'var(--radius-3xl)',
      boxShadow: 'var(--shadow-lg)'
    }
  }, /*#__PURE__*/React.createElement(ChatThread, {
    contact: {
      name: 'Clínica Vida',
      status: 'online'
    },
    style: {
      height: 470,
      borderRadius: 'var(--radius-2xl)'
    }
  }, /*#__PURE__*/React.createElement(ChatBubble, {
    direction: "in",
    time: "22:58"
  }, "Boa noite! Voc\xEAs atendem amanh\xE3?"), /*#__PURE__*/React.createElement(ChatBubble, {
    direction: "out",
    time: "22:58",
    status: "read",
    quick: ['09:00', '15:30']
  }, "Boa noite! Atendemos sim. Tenho estes hor\xE1rios com a Dra. Helena:"), /*#__PURE__*/React.createElement(ChatBubble, {
    direction: "in",
    time: "22:59"
  }, "09:00"), /*#__PURE__*/React.createElement(ChatBubble, {
    direction: "out",
    time: "22:59",
    status: "read"
  }, "Agendado para amanh\xE3 \xE0s 09:00. Envio a confirma\xE7\xE3o \xE0s 8h."), /*#__PURE__*/React.createElement(ChatBubble, {
    direction: "system"
  }, "Agenda da cl\xEDnica atualizada"))))));
}
Object.assign(window, {
  LandingHero
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/LandingHero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/LandingOffer.jsx
try { (() => {
function Pricing() {
  const {
    SectionLabel,
    Card,
    Button,
    Badge,
    Icon
  } = window.SecretRiaInvisVelDesignSystem_fc77d1;
  const plans = [['Essencial', 'R$ 697', '/mês', '1 profissional', ['Atendimento 24/7 no WhatsApp', 'Agendamento e confirmação', 'Painel com métricas', 'Implantação em 7 dias'], false], ['Clínica', 'R$ 1.290', '/mês', 'até 5 profissionais', ['Tudo do Essencial', 'Follow-up de faltas e lista de espera', 'Transferência para a equipe', 'Relatório semanal por e-mail'], true], ['Rede', 'Sob consulta', '', 'múltiplas unidades', ['Tudo do Clínica', 'Integração com seu sistema de agenda', 'Gestor de conta dedicado', 'Treinamento da equipe'], false]];
  return /*#__PURE__*/React.createElement("section", {
    id: "planos",
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: 'var(--section-pad-y) var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    number: "04"
  }, "Planos"), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--weight-medium) var(--text-h1) / var(--leading-tight) var(--font-display)',
      letterSpacing: 'var(--tracking-display)',
      marginTop: 16
    }
  }, "Custa menos que meio sal\xE1rio de recep\xE7\xE3o"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: 'var(--space-4)',
      marginTop: 'var(--space-10)',
      alignItems: 'start'
    }
  }, plans.map(([name, price, per, meta, items, featured]) => /*#__PURE__*/React.createElement(Card, {
    key: name,
    padding: "lg",
    radius: "2xl",
    tone: featured ? 'ink' : 'plain'
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--type-h4)'
    }
  }, name), featured && /*#__PURE__*/React.createElement(Badge, {
    style: {
      background: 'rgba(255,255,255,.18)',
      color: '#fff'
    }
  }, "Mais escolhido")), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-label)',
      fontWeight: 'var(--weight-regular)',
      color: featured ? 'var(--text-on-ink-muted)' : 'var(--text-secondary)',
      marginTop: 6
    }
  }, meta), /*#__PURE__*/React.createElement("p", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 4,
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--weight-medium) var(--text-h2) / 1 var(--font-display)',
      letterSpacing: 'var(--tracking-display)'
    }
  }, price), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-label)',
      color: featured ? 'var(--text-on-ink-muted)' : 'var(--text-secondary)'
    }
  }, per)), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: '24px 0 0',
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, items.map(it => /*#__PURE__*/React.createElement("li", {
    key: it,
    style: {
      display: 'flex',
      gap: 9,
      font: 'var(--type-body)',
      color: featured ? 'var(--text-on-ink)' : 'var(--text-primary)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 17,
    color: featured ? '#7FE9C8' : 'var(--si-emerald-600)',
    style: {
      marginTop: 2
    }
  }), it))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Button, {
    fullWidth: true,
    variant: featured ? 'inverse' : 'outline',
    iconAfter: "arrow-right"
  }, "Falar com a gente"))))));
}
function Faq() {
  const {
    SectionLabel,
    Icon
  } = window.SecretRiaInvisVelDesignSystem_fc77d1;
  const [open, setOpen] = React.useState(0);
  const qs = [['A IA substitui minha secretária?', 'Não. Ela cobre o que consome o dia da sua equipe — responder, agendar, confirmar e cobrar retorno. Casos clínicos, orçamentos e exceções vão para a pessoa certa, com o histórico da conversa.'], ['Preciso trocar meu sistema de agenda?', 'Não. A secretária lê e escreve nos horários que você já usa. Quando não há integração pronta, operamos por uma agenda espelhada durante a implantação.'], ['E o número da clínica?', 'Continua o mesmo. Usamos a API oficial do WhatsApp Business no seu número, com o histórico preservado.'], ['Quanto tempo até funcionar?', 'Sete dias. Na primeira semana mapeamos os fluxos, o tom de voz e as regras de agenda; depois acompanhamos os primeiros 30 dias no painel.'], ['Como fica a LGPD?', 'Dados ficam em servidores no Brasil, com contrato de tratamento, registro de consentimento e acesso auditável por usuário.']];
  return /*#__PURE__*/React.createElement("section", {
    id: "duvidas",
    style: {
      maxWidth: 880,
      margin: '0 auto',
      padding: 'var(--section-pad-y) var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    number: "05"
  }, "D\xFAvidas"), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--weight-medium) var(--text-h1) / var(--leading-tight) var(--font-display)',
      letterSpacing: 'var(--tracking-display)',
      marginTop: 16
    }
  }, "O que m\xE9dicos perguntam antes de assinar"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-10)',
      borderTop: '1px solid var(--border-subtle)'
    }
  }, qs.map(([q, a], i) => /*#__PURE__*/React.createElement("div", {
    key: q,
    style: {
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setOpen(open === i ? -1 : i),
    style: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '20px 0',
      background: 'none',
      border: 0,
      cursor: 'pointer',
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      font: 'var(--type-h5)',
      letterSpacing: 'var(--tracking-heading)'
    }
  }, q), /*#__PURE__*/React.createElement(Icon, {
    name: open === i ? 'minus' : 'plus',
    size: 18,
    color: "var(--si-emerald-700)"
  })), open === i && /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body-lg)',
      color: 'var(--text-secondary)',
      paddingBottom: 24,
      maxWidth: '62ch'
    }
  }, a)))));
}
function FinalCta() {
  const {
    Button,
    Input
  } = window.SecretRiaInvisVelDesignSystem_fc77d1;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      background: 'var(--gradient-ink)',
      color: 'var(--text-on-ink)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(Blobs, {
    opacity: 0.05
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 860,
      margin: '0 auto',
      padding: 'var(--section-pad-y) var(--space-6)',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--weight-medium) var(--text-display-3) / var(--leading-display) var(--font-display)',
      letterSpacing: 'var(--tracking-display)',
      color: '#EAF6F1'
    }
  }, "Veja sua agenda de", /*#__PURE__*/React.createElement("br", null), "amanh\xE3 se encher hoje"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body-lg)',
      color: 'rgba(234,246,241,.78)',
      marginTop: 20,
      maxWidth: '52ch',
      marginInline: 'auto'
    }
  }, "Demonstra\xE7\xE3o de 20 minutos com a sua pr\xF3pria agenda. Sem compromisso, sem integra\xE7\xE3o pr\xE9via."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      justifyContent: 'center',
      marginTop: 34,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "WhatsApp da cl\xEDnica",
    icon: "phone",
    style: {
      minWidth: 260
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "inverse",
    size: "lg",
    iconAfter: "arrow-right"
  }, "Agendar demonstra\xE7\xE3o"))));
}
Object.assign(window, {
  Pricing,
  Faq,
  FinalCta
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/LandingOffer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/painel/AgendaScreen.jsx
try { (() => {
const WEEK = [['Seg', '22', false, '9/10', [['08:30', 'Ana Lúcia Ferraz', 'Retorno', 'confirmado'], ['10:00', 'Carlos Menezes', 'Exame', 'confirmado'], ['14:00', 'Bruno Sales', 'Retorno', 'pendente']], []], ['Ter', '23', true, '8/10', [['09:00', 'Mariana Castro', 'Retorno', 'confirmado'], ['10:30', 'João Paulo', 'Primeira consulta', 'pendente'], ['15:00', 'Helena Braga', 'Retorno', 'confirmado']], ['11:30']], ['Qua', '24', false, '6/10', [['09:30', 'Renata Alves', 'Retorno', 'remarcado'], ['13:00', 'Paulo Vieira', 'Exame', 'confirmado']], ['11:00', '16:00']], ['Qui', '25', false, '10/10', [['09:00', 'Mariana Castro', 'Retorno', 'confirmado'], ['10:00', 'Tiago Moura', 'Primeira consulta', 'confirmado'], ['14:30', 'Lúcia Prado', 'Retorno', 'confirmado']], []], ['Sex', '26', false, '5/10', [['08:00', 'Sofia Ramos', 'Retorno', 'confirmado']], ['10:00', '14:00', '16:30']]];
function AgendaScreen() {
  const {
    Card,
    AgendaDay,
    AppointmentCard,
    EmptySlot,
    Tabs,
    Badge,
    Select
  } = window.SecretRiaInvisVelDesignSystem_fc77d1;
  const [range, setRange] = React.useState('Semana');
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Card, {
    padding: "sm"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    tabs: ['Dia', 'Semana', 'Mês'],
    activeId: range,
    onSelect: setRange
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Select, {
    options: ['Dra. Helena Rocha', 'Dr. Paulo Lima', 'Todos os profissionais'],
    style: {
      minWidth: 220
    }
  }), /*#__PURE__*/React.createElement(Badge, {
    tone: "good",
    dot: true
  }, "38 confirmadas"), /*#__PURE__*/React.createElement(Badge, {
    tone: "warn",
    dot: true
  }, "6 pendentes"), /*#__PURE__*/React.createElement(Badge, {
    tone: "brand",
    icon: "sparkles"
  }, "12 vagas livres")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gap: 'var(--space-3)',
      alignItems: 'start'
    }
  }, WEEK.map(([wd, d, today, occ, slots, free]) => /*#__PURE__*/React.createElement(AgendaDay, {
    key: d,
    weekday: wd,
    date: d,
    today: today,
    occupancy: occ
  }, slots.map(([time, patient, service, state]) => /*#__PURE__*/React.createElement(AppointmentCard, {
    key: time,
    compact: true,
    time: time,
    patient: patient,
    service: service,
    state: state,
    channel: ""
  })), free.map(time => /*#__PURE__*/React.createElement(EmptySlot, {
    key: time,
    time: time
  }))))));
}
Object.assign(window, {
  AgendaScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/painel/AgendaScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/painel/InboxScreen.jsx
try { (() => {
const THREADS = {
  mariana: {
    name: 'Mariana Castro',
    status: 'online',
    tag: ['info', 'Remarcado'],
    meta: 'Remarcou para quinta, 09:00',
    messages: [['in', '14:30', 'Oi! Preciso remarcar minha consulta de amanhã'], ['out', '14:30', 'Claro, Mariana. Tenho estes horários com a Dra. Helena:', ['Quinta 09:00', 'Quinta 15:30']], ['in', '14:31', 'Quinta 09:00 fica ótimo'], ['out', '14:31', 'Remarcado para quinta, 09:00. Envio a confirmação na véspera.'], ['system', '', 'Agenda atualizada automaticamente']]
  },
  joao: {
    name: 'João Paulo',
    status: 'visto às 14:32',
    tag: ['good', 'Confirmado'],
    meta: 'Confirmou hoje, 14:30',
    messages: [['out', '08:00', 'Bom dia, João! Sua consulta é hoje às 15:30 com a Dra. Helena. Podemos confirmar?', ['Confirmar', 'Remarcar']], ['in', '14:29', 'Confirmar'], ['out', '14:30', 'Confirmado. Endereço: Av. Paulista 1400, sala 72. Até logo!']]
  },
  renata: {
    name: 'Renata Alves',
    status: 'visto ontem',
    tag: ['warn', 'Follow-up'],
    meta: 'Sem resposta há 2 dias',
    messages: [['out', 'ter 09:00', 'Olá, Renata! Notamos que sua consulta de retorno não foi reagendada. Quer que eu veja horários?', ['Ver horários', 'Depois']], ['system', '', 'Follow-up reenviado em 2 dias'], ['out', 'qui 09:00', 'Oi, Renata! Ainda temos vaga na quinta às 10h. Posso reservar?']]
  }
};
function InboxScreen() {
  const {
    Card,
    ChatThread,
    ChatBubble,
    ListRow,
    Avatar,
    Badge,
    Tag,
    Button,
    Switch
  } = window.SecretRiaInvisVelDesignSystem_fc77d1;
  const [id, setId] = React.useState('mariana');
  const t = THREADS[id];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '340px 1fr 280px',
      gap: 'var(--space-4)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "sm"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    selected: true
  }, "Todas"), /*#__PURE__*/React.createElement(Tag, null, "Pendentes"), /*#__PURE__*/React.createElement(Tag, null, "Humano")), Object.entries(THREADS).map(([key, v]) => /*#__PURE__*/React.createElement(ListRow, {
    key: key,
    chevron: false,
    style: {
      background: key === id ? 'var(--si-mint)' : undefined
    },
    leading: /*#__PURE__*/React.createElement(Avatar, {
      name: v.name
    }),
    title: v.name,
    meta: v.meta,
    trailing: /*#__PURE__*/React.createElement(Badge, {
      tone: v.tag[0],
      dot: true
    }, v.tag[1]),
    onClick: () => setId(key)
  }))), /*#__PURE__*/React.createElement(ChatThread, {
    contact: {
      name: t.name,
      status: t.status
    },
    style: {
      height: 560
    }
  }, t.messages.map((m, i) => /*#__PURE__*/React.createElement(ChatBubble, {
    key: i,
    direction: m[0],
    time: m[1],
    status: i === t.messages.length - 1 ? 'sent' : 'read',
    quick: m[3]
  }, m[2]))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Paciente",
    subtitle: t.name
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      font: 'var(--type-label)',
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xDAltima consulta \xB7 12/05/2026"), /*#__PURE__*/React.createElement("span", null, "Profissional \xB7 Dra. Helena Rocha"), /*#__PURE__*/React.createElement("span", null, "Conv\xEAnio \xB7 Particular")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "secondary",
    icon: "calendar-plus"
  }, "Agendar"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "outline",
    icon: "user"
  }, "Ficha"))), /*#__PURE__*/React.createElement(Card, {
    title: "Atendimento",
    subtitle: "controle da secret\xE1ria"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Switch, {
    checked: true,
    label: "IA respondendo",
    onChange: () => {}
  }), /*#__PURE__*/React.createElement(Switch, {
    label: "Assumir conversa",
    onChange: () => {}
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-caption)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)'
    }
  }, "Ao assumir, a secret\xE1ria pausa as respostas autom\xE1ticas nesta conversa e avisa a equipe.")))));
}
Object.assign(window, {
  InboxScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/painel/InboxScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/painel/OverviewScreen.jsx
try { (() => {
function OverviewScreen() {
  const {
    Card,
    MetricCard,
    ScoreDonut,
    TrendChart,
    ListRow,
    InsightCard,
    Badge,
    Avatar,
    AppointmentCard,
    Tabs
  } = window.SecretRiaInvisVelDesignSystem_fc77d1;
  const [range, setRange] = React.useState('Hoje');
  const series = {
    Hoje: [12, 18, 15, 26, 22, 31, 28, 38, 34, 41],
    Semana: [140, 162, 151, 188, 205, 196, 232],
    'Mês': [520, 610, 588, 702, 760, 812]
  }[range];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(MetricCard, {
    icon: "message-circle",
    label: "Conversas atendidas",
    value: "1.284",
    status: "\xD3timo",
    delta: "+12% vs. semana passada"
  }), /*#__PURE__*/React.createElement(MetricCard, {
    icon: "calendar-check",
    label: "Consultas confirmadas",
    value: "312",
    status: "Est\xE1vel",
    delta: "+4% vs. semana passada"
  }), /*#__PURE__*/React.createElement(MetricCard, {
    icon: "calendar-x",
    iconTone: "warn",
    label: "Faltas",
    value: "4",
    unit: "%",
    status: "Aten\xE7\xE3o",
    statusTone: "warn",
    delta: "-2% vs. semana passada"
  }), /*#__PURE__*/React.createElement(MetricCard, {
    icon: "clock",
    iconTone: "info",
    label: "Tempo de resposta",
    value: "11",
    unit: "s",
    status: "\xD3timo",
    delta: "m\xE9dia nas 24h"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '300px 1fr',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Taxa de confirma\xE7\xE3o",
    subtitle: "\xFAltimos 30 dias"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(ScoreDonut, {
    value: 82,
    label: "82%",
    size: 104,
    thickness: 12
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--weight-bold) var(--text-h2) / 1 var(--font-display)',
      letterSpacing: 'var(--tracking-heading)'
    }
  }, "256"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-label)',
      color: 'var(--text-secondary)'
    }
  }, "de 312 consultas", /*#__PURE__*/React.createElement("br", null), "confirmadas sem interven\xE7\xE3o")))), /*#__PURE__*/React.createElement(Card, {
    title: "Atendimentos",
    subtitle: "volume de conversas por per\xEDodo",
    action: /*#__PURE__*/React.createElement(Tabs, {
      tabs: ['Hoje', 'Semana', 'Mês'],
      activeId: range,
      onSelect: setRange
    })
  }, /*#__PURE__*/React.createElement(TrendChart, {
    data: series,
    height: 168,
    yLabels: ['alto', 'médio', 'baixo'],
    xLabels: range === 'Hoje' ? ['08h', '11h', '14h', '17h', '20h'] : range === 'Semana' ? ['seg', 'qua', 'sex', 'dom'] : ['jan', 'mar', 'mai', 'jun']
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.15fr 1fr',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(InsightCard, {
    title: "Ter\xE7as de manh\xE3 ficam 40% vazias",
    body: "Reabrir esses hor\xE1rios para a lista de espera pode recuperar cerca de 6 consultas por semana.",
    cta: "Ver sugest\xE3o"
  }), /*#__PURE__*/React.createElement(Card, {
    title: "\xDAltimas conversas",
    action: /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Ver tudo")
  }, /*#__PURE__*/React.createElement(ListRow, {
    leading: /*#__PURE__*/React.createElement(Avatar, {
      name: "Mariana Castro"
    }),
    title: "Mariana Castro",
    meta: "Remarcou para quinta, 09:00",
    trailing: /*#__PURE__*/React.createElement(Badge, {
      tone: "info",
      dot: true
    }, "Remarcado"),
    onClick: () => {}
  }), /*#__PURE__*/React.createElement(ListRow, {
    leading: /*#__PURE__*/React.createElement(Avatar, {
      name: "Jo\xE3o Paulo"
    }),
    title: "Jo\xE3o Paulo",
    meta: "Confirmou hoje, 14:30",
    trailing: /*#__PURE__*/React.createElement(Badge, {
      tone: "good",
      dot: true
    }, "Confirmado"),
    onClick: () => {}
  }), /*#__PURE__*/React.createElement(ListRow, {
    leading: /*#__PURE__*/React.createElement(Avatar, {
      name: "Renata Alves"
    }),
    title: "Renata Alves",
    meta: "Sem resposta h\xE1 2 dias",
    trailing: /*#__PURE__*/React.createElement(Badge, {
      tone: "warn",
      dot: true
    }, "Follow-up"),
    onClick: () => {}
  }), /*#__PURE__*/React.createElement(ListRow, {
    leading: /*#__PURE__*/React.createElement(Avatar, {
      name: "Carlos Menezes"
    }),
    title: "Carlos Menezes",
    meta: "Pediu or\xE7amento de exame",
    trailing: /*#__PURE__*/React.createElement(Badge, {
      dot: true
    }, "Humano"),
    onClick: () => {}
  }))), /*#__PURE__*/React.createElement(Card, {
    title: "Pr\xF3ximas consultas",
    subtitle: "hoje \xB7 Dra. Helena Rocha",
    action: /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Abrir agenda")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement(AppointmentCard, {
    time: "15:00",
    duration: "30 min",
    patient: "Mariana Castro",
    service: "Retorno",
    professional: "Dra. Helena"
  }), /*#__PURE__*/React.createElement(AppointmentCard, {
    time: "15:30",
    duration: "45 min",
    patient: "Jo\xE3o Paulo",
    service: "Primeira consulta",
    professional: "Dra. Helena",
    state: "pendente"
  }), /*#__PURE__*/React.createElement(AppointmentCard, {
    time: "16:30",
    duration: "30 min",
    patient: "Ana L\xFAcia Ferraz",
    service: "Retorno",
    professional: "Dra. Helena"
  }))));
}
Object.assign(window, {
  OverviewScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/painel/OverviewScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/painel/PanelShell.jsx
try { (() => {
const NAV = [{
  id: 'visao',
  label: 'Visão geral',
  icon: 'layout-dashboard'
}, {
  id: 'conversas',
  label: 'Conversas',
  icon: 'message-circle',
  badge: 8
}, {
  id: 'agenda',
  label: 'Agenda',
  icon: 'calendar-days'
}, {
  id: 'pacientes',
  label: 'Pacientes',
  icon: 'users'
}, {
  id: 'automacoes',
  label: 'Automações',
  icon: 'workflow'
}, {
  id: 'relatorios',
  label: 'Relatórios',
  icon: 'bar-chart-3'
}, {
  id: 'ajustes',
  label: 'Ajustes',
  icon: 'settings'
}];
function PanelShell({
  view,
  onView,
  title,
  subtitle,
  actions,
  children
}) {
  const {
    SidebarNav,
    TopBar,
    IconButton,
    Button
  } = window.SecretRiaInvisVelDesignSystem_fc77d1;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      minHeight: '100vh',
      background: 'var(--surface-page)'
    }
  }, /*#__PURE__*/React.createElement(SidebarNav, {
    items: NAV,
    activeId: view,
    onSelect: onView,
    logoSrc: "../../assets/logo-si-mark.png",
    user: {
      name: 'Clínica Vida',
      meta: 'Ver perfil'
    }
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement(TopBar, {
    title: title,
    subtitle: subtitle,
    meta: "26 de junho de 2026",
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, actions, /*#__PURE__*/React.createElement(IconButton, {
      icon: "bell",
      label: "Notifica\xE7\xF5es"
    }), /*#__PURE__*/React.createElement(Button, {
      icon: "plus"
    }, "Novo agendamento"))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 var(--space-8) var(--space-10)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)'
    }
  }, children)));
}
Object.assign(window, {
  PanelShell,
  PANEL_NAV: NAV
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/painel/PanelShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/painel/ReportsScreen.jsx
try { (() => {
function ReportsScreen() {
  const {
    Card,
    MetricCard,
    TrendChart,
    ListRow,
    Badge,
    Button,
    ScoreDonut
  } = window.SecretRiaInvisVelDesignSystem_fc77d1;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(MetricCard, {
    icon: "calendar-check",
    label: "Consultas recuperadas",
    value: "46",
    status: "\xD3timo",
    delta: "+18% vs. m\xEAs anterior"
  }), /*#__PURE__*/React.createElement(MetricCard, {
    icon: "banknote",
    label: "Receita recuperada",
    value: "R$ 27.600",
    status: "\xD3timo",
    delta: "estimativa sobre ticket m\xE9dio"
  }), /*#__PURE__*/React.createElement(MetricCard, {
    icon: "timer",
    iconTone: "info",
    label: "Horas devolvidas \xE0 equipe",
    value: "52",
    unit: "h",
    status: "No m\xEAs"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 320px',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Consultas confirmadas por semana",
    subtitle: "\xFAltimos 3 meses",
    action: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "outline",
      icon: "download"
    }, "Exportar")
  }, /*#__PURE__*/React.createElement(TrendChart, {
    data: [58, 64, 61, 72, 78, 74, 86, 92, 88, 97, 104, 112],
    height: 200,
    yLabels: ['120', '80', '40'],
    xLabels: ['abr', 'mai', 'jun']
  })), /*#__PURE__*/React.createElement(Card, {
    title: "Origem dos agendamentos"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(ScoreDonut, {
    value: 78,
    label: "78%",
    size: 92,
    thickness: 11
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-label)',
      color: 'var(--text-secondary)'
    }
  }, "dos agendamentos", /*#__PURE__*/React.createElement("br", null), "chegaram pelo WhatsApp")), /*#__PURE__*/React.createElement(ListRow, {
    chevron: false,
    icon: "message-circle",
    title: "WhatsApp \xB7 secret\xE1ria",
    meta: "243 agendamentos",
    trailing: /*#__PURE__*/React.createElement(Badge, {
      tone: "good"
    }, "78%")
  }), /*#__PURE__*/React.createElement(ListRow, {
    chevron: false,
    icon: "phone",
    iconTone: "info",
    title: "Telefone \xB7 equipe",
    meta: "48 agendamentos",
    trailing: /*#__PURE__*/React.createElement(Badge, {
      tone: "info"
    }, "15%")
  }), /*#__PURE__*/React.createElement(ListRow, {
    chevron: false,
    icon: "globe",
    iconTone: "neutral",
    title: "Site",
    meta: "21 agendamentos",
    trailing: /*#__PURE__*/React.createElement(Badge, null, "7%")
  }))), /*#__PURE__*/React.createElement(Card, {
    title: "Relat\xF3rios enviados",
    subtitle: "resumo semanal por e-mail e WhatsApp",
    action: /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Configurar envio")
  }, /*#__PURE__*/React.createElement(ListRow, {
    icon: "file-text",
    title: "Resumo semanal \xB7 15\u201321 de junho",
    meta: "enviado para contato@clinicavida.com.br",
    trailing: /*#__PURE__*/React.createElement(Badge, {
      tone: "good",
      dot: true
    }, "Enviado"),
    onClick: () => {}
  }), /*#__PURE__*/React.createElement(ListRow, {
    icon: "file-text",
    title: "Resumo semanal \xB7 8\u201314 de junho",
    meta: "enviado para contato@clinicavida.com.br",
    trailing: /*#__PURE__*/React.createElement(Badge, {
      tone: "good",
      dot: true
    }, "Enviado"),
    onClick: () => {}
  }), /*#__PURE__*/React.createElement(ListRow, {
    icon: "file-clock",
    iconTone: "warn",
    title: "Resumo mensal \xB7 junho",
    meta: "ser\xE1 enviado em 01/07",
    trailing: /*#__PURE__*/React.createElement(Badge, {
      tone: "warn",
      dot: true
    }, "Agendado"),
    onClick: () => {}
  })));
}
Object.assign(window, {
  ReportsScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/painel/ReportsScreen.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.SectionLabel = __ds_scope.SectionLabel;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.EmptySlot = __ds_scope.EmptySlot;

__ds_ns.InsightCard = __ds_scope.InsightCard;

__ds_ns.ListRow = __ds_scope.ListRow;

__ds_ns.MetricCard = __ds_scope.MetricCard;

__ds_ns.ScoreDonut = __ds_scope.ScoreDonut;

__ds_ns.TrendChart = __ds_scope.TrendChart;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.SidebarNav = __ds_scope.SidebarNav;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.TopBar = __ds_scope.TopBar;

__ds_ns.AgendaDay = __ds_scope.AgendaDay;

__ds_ns.AppointmentCard = __ds_scope.AppointmentCard;

__ds_ns.ChatBubble = __ds_scope.ChatBubble;

__ds_ns.ChatThread = __ds_scope.ChatThread;

})();
