import React, { useState, useMemo } from 'react';
import { 
  ArrowRight, 
  Clock, 
  Phone, 
  Plus, 
  Minus, 
  ShoppingBag, 
  X, 
  Send, 
  AlertCircle,
  Sparkles
} from 'lucide-react';

// Use your existing project logo
import risaLogo from './assets/risa-logo-design.jpg';

type Category = 'salads' | 'noodles' | 'penne' | 'gizdodo' | 'wings' | 'drinks' | 'extras';

interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  description: string;
  badge?: string;
  flavors?: string[];
  optionsNote?: string;
  image?: string;
}

const MENU_ITEMS: Product[] = [
  // --- SALAD BOWLS ---
  {
    id: 'salad-mini',
    name: 'Mini Salad Bowl',
    price: 30,
    category: 'salads',
    description: 'Vegetables, sardine, egg, corned beef, ketchup, baked beans, special sauce.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'salad-classic',
    name: 'Classic Salad Bowl',
    price: 50,
    category: 'salads',
    badge: 'POPULAR',
    description: 'Vegetables, sardines, egg, sausage, corned beef, sweet corn, macaroni, special sauce, ketchup, baked beans, sweet potato.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'salad-cluck',
    name: 'Cluck Chicken Salad Bowl',
    price: 70,
    category: 'salads',
    description: 'Vegetables, egg, gizzards, macaroni, sweet corn, chicken, special sauce, ketchup, baked beans, sweet potato.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'
  },

  // --- NOODLES / STIR FRY PASTA ---
  {
    id: 'noodles-reg',
    name: 'Regular Noodles / Stir-fry Pasta',
    price: 30,
    category: 'noodles',
    description: 'Noodles or pasta, vegetables, egg, sausage, sardine, corned beef.',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'noodles-mini',
    name: 'Mini Craving Noodles / Stir-fry Pasta',
    price: 40,
    category: 'noodles',
    badge: 'POPULAR',
    description: 'Noodles or pasta, vegetables, sausages, sardines, eggs, gizzard, corned beef.',
    optionsNote: 'Comes with either extra egg or sausage',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'noodles-classic',
    name: 'Classic Craving Noodles or Stir Fry Pasta',
    price: 50,
    category: 'noodles',
    description: 'Noodles or pasta, vegetables, sausages, sardines, eggs, corned beef, gizzard.',
    optionsNote: 'Comes with either extra egg or sausage',
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'noodles-cluck',
    name: 'Cluck Craving Noodles / Stir-fry Pasta',
    price: 70,
    category: 'noodles',
    description: 'Noodles or pasta, vegetables, sausages, sardines, eggs, corned beef, chicken, gizzard, meat.',
    optionsNote: 'Comes with either extra egg or sausage',
    image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'noodles-og',
    name: 'OG Craving',
    price: 100,
    category: 'noodles',
    badge: 'SIGNATURE',
    description: 'Noodles or pasta, vegetables, sausages, sardines, eggs, gizzard, corned beef, chicken, shrimp & meat.',
    optionsNote: 'Comes with extra egg and sausage',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'noodles-wings-combo',
    name: 'Mini Craving + Chicken Wings',
    price: 100,
    category: 'noodles',
    badge: 'COMBO',
    description: 'Mini Craving noodles or stir-fry pasta served with crispy chicken wings.',
    image: 'https://images.unsplash.com/photo-1527477321005-4d45d724b8c4?auto=format&fit=crop&w=800&q=80'
  },

  // --- PENNE PASTA BOWL ---
  {
    id: 'penne-small',
    name: 'Penne Pasta Bowl (Small)',
    price: 40,
    category: 'penne',
    description: 'Rich savoury penne pasta bowl tossed in house sauce and vegetables.',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281084?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'penne-chicken-turkey',
    name: 'Penne Pasta Bowl (Regular with Chicken/Turkey)',
    price: 70,
    category: 'penne',
    description: 'Generous penne pasta bowl with your choice of seasoned chicken or turkey.',
    image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=800&q=80'
  },

  // --- GIZDODO ---
  {
    id: 'gizdodo-small',
    name: 'Gizdodo (Small Pack)',
    price: 40,
    category: 'gizdodo',
    description: 'Peppered gizzards and sweet fried ripe plantains tossed in spicy bell pepper sauce.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gizdodo-chicken-turkey',
    name: 'Gizdodo (Regular Pack with Chicken/Turkey)',
    price: 70,
    category: 'gizdodo',
    description: 'Rich spiced gizdodo paired with tender seasoned chicken or turkey.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'
  },

  // --- WINGS & SNACKS ---
  {
    id: 'wings-5',
    name: 'Chicken Wings · 5 pieces',
    price: 50,
    category: 'wings',
    flavors: ['Spicy', 'BBQ'],
    description: 'Crispy, seasoned chicken wings. Five pieces. Choose Spicy or BBQ flavor.',
    image: 'https://images.unsplash.com/photo-1527477321005-4d45d724b8c4?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'wings-10',
    name: 'Chicken Wings · 10 pieces',
    price: 90,
    category: 'wings',
    badge: 'VALUE',
    flavors: ['Spicy', 'BBQ'],
    description: 'Crispy, seasoned chicken wings. Ten pieces. Choose Spicy or BBQ flavor.',
    image: 'https://images.unsplash.com/photo-1527477321005-4d45d724b8c4?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'mozz-5',
    name: 'Mozzarella Sticks · 5 pieces',
    price: 60,
    category: 'wings',
    description: 'Golden, gooey mozzarella sticks. Five pieces. Served with special dipping sauce.',
    image: 'https://images.unsplash.com/photo-1548340742-b8332e25c24b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'mozz-10',
    name: 'Mozzarella Sticks · 10 pieces',
    price: 115,
    category: 'wings',
    description: 'Golden, gooey mozzarella sticks. Ten pieces. Served with special dipping sauce.',
    image: 'https://images.unsplash.com/photo-1548340742-b8332e25c24b?auto=format&fit=crop&w=800&q=80'
  },

  // --- DRINKS & SOMETHING SWEET ---
  {
    id: 'drink-kenkey',
    name: 'Ice Kenkey',
    price: 15,
    category: 'drinks',
    badge: 'LOCAL FAVOURITE',
    description: 'Refreshing & creamy chilled local delicacy with sweet condensed milk.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'drink-sobolo',
    name: 'Sobolo',
    price: 10,
    category: 'drinks',
    badge: 'ICE COLD',
    description: 'Traditional spiced chilled hibiscus drink with ginger, cloves & pineapple zest.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'drink-pineapple',
    name: 'Pineapple Juice',
    price: 15,
    category: 'drinks',
    description: 'Pure goodness. Freshly squeezed Ghanaian sweet pineapple.',
    image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sweet-sago',
    name: 'Sweet Sago Cloud',
    price: 50,
    category: 'drinks',
    flavors: ['Mango', 'Strawberry', 'Banana'],
    description: 'Velvety sweet dessert cloud. Choose your flavor: Mango, Strawberry, or Banana.',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sweet-parfait',
    name: 'Parfait',
    price: 50,
    category: 'drinks',
    description: 'Creamy yogurt, crunchy golden granola and two toppings of fresh fruit.',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80'
  },

  // --- EXTRAS ---
  {
    id: 'extra-sausage',
    name: 'Extra Sausage',
    price: 5,
    category: 'extras',
    description: 'Add sausage to any order.'
  },
  {
    id: 'extra-egg',
    name: 'Extra Egg',
    price: 5,
    category: 'extras',
    description: 'Add egg to any order.'
  },
  {
    id: 'extra-chicken',
    name: 'Extra Chicken',
    price: 15,
    category: 'extras',
    description: 'Add seasoned chicken to any order.'
  },
  {
    id: 'extra-fries',
    name: 'Fries',
    price: 25,
    category: 'extras',
    description: 'Crispy hot seasoned potato fries.'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('salads');
  const [cart, setCart] = useState<{ [id: string]: number }>({});
  const [spiceLevel, setSpiceLevel] = useState<'Mild' | 'Spicy' | 'Hot'>('Mild');
  const [orderType, setOrderType] = useState<'Delivery' | 'Pick up'>('Delivery');
  const [allergyNote, setAllergyNote] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const categories = [
    { id: 'salads', label: 'Salads' },
    { id: 'noodles', label: 'Noodles / Stir Fry Pasta' },
    { id: 'penne', label: 'Penne Pasta' },
    { id: 'gizdodo', label: 'Gizdodo' },
    { id: 'wings', label: 'Wings & Snacks' },
    { id: 'drinks', label: 'Drinks & Sweets' },
    { id: 'extras', label: 'Extras' },
  ];

  const addToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const copy = { ...prev };
      if (copy[id] > 1) {
        copy[id] -= 1;
      } else {
        delete copy[id];
      }
      return copy;
    });
  };

  const totalCount = useMemo(() => {
    return Object.values(cart).reduce((a, b) => a + b, 0);
  }, [cart]);

  const totalPrice = useMemo(() => {
    return Object.entries(cart).reduce((sum, [id, count]) => {
      const item = MENU_ITEMS.find((m) => m.id === id);
      return sum + (item ? item.price * count : 0);
    }, 0);
  }, [cart]);

  const displayedItems = MENU_ITEMS.filter((item) => item.category === activeTab);

  const sendWhatsAppOrder = () => {
    if (totalCount === 0) return;

    let msg = `*NEW ORDER - RISA (CRAFTED FOR CRAVINGS)*\n`;
    msg += `--------------------------------\n`;
    msg += `*Order Type:* ${orderType}\n`;
    msg += `*Spice Level:* ${spiceLevel}\n`;
    if (allergyNote.trim()) {
      msg += `*Special Instructions/Allergies:* ${allergyNote.trim()}\n`;
    }
    msg += `\n*ORDER ITEMS:*\n`;

    Object.entries(cart).forEach(([id, qty]) => {
      const item = MENU_ITEMS.find((m) => m.id === id);
      if (item) {
        msg += `• ${qty}x ${item.name} = GH₵${item.price * qty}\n`;
      }
    });

    msg += `--------------------------------\n`;
    msg += `*TOTAL AMOUNT: GH₵${totalPrice}*\n\n`;
    msg += `_Please confirm my order & delivery details._`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/233241280476?text=${encoded}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#141212] text-[#EDE8E1] font-sans pb-36">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#1A1616]/95 backdrop-blur-md border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={risaLogo}
            alt="RISA Logo"
            className="w-10 h-10 rounded-lg object-contain bg-[#1F1A1A] p-1 border border-white/10"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div>
            <h1 className="font-serif tracking-widest text-lg font-bold text-white leading-tight">RISA</h1>
            <p className="text-[10px] tracking-[0.25em] text-[#C83832] uppercase font-semibold">CRAFTED FOR CRAVINGS</p>
          </div>
        </div>

        <button
          onClick={() => setIsCartOpen(true)}
          className="w-10 h-10 rounded-xl bg-[#C83832] text-white flex items-center justify-center relative shadow-lg shadow-[#C83832]/30 active:scale-95 transition"
        >
          <ShoppingBag size={19} />
          {totalCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-white text-[#C83832] font-black text-[11px] rounded-full w-5 h-5 flex items-center justify-center shadow">
              {totalCount}
            </span>
          )}
        </button>
      </header>

      {/* Info Banner */}
      <div className="bg-[#1C1717] px-4 py-2 border-b border-white/5 flex flex-wrap items-center justify-between text-[11px] text-neutral-400 gap-2">
        <div className="flex items-center gap-1.5">
          <Clock size={12} className="text-[#C83832]" />
          <span>Friday – Sunday: 12:00 PM – 8:00 PM</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Phone size={12} className="text-[#C83832]" />
          <a href="tel:0241280476" className="text-white hover:text-[#C83832] font-medium">024 128 0476</a>
        </div>
      </div>

      {/* Category Pills Navigation */}
      <div className="sticky top-[61px] z-30 bg-[#141212]/95 backdrop-blur-md py-3 px-4 overflow-x-auto no-scrollbar flex items-center gap-2 border-b border-white/5">
        {categories.map((cat) => {
          const active = activeTab === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                active
                  ? 'bg-[#C83832] text-white shadow-md shadow-[#C83832]/30'
                  : 'bg-[#211C1C] text-neutral-400 hover:text-white border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Items Section */}
      <main className="max-w-xl mx-auto px-4 pt-6 space-y-4">
        {displayedItems.map((item) => (
          <div
            key={item.id}
            className="bg-[#1E1919] rounded-2xl border border-white/5 overflow-hidden shadow-xl"
          >
            {item.image && (
              <div className="relative h-44 w-full overflow-hidden bg-black/40">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1919] via-transparent to-black/20" />

                {item.badge && (
                  <span className="absolute top-3 left-3 bg-[#C83832] text-white text-[9px] font-black uppercase px-2.5 py-1 rounded-full shadow">
                    {item.badge}
                  </span>
                )}

                {/* RISA Brand Logo Placed On Drinks & Sweet Items */}
                {item.category === 'drinks' && (
                  <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md border border-white/20 rounded-full px-2.5 py-1 flex items-center gap-1.5 shadow-md">
                    <img 
                      src={risaLogo} 
                      alt="RISA" 
                      className="w-3.5 h-3.5 rounded-full object-cover" 
                      onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                    />
                    <span className="text-[9px] font-serif font-bold text-white tracking-widest">RISA DRINK</span>
                  </div>
                )}
              </div>
            )}

            <div className="p-4 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-lg font-semibold text-white tracking-wide">{item.name}</h3>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{item.description}</p>
                {item.optionsNote && (
                  <p className="text-[11px] text-[#E0A855] mt-1 font-medium">{item.optionsNote}</p>
                )}
                {item.flavors && (
                  <p className="text-[11px] text-[#C83832] mt-1 font-semibold">
                    Flavors: {item.flavors.join(' · ')}
                  </p>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5">
                <span className="font-serif text-xl font-bold text-[#E54842]">
                  GH₵{item.price}
                </span>

                {cart[item.id] ? (
                  <div className="flex items-center gap-2 bg-[#282121] rounded-xl px-2.5 py-1.5 border border-white/10">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-6 h-6 flex items-center justify-center rounded bg-neutral-800 text-white active:scale-95"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="w-5 text-center text-xs font-bold text-white font-mono">
                      {cart[item.id]}
                    </span>
                    <button
                      onClick={() => addToCart(item.id)}
                      className="w-6 h-6 flex items-center justify-center rounded bg-[#C83832] text-white active:scale-95"
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(item.id)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#282121] hover:bg-[#C83832] text-white text-xs font-semibold border border-white/10 transition-colors active:scale-95"
                  >
                    <Plus size={14} />
                    <span>Add</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Floating Bottom Cart Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#161212]/95 backdrop-blur-md border-t border-white/10 px-4 py-3">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <div>
            <p className="font-serif text-lg font-bold text-white leading-tight">GH₵{totalPrice}</p>
            <p className="text-[11px] text-neutral-400">
              {totalCount === 0 ? 'Your order is waiting' : `${totalCount} item(s) selected`}
            </p>
          </div>
          <button
            onClick={() => setIsCartOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-[#C83832] hover:bg-[#b02f2a] text-white text-xs font-bold tracking-wider uppercase flex items-center gap-2 shadow-lg shadow-[#C83832]/30 active:scale-95 transition-all"
          >
            <span>View menu / Cart</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* Cart & WhatsApp Checkout Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-[#181313] w-full max-w-lg rounded-t-3xl sm:rounded-3xl border border-white/10 max-h-[90vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div>
                <h2 className="font-serif text-lg font-bold text-white">Your Craving Bag</h2>
                <p className="text-xs text-neutral-400">RISA · Friday to Sunday 12:00–8:00 PM</p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-800 text-neutral-300 flex items-center justify-center hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* List */}
            <div className="p-4 overflow-y-auto space-y-4">
              {totalCount === 0 ? (
                <div className="text-center py-10">
                  <ShoppingBag size={32} className="mx-auto text-neutral-600 mb-2" />
                  <p className="text-neutral-400 text-sm">Your craving bag is empty.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-2.5">
                    {Object.entries(cart).map(([id, qty]) => {
                      const item = MENU_ITEMS.find((m) => m.id === id);
                      if (!item) return null;
                      return (
                        <div key={id} className="flex items-center justify-between bg-[#211A1A] p-3 rounded-xl border border-white/5">
                          <div className="flex-1 pr-3">
                            <h4 className="text-sm font-semibold text-white">{item.name}</h4>
                            <p className="text-xs text-[#E54842] font-mono mt-0.5">GH₵{item.price * qty}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => removeFromCart(id)}
                              className="w-6 h-6 rounded bg-neutral-800 text-white flex items-center justify-center"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-xs font-mono font-bold w-4 text-center">{qty}</span>
                            <button
                              onClick={() => addToCart(id)}
                              className="w-6 h-6 rounded bg-[#C83832] text-white flex items-center justify-center"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Pick up or Delivery */}
                  <div>
                    <label className="text-xs font-medium text-neutral-300 block mb-1.5">Order Type</label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['Delivery', 'Pick up'] as const).map((type) => (
                        <button
                          key={type}
                          onClick={() => setOrderType(type)}
                          className={`py-2 rounded-xl text-xs font-semibold border ${
                            orderType === type
                              ? 'bg-[#C83832] text-white border-[#C83832]'
                              : 'bg-[#211A1A] text-neutral-400 border-white/5'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Spice Level */}
                  <div>
                    <label className="text-xs font-medium text-neutral-300 block mb-1.5">Spice Level</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Mild', 'Spicy', 'Hot'] as const).map((spice) => (
                        <button
                          key={spice}
                          onClick={() => setSpiceLevel(spice)}
                          className={`py-2 rounded-xl text-xs font-semibold border ${
                            spiceLevel === spice
                              ? 'bg-[#C83832] text-white border-[#C83832]'
                              : 'bg-[#211A1A] text-neutral-400 border-white/5'
                          }`}
                        >
                          {spice}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Allergy Notice */}
                  <div>
                    <label className="text-xs font-medium text-neutral-300 flex items-center gap-1 mb-1.5">
                      <AlertCircle size={13} className="text-[#C83832]" />
                      <span>Kindly let us know if you are allergic to something:</span>
                    </label>
                    <textarea
                      value={allergyNote}
                      onChange={(e) => setAllergyNote(e.target.value)}
                      placeholder="e.g. No shellfish, delivery location details..."
                      rows={2}
                      className="w-full bg-[#211A1A] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C83832]"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            {totalCount > 0 && (
              <div className="p-4 border-t border-white/10 bg-[#1A1515]">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs text-neutral-400">Total payable</span>
                  <span className="font-serif text-2xl font-bold text-white">GH₵{totalPrice}</span>
                </div>
                <button
                  onClick={sendWhatsAppOrder}
                  className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20b858] text-black font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 active:scale-98 transition"
                >
                  <Send size={16} />
                  <span>Send Order to WhatsApp (024 128 0476)</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
