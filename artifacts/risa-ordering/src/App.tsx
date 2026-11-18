import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Bike,
  Clock,
  Minus,
  Phone,
  Plus,
  Send,
  ShoppingBag,
  X,
} from 'lucide-react';

import risaLogo from './assets/risa-logo-design.jpeg';
import saladsPhoto from './assets/menu-photos/salads-risa-enhanced.jpg';
import noodlesPhoto from './assets/menu-photos/noodles-risa-enhanced.jpg';
import wingsPhoto from './assets/menu-photos/wings-risa-enhanced.jpg';
import mozzarellaPhoto from './assets/menu-photos/mozzarella-risa-enhanced.jpg';
import kenkeyPhoto from './assets/menu-photos/kenkey-risa.jpg';
import pineapplePhoto from './assets/menu-photos/pineapple-risa.jpg';
import sagoPhoto from './assets/menu-photos/sago-square.jpg';
import parfaitPhoto from './assets/menu-photos/parfait-risa.jpg';
import pennePhoto from './assets/menu-photos/penne-risa.jpg';
import gizdodoPhoto from './assets/menu-photos/gizdodo-risa.jpg';
import soboloPhoto from './assets/menu-photos/sobolo-risa.jpg';
import friesPhoto from './assets/menu-photos/fries-risa.jpg';
import bavariaPhoto from './assets/menu-photos/bavaria-malt.jpg';

const PHONE_DISPLAY = '024 128 0476';
const PHONE_TEL = '0241280476';
const WHATSAPP = '233241280476';

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
    id: 'salads',
    label: 'Salad Bowls',
    title: 'Ghanaian Salad Bowl',
    tagline: 'Fresh, hearty and packed with flavour.',
    photo: saladsPhoto,
    items: [
      {
        id: 'salad-mini',
        name: 'Mini Salad Bowl',
        price: 30,
        description: 'Vegetables, sardine, egg, corned beef, ketchup, baked beans, special sauce.',
      },
      {
        id: 'salad-classic',
        name: 'Classic Salad Bowl',
        price: 50,
        badge: 'Popular',
        description:
          'Vegetables, sardines, egg, sausage, corned beef, sweet corn, macaroni, special sauce, ketchup, baked beans, sweet potato.',
      },
      {
        id: 'salad-cluck',
        name: 'Cluck Chicken Salad Bowl',
        price: 70,
        description:
          'Vegetables, egg, gizzards, macaroni, sweet corn, chicken, special sauce, ketchup, baked beans, sweet potato.',
      },
    ],
  },
  {
    id: 'noodles',
    label: 'Noodles / Stir Fry',
    title: 'Noodles / Stir Fry Pasta',
    tagline: 'The cravings that started it all.',
    photo: noodlesPhoto,
    items: [
      {
        id: 'noodles-regular',
        name: 'Regular Noodles / Stir-fry Pasta',
        price: 30,
        description: 'Noodles or pasta, vegetables, egg, sausage, sardine, corned beef.',
        options: { label: 'Base', choices: ['Noodles', 'Pasta'] },
      },
      {
        id: 'noodles-mini',
        name: 'Mini Craving Noodles / Stir-fry Pasta',
        price: 40,
        description: 'Noodles or pasta, vegetables, sausages, sardines, eggs, gizzard, corned beef.',
        note: 'Comes with either extra egg or sausage',
        options: { label: 'Extra', choices: ['Extra egg', 'Extra sausage'] },
      },
      {
        id: 'noodles-classic',
        name: 'Classic Craving Noodles / Stir-fry Pasta',
        price: 50,
        badge: 'Popular',
        description: 'Noodles or pasta, vegetables, sausages, sardines, eggs, corned beef, gizzard.',
        note: 'Comes with either extra egg or sausage',
        options: { label: 'Extra', choices: ['Extra egg', 'Extra sausage'] },
      },
      {
        id: 'noodles-cluck',
        name: 'Cluck Craving Noodles / Stir-fry Pasta',
        price: 70,
        description:
          'Noodles or pasta, vegetables, sausages, sardines, eggs, corned beef, chicken, gizzard, meat.',
        note: 'Comes with either extra egg or sausage',
        options: { label: 'Extra', choices: ['Extra egg', 'Extra sausage'] },
      },
      {
        id: 'noodles-og',
        name: 'OG Craving',
        price: 100,
        badge: 'Signature',
        description:
          'Noodles or pasta, vegetables, sausages, sardines, eggs, gizzard, corned beef, chicken, shrimp, meat.',
        note: 'Comes with extra egg and sausage',
      },
      {
        id: 'noodles-wings-combo',
        name: 'Mini Craving × Chicken Wings',
        price: 100,
        badge: 'Combo',
        description: 'Mini Craving noodles or stir-fry pasta with chicken wings.',
        options: { label: 'Wing flavour', choices: ['Spicy', 'BBQ'] },
      },
    ],
  },
  {
    id: 'penne',
    label: 'Penne Pasta',
    title: 'Penne Pasta Bowl',
    tagline: 'Comfort in a bowl.',
    photo: pennePhoto,
    items: [
      { id: 'penne-small', name: 'Small Bowl', price: 40 },
      {
        id: 'penne-regular',
        name: 'Regular Bowl with Chicken / Turkey',
        price: 70,
        options: { label: 'Protein', choices: ['Chicken', 'Turkey'] },
      },
    ],
  },
  {
    id: 'gizdodo',
    label: 'Gizdodo',
    title: 'Gizdodo',
    tagline: 'Gizzard and plantain, done right.',
    photo: gizdodoPhoto,
    items: [
      { id: 'gizdodo-small', name: 'Small Pack', price: 40 },
      {
        id: 'gizdodo-regular',
        name: 'Regular Pack with Chicken / Turkey',
        price: 70,
        options: { label: 'Protein', choices: ['Chicken', 'Turkey'] },
      },
    ],
  },
  {
    id: 'wings',
    label: 'Chicken Wings',
    title: 'Chicken Wings',
    tagline: 'Juicy & tasty. Spicy or BBQ.',
    photo: wingsPhoto,
    items: [
      {
        id: 'wings-5',
        name: '5 Pieces',
        price: 50,
        options: { label: 'Flavour', choices: ['Spicy', 'BBQ'] },
      },
      {
        id: 'wings-10',
        name: '10 Pieces',
        price: 90,
        badge: 'Value',
        options: { label: 'Flavour', choices: ['Spicy', 'BBQ'] },
      },
    ],
  },
  {
    id: 'mozzarella',
    label: 'Mozzarella Sticks',
    title: 'Mozzarella Sticks',
    tagline: 'Golden and gooey. Comes with a special sauce.',
    photo: mozzarellaPhoto,
    items: [
      { id: 'mozz-5', name: '5 Pieces', price: 60 },
      { id: 'mozz-10', name: '10 Pieces', price: 115 },
    ],
  },
  {
    id: 'drinks',
    label: 'Drinks & Sweets',
    title: 'Drinks & Something Sweet',
    tagline: 'Cool down. Sweeten up.',
    items: [
      {
        id: 'drink-kenkey',
        name: 'Ice Kenkey',
        price: 15,
        badge: 'Local favourite',
        description: 'Refreshing & creamy.',
        thumb: kenkeyPhoto,
      },
      { id: 'drink-sobolo', name: 'Sobolo', price: 10, description: 'Chilled hibiscus drink.', thumb: soboloPhoto },
      {
        id: 'drink-bavaria',
        name: 'Bavaria Malt',
        price: 10,
        description: 'Dark malt drink. 0.0% alcohol.',
        thumb: bavariaPhoto,
      },
      {
        id: 'drink-pineapple',
        name: 'Pineapple Juice',
        price: 15,
        description: 'Pure goodness.',
        thumb: pineapplePhoto,
      },
      {
        id: 'sweet-sago',
        name: 'Sweet Sago Cloud',
        price: 50,
        description: 'Light, sweet and fruity.',
        options: { label: 'Flavour', choices: ['Mango', 'Strawberry', 'Banana'] },
        thumb: sagoPhoto,
      },
      {
        id: 'sweet-parfait',
        name: 'Parfait',
        price: 50,
        description: 'Yogurt, granola and two toppings of fruit.',
        thumb: parfaitPhoto,
      },
    ],
  },
  {
    id: 'extras',
    label: 'Extras',
    title: 'Extras',
    tagline: 'Add a little extra to your favourite meal.',
    items: [
      { id: 'extra-sausage', name: 'Sausage', price: 5 },
      { id: 'extra-egg', name: 'Egg', price: 5 },
      { id: 'extra-chicken', name: 'Chicken', price: 15 },
      { id: 'extra-fries', name: 'Fries', price: 25, thumb: friesPhoto },
    ],
  },
];

const ALL_ITEMS = MENU.flatMap((s) => s.items);
const findItem = (id: string) => ALL_ITEMS.find((i) => i.id === id);

// Cart lines are keyed by "itemId|option" so the same dish in two flavours stays separate.
const lineKey = (id: string, option?: string) => (option ? `${id}|${option}` : id);
const parseKey = (key: string) => {
  const [id, option] = key.split('|');
  return { id, option };
};

const SPICE_LEVELS = ['Mild', 'Spicy', 'Hot'] as const;
const ORDER_TYPES = ['Pick up', 'Delivery'] as const;

const money = (n: number) => `GH₵${n}`;

export default function App() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [choices, setChoices] = useState<Record<string, string>>({});
  const [activeSection, setActiveSection] = useState(MENU[0].id);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [spiceLevel, setSpiceLevel] = useState<(typeof SPICE_LEVELS)[number]>('Mild');
  const [orderType, setOrderType] = useState<(typeof ORDER_TYPES)[number]>('Pick up');
  const [address, setAddress] = useState('');
  const [allergyNote, setAllergyNote] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [showErrors, setShowErrors] = useState(false);

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
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Keep the active pill visible in the horizontal pill bar.
  useEffect(() => {
    const bar = pillsRef.current;
    const pill = bar?.querySelector<HTMLElement>(`[data-pill="${activeSection}"]`);
    if (!bar || !pill) return;
    const left = pill.offsetLeft - bar.clientWidth / 2 + pill.clientWidth / 2;
    bar.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
  }, [activeSection]);

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? 'hidden' : '';
  }, [isCartOpen]);

  const jumpTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    setActiveSection(id);
    clickScrolling.current = true;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 130, behavior: 'smooth' });
    window.setTimeout(() => (clickScrolling.current = false), 700);
  };

  const add = (key: string) => setCart((c) => ({ ...c, [key]: (c[key] || 0) + 1 }));
  const remove = (key: string) =>
    setCart((c) => {
      const next = { ...c };
      if (next[key] > 1) next[key] -= 1;
      else delete next[key];
      return next;
    });

  const selectedOption = (item: Product) =>
    item.options ? choices[item.id] ?? item.options.choices[0] : undefined;

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
    phone: customerPhone.replace(/\D/g, '').length < 9,
    address: orderType === 'Delivery' && !address.trim(),
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
      const name = section.title === item.name ? item.name : `${section.title} – ${item.name}`;
      return `• ${qty} × ${name}${option ? ` (${option})` : ''} = ${money(item.price * qty)}`;
    });
    const msg = [
      '*NEW ORDER – RISA*',
      '',
      ...lines,
      '',
      `*Food subtotal: ${money(totalPrice)}*`,
      orderType === 'Delivery' ? '_Delivery fee to be confirmed_' : null,
      '',
      `Name: ${customerName.trim()}`,
      `Phone: ${customerPhone.trim()}`,
      `Order type: ${orderType}`,
      orderType === 'Delivery' && address.trim() ? `Delivery location: ${address.trim()}` : null,
      `Spice level: ${spiceLevel}`,
      allergyNote.trim() ? `Add-ons / flavours / allergies: ${allergyNote.trim()}` : null,
    ]
      .filter((l) => l !== null)
      .join('\n');
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#141111] text-[#EDE6DF] font-sans pb-28">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#191515]/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src={risaLogo} alt="" className="w-10 h-10 rounded-xl object-cover border border-white/10" />
            <div>
              <p className="font-serif text-xl font-bold tracking-wide text-white leading-none">RISA</p>
              <p className="font-mono text-[10px] tracking-[0.22em] text-neutral-400 mt-1">CRAFTED FOR CRAVINGS</p>
            </div>
          </a>
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Open your order"
            className="relative w-12 h-10 rounded-xl bg-[#C23B33] text-white flex items-center justify-center active:scale-95 transition"
          >
            <ShoppingBag size={19} />
            {totalCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-white text-[#C23B33] text-[11px] font-bold rounded-full min-w-5 h-5 px-1 flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Category pills */}
      <nav className="sticky top-16 z-30 bg-[#141111]/95 backdrop-blur-md border-b border-white/5">
        <div ref={pillsRef} className="relative max-w-2xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar">
          {MENU.map((s) => {
            const active = s.id === activeSection;
            return (
              <button
                key={s.id}
                data-pill={s.id}
                onClick={() => jumpTo(s.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  active ? 'bg-[#C23B33] text-white' : 'bg-[#221D1D] text-neutral-400 hover:text-white'
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
        <div className="mt-5 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-xl bg-[#1D1818] border border-white/5 py-3 px-2">
            <Clock size={15} className="mx-auto text-[#E0544B]" />
            <p className="text-[11px] text-white font-medium mt-1.5">Fri – Sun</p>
            <p className="text-[11px] text-neutral-400">12:00 – 8:00pm</p>
          </div>
          <div className="rounded-xl bg-[#1D1818] border border-white/5 py-3 px-2">
            <Bike size={15} className="mx-auto text-[#E0544B]" />
            <p className="text-[11px] text-white font-medium mt-1.5">Pick up &</p>
            <p className="text-[11px] text-neutral-400">delivery</p>
          </div>
          <a href={`tel:${PHONE_TEL}`} className="rounded-xl bg-[#1D1818] border border-white/5 py-3 px-2 block">
            <Phone size={15} className="mx-auto text-[#E0544B]" />
            <p className="text-[11px] text-white font-medium mt-1.5">Call / WhatsApp</p>
            <p className="text-[11px] text-neutral-400">{PHONE_DISPLAY}</p>
          </a>
        </div>

        {MENU.map((section) => (
          <section key={section.id} id={section.id} className="pt-10">
            <h2 className="font-serif text-[32px] leading-tight font-bold text-white">{section.title}</h2>
            <p className="text-neutral-400 mt-1">{section.tagline}</p>

            {section.photo && (
              <div className="mt-5 rounded-3xl overflow-hidden border border-white/5 aspect-[16/10] bg-[#1D1818]">
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
                    className={`rounded-3xl bg-[#211C1C] border p-5 transition-colors ${
                      qty ? 'border-[#C23B33]/50' : 'border-white/5'
                    }`}
                  >
                    <div className="flex gap-4">
                      <div className="flex-1 min-w-0">
                        {item.badge && (
                          <span className="inline-block mb-2 font-mono text-[10px] uppercase tracking-widest text-[#E0544B] bg-[#C23B33]/10 border border-[#C23B33]/30 rounded-full px-2.5 py-0.5">
                            {item.badge}
                          </span>
                        )}
                        <h3 className="font-serif text-xl font-semibold text-white leading-snug">{item.name}</h3>
                        {item.description && (
                          <p className="text-[15px] text-neutral-400 mt-1.5 leading-relaxed">{item.description}</p>
                        )}
                        {item.note && <p className="text-[13px] text-[#E3B062] mt-1.5">{item.note}</p>}
                      </div>
                      {item.thumb && (
                        <img
                          src={item.thumb}
                          alt={item.name}
                          loading="lazy"
                          className="w-24 h-24 rounded-2xl object-cover shrink-0 border border-white/5"
                        />
                      )}
                    </div>

                    {item.options && (
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="text-xs text-neutral-500 mr-1">{item.options.label}</span>
                        {item.options.choices.map((c) => (
                          <button
                            key={c}
                            onClick={() => setChoices((p) => ({ ...p, [item.id]: c }))}
                            className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                              option === c
                                ? 'bg-white text-[#141111] border-white'
                                : 'border-white/15 text-neutral-300 hover:border-white/40'
                            }`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-serif text-2xl font-bold text-[#E0544B]">{money(item.price)}</span>
                      {qty ? (
                        <div className="flex items-center gap-3 bg-[#2C2525] rounded-xl p-1 border border-white/10">
                          <button
                            onClick={() => remove(key)}
                            aria-label={`Remove one ${item.name}`}
                            className="w-9 h-9 rounded-lg flex items-center justify-center text-white hover:bg-white/10"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-4 text-center font-semibold text-white">{qty}</span>
                          <button
                            onClick={() => add(key)}
                            aria-label={`Add one more ${item.name}`}
                            className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#C23B33] text-white"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => add(key)}
                          className="flex items-center gap-2 px-5 h-11 rounded-xl bg-[#2C2525] border border-white/10 text-white font-medium hover:bg-[#C23B33] hover:border-[#C23B33] active:scale-95 transition"
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
          <div className="rounded-3xl bg-[#211C1C] border border-white/5 p-5 space-y-3 text-[15px]">
            <p className="text-white font-serif text-xl font-semibold">Good to know</p>
            <p className="text-neutral-400">
              <span className="text-white">Spice level:</span> Mild · Spicy · Hot — choose when you order.
            </p>
            <p className="text-neutral-400 flex gap-2">
              <AlertCircle size={18} className="text-[#E3B062] shrink-0 mt-0.5" />
              Kindly let us know if you are allergic to something.
            </p>
          </div>
        </section>

        <footer className="pt-10 pb-6 text-center text-sm text-neutral-500">
          <p className="font-serif text-lg text-white">RISA</p>
          <p className="mt-1">Friday – Sunday · 12:00 – 8:00pm · Pick up & delivery</p>
          <a href={`tel:${PHONE_TEL}`} className="mt-1 inline-block text-neutral-300">
            Call / WhatsApp {PHONE_DISPLAY}
          </a>
        </footer>
      </main>

      {/* Bottom order bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-[#191515]/95 backdrop-blur-md border-t border-white/10">
        <div className="max-w-2xl mx-auto px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] flex items-center justify-between gap-4">
          <div>
            <p className="font-serif text-2xl font-bold text-white leading-none">{money(totalPrice)}</p>
            <p className="text-sm text-neutral-400 mt-1">
              {totalCount === 0 ? 'Your order is waiting' : `${totalCount} item${totalCount > 1 ? 's' : ''} in your order`}
            </p>
          </div>
          <button
            onClick={() => (totalCount ? setIsCartOpen(true) : jumpTo(MENU[0].id))}
            className="h-12 px-6 rounded-xl bg-[#C23B33] text-white font-medium flex items-center gap-2 active:scale-95 transition"
          >
            {totalCount ? 'View order' : 'View menu'}
            <ArrowRight size={17} />
          </button>
        </div>
      </div>

      {/* Order sheet */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center"
          onClick={() => setIsCartOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#191515] w-full max-w-lg rounded-t-3xl sm:rounded-3xl border border-white/10 max-h-[90vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5"
          >
            <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl font-bold text-white">Your order</h2>
                <p className="text-xs text-neutral-400">Sent to RISA on WhatsApp</p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                aria-label="Close"
                className="w-9 h-9 rounded-full bg-white/5 text-neutral-300 flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-5">
              {totalCount === 0 ? (
                <div className="text-center py-10">
                  <ShoppingBag size={32} className="mx-auto text-neutral-600 mb-2" />
                  <p className="text-neutral-400">Nothing here yet — add something tasty.</p>
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
                        <div key={key} className="flex items-center gap-3 bg-[#221D1D] p-3 rounded-2xl">
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] uppercase tracking-wider text-neutral-500">{section.label}</p>
                            <p className="text-sm font-medium text-white">
                              {item.name}
                              {option && <span className="text-neutral-400"> · {option}</span>}
                            </p>
                            <p className="text-sm text-[#E0544B] mt-0.5">{money(item.price * qty)}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => remove(key)}
                              aria-label="Remove one"
                              className="w-8 h-8 rounded-lg bg-white/5 text-white flex items-center justify-center"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-4 text-center text-sm font-semibold">{qty}</span>
                            <button
                              onClick={() => add(key)}
                              aria-label="Add one"
                              className="w-8 h-8 rounded-lg bg-[#C23B33] text-white flex items-center justify-center"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <Field label="Your name" error={showErrors && missing.name ? 'Please enter your name' : undefined}>
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
                    error={showErrors && missing.phone ? 'Please enter a valid phone number' : undefined}
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

                  <Choice<(typeof ORDER_TYPES)[number]> label="Order method" options={ORDER_TYPES} value={orderType} onChange={setOrderType} />
                  {orderType === 'Delivery' && (
                    <Field
                      label="Delivery location in Accra"
                      error={showErrors && missing.address ? 'Please enter your delivery location' : undefined}
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
                  <Choice<(typeof SPICE_LEVELS)[number]> label="Preferred spice level" options={SPICE_LEVELS} value={spiceLevel} onChange={setSpiceLevel} />

                  <Field label="Add-ons, flavour choices or allergy notes">
                    <textarea
                      value={allergyNote}
                      onChange={(e) => setAllergyNote(e.target.value)}
                      placeholder="e.g. BBQ wings, mango sago, no onions…"
                      rows={3}
                      className={inputClass}
                    />
                    <p className="text-xs text-neutral-500 mt-1.5 flex items-center gap-1.5">
                      <AlertCircle size={13} className="text-[#E3B062]" />
                      Kindly let us know if you are allergic to something.
                    </p>
                  </Field>
                </>
              )}
            </div>

            {totalCount > 0 && (
              <div className="p-5 border-t border-white/10 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-300">Food subtotal</span>
                  <span className="font-serif text-2xl font-bold text-white">{money(totalPrice)}</span>
                </div>
                <p className="text-xs text-neutral-500 mt-1 mb-3">
                  {orderType === 'Delivery'
                    ? 'Delivery fee is not included; it will be confirmed based on your location.'
                    : 'Pick up — we’ll confirm when your order is ready.'}
                </p>
                {showErrors && (missing.name || missing.phone || missing.address) && (
                  <p className="text-sm text-[#F07A72] mb-3">Please fill in the highlighted details above.</p>
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
  'w-full bg-[#221D1D] border border-white/10 rounded-xl px-3 py-3 text-[16px] text-white placeholder-neutral-500 focus:outline-none focus:border-[#C23B33]';

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <div className={error ? '[&_input]:border-[#E0544B] [&_textarea]:border-[#E0544B]' : ''}>
      <label className="block text-sm text-neutral-300 mb-2">{label}</label>
      {children}
      {error && <p className="text-xs text-[#F07A72] mt-1.5">{error}</p>}
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
      <p className="text-sm text-neutral-300 mb-2">{label}</p>
      <div className="flex gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
              value === o ? 'bg-[#C23B33] text-white border-[#C23B33]' : 'bg-[#221D1D] text-neutral-400 border-white/5'
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
