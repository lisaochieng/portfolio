/* @ds-bundle: {"format":3,"namespace":"KTOneDesignSystem_670b9a","components":[{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"LabeledSection","sourcePath":"components/core/LabeledSection.jsx"},{"name":"Panel","sourcePath":"components/core/Panel.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"}],"sourceHashes":{"components/brand/Logo.jsx":"ed0d76d8839d","components/core/Button.jsx":"ebeac68e247a","components/core/LabeledSection.jsx":"7eb4bc4e6d86","components/core/Panel.jsx":"f67ef1579b08","components/core/Tag.jsx":"dfb3d4575dc1","ui_kits/landing/Icons.jsx":"b93556704646","ui_kits/landing/Sections.jsx":"f0e5dfa04f6e"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.KTOneDesignSystem_670b9a = window.KTOneDesignSystem_670b9a || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * KT One — Logo
 * The hexagonal lattice mark (a node with six bonds to a luminous core) plus the
 * KT ONE mono wordmark. Mark geometry mirrors the brand favicon exactly.
 */
function Logo({
  size = 28,
  showWordmark = true,
  tile = false,
  style,
  ...rest
}) {
  const mark = /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 100 100",
    fill: "none",
    "aria-hidden": "true",
    style: {
      display: "block",
      flexShrink: 0
    }
  }, tile ? /*#__PURE__*/React.createElement("rect", {
    width: "100",
    height: "100",
    rx: "20",
    fill: "var(--kt-black)"
  }) : null, /*#__PURE__*/React.createElement("polygon", {
    points: "50,8 86,29 86,71 50,92 14,71 14,29",
    fill: "none",
    stroke: "var(--zinc-400)",
    strokeWidth: "2",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("g", {
    stroke: "var(--zinc-700)",
    strokeWidth: "1",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "50",
    y1: "50",
    x2: "50",
    y2: "8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "50",
    y1: "50",
    x2: "86",
    y2: "29"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "50",
    y1: "50",
    x2: "86",
    y2: "71"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "50",
    y1: "50",
    x2: "50",
    y2: "92"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "50",
    y1: "50",
    x2: "14",
    y2: "71"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "50",
    y1: "50",
    x2: "14",
    y2: "29"
  })), /*#__PURE__*/React.createElement("circle", {
    cx: "50",
    cy: "50",
    r: "4",
    fill: "var(--zinc-50)",
    opacity: "0.9"
  }));
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      ...style
    }
  }, rest), mark, showWordmark ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontWeight: "var(--fw-bold)",
      color: "var(--text-primary)",
      letterSpacing: "var(--tracking-tight)",
      fontSize: `${Math.round(size * 0.6)}px`,
      display: "inline-flex",
      gap: "5px"
    }
  }, /*#__PURE__*/React.createElement("span", null, "KT"), /*#__PURE__*/React.createElement("span", null, "ONE")) : null);
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * KT One — Button
 * Boxy, raw, unrounded. Mono uppercase label, optional [ bracket ] framing,
 * hard hover-invert. No drop shadows. Depth comes from the border.
 */
function Button({
  children,
  variant = "outline",
  size = "md",
  brackets = false,
  href,
  icon,
  iconRight,
  disabled = false,
  onClick,
  type = "button",
  style,
  ...rest
}) {
  const sizes = {
    sm: {
      padding: "6px 12px",
      fontSize: "0.6875rem",
      gap: "6px"
    },
    md: {
      padding: "9px 16px",
      fontSize: "var(--text-xs)",
      gap: "8px"
    },
    lg: {
      padding: "13px 22px",
      fontSize: "var(--text-sm)",
      gap: "10px"
    }
  };
  const palette = {
    outline: {
      background: "transparent",
      color: "var(--text-body)",
      border: "var(--border-width) solid var(--border-strong)"
    },
    solid: {
      background: "var(--bg-inverse)",
      color: "var(--text-inverse)",
      border: "var(--border-width) solid var(--bg-inverse)"
    },
    ghost: {
      background: "transparent",
      color: "var(--text-meta)",
      border: "var(--border-width) solid transparent"
    }
  };
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: sizes[size].gap,
    padding: sizes[size].padding,
    fontFamily: "var(--font-mono)",
    fontSize: sizes[size].fontSize,
    fontWeight: "var(--fw-medium)",
    textTransform: "uppercase",
    letterSpacing: "var(--tracking-wide)",
    lineHeight: 1,
    borderRadius: "var(--radius-none)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.4 : 1,
    transition: "background 120ms linear, color 120ms linear, border-color 120ms linear",
    userSelect: "none",
    whiteSpace: "nowrap",
    ...palette[variant],
    ...style
  };
  const hoverOn = e => {
    if (disabled) return;
    if (variant === "outline") {
      e.currentTarget.style.background = "var(--bg-inverse)";
      e.currentTarget.style.color = "var(--text-inverse)";
      e.currentTarget.style.borderColor = "var(--bg-inverse)";
    } else if (variant === "solid") {
      e.currentTarget.style.background = "transparent";
      e.currentTarget.style.color = "var(--text-primary)";
    } else {
      e.currentTarget.style.color = "var(--text-primary)";
    }
  };
  const hoverOff = e => {
    if (disabled) return;
    e.currentTarget.style.background = palette[variant].background;
    e.currentTarget.style.color = palette[variant].color;
    e.currentTarget.style.borderColor = variant === "ghost" ? "transparent" : variant === "solid" ? "var(--bg-inverse)" : "var(--border-strong)";
  };
  const label = brackets ? /*#__PURE__*/React.createElement("span", null, "[\xA0", children, "\xA0]") : children;
  const content = /*#__PURE__*/React.createElement(React.Fragment, null, icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex"
    },
    "aria-hidden": "true"
  }, icon) : null, label, iconRight ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex"
    },
    "aria-hidden": "true"
  }, iconRight) : null);
  const Tag = href ? "a" : "button";
  const tagProps = href ? {
    href
  } : {
    type,
    disabled
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({}, tagProps, {
    onClick: disabled ? undefined : onClick,
    style: base,
    onMouseEnter: hoverOn,
    onMouseLeave: hoverOff
  }, rest), content);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Panel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * KT One — Panel
 * The brand's structural container. NOT a floating card: no shadow, no radius.
 * A bordered cell that participates in the document grid. Use `inset` for the
 * faint raised background, `hover` for the hard-invert interaction.
 */
function Panel({
  children,
  inset = false,
  hover = false,
  as = "div",
  style,
  ...rest
}) {
  const [hovered, setHovered] = React.useState(false);
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    onMouseEnter: hover ? () => setHovered(true) : undefined,
    onMouseLeave: hover ? () => setHovered(false) : undefined,
    style: {
      background: hover && hovered ? "var(--bg-inverse)" : inset ? "var(--bg-subtle)" : "transparent",
      color: hover && hovered ? "var(--text-inverse)" : "inherit",
      border: "var(--border-width) solid var(--border)",
      borderRadius: "var(--radius-none)",
      padding: "var(--space-8)",
      transition: hover ? "background 120ms linear, color 120ms linear" : "none",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Panel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Panel.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * KT One — Tag
 * A mono, uppercase technical label. Used for status ("UNDER REVIEW"),
 * topic chips, and metadata. Boxed (hairline border) or bare. Sharp corners.
 */
function Tag({
  children,
  variant = "outline",
  accent = false,
  dot = false,
  style,
  ...rest
}) {
  const variants = {
    outline: {
      background: "transparent",
      color: "var(--text-meta)",
      border: "var(--border-width) solid var(--border)"
    },
    solid: {
      background: "var(--bg-subtle)",
      color: "var(--text-primary)",
      border: "var(--border-width) solid var(--border)"
    },
    bare: {
      background: "transparent",
      color: "var(--text-meta)",
      border: "var(--border-width) solid transparent",
      padding: 0
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      padding: variant === "bare" ? 0 : "3px 8px",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-xs)",
      fontWeight: "var(--fw-medium)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-wide)",
      lineHeight: 1.4,
      borderRadius: "var(--radius-none)",
      color: accent ? "var(--accent)" : variants[variant].color,
      ...variants[variant],
      ...(accent ? {
        color: "var(--accent)"
      } : null),
      ...style
    }
  }, rest), dot ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: "5px",
      height: "5px",
      background: accent ? "var(--accent)" : "currentColor",
      display: "inline-block"
    }
  }) : null, children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/core/LabeledSection.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * KT One — LabeledSection
 * The signature ledger row: a title (and optional mono sublabel) pinned in the
 * left column, content flowing in the right. Separated from neighbours by the
 * shared 1px border framework. Mirrors the landing page's grid-cols-3 sections.
 */
function LabeledSection({
  title,
  label,
  children,
  inset = false,
  ratio = "1fr 2fr",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("section", _extends({
    style: {
      display: "grid",
      gridTemplateColumns: ratio,
      borderTop: "var(--border-width) solid var(--border)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-8)",
      borderRight: "var(--border-width) solid var(--border)",
      background: inset ? "var(--bg-subtle)" : "transparent"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--text-xl)",
      fontWeight: "var(--fw-medium)",
      color: "var(--text-primary)",
      margin: 0
    }
  }, title), label ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    variant: "bare"
  }, label)) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-8)"
    }
  }, children));
}
Object.assign(__ds_scope, { LabeledSection });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/LabeledSection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/Icons.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// KT One — Lucide-style icons (2px stroke, geometric, un-filled)
// Mirrors the lucide-react set used in the production landing page.
const I = (paths, vb = "0 0 24 24") => function Icon({
  size = 16,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: size,
    height: size,
    viewBox: vb,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      display: "block",
      ...style
    },
    "aria-hidden": "true"
  }, rest), paths);
};
const ArrowUpRight = I(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
  x1: "7",
  y1: "17",
  x2: "17",
  y2: "7"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "7 7 17 7 17 17"
})));
const Mail = I(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
  x: "2",
  y: "4",
  width: "20",
  height: "16",
  rx: "2"
}), /*#__PURE__*/React.createElement("path", {
  d: "m22 7-10 5L2 7"
})));
const GitCommit = I(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "3"
}), /*#__PURE__*/React.createElement("line", {
  x1: "3",
  y1: "12",
  x2: "9",
  y2: "12"
}), /*#__PURE__*/React.createElement("line", {
  x1: "15",
  y1: "12",
  x2: "21",
  y2: "12"
})));
const ChevronRight = I(/*#__PURE__*/React.createElement("polyline", {
  points: "9 18 15 12 9 6"
}));
const Activity = I(/*#__PURE__*/React.createElement("polyline", {
  points: "22 12 18 12 15 21 9 3 6 12 2 12"
}));
Object.assign(window, {
  ArrowUpRight,
  Mail,
  GitCommit,
  ChevronRight,
  Activity
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/Icons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/Sections.jsx
try { (() => {
// KT One — Landing Page sections. Composes DS components (Logo, Button, Tag,
// LabeledSection, Panel). Faithful recreation of the production landing page.
const {
  Logo,
  Button,
  Tag,
  LabeledSection,
  Panel
} = window.KTOneDesignSystem_670b9a;
function Nav() {
  return /*#__PURE__*/React.createElement("nav", {
    className: "kt-nav"
  }, /*#__PURE__*/React.createElement(Logo, {
    size: 20
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    href: "mailto:tam@ktone.org",
    brackets: true,
    iconRight: /*#__PURE__*/React.createElement(window.Mail, {
      size: 15
    }),
    style: {
      padding: "6px 10px"
    }
  }, "Contact"));
}
function Hero() {
  return /*#__PURE__*/React.createElement("header", {
    className: "kt-hero"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "kt-hero-geo",
    width: "200",
    height: "200",
    viewBox: "0 0 100 100",
    fill: "none"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "50",
    cy: "50",
    r: "49",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "0.5",
    strokeDasharray: "2 4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "50",
    cy: "50",
    r: "30",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "0.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 50 0 L 50 100 M 0 50 L 100 50",
    stroke: "currentColor",
    strokeWidth: "0.5"
  })), /*#__PURE__*/React.createElement(Tag, {
    variant: "bare",
    style: {
      marginBottom: 24
    }
  }, "EST. Nov 2025 // Independent Research"), /*#__PURE__*/React.createElement("h1", {
    className: "kt-h1"
  }, "Science in vein."), /*#__PURE__*/React.createElement("p", {
    className: "kt-lead"
  }, "We operate at the frontier of open quantum systems and quantum artificial intelligence.", " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-primary)",
      fontWeight: 500
    }
  }, "A research-first organization\u2014small, focused, and deliberately early-stage.")));
}
function Philosophy() {
  return /*#__PURE__*/React.createElement(LabeledSection, {
    title: "The Philosophy",
    label: "Fundamental Approach"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "kt-h3"
  }, "Noise is not a liability. It is the material."), /*#__PURE__*/React.createElement("p", {
    className: "kt-body"
  }, "Current NISQ hardware is inherently noisy and dissipative. Most quantum ML research treats this as a liability to be engineered away. We treat it as the computational foundation. Collision models and non-Markovian dynamics give us a precise language for what noise actually ", /*#__PURE__*/React.createElement("em", null, "does"), "\u2014and how it can be shaped into a resource rather than eliminated."));
}
const FOCUS = [{
  title: "Open Quantum Systems",
  desc: "Decoherence, environment interaction, and Lindblad-regime modeling."
}, {
  title: "Collision Models",
  desc: "Sequential interaction frameworks for open system simulation."
}, {
  title: "Non-Markovian Dynamics",
  desc: "Memory effects in quantum evolution—critical for real hardware."
}, {
  title: "Dissipative QNN",
  desc: "Quantum neural networks with structured environmental coupling."
}];
function CurrentFocus() {
  const {
    GitCommit
  } = window;
  return /*#__PURE__*/React.createElement("section", {
    className: "kt-sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kt-sec-head"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "kt-h2"
  }, "Current Focus")), /*#__PURE__*/React.createElement("div", {
    className: "kt-focus-grid"
  }, FOCUS.map((it, i) => /*#__PURE__*/React.createElement("div", {
    className: "kt-focus-cell",
    key: i
  }, /*#__PURE__*/React.createElement("h4", {
    className: "kt-focus-title"
  }, /*#__PURE__*/React.createElement(GitCommit, {
    size: 15,
    style: {
      color: "var(--text-faint)"
    }
  }), " ", it.title), /*#__PURE__*/React.createElement("p", {
    className: "kt-body-sm"
  }, it.desc)))));
}
function Published() {
  const {
    ArrowUpRight
  } = window;
  return /*#__PURE__*/React.createElement(LabeledSection, {
    title: "Published Work",
    label: "2026",
    inset: true
  }, /*#__PURE__*/React.createElement("div", {
    className: "kt-mono-label",
    style: {
      marginBottom: 12
    }
  }, "UNDER REVIEW // QUANTUM SCIENCE AND TECHNOLOGY"), /*#__PURE__*/React.createElement("h3", {
    className: "kt-h3",
    style: {
      fontSize: "var(--text-lg)",
      marginBottom: 16
    }
  }, "Intelligent Control of Collisional Architectures for Deterministic Multipartite State Engineering."), /*#__PURE__*/React.createElement("p", {
    className: "kt-body-sm",
    style: {
      marginBottom: 24
    }
  }, "Duc-Kha Vu, Minh Tam Nguyen, \xD6zg\xFCr E. M\xFCstecapl\u0131o\u011Flu, Fatih Ozaydin."), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    brackets: true,
    size: "sm",
    href: "https://arxiv.org/abs/2602.08526",
    iconRight: /*#__PURE__*/React.createElement(ArrowUpRight, {
      size: 14
    })
  }, "arXiv:2602.08526"));
}
const SHORT = ["Quantum attention mechanisms (transformer analogues)", "Quantum diffusion models via quantum dynamics", "Dissipative QML under noisy conditions"];
const LONG = ["Quantum Artificial General Intelligence (QAGI)", "Cross-discipline integration of quantum/AI open problems"];
function Roadmap() {
  const {
    ChevronRight
  } = window;
  const List = ({
    items
  }) => /*#__PURE__*/React.createElement("ul", {
    className: "kt-list"
  }, items.map((it, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement(ChevronRight, {
    size: 15,
    style: {
      color: "var(--text-faint)",
      flexShrink: 0,
      marginTop: 2
    }
  }), /*#__PURE__*/React.createElement("span", null, it))));
  return /*#__PURE__*/React.createElement("section", {
    className: "kt-roadmap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kt-roadmap-col",
    style: {
      borderRight: "1px solid var(--border)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "kt-h2",
    style: {
      marginBottom: 24
    }
  }, "Short-Term (1\u20134 Yrs)"), /*#__PURE__*/React.createElement(List, {
    items: SHORT
  })), /*#__PURE__*/React.createElement("div", {
    className: "kt-roadmap-col"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "kt-h2",
    style: {
      marginBottom: 24
    }
  }, "Long-Term (5\u201310 Yrs)"), /*#__PURE__*/React.createElement(List, {
    items: LONG
  })));
}
function Footer() {
  const {
    ArrowUpRight
  } = window;
  return /*#__PURE__*/React.createElement("section", {
    className: "kt-footer"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "kt-h3",
    style: {
      fontSize: "var(--text-lg)",
      marginBottom: 16
    }
  }, "Human\u2013AI R&D Pipeline"), /*#__PURE__*/React.createElement("p", {
    className: "kt-body",
    style: {
      maxWidth: "56ch",
      marginBottom: 32
    }
  }, "KT One runs a hybrid human-AI organization. By delegating routine literature review, theoretical structuring, and implementation checks to AI agents, we free our founders to execute deep, high-level scientific conceptualization. We remain small, agile, and fiercely independent."), /*#__PURE__*/React.createElement("div", {
    className: "kt-footer-bar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kt-mono-label"
  }, "\xA9 2026 KT ONE LAB. ALL RIGHTS RESERVED."), /*#__PURE__*/React.createElement("a", {
    className: "kt-footer-link",
    href: "mailto:tam@ktone.org"
  }, "CONTACT US ", /*#__PURE__*/React.createElement(ArrowUpRight, {
    size: 13
  }))));
}
function LandingPage() {
  return /*#__PURE__*/React.createElement("div", {
    className: "kt-doc"
  }, /*#__PURE__*/React.createElement(Nav, null), /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(Philosophy, null), /*#__PURE__*/React.createElement(CurrentFocus, null), /*#__PURE__*/React.createElement(Published, null), /*#__PURE__*/React.createElement(Roadmap, null), /*#__PURE__*/React.createElement(Footer, null));
}
window.LandingPage = LandingPage;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/Sections.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.LabeledSection = __ds_scope.LabeledSection;

__ds_ns.Panel = __ds_scope.Panel;

__ds_ns.Tag = __ds_scope.Tag;

})();
