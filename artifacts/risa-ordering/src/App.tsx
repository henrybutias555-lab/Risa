import { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowRight, Clock3, Menu as MenuIcon, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import risaLogo from './assets/risa-logo-design.jpeg';
import saladPhoto from './assets/menu-photos/salads-risa.jpg';
import noodlesPhoto from './assets/menu-photos/noodles-risa.jpg';
import buldakPhoto from './assets/menu-photos/buldak-risa.jpg';
import wingsPhoto from './assets/menu-photos/wings-risa.jpg';
import mozzarellaPhoto from './assets/menu-photos/mozzarella-risa.jpg';
import drinksPhoto from './assets/menu-photos/sago-risa.jpg';

type Product = {
  id: string;
  name: string;
  price: number;
  description?: string;
  choice?: 'wings' | 'buldak' | 'sago' | 'parfait' | 'noodle-extras';
  noodleBase?: boolean;
};

type MenuGroup = {
  name: string;
  id: string;
  items: Product[];
  note?: string;
  photo?: string;
  photoAlt?: string;
};
type CartLine = { key: string; product: Product; quantity: number; options: string[]; unitPrice: number };

const menu: MenuGroup[] = [
  {
    name: 'Salads',
    id: 'salads',
    photo: saladPhoto,
    photoAlt: 'A colorful RISA salad with vegetables, corn and egg',
    items: [
      { id: 'ghanaian-salad', name: 'Ghanaian Regular Salad', price: 50, description: 'Vegetables, sardines, egg, corned beef, sweet corn, macaroni, special sauce & ketchup.' },
      { id: 'chicken-salad', name: 'Chicken Salad', price: 70, description: 'Vegetables, egg, pasta, sweet corn, chicken, special sauce & ketchup.' },
    ],
  },
  {
    name: 'Noodles / Stir Fry Pasta',
    id: 'noodles',
    note: 'Choose noodles or stir-fry pasta. Classic and Cluck include one extra egg or sausage.',
    photo: noodlesPhoto,
    photoAlt: 'A bowl of RISA craving noodles with egg and vegetables',
    items: [
      { id: 'mini-craving', name: 'Mini Craving Noodles / stir fry pasta', price: 40, description: 'Noodles or pasta with vegetables, sausage, sardines, egg & corned beef.', noodleBase: true },
      { id: 'classic-craving', name: 'Classic Craving Noodles or Stir Fry Pasta', price: 50, description: 'Noodles or pasta, vegetables, sausage, sardines, eggs, corned beef & gizzard.', choice: 'noodle-extras', noodleBase: true },
      { id: 'cluck-craving', name: 'Cluck Craving Noodles / Stirfry Pasta', price: 70, description: 'Noodles or pasta, vegetables, sausage, sardines, eggs, corned beef, chicken, gizzard & meat.', choice: 'noodle-extras', noodleBase: true },
      { id: 'og-craving', name: 'OG Craving', price: 100, description: 'Noodles or pasta, vegetables, sausages, sardines, eggs, corned beef, chicken, shrimp & meat.', noodleBase: true },
      { id: 'mini-wings', name: 'Mini Craving + Chicken Wings', price: 100, description: 'Mini Craving noodles with chicken wings.', noodleBase: true },
    ],
  },
  {
    name: 'Buldak Noodles',
    id: 'buldak',
    note: 'Choose one Buldak flavor. Add sausage or egg if you like.',
    photo: buldakPhoto,
    photoAlt: 'Spicy Buldak noodles with chicken, vegetables and egg',
    items: [
      { id: 'fire-craving', name: 'Fire Craving', price: 70, description: 'Buldak noodles with your choice of flavor, sausage & eggs.', choice: 'buldak' },
      { id: 'risbuldak', name: 'RisBuldak', price: 120, description: 'Buldak noodles with your choice of flavor, sausage, egg, shrimp & cheese.', choice: 'buldak' },
    ],
  },
  {
    name: 'Chicken Wings',
    id: 'wings',
    note: 'Choose your glaze: spicy or BBQ.',
    photo: wingsPhoto,
    photoAlt: 'RISA glazed chicken wings served with dipping sauce',
    items: [
      { id: 'wings-5', name: 'Chicken Wings · 5 pieces', price: 50, choice: 'wings' },
      { id: 'wings-10', name: 'Chicken Wings · 10 pieces', price: 100, choice: 'wings' },
    ],
  },
  {
    name: 'Mozzarella Sticks',
    id: 'mozzarella',
    note: 'Served with a special sauce.',
    photo: mozzarellaPhoto,
    photoAlt: 'Golden mozzarella sticks with dipping sauce',
    items: [
      { id: 'mozz-5', name: 'Mozzarella Sticks · 5 pieces', price: 60 },
      { id: 'mozz-10', name: 'Mozzarella Sticks · 10 pieces', price: 115 },
    ],
  },
  {
    name: 'Drinks & Something Sweet',
    id: 'drinks',
    photo: drinksPhoto,
    photoAlt: 'A RISA Sweet Sago Cloud cup with the RISA mark on the label',
    items: [
      { id: 'ice-kenkey', name: 'Ice Kenkey', price: 15, description: 'Refreshing & creamy.' },
      { id: 'pineapple-juice', name: 'Pineapple Juice', price: 15, description: 'Pure goodness.' },
      { id: 'sweet-sago', name: 'Sweet Sago Cloud', price: 50, description: 'Choose a flavor: mango, strawberry or banana.', choice: 'sago' },
      { id: 'parfait', name: 'Parfait', price: 50, description: 'Yogurt, granola and two toppings of fruit.', choice: 'parfait' },
    ],
  },
  {
    name: 'Extras',
    id: 'extras',
    note: 'Add a little extra to your favourite meal.',
    items: [
      { id: 'extra-sausage', name: 'Sausage', price: 5 },
      { id: 'extra-egg', name: 'Egg', price: 5 },
      { id: 'extra-chicken', name: 'Chicken', price: 15 },
    ],
  },
];

const formatCedis = (amount: number) => `GH₵ ${amount.toFixed(2).replace(/\.00$/, '')}`;
const whatsappGreetingHref = `https://wa.me/233241280476?text=${encodeURIComponent(
  'Hi RISA! 👋 I’ve checked out the menu and I’m ready for something delicious. Could you help me place an order and let me know what’s available today? 🍜✨'
)}`;

function App() {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [selections, setSelections] = useState<Record<string, string[]>>({});
  const [toast, setToast] = useState('');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    document.title = 'RISA — Crafted for Cravings | Ghanaian Comfort Food';
    const metadata: Record<string, string> = {
      description: 'Good food, great vibes always. Order RISA Ghanaian comfort food, craving noodles, chicken wings, salads, snacks and refreshing drinks on WhatsApp.',
      'og:title': 'RISA — Crafted for Cravings',
      'og:description': 'A little joy in every bite. Browse the RISA menu and order straight on WhatsApp.',
      'og:type': 'website',
      'og:image': risaLogo,
    };
    Object.entries(metadata).forEach(([key, content]) => {
      const isProperty = key.startsWith('og:');
      let tag = document.querySelector<HTMLMetaElement>(`meta[${isProperty ? 'property' : 'name'}="${key}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(isProperty ? 'property' : 'name', key);
        document.head.appendChild(tag);
      }
      tag.content = content;
    });
  }, []);

  const cartCount = cart.reduce((sum, line) => sum + line.quantity, 0);
  const total = cart.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);
  const whatsappHref = useMemo(() => {
    if (!cart.length) return '#order';
    const lines = [
      'Hi RISA team! 👋✨',
      'I’d love to place this order:',
      '',
      ...cart.map((line, index) => {
        const optionText = line.options.length ? `\n   ↳ ${line.options.join(', ')}` : '';
        return `${index + 1}. ${line.product.name} × ${line.quantity}${optionText}\n   ${formatCedis(line.unitPrice * line.quantity)}`;
      }),
      '',
      `🧾 Estimated total: ${formatCedis(total)}`,
      '',
      'Please confirm availability and share the pickup or delivery next steps.',
      '',
      'Thank you — I’m looking forward to it! 😋',
    ];
    return `https://wa.me/233241280476?text=${encodeURIComponent(lines.join('\n'))}`;
  }, [cart, total]);

  const announce = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2100);
  };

  const setSingleOption = (productId: string, value: string) => {
    setSelections((current) => ({ ...current, [productId]: value ? [value] : [] }));
  };

  const setNoodleOption = (productId: string, value: string, group: 'base' | 'side') => {
    const baseOptions = ['Noodles', 'Stir-fry pasta'];
    const sideOptions = ['Extra egg', 'Extra sausage'];
    const replacedOptions = group === 'base' ? baseOptions : sideOptions;
    setSelections((current) => {
      const remaining = (current[productId] ?? []).filter((option) => !replacedOptions.includes(option));
      return { ...current, [productId]: value ? [...remaining, value] : remaining };
    });
  };

  const addProduct = (product: Product) => {
    const options = selections[product.id] ?? [];
    const needsNoodleBase = product.noodleBase && !options.some((option) => ['Noodles', 'Stir-fry pasta'].includes(option));
    const needsNoodleSide = product.choice === 'noodle-extras' && !options.some((option) => ['Extra egg', 'Extra sausage'].includes(option));
    const needsFlavor = ['wings', 'buldak', 'sago'].includes(product.choice ?? '') && !options.length;
    if (needsNoodleBase || needsNoodleSide || needsFlavor) {
      announce(needsNoodleBase ? 'Choose noodles or stir-fry pasta first' : needsNoodleSide ? 'Choose an included egg or sausage first' : 'Choose a flavour first');
      return;
    }
    const key = `${product.id}:${[...options].sort().join('|') || 'plain'}`;
    setCart((current) => {
      const existing = current.find((line) => line.key === key);
      if (existing) return current.map((line) => line.key === key ? { ...line, quantity: line.quantity + 1 } : line);
      return [...current, { key, product, quantity: 1, options, unitPrice: product.price }];
    });
    announce(`${product.name} added to your order`);
  };

  const changeQuantity = (key: string, delta: number) => {
    setCart((current) => current.flatMap((line) => {
      if (line.key !== key) return [line];
      const quantity = line.quantity + delta;
      return quantity > 0 ? [{ ...line, quantity }] : [];
    }));
  };

  const removeLine = (key: string) => setCart((current) => current.filter((line) => line.key !== key));

  return (
    <div className="page-shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="RISA home" data-testid="link-home">
          <span className="brand-mark">R</span>
          <span><span className="brand-name">RISA</span><span className="brand-sub">CRAFTED FOR CRAVINGS</span></span>
        </a>
        <nav id="main-navigation" className={`nav-links${mobileNavOpen ? ' nav-links-open' : ''}`} aria-label="Main navigation" onClick={() => setMobileNavOpen(false)}>
          <a href="#menu" data-testid="link-menu">The menu</a>
          <a href="#hours" data-testid="link-hours">Hours</a>
          <a href="#contact" data-testid="link-contact">Find us</a>
        </nav>
        <a className="header-order" href="#order" aria-label={`View your order, ${cartCount} items`} data-testid="link-header-order"><ShoppingBag size={15} /><span className="header-order-label">Your order</span><span>{cartCount}</span></a>
        <button className="mobile-nav-toggle" type="button" aria-label={mobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-controls="main-navigation" aria-expanded={mobileNavOpen} onClick={() => setMobileNavOpen((open) => !open)} data-testid="button-mobile-menu">
          {mobileNavOpen ? <X size={19} /> : <MenuIcon size={19} />}
        </button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <div className="eyebrow">Good food. Great vibes. Always.</div>
            <h1>Come for the craving. <em>Stay for the joy.</em></h1>
            <p>From the first forkful of craving noodles to that last sweet spoonful. Your comfort-food kind of day starts here.</p>
            <div className="hero-actions">
              <a className="button-primary" href="#menu" data-testid="link-browse-menu">Find your favourite <ArrowDown size={15} /></a>
              <a className="button-outline" href={whatsappGreetingHref} target="_blank" rel="noreferrer" data-testid="link-whatsapp-hero">Say hello on WhatsApp <ArrowRight size={14} /></a>
            </div>
            <div className="hero-note"><strong>Friday–Sunday</strong> <span>·</span> 12:00–20:00 <span>·</span> Made for your cravings</div>
          </div>
            <div className="hero-visual hero-logo-visual" aria-label="RISA Crafted for Cravings logo">
              <div className="hero-photo"><img src={risaLogo} alt="RISA Crafted for Cravings logo with its bowl and chopstick design" /></div>
          </div>
        </section>

        <div className="hours-ribbon" id="hours">
          <Clock3 size={15} />
          <strong>OPEN FRIDAY — SUNDAY</strong>
          <span className="hours-dot" />
          <span>12:00–20:00</span>
          <span className="hours-dot" />
          <span>Call / WhatsApp</span>
          <a href={whatsappGreetingHref} className="hours-phone" target="_blank" rel="noreferrer" data-testid="link-hours-whatsapp">+233 24 128 0476</a>
        </div>

        <section className="menu-section" id="menu">
          <div className="section-heading">
            <div>
              <div className="eyebrow">A menu for the mood</div>
              <h2>Pick your kind<br />of delicious.</h2>
            </div>
            <p>Big comfort, bright flavours and little treats worth slowing down for. Choose your favourites and send your order straight to us.</p>
          </div>
          <div className="menu-layout">
            <div className="menu-groups">
              {menu.map((group, groupIndex) => (
                <section className={`menu-group${group.photo ? '' : ' menu-group-no-photo'}`} id={group.id} key={group.id} aria-labelledby={`heading-${group.id}`}>
                  <div className="menu-group-heading">
                    <span className="group-index">{String(groupIndex + 1).padStart(2, '0')}</span>
                    <h3 id={`heading-${group.id}`}>{group.name}</h3>
                  </div>
                  {group.photo && <img className="menu-group-photo" src={group.photo} alt={group.photoAlt ?? ''} data-testid={`img-menu-${group.id}`} />}
                  {group.note && <p className="extras-note">{group.note}</p>}
                  {group.items.map((product) => {
                    const selectedOptions = selections[product.id] ?? [];
                    return (
                      <article className="menu-item" key={product.id} data-testid={`card-product-${product.id}`}>
                        <div className="item-main">
                          <div>
                            <div className="item-name">{product.name}</div>
                            {product.description && <div className="item-description">{product.description}</div>}
                          </div>
                          <div className="item-price"><span className="price-currency">GH₵</span> {product.price}</div>
                        </div>
                        {product.noodleBase && <div className="item-options">
                          <div>
                            <label className="option-label" htmlFor={`base-${product.id}`}>Choose your base</label>
                            <select className="option-select" id={`base-${product.id}`} value={selectedOptions.find((option) => ['Noodles', 'Stir-fry pasta'].includes(option)) ?? ''} onChange={(event) => setNoodleOption(product.id, event.target.value, 'base')} data-testid={`select-base-${product.id}`}>
                              <option value="">Choose noodles or pasta</option><option value="Noodles">Noodles</option><option value="Stir-fry pasta">Stir-fry pasta</option>
                            </select>
                          </div>
                        </div>}
                        {product.choice && <div className="item-options">
                          {product.choice === 'wings' && <div>
                            <label className="option-label" htmlFor={`choice-${product.id}`}>Choose a flavour</label>
                            <select className="option-select" id={`choice-${product.id}`} value={selectedOptions[0] ?? ''} onChange={(event) => setSingleOption(product.id, event.target.value)} data-testid={`select-flavour-${product.id}`}>
                              <option value="">Select spicy or BBQ</option><option value="Spicy">Spicy</option><option value="BBQ">BBQ</option>
                            </select>
                          </div>}
                          {product.choice === 'buldak' && <div>
                            <label className="option-label" htmlFor={`choice-${product.id}`}>Buldak flavor</label>
                            <input className="option-select" id={`choice-${product.id}`} value={selectedOptions[0] ?? ''} onChange={(event) => setSingleOption(product.id, event.target.value)} placeholder="Tell us your flavor" data-testid={`input-flavour-${product.id}`} />
                          </div>}
                          {product.choice === 'sago' && <div>
                            <label className="option-label" htmlFor={`choice-${product.id}`}>Choose a flavor</label>
                            <select className="option-select" id={`choice-${product.id}`} value={selectedOptions[0] ?? ''} onChange={(event) => setSingleOption(product.id, event.target.value)} data-testid={`select-flavour-${product.id}`}>
                              <option value="">Select a flavor</option><option value="Mango">Mango</option><option value="Strawberry">Strawberry</option><option value="Banana">Banana</option>
                            </select>
                          </div>}
                          {product.choice === 'parfait' && <div>
                            <label className="option-label" htmlFor={`choice-${product.id}`}>Fruit toppings (optional)</label>
                            <input className="option-select" id={`choice-${product.id}`} value={selectedOptions[0] ?? ''} onChange={(event) => setSingleOption(product.id, event.target.value)} placeholder="Tell us your two toppings" data-testid={`input-toppings-${product.id}`} />
                          </div>}
                          {product.choice === 'noodle-extras' && <div>
                            <span className="option-label">Choose one included extra</span>
                            <div className="option-checks">
                              {['Extra egg', 'Extra sausage'].map((option) => (
                                <label className="option-chip" key={option}>
                                  <input type="radio" name={`noodle-side-${product.id}`} checked={selectedOptions.includes(option)} onChange={() => setNoodleOption(product.id, option, 'side')} data-testid={`radio-${product.id}-${option.toLowerCase().replace(' ', '-')}`} /> {option} (included)
                                </label>
                              ))}
                            </div>
                          </div>}
                        </div>}
                        <div className="item-control">
                          <button className="add-button" type="button" onClick={() => addProduct(product)} data-testid={`button-add-${product.id}`}>
                            <Plus size={13} /> Add to order
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </section>
              ))}
            </div>
            <aside className="cart-panel" id="order" aria-label="Your order">
              <div className="cart-top">
                <div className="cart-title-row"><h3 className="cart-title">Your order</h3><span className="cart-count" data-testid="text-cart-count">{cartCount}</span></div>
                <p className="cart-subtitle">A little something to look forward to.</p>
              </div>
              <div className="cart-content">
                {!cart.length ? (
                  <div className="cart-empty">
                    <div className="cart-empty-mark"><ShoppingBag size={20} /></div>
                    <strong>Your cravings start here.</strong>
                    <span>Add a favourite from the menu and your order will show up right here.</span>
                  </div>
                ) : (
                  <div className="cart-lines" aria-live="polite">
                    {cart.map((line) => (
                      <div className="cart-line" key={line.key} data-testid={`row-cart-${line.product.id}`}>
                        <div className="cart-line-top"><span className="cart-line-name">{line.product.name}</span><span className="cart-line-price">{formatCedis(line.unitPrice * line.quantity)}</span></div>
                        {line.options.length > 0 && <div className="cart-line-options">{line.options.join(' · ')}</div>}
                        <div className="quantity-control">
                          <button className="qty-button" type="button" aria-label={`Decrease ${line.product.name} quantity`} onClick={() => changeQuantity(line.key, -1)} data-testid={`button-minus-${line.product.id}`}><Minus size={12} /></button>
                          <span className="qty-number" data-testid={`text-quantity-${line.product.id}`}>{line.quantity}</span>
                          <button className="qty-button" type="button" aria-label={`Increase ${line.product.name} quantity`} onClick={() => changeQuantity(line.key, 1)} data-testid={`button-plus-${line.product.id}`}><Plus size={12} /></button>
                          <button className="remove-button" type="button" onClick={() => removeLine(line.key)} data-testid={`button-remove-${line.product.id}`}><Trash2 size={11} /> Remove</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="cart-total"><span>Estimated total</span><strong data-testid="text-order-total">{formatCedis(total)}</strong></div>
                <p className="cart-footnote">Final amount confirmed with RISA on WhatsApp.</p>
                <a className={`whatsapp-button ${cart.length ? '' : 'disabled'}`} href={whatsappHref} target={cart.length ? '_blank' : undefined} rel={cart.length ? 'noreferrer' : undefined} aria-disabled={!cart.length} onClick={(event) => { if (!cart.length) event.preventDefault(); }} data-testid="link-send-order">
                  Send order on WhatsApp <ArrowRight size={15} />
                </a>
                <a className="cart-phone" href={cart.length ? whatsappHref : whatsappGreetingHref} target="_blank" rel="noreferrer" data-testid="link-cart-phone">+233 24 128 0476 · tap to chat</a>
              </div>
            </aside>
          </div>
        </section>

        <div className="story-strip">
          <div className="story-inner">
            <p>“Good food, great vibes, always.” <em>That’s the RISA way.</em> Made for the little moments that call for one more bite.</p>
            <span className="story-tag">CRAFTED FOR CRAVINGS · GHANA</span>
          </div>
        </div>
      </main>

      <footer className="footer" id="contact">
        <div className="footer-inner">
          <div className="footer-brand">
            <a className="brand" href="#home" data-testid="link-footer-home"><span className="brand-mark">R</span><span><span className="brand-name">RISA</span><span className="brand-sub">CRAFTED FOR CRAVINGS</span></span></a>
          </div>
          <div className="footer-meta">
            <div><small>Come through</small><strong>Friday–Sunday · 12:00–20:00</strong></div>
            <div><small>Call / WhatsApp</small><a href={whatsappGreetingHref} target="_blank" rel="noreferrer" data-testid="link-footer-phone">+233 24 128 0476</a></div>
          </div>
        </div>
        <div className="footer-bottom"><span>Good food. Great vibes. Always.</span><span>RISA · Crafted for cravings</span></div>
      </footer>
      <div className="mobile-spacer" />
      <div className="mobile-cart-bar">
        <div className="mobile-cart-summary"><strong>{formatCedis(total)}</strong><span>{cartCount ? `${cartCount} ${cartCount === 1 ? 'item' : 'items'} in your order` : 'Your order is waiting'}</span></div>
        <a href={cart.length ? whatsappHref : '#order'} target={cart.length ? '_blank' : undefined} rel={cart.length ? 'noreferrer' : undefined} onClick={(event) => { if (!cart.length) { event.preventDefault(); document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' }); } }} data-testid="link-mobile-order">
          {cart.length ? 'Order on WhatsApp' : 'View your order'} <ArrowRight size={14} />
        </a>
      </div>
      {toast && <div className="toast-message" role="status" data-testid="status-added-to-cart">{toast}</div>}
    </div>
  );
}

export default App;
