import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  AlertCircle,
  ArrowRight,
  ArrowUp,
  Bike,
  ChefHat,
  ChevronRight,
  Smile,
  UtensilsCrossed,
  Clock,
  CloudRain,
  Info,
  MessageCircle,
  Minus,
  Plus,
  Send,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";

import risaWordmark from "./assets/risa-wordmark.png";
import risaLogo from "./assets/risa-logo-design.jpeg";
import saladsPhoto from "./assets/menu-photos/salad-photo.jpg";
import noodlesPhoto from "./assets/menu-photos/noodles-risa-enhanced.jpg";
import wingsPhoto from "./assets/menu-photos/wings-photo.jpg";
import mozzarellaPhoto from "./assets/menu-photos/mozzarella-photo.jpg";
import kenkeyPhoto from "./assets/menu-photos/kenkey-risa.jpg";
import pineapplePhoto from "./assets/menu-photos/pineapple-risa.jpg";
import sagoPhoto from "./assets/menu-photos/sago-square.jpg";
import parfaitPhoto from "./assets/menu-photos/parfait-risa.jpg";
import noodlesSectionPhoto from "./assets/menu-photos/noodles-ghana.jpg";
import buldakPhoto from "./assets/menu-photos/buldak-photo.jpg";
import pennePhoto from "./assets/menu-photos/penne-risa.jpg";
import gizdodoPhoto from "./assets/menu-photos/gizdodo-risa.jpg";
import soboloPhoto from "./assets/menu-photos/sobolo-risa.jpg";
import friesPhoto from "./assets/menu-photos/fries-risa.jpg";
import bavariaPhoto from "./assets/menu-photos/bavaria-malt.jpg";

const PHONE_DISPLAY = "+233 24 128 0476";
const WHATSAPP = "233241280476";
// Tapping the RISA number anywhere opens a WhatsApp chat with it.
const WHATSAPP_GREETING = [
  "Hello RISA! 👋🏾",
  "",
  "I just checked out your menu and I’m craving something delicious 😋🍜",
  "",
  "I’d love to place an order. What’s available today? 🙏🏾",
].join("\n");
const WHATSAPP_CHAT = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(WHATSAPP_GREETING)}`;
const POLICY_SEEN_KEY = "risa-order-info-seen";

interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  note?: string;
  badge?: string;
  options?: { label: string; choices: string[] };
  thumb?: string;
}

interface Section {
  id: string;
  label: string;
  title: string;
  tagline: string;
  photo?: string;
  items: Product[];
}

const MENU: Section[] = [
  {
    id: "salads",
    label: "Salad Bowls",
    title: "Ghanaian Salad Bowl",
    tagline: "Fresh, hearty and packed with flavour.",
    photo: saladsPhoto,
    items: [
      {
        id: "salad-mini",
        name: "Mini Salad Bowl",
        price: 30,
        description:
          "Vegetables, sardine, egg, corned beef, ketchup, baked beans, special sauce.",
      },
      {
        id: "salad-classic",
        name: "Classic Salad Bowl",
        price: 50,
        badge: "Popular",
        description:
          "Vegetables, sardines, egg, sausage, corned beef, sweet corn, macaroni, special sauce, ketchup, baked beans, sweet potato.",
      },
      {
        id: "salad-cluck",
        name: "Cluck Chicken Salad Bowl",
        price: 70,
        description:
          "Vegetables, egg, gizzards, macaroni, sweet corn, chicken, special sauce, ketchup, baked beans, sweet potato.",
      },
    ],
  },
  {
    id: "noodles",
    label: "Noodles / Stir Fry",
    title: "Noodles / Stir Fry Pasta",
    tagline: "The cravings that started it all.",
    photo: noodlesSectionPhoto,
    items: [
      {
        id: "noodles-regular",
        name: "Regular Noodles / Stir-fry Pasta",
        price: 30,
        description:
          "Noodles or pasta, vegetables, egg, sausage, sardine, corned beef.",
        options: { label: "Base", choices: ["Noodles", "Pasta"] },
      },
      {
        id: "noodles-mini",
        name: "Mini Craving Noodles / Stir-fry Pasta",
        price: 40,
        description:
          "Noodles or pasta, vegetables, sausages, sardines, eggs, gizzard, corned beef.",
        note: "Comes with either extra egg or sausage",
        options: { label: "Extra", choices: ["Extra egg", "Extra sausage"] },
      },
      {
        id: "noodles-classic",
        name: "Classic Craving Noodles / Stir-fry Pasta",
        price: 50,
        badge: "Popular",
        description:
          "Noodles or pasta, vegetables, sausages, sardines, eggs, corned beef, gizzard.",
        note: "Comes with either extra egg or sausage",
        options: { label: "Extra", choices: ["Extra egg", "Extra sausage"] },
      },
      {
        id: "noodles-cluck",
        name: "Cluck Craving Noodles / Stir-fry Pasta",
        price: 70,
        description:
          "Noodles or pasta, vegetables, sausages, sardines, eggs, corned beef, chicken, gizzard, meat.",
        note: "Comes with either extra egg or sausage",
        options: { label: "Extra", choices: ["Extra egg", "Extra sausage"] },
      },
      {
        id: "noodles-og",
        name: "OG Craving",
        price: 100,
        badge: "Signature",
        description:
          "Noodles or pasta, vegetables, sausages, sardines, eggs, gizzard, corned beef, chicken, shrimp, meat.",
        note: "Comes with extra egg and sausage",
      },
      {
        id: "noodles-wings-combo",
        name: "Mini Craving × Chicken Wings",
        price: 100,
        badge: "Combo",
        description:
          "Mini Craving noodles or stir-fry pasta with chicken wings.",
        options: { label: "Wing flavour", choices: ["Spicy", "BBQ"] },
      },
    ],
  },
  {
    id: "penne",
    label: "Penne Pasta",
    title: "Penne Pasta Bowl",
    tagline: "Comfort in a bowl.",
    photo: pennePhoto,
    items: [
      { id: "penne-small", name: "Small Bowl", price: 40 },
      {
        id: "penne-regular",
        name: "Regular Bowl with Chicken / Turkey",
        price: 70,
        options: { label: "Protein", choices: ["Chicken", "Turkey"] },
      },
    ],
  },
  {
    id: "buldak",
    label: "Buldak Noodles",
    title: "Buldak Noodles",
    tagline: "Spicy, saucy and seriously craveable.",
    photo: buldakPhoto,
    items: [
      {
        id: "buldak-fire",
        name: "Fire Craving",
        price: 70,
        badge: "Spicy",
        description: "Choose one type of Buldak, with sausage and eggs.",
        note: "Tell us your Buldak flavour in the order notes",
      },
      {
        id: "buldak-risbuld",
        name: "RisBuld",
        price: 100,
        badge: "Signature",
        description: "Choose one Buldak flavour, with sausage, egg, shrimp and cheese.",
        note: "Tell us your Buldak flavour in the order notes",
      },
    ],
  },
  {
    id: "gizdodo",
    label: "Gizdodo",
    title: "Gizdodo",
    tagline: "Gizzard and plantain, done right.",
    photo: gizdodoPhoto,
    items: [
      { id: "gizdodo-small", name: "Small Pack", price: 40 },
      {
        id: "gizdodo-regular",
        name: "Regular Pack with Chicken / Turkey",
        price: 70,
        options: { label: "Protein", choices: ["Chicken", "Turkey"] },
      },
    ],
  },
  {
    id: "wings",
    label: "Chicken Wings",
    title: "Chicken Wings",
    tagline: "Juicy & tasty. Spicy or BBQ.",
    photo: wingsPhoto,
    items: [
      {
        id: "wings-5",
        name: "5 Pieces",
        price: 50,
        options: { label: "Flavour", choices: ["Spicy", "BBQ"] },
      },
      {
        id: "wings-10",
        name: "10 Pieces",
        price: 90,
        badge: "Value",
        options: { label: "Flavour", choices: ["Spicy", "BBQ"] },
      },
    ],
  },
  {
    id: "mozzarella",
    label: "Mozzarella Sticks",
    title: "Mozzarella Sticks",
    tagline: "Golden and gooey. Comes with a special sauce.",
    photo: mozzarellaPhoto,
    items: [
      { id: "mozz-5", name: "5 Pieces", price: 60 },
      { id: "mozz-10", name: "10 Pieces", price: 115 },
    ],
  },
  {
    id: "drinks",
    label: "Drinks & Sweets",
    title: "Drinks & Something Sweet",
    tagline: "Cool down. Sweeten up.",
    items: [
      {
        id: "drink-kenkey",
        name: "Ice Kenkey",
        price: 15,
        badge: "Local favourite",
        description: "Refreshing & creamy.",
        thumb: kenkeyPhoto,
      },
      {
        id: "drink-sobolo",
        name: "Sobolo",
        price: 10,
        description: "Chilled hibiscus drink.",
        thumb: soboloPhoto,
      },
      {
        id: "drink-bavaria",
        name: "Bavaria Smalt",
        price: 10,
        description: "Dark malt drink. 0.0% alcohol.",
        thumb: bavariaPhoto,
      },
      {
        id: "drink-pineapple",
        name: "Pineapple Juice",
        price: 15,
        description: "Pure goodness.",
        thumb: pineapplePhoto,
      },
      {
        id: "sweet-sago",
        name: "Sweet Sago Cloud",
        price: 50,
        description: "Light, sweet and fruity.",
        options: {
          label: "Flavour",
          choices: ["Mango", "Strawberry", "Banana"],
        },
        thumb: sagoPhoto,
      },
      {
        id: "sweet-parfait",
        name: "Parfait",
        price: 50,
        description: "Yogurt, granola and two toppings of fruit.",
        thumb: parfaitPhoto,
      },
    ],
  },
  {
    id: "extras",
    label: "Extras",
    title: "Extras",
    tagline: "Add a little extra to your favourite meal.",
    items: [
      { id: "extra-sausage", name: "Sausage", price: 5 },
      { id: "extra-egg", name: "Egg", price: 5 },
      { id: "extra-chicken", name: "Chicken", price: 15 },
      { id: "extra-fries", name: "Fries", price: 25, thumb: friesPhoto },
    ],
  },
];

const ALL_ITEMS = MENU.flatMap((s) => s.items);
const findItem = (id: string) => ALL_ITEMS.find((i) => i.id === id);

// Cart lines are keyed by "itemId|option" so the same dish in two flavours stays separate.
const lineKey = (id: string, option?: string) =>
  option ? `${id}|${option}` : id;
const parseKey = (key: string) => {
  const [id, option] = key.split("|");
  return { id, option };
};

const SPICE_LEVELS = ["Mild", "Spicy", "Hot"] as const;
const ORDER_TYPES = ["Pick up", "Delivery"] as const;

const money = (n: number) => `GH₵${n}`;

export default function App() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [choices, setChoices] = useState<Record<string, string>>({});
  const [activeSection, setActiveSection] = useState(MENU[0].id);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [spiceLevel, setSpiceLevel] =
    useState<(typeof SPICE_LEVELS)[number]>("Mild");
  const [orderType, setOrderType] =
    useState<(typeof ORDER_TYPES)[number]>("Pick up");
  const [address, setAddress] = useState("");
  const [allergyNote, setAllergyNote] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Show the ordering info once per visitor.
  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem(POLICY_SEEN_KEY) === "1";
    } catch {
      /* storage unavailable */
    }
    if (!seen) setShowPolicy(true);
  }, []);

  const closePolicy = () => {
    setShowPolicy(false);
    try {
      localStorage.setItem(POLICY_SEEN_KEY, "1");
    } catch {
      /* storage unavailable */
    }
  };

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pillsRef = useRef<HTMLDivElement>(null);
  const clickScrolling = useRef(false);

  // Highlight the category pill for the section currently on screen.
  useEffect(() => {
    const onScroll = () => {
      if (clickScrolling.current) return;
      const offset = 150;
      let current = MENU[0].id;
      for (const s of MENU) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top - offset <= 0) current = s.id;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keep the active pill visible in the horizontal pill bar.
  useEffect(() => {
    const bar = pillsRef.current;
    const pill = bar?.querySelector<HTMLElement>(
      `[data-pill="${activeSection}"]`,
    );
    if (!bar || !pill) return;
    const left = pill.offsetLeft - bar.clientWidth / 2 + pill.clientWidth / 2;
    bar.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [activeSection]);

  useEffect(() => {
    document.body.style.overflow = isCartOpen || showPolicy ? "hidden" : "";
  }, [isCartOpen, showPolicy]);

  const jumpTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    setActiveSection(id);
    clickScrolling.current = true;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 130,
      behavior: "smooth",
    });
    window.setTimeout(() => (clickScrolling.current = false), 700);
  };

  const add = (key: string) =>
    setCart((c) => ({ ...c, [key]: (c[key] || 0) + 1 }));
  const remove = (key: string) =>
    setCart((c) => {
      const next = { ...c };
      if (next[key] > 1) next[key] -= 1;
      else delete next[key];
      return next;
    });

  const selectedOption = (item: Product) =>
    item.options ? (choices[item.id] ?? item.options.choices[0]) : undefined;

  const { totalCount, totalPrice } = useMemo(() => {
    let count = 0;
    let price = 0;
    for (const [key, qty] of Object.entries(cart)) {
      const item = findItem(parseKey(key).id);
      if (!item) continue;
      count += qty;
      price += item.price * qty;
    }
    return { totalCount: count, totalPrice: price };
  }, [cart]);

  const missing = {
    name: !customerName.trim(),
    phone: customerPhone.replace(/\D/g, "").length < 9,
    address: orderType === "Delivery" && !address.trim(),
  };

  const sendWhatsAppOrder = () => {
    if (totalCount === 0) return;
    if (missing.name || missing.phone || missing.address) {
      setShowErrors(true);
      return;
    }
    const lines = Object.entries(cart).map(([key, qty]) => {
      const { id, option } = parseKey(key);
      const item = findItem(id)!;
      const section = MENU.find((s) => s.items.includes(item))!;
      const name =
        section.title === item.name
          ? item.name
          : `${section.title} – ${item.name}`;
      return `▪️ ${qty} × ${name}${option ? ` _(${option})_` : ""} — ${money(item.price * qty)}`;
    });
    const isDelivery = orderType === "Delivery";
    const msg = [
      "Hello RISA! 👋🏾",
      "I’m craving something good today 😋 Here’s my order:",
      "",
      "🧾 *MY ORDER*",
      ...lines,
      "",
      `💰 *Food subtotal: ${money(totalPrice)}*`,
      isDelivery ? "_(Delivery fee to be confirmed)_" : null,
      "",
      "👤 *MY DETAILS*",
      `Name: ${customerName.trim()}`,
      `Phone: ${customerPhone.trim()}`,
      isDelivery ? "🛵 Order method: Delivery" : "🛍️ Order method: Pick up",
      isDelivery && address.trim() ? `📍 Location: ${address.trim()}` : null,
      `🌶️ Spice level: ${spiceLevel}`,
      allergyNote.trim() ? `📝 Notes: ${allergyNote.trim()}` : null,
      "",
      "Please confirm my order and let me know the total. Thank you! 🙏🏾",
      "_Sent from the RISA menu · Crafted for Cravings_",
    ]
      .filter((l) => l !== null)
      .join("\n");
    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
  };

  return (
    <div className="min-h-screen bg-[#F6F0E6] text-[#1F3A2B] font-sans pb-28">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#FFFCF7]/95 backdrop-blur-md border-b border-[#1F3A2B]/10">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <a
            href="#top"
            className="flex items-center gap-3"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img
              src={risaLogo}
              alt=""
              className="w-10 h-10 rounded-xl object-cover border border-[#1F3A2B]/15"
            />
            <div>
              <p className="font-serif text-xl font-bold tracking-wide text-[#1F3A2B] leading-none">
                RISA
              </p>
              <p className="font-mono text-[10px] tracking-[0.22em] text-[#5F6F63] mt-1">
                CRAFTED FOR CRAVINGS
              </p>
            </div>
          </a>
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Open your order"
            className="relative w-12 h-10 rounded-xl bg-[#D46A35] text-white flex items-center justify-center active:scale-95 transition"
          >
            <ShoppingBag size={19} />
            {totalCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#1F3A2B] text-white text-[11px] font-bold rounded-full min-w-5 h-5 px-1 flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Welcome banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F3E6D3] via-[#F6EDDF] to-[#F6F0E6]">
        <div className="relative max-w-2xl mx-auto px-4 pt-6 pb-4 text-center">
          <img src={risaWordmark} alt="RISA — Crafted for Cravings" className="w-[78%] max-w-sm mx-auto" />
          <p className="font-script text-[25px] leading-tight text-[#1F3A2B] mt-3 whitespace-nowrap">
            Where flavour meets every craving.
          </p>
          <div className="w-28 h-[3px] mx-auto mt-1 rounded-full bg-[#C9963F]" />
          <p className="text-[15px] text-[#45574A] mt-4">Discover a little something delicious.</p>
          <button
            onClick={() => jumpTo(MENU[0].id)}
            className="mt-5 h-12 px-7 rounded-full bg-[#1F3A2B] text-white font-medium inline-flex items-center gap-2 shadow-lg shadow-[#1F3A2B]/25 active:scale-95 transition"
          >
            Explore RISA
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="relative max-w-2xl mx-auto px-4 pt-8 pb-16">
          <div className="relative mx-auto w-[88%] aspect-square">
            <div className="absolute inset-[6%] rounded-full bg-[#8A6A45]/25 blur-2xl" />
            <img
              src={saladsPhoto}
              alt="RISA salad bowl"
              className="relative w-full h-full object-cover rounded-full border-[6px] border-[#FFFCF7] shadow-[0_24px_50px_rgba(60,40,20,0.25)]"
            />
            <p className="absolute -top-9 -right-1 font-script text-[26px] leading-[1.05] text-[#1F3A2B] rotate-[-8deg] text-right">
              Good Food.
              <br />
              Good Mood.
            </p>
            <span className="absolute bottom-4 left-0 text-3xl rotate-[-12deg]" aria-hidden="true">
              🤎
            </span>
          </div>
        </div>
        <svg
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-full h-14"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path fill="#F6F0E6" d="M0,80 C360,20 720,120 1080,60 C1260,30 1380,50 1440,60 L1440,120 L0,120 Z" />
        </svg>
      </section>

      {/* Why RISA */}
      <section className="max-w-2xl mx-auto px-4 pt-2">
        <SectionHeading>Why RISA?</SectionHeading>
        <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-6">
          {[
            { icon: ChefHat, title: "Made with Love", text: "Every dish is prepared with care." },
            { icon: UtensilsCrossed, title: "Irresistible Flavours", text: "A perfect blend of taste." },
            { icon: Bike, title: "Fast & Reliable", text: "Pick-up & delivery available." },
            { icon: Smile, title: "Customer First", text: "Your satisfaction is our priority." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="text-center">
              <span className="w-16 h-16 mx-auto rounded-full bg-[#F1DFC4] text-[#1F3A2B] flex items-center justify-center">
                <Icon size={28} strokeWidth={1.8} />
              </span>
              <p className="font-semibold text-[#1F3A2B] mt-3">{title}</p>
              <p className="text-sm text-[#5F6F63] mt-0.5">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Menu preview */}
      <section className="max-w-2xl mx-auto pt-10">
        <div className="px-4">
          <SectionHeading>Our Menu Preview</SectionHeading>
        </div>
        <div className="mt-5 px-4 flex gap-3 overflow-x-auto no-scrollbar snap-x">
          {[
            { id: "mozzarella", label: "Mozzarella Sticks", photo: mozzarellaPhoto },
            { id: "noodles", label: "Noodles & Pasta", photo: noodlesSectionPhoto },
            { id: "wings", label: "Chicken Wings", photo: wingsPhoto },
            { id: "gizdodo", label: "Gizdodo", photo: gizdodoPhoto },
            { id: "drinks", label: "Drinks & More", photo: sagoPhoto },
          ].map((c) => (
            <button
              key={c.id}
              onClick={() => jumpTo(c.id)}
              className="relative shrink-0 w-36 h-44 rounded-2xl overflow-hidden snap-start shadow-[0_8px_20px_rgba(31,58,43,0.15)]"
            >
              <img src={c.photo} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent pt-8 pb-2.5 text-white text-sm font-semibold">
                {c.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Come hungry band */}
      <section className="relative mt-10 bg-[#1F3A2B] overflow-hidden">
        <svg aria-hidden="true" className="absolute top-0 left-0 w-full h-6" viewBox="0 0 1440 40" preserveAspectRatio="none">
          <path fill="#F6F0E6" d="M0,0 L1440,0 L1440,10 C1080,40 720,0 360,25 C200,35 80,20 0,15 Z" />
        </svg>
        <div className="relative max-w-2xl mx-auto px-4 pt-10 pb-8 text-center">
          <p className="font-script text-[34px] leading-tight text-white">
            Come hungry, leave happy! <span className="text-[#E7C27A]">♡</span>
          </p>
          <a
            href={WHATSAPP_CHAT}
            target="_blank"
            rel="noreferrer"
            className="mt-5 h-12 px-7 rounded-full bg-[#E1B15A] text-[#1F3A2B] font-semibold inline-flex items-center gap-2 active:scale-95 transition"
          >
            <MessageCircle size={18} />
            Order Now
          </a>
        </div>
      </section>

      {/* Category pills */}
      <nav className="sticky top-16 z-30 bg-[#F6F0E6]/95 backdrop-blur-md border-b border-[#1F3A2B]/10">
        <div
          ref={pillsRef}
          className="relative max-w-2xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar"
        >
          {MENU.map((s) => {
            const active = s.id === activeSection;
            return (
              <button
                key={s.id}
                data-pill={s.id}
                onClick={() => jumpTo(s.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? "bg-[#D46A35] text-white"
                    : "bg-[#EFE8DC] text-[#5F6F63] hover:text-[#1F3A2B]"
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </nav>

      <main id="top" className="max-w-2xl mx-auto px-4">
        {/* Info strip */}
        <div className="mt-2 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-xl bg-[#FFFCF7] border border-[#1F3A2B]/10 py-3 px-2">
            <Clock size={15} className="mx-auto text-[#C2562A]" />
            <p className="text-[11px] text-[#1F3A2B] font-medium mt-1.5">
              Fri – Sun
            </p>
            <p className="text-[11px] text-[#5F6F63]">12:00 – 8:00pm</p>
          </div>
          <div className="rounded-xl bg-[#FFFCF7] border border-[#1F3A2B]/10 py-3 px-2">
            <Bike size={15} className="mx-auto text-[#C2562A]" />
            <p className="text-[11px] text-[#1F3A2B] font-medium mt-1.5">
              Pick up &
            </p>
            <p className="text-[11px] text-[#5F6F63]">delivery</p>
          </div>
          <a
            href={WHATSAPP_CHAT}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-[#FFFCF7] border border-[#1F3A2B]/10 py-3 px-2 block"
          >
            <MessageCircle size={15} className="mx-auto text-[#25D366]" />
            <p className="text-[11px] text-[#1F3A2B] font-medium mt-1.5">
              WhatsApp to order
            </p>
            <p className="text-[11px] text-[#5F6F63]">{PHONE_DISPLAY}</p>
          </a>
        </div>

        {MENU.map((section) => (
          <section key={section.id} id={section.id} className="pt-10">
            <h2 className="font-serif text-[32px] leading-tight font-bold text-[#1F3A2B]">
              {section.title}
            </h2>
            <p className="text-[#5F6F63] mt-1">{section.tagline}</p>

            {section.photo && (
              <div className="relative mt-5 rounded-3xl overflow-hidden border border-[#1F3A2B]/10 aspect-[4/3] bg-[#FFFCF7]">
                <span className="absolute top-3 left-3 z-10 text-[11px] font-semibold uppercase tracking-wider text-white bg-black/55 backdrop-blur px-3 py-1 rounded-full">
                  {section.label}
                </span>
                <img
                  src={section.photo}
                  alt={section.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="mt-4 space-y-3">
              {section.items.map((item) => {
                const option = selectedOption(item);
                const key = lineKey(item.id, option);
                const qty = cart[key] || 0;
                return (
                  <article
                    key={item.id}
                    className={`rounded-3xl bg-[#FFFCF7] border p-5 shadow-[0_6px_20px_rgba(31,58,43,0.06)] transition-colors ${
                      qty ? "border-[#D46A35]/50" : "border-[#1F3A2B]/10"
                    }`}
                  >
                    <div className="flex gap-4">
                      <div className="flex-1 min-w-0">
                        {item.badge && (
                          <span className="inline-block mb-2 font-mono text-[10px] uppercase tracking-widest text-[#C2562A] bg-[#D46A35]/10 border border-[#D46A35]/30 rounded-full px-2.5 py-0.5">
                            {item.badge}
                          </span>
                        )}
                        <h3 className="font-display text-[17px] font-semibold tracking-wide text-[#1F3A2B] leading-snug uppercase">
                          {item.name}
                        </h3>
                        {item.description && (
                          <p className="text-[15px] text-[#5F6F63] mt-1.5 leading-relaxed">
                            {item.description}
                          </p>
                        )}
                        {item.note && (
                          <p className="text-[13px] text-[#B8862D] mt-1.5">
                            {item.note}
                          </p>
                        )}
                      </div>
                      {item.thumb && (
                        <img
                          src={item.thumb}
                          alt={item.name}
                          loading="lazy"
                          className="w-24 h-24 rounded-2xl object-cover shrink-0 border border-[#1F3A2B]/10"
                        />
                      )}
                    </div>

                    {item.options && (
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="text-xs text-[#7D897F] mr-1">
                          {item.options.label}
                        </span>
                        {item.options.choices.map((c) => (
                          <button
                            key={c}
                            onClick={() =>
                              setChoices((p) => ({ ...p, [item.id]: c }))
                            }
                            className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                              option === c
                                ? "bg-[#1F3A2B] text-white border-[#1F3A2B]"
                                : "border-[#1F3A2B]/20 text-[#45574A] hover:border-[#1F3A2B]/30"
                            }`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-serif text-2xl font-bold text-[#C2562A]">
                        {money(item.price)}
                      </span>
                      {qty ? (
                        <div className="flex items-center gap-3 bg-[#EFE8DC] rounded-full p-1 border border-[#1F3A2B]/15">
                          <button
                            onClick={() => remove(key)}
                            aria-label={`Remove one ${item.name}`}
                            className="w-9 h-9 rounded-full flex items-center justify-center text-[#1F3A2B] hover:bg-[#1F3A2B]/10"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-4 text-center font-semibold text-[#1F3A2B]">
                            {qty}
                          </span>
                          <button
                            onClick={() => add(key)}
                            aria-label={`Add one more ${item.name}`}
                            className="w-9 h-9 rounded-full flex items-center justify-center bg-[#D46A35] text-white"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => add(key)}
                          className="flex items-center gap-2 px-5 h-11 rounded-full bg-transparent border border-[#1F3A2B]/25 text-[#1F3A2B] font-medium hover:bg-[#D46A35] hover:border-[#D46A35] hover:text-white active:scale-95 transition"
                        >
                          <Plus size={16} />
                          Add
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}

        {/* Good to know */}
        <section className="pt-10">
          <div className="rounded-3xl bg-[#FFFCF7] border border-[#1F3A2B]/10 p-5 space-y-3 text-[15px]">
            <p className="text-[#1F3A2B] font-serif text-xl font-semibold">
              Good to know
            </p>
            <p className="text-[#5F6F63]">
              <span className="text-[#1F3A2B]">Spice level:</span> Mild · Spicy ·
              Hot — choose when you order.
            </p>
            <p className="text-[#5F6F63] flex gap-2">
              <AlertCircle
                size={18}
                className="text-[#B8862D] shrink-0 mt-0.5"
              />
              Kindly let us know if you are allergic to something.
            </p>
          </div>
        </section>

        <button
          onClick={() => setShowPolicy(true)}
          className="mt-3 w-full rounded-2xl border border-[#1F3A2B]/15 py-3 text-sm text-[#45574A] flex items-center justify-center gap-2"
        >
          <Info size={16} /> Ordering & delivery info
        </button>
      </main>

      {/* Footer */}
      <footer className="mt-12 bg-[#1F3A2B]">
        <div className="max-w-2xl mx-auto px-4 py-10">
          <div className="flex items-center gap-3">
            <img
              src={risaLogo}
              alt=""
              className="w-12 h-12 rounded-full object-cover border border-[#E7C27A]/60"
            />
            <div>
              <p className="font-display text-2xl font-semibold tracking-[0.12em] text-white leading-none">
                RISA
              </p>
              <p className="font-display text-[10px] tracking-[0.3em] text-[#E7C27A] mt-1">
                CRAFTED FOR CRAVINGS
              </p>
            </div>
          </div>
          <p className="text-[#C9D6C4] mt-4 leading-relaxed">
            Ghanaian salad bowls, loaded noodles and stir-fry pasta, wings and
            sweet treats — made fresh for every order.
          </p>

          <div className="grid grid-cols-2 gap-6 mt-8 text-sm">
            <div>
              <p className="font-display text-xs tracking-[0.25em] text-[#E7C27A] mb-3">
                MENU
              </p>
              <ul className="space-y-2">
                {MENU.map((s) => (
                  <li key={s.id}>
                    <button
                      onClick={() => jumpTo(s.id)}
                      className="text-[#E8EFE3] hover:text-white"
                    >
                      {s.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-display text-xs tracking-[0.25em] text-[#E7C27A] mb-3">
                VISIT & ORDER
              </p>
              <ul className="space-y-3 text-[#E8EFE3]">
                <li>
                  <a
                    href={WHATSAPP_CHAT}
                    target="_blank"
                    rel="noreferrer"
                    className="flex gap-2 hover:text-white"
                  >
                    <MessageCircle
                      size={16}
                      className="text-[#25D366] shrink-0 mt-0.5"
                    />
                    <span>
                      WhatsApp
                      <br />
                      {PHONE_DISPLAY}
                    </span>
                  </a>
                </li>
                <li className="flex gap-2">
                  <Clock size={16} className="text-[#F09A6B] shrink-0 mt-0.5" />
                  <span>
                    Friday – Sunday
                    <br />
                    12:00 – 8:00pm
                  </span>
                </li>
                <li className="flex gap-2">
                  <Bike size={16} className="text-[#F09A6B] shrink-0 mt-0.5" />
                  <span>Pick up & delivery in Accra</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-5 border-t border-white/10 flex items-center justify-between text-xs text-[#A9B9A0]">
            <span>© {new Date().getFullYear()} RISA. All rights reserved.</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-1 text-[#E8EFE3]"
            >
              Back to top <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </footer>

      {/* Ordering info popup */}
      {showPolicy && (
        <div
          className="fixed inset-0 z-[60] bg-[#1F3A2B]/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closePolicy}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md max-h-[88vh] overflow-y-auto rounded-3xl bg-[#FFFCF7] border border-[#1F3A2B]/15 p-6"
          >
            <button
              onClick={closePolicy}
              aria-label="Close"
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#1F3A2B]/10 text-[#1F3A2B] flex items-center justify-center"
            >
              <X size={18} />
            </button>
            <img
              src={risaLogo}
              alt=""
              className="w-14 h-14 mx-auto rounded-full object-cover border border-[#B8862D]/60"
            />
            <h2 className="font-display text-center text-lg font-semibold tracking-[0.1em] text-[#1F3A2B] mt-3">
              RISA ORDERING INFO
            </h2>
            <p className="text-center text-sm text-[#5F6F63] mt-2">
              Every order is made fresh for you, so please allow a little time
              for preparation.
            </p>
            <div className="mt-5 space-y-2.5">
              {[
                {
                  icon: Clock,
                  title: "Opening hours",
                  text: "Friday – Sunday, 12:00 – 8:00pm.",
                },
                {
                  icon: Sparkles,
                  title: "Made fresh",
                  text: "We cook each order when it comes in. Busy times may take a little longer.",
                },
                {
                  icon: Bike,
                  title: "Pick up & delivery",
                  text: "Delivery is available in Accra. The delivery fee depends on your location and is confirmed on WhatsApp.",
                },
                {
                  icon: CloudRain,
                  title: "Weather delays",
                  text: "Heavy rain can delay delivery riders. Thank you for your patience.",
                },
                {
                  icon: AlertCircle,
                  title: "Allergies",
                  text: "Kindly let us know if you are allergic to something.",
                },
              ].map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="flex gap-3 rounded-2xl border border-[#1F3A2B]/15 p-3"
                >
                  <span className="w-9 h-9 shrink-0 rounded-full bg-[#D46A35]/15 text-[#C2562A] flex items-center justify-center">
                    <Icon size={17} />
                  </span>
                  <div>
                    <p className="font-display text-xs font-semibold tracking-[0.12em] text-[#1F3A2B] uppercase">
                      {title}
                    </p>
                    <p className="text-sm text-[#5F6F63] mt-0.5">{text}</p>
                  </div>
                </div>
              ))}
            </div>
            <a
              href={WHATSAPP_CHAT}
              target="_blank"
              rel="noreferrer"
              className="mt-5 rounded-2xl bg-[#B8862D]/10 border border-[#B8862D]/30 p-4 text-sm text-[#7A5A1C] flex gap-2"
            >
              <MessageCircle size={17} className="shrink-0 mt-0.5" />
              Questions? WhatsApp us on {PHONE_DISPLAY}.
            </a>
            <button
              onClick={closePolicy}
              className="mt-4 w-full h-12 rounded-full bg-[#D46A35] text-white font-medium"
            >
              Start ordering
            </button>
          </div>
        </div>
      )}

      {/* Bottom order bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-[#FFFCF7]/95 backdrop-blur-md border-t border-[#1F3A2B]/15">
        <div className="max-w-2xl mx-auto px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] flex items-center justify-between gap-4">
          <div>
            <p className="font-serif text-2xl font-bold text-[#1F3A2B] leading-none">
              {money(totalPrice)}
            </p>
            <p className="text-xs text-[#5F6F63] mt-1 whitespace-nowrap">
              {totalCount === 0
                ? "Your order awaits"
                : `${totalCount} item${totalCount > 1 ? "s" : ""} in your order`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {showBackToTop && (
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                aria-label="Back to top"
                className="w-12 h-12 rounded-xl border border-[#1F3A2B]/20 text-[#1F3A2B] flex items-center justify-center active:scale-95 transition"
              >
                <ArrowUp size={18} />
              </button>
            )}
            <button
              onClick={() =>
                totalCount ? setIsCartOpen(true) : jumpTo(MENU[0].id)
              }
              className="h-12 px-5 rounded-xl bg-[#D46A35] text-white font-medium whitespace-nowrap flex items-center gap-2 active:scale-95 transition"
            >
              {totalCount ? "View order" : "View menu"}
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </div>

      {/* Order sheet */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#1F3A2B]/50 backdrop-blur-sm flex items-end sm:items-center justify-center"
          onClick={() => setIsCartOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FFFCF7] w-full max-w-lg rounded-t-3xl sm:rounded-3xl border border-[#1F3A2B]/15 max-h-[90vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5"
          >
            <div className="px-5 py-4 border-b border-[#1F3A2B]/15 flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#1F3A2B]">
                  Your order
                </h2>
                <p className="text-xs text-[#5F6F63]">
                  Sent to RISA on WhatsApp
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                aria-label="Close"
                className="w-9 h-9 rounded-full bg-[#1F3A2B]/5 text-[#45574A] flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-5">
              {totalCount === 0 ? (
                <div className="text-center py-10">
                  <ShoppingBag
                    size={32}
                    className="mx-auto text-[#A3ADA4] mb-2"
                  />
                  <p className="text-[#5F6F63]">
                    Nothing here yet — add something tasty.
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    {Object.entries(cart).map(([key, qty]) => {
                      const { id, option } = parseKey(key);
                      const item = findItem(id);
                      if (!item) return null;
                      const section = MENU.find((s) => s.items.includes(item))!;
                      return (
                        <div
                          key={key}
                          className="flex items-center gap-3 bg-[#EFE8DC] p-3 rounded-2xl"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] uppercase tracking-wider text-[#7D897F]">
                              {section.label}
                            </p>
                            <p className="text-sm font-medium text-[#1F3A2B]">
                              {item.name}
                              {option && (
                                <span className="text-[#5F6F63]">
                                  {" "}
                                  · {option}
                                </span>
                              )}
                            </p>
                            <p className="text-sm text-[#C2562A] mt-0.5">
                              {money(item.price * qty)}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => remove(key)}
                              aria-label="Remove one"
                              className="w-8 h-8 rounded-lg bg-[#1F3A2B]/5 text-[#1F3A2B] flex items-center justify-center"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-4 text-center text-sm font-semibold">
                              {qty}
                            </span>
                            <button
                              onClick={() => add(key)}
                              aria-label="Add one"
                              className="w-8 h-8 rounded-lg bg-[#D46A35] text-white flex items-center justify-center"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <Field
                    label="Your name"
                    error={
                      showErrors && missing.name
                        ? "Please enter your name"
                        : undefined
                    }
                  >
                    <input
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Enter your name"
                      autoComplete="name"
                      className={inputClass}
                    />
                  </Field>
                  <Field
                    label="Your phone number"
                    error={
                      showErrors && missing.phone
                        ? "Please enter a valid phone number"
                        : undefined
                    }
                  >
                    <input
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="Your contact number"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      className={inputClass}
                    />
                  </Field>

                  <Choice<(typeof ORDER_TYPES)[number]>
                    label="Order method"
                    options={ORDER_TYPES}
                    value={orderType}
                    onChange={setOrderType}
                  />
                  {orderType === "Delivery" && (
                    <Field
                      label="Delivery location in Accra"
                      error={
                        showErrors && missing.address
                          ? "Please enter your delivery location"
                          : undefined
                      }
                    >
                      <input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="e.g. Teshie, Osu, East Legon"
                        autoComplete="street-address"
                        className={inputClass}
                      />
                    </Field>
                  )}
                  <Choice<(typeof SPICE_LEVELS)[number]>
                    label="Preferred spice level"
                    options={SPICE_LEVELS}
                    value={spiceLevel}
                    onChange={setSpiceLevel}
                  />

                  <Field label="Add-ons, flavour choices or allergy notes">
                    <textarea
                      value={allergyNote}
                      onChange={(e) => setAllergyNote(e.target.value)}
                      placeholder="e.g. BBQ wings, mango sago, no onions…"
                      rows={3}
                      className={inputClass}
                    />
                    <p className="text-xs text-[#7D897F] mt-1.5 flex items-center gap-1.5">
                      <AlertCircle size={13} className="text-[#B8862D]" />
                      Kindly let us know if you are allergic to something.
                    </p>
                  </Field>
                </>
              )}
            </div>

            {totalCount > 0 && (
              <div className="p-5 border-t border-[#1F3A2B]/15 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#45574A]">
                    Food subtotal
                  </span>
                  <span className="font-serif text-2xl font-bold text-[#1F3A2B]">
                    {money(totalPrice)}
                  </span>
                </div>
                <p className="text-xs text-[#7D897F] mt-1 mb-3">
                  {orderType === "Delivery"
                    ? "Delivery fee is not included; it will be confirmed based on your location."
                    : "Pick up — we’ll confirm when your order is ready."}
                </p>
                {showErrors &&
                  (missing.name || missing.phone || missing.address) && (
                    <p className="text-sm text-[#C0392B] mb-3">
                      Please fill in the highlighted details above.
                    </p>
                  )}
                <button
                  onClick={sendWhatsAppOrder}
                  className="w-full h-13 py-3.5 rounded-xl bg-[#25D366] text-[#0B2B17] font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition"
                >
                  <Send size={17} />
                  Send order on WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const inputClass =
  "w-full bg-[#EFE8DC] border border-[#1F3A2B]/15 rounded-xl px-3 py-3 text-[16px] text-[#1F3A2B] placeholder-[#9AA59B] focus:outline-none focus:border-[#D46A35]";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={
        error ? "[&_input]:border-[#C2562A] [&_textarea]:border-[#C2562A]" : ""
      }
    >
      <label className="block text-sm text-[#45574A] mb-2">{label}</label>
      {children}
      {error && <p className="text-xs text-[#C0392B] mt-1.5">{error}</p>}
    </div>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex-1 h-px bg-[#C9963F]/50" />
      <h2 className="font-serif text-[28px] font-bold text-[#1F3A2B] whitespace-nowrap">{children}</h2>
      <span className="flex-1 h-px bg-[#C9963F]/50" />
    </div>
  );
}

function Choice<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <p className="text-sm text-[#45574A] mb-2">{label}</p>
      <div className="flex gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
              value === o
                ? "bg-[#D46A35] text-white border-[#D46A35]"
                : "bg-[#EFE8DC] text-[#5F6F63] border-[#1F3A2B]/10"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
