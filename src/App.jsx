import React, { useState, useEffect, useMemo } from "react";
import "./App.css";

const CATEGORIES = [
  "Barchasi",
  "Divanlar",
  "Kreslolar",
  "Stollar",
  "Yotoqxona",
  "Yoritish",
];

const TASHKENT_DISTRICTS = [
  "Mirzo Ulug'bek tumani",
  "Yakkasaroy tumani",
  "Mirobod tumani",
  "Yunusobod tumani",
  "Shayxontohur tumani",
  "Chilonzor tumani",
  "Yashnobod tumani",
  "Olmazor tumani",
  "Uchtepa tumani",
  "Sergeli tumani",
  "Bektemir tumani",
  "Yangihayot tumani",
];

const PRODUCTS = [
  {
    id: "md-01",
    sku: "MD-SOF-014",
    name: "Milano Modulli Divani",
    category: "Divanlar",
    price: 24800000,
    oldPrice: 28500000,
    inStock: true,
    isNew: true,
    dimensions: { width: 285, depth: 102, height: 74 },
    material: "Italiya bukle matosi, quritilgan eman karkasi",
    warranty: "5 yil",
    origin: "Toshkent / Italiya furniturasi",
    description:
      "Past profilli me'moriy siluet va chuqur o'rindiq ergonomikasi. Yuqori zichlikdagi ko'p qatlamli poliuretan hamda tabiiy g'oz pati qatlami uzoq yillar davomida shaklini saqlaydi.",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85",
    colors: [
      { name: "Issiq Alabaster", hex: "#E8E2D5" },
      { name: "Travertin Kulrang", hex: "#B5AFA4" },
      { name: "Zaytun Bargini", hex: "#5A6351" },
    ],
  },
  {
    id: "md-02",
    sku: "MD-SOF-021",
    name: "Brera Burchak Divani",
    category: "Divanlar",
    price: 32400000,
    oldPrice: 36000000,
    inStock: true,
    isNew: false,
    dimensions: { width: 320, depth: 168, height: 76 },
    material: "Zig'ir-paxta aralash mato, qora yong'oq oyoqlar",
    warranty: "5 yil",
    origin: "Toshkent / Yevropa matosi",
    description:
      "Keng mehmonxonalar uchun mo'ljallangan modulli burchak tizimi. Yechib yuviladigan tashqi jildlari kundalik parvarishni sezilarli darajada osonlashtiradi.",
    image:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=85",
    colors: [
      { name: "Qumrang Zig'ir", hex: "#D4C9B8" },
      { name: "Ko'mir Grafit", hex: "#383735" },
      { name: "Yong'oq Jigarrang", hex: "#7A5E43" },
    ],
  },
  {
    id: "md-03",
    sku: "MD-SOF-033",
    name: "Verona Uch O'rinli Divan",
    category: "Divanlar",
    price: 19600000,
    oldPrice: null,
    inStock: true,
    isNew: true,
    dimensions: { width: 230, depth: 96, height: 78 },
    material: "Mat velor, yashirin po'lat karkas",
    warranty: "5 yil",
    origin: "Toshkent / Belgiya matosi",
    description:
      "Minimalist geometriya va nozik chok chiziqlari bilan ajralib turadigan uch o'rinli divan. Zamonaviy kvartira va studiyalar uchun ideal proporsiya.",
    image:
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=1200&q=85",
    colors: [
      { name: "Sutli Krem", hex: "#EDE8DF" },
      { name: "Tosh Kulrang", hex: "#8E8A82" },
    ],
  },
  {
    id: "md-04",
    sku: "MD-ARM-008",
    name: "Como Lounge Kreslosi",
    category: "Kreslolar",
    price: 8900000,
    oldPrice: 10200000,
    inStock: true,
    isNew: false,
    dimensions: { width: 82, depth: 86, height: 74 },
    material: "Tabiiy eman yog'ochi, jun bukle qoplama",
    warranty: "5 yil",
    origin: "Toshkent / Daniya dizayni",
    description:
      "Qo'lda silliqlangan eman qo'ltiqlar va tana konturiga moslashuvchi egilgan suyanchiq. Mutolaa burchagi va dam olish zonalari uchun sokin aksent.",
    image:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=85",
    colors: [
      { name: "Fil Suyagi", hex: "#EAE3D2" },
      { name: "Konyak Charm", hex: "#8C583A" },
      { name: "Qora Eman", hex: "#262523" },
    ],
  },
  {
    id: "md-05",
    sku: "MD-ARM-012",
    name: "Siena Charm Kreslosi",
    category: "Kreslolar",
    price: 11400000,
    oldPrice: null,
    inStock: true,
    isNew: true,
    dimensions: { width: 78, depth: 82, height: 79 },
    material: "To'liq donali italyan charmi, qoraytirilgan bronza",
    warranty: "5 yil",
    origin: "Italiya xomashyosi",
    description:
      "Vaqt o'tishi bilan o'ziga xos patina hosil qiluvchi tabiiy anilin charm. Kabinet va mehmonxona markazida arxitektura elementi sifatida ajralib turadi.",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85",
    colors: [
      { name: "Issiq Karamel", hex: "#9E6B43" },
      { name: "To'q Espresso", hex: "#3D2B1F" },
    ],
  },
  {
    id: "md-06",
    sku: "MD-ARM-019",
    name: "Oslo Aylanuvchi Kreslo",
    category: "Kreslolar",
    price: 7600000,
    oldPrice: 8400000,
    inStock: false,
    isNew: false,
    dimensions: { width: 76, depth: 78, height: 72 },
    material: "Teksturali jun mato, 360° yashirin aylanish mexanizmi",
    warranty: "5 yil",
    origin: "Toshkent",
    description:
      "Yumshoq organik egri chiziqlar va ovozsiz qaytuvchi aylanish bazasi. Buyurtma asosida 14 ish kuni ichida tayyorlab beriladi.",
    image:
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=85",
    colors: [
      { name: "Tumanli Kulrang", hex: "#A8A49C" },
      { name: "Issiq Qum", hex: "#C8B8A2" },
    ],
  },
  {
    id: "md-07",
    sku: "MD-TBL-004",
    name: "Nordic Eman Ovqatlanish Stoli",
    category: "Stollar",
    price: 16800000,
    oldPrice: 18900000,
    inStock: true,
    isNew: true,
    dimensions: { width: 220, depth: 100, height: 75 },
    material: "Yaxlit massiv eman yog'ochi, mat tabiiy moy qoplama",
    warranty: "5 yil",
    origin: "Toshkent / Yevropa emani",
    description:
      "8-10 kishiga mo'ljallangan me'moriy ovqatlanish stoli. Tabiiy yog'och teksturasini saqlovchi ekologik mat moy bilan ishlangan.",
    image:
      "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1200&q=85",
    colors: [
      { name: "Tabiiy Eman", hex: "#C5A880" },
      { name: "Tutunli Yong'oq", hex: "#6B523B" },
      { name: "Qora Ash", hex: "#2A2826" },
    ],
  },
  {
    id: "md-08",
    sku: "MD-TBL-011",
    name: "Travertin Jurnal Stoli",
    category: "Stollar",
    price: 6400000,
    oldPrice: null,
    inStock: true,
    isNew: false,
    dimensions: { width: 120, depth: 70, height: 34 },
    material: "Tabiiy Rim travertini, silindrsimon tayanch",
    warranty: "5 yil",
    origin: "Italiya toshi",
    description:
      "Har bir nusxasi tabiiy tosh naqshi bilan betakror bo'lgan past jurnal stoli. Mat sayqallangan yuzasi suv va dog'lardan himoyalangan.",
    image:
      "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=1200&q=85",
    colors: [
      { name: "Och Travertin", hex: "#DFD7C8" },
      { name: "Kumush Travertin", hex: "#B8B2A6" },
    ],
  },
  {
    id: "md-09",
    sku: "MD-TBL-017",
    name: "Atelier Ish va Konsol Stoli",
    category: "Stollar",
    price: 9200000,
    oldPrice: 10500000,
    inStock: true,
    isNew: false,
    dimensions: { width: 150, depth: 65, height: 74 },
    material: "Amerika yong'og'i shponi, yashirin kabel kanali",
    warranty: "5 yil",
    origin: "Toshkent",
    description:
      "Uy ofisi uchun tartibli va sokin ish muhiti. Ikkita yumshoq yopiluvchi tortma va simlarni yashirish bo'linmasiga ega.",
    image:
      "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1200&q=85",
    colors: [
      { name: "Amerika Yong'og'i", hex: "#76563C" },
      { name: "Oqartirilgan Eman", hex: "#D6C5AD" },
    ],
  },
  {
    id: "md-10",
    sku: "MD-BED-005",
    name: "Lucca Platforma Karavoti",
    category: "Yotoqxona",
    price: 21500000,
    oldPrice: 24000000,
    inStock: true,
    isNew: true,
    dimensions: { width: 204, depth: 224, height: 96 },
    material: "Qalin zig'ir mato, ortopedik lamelli asos (180x200)",
    warranty: "5 yil",
    origin: "Toshkent / Italiya dizayni",
    description:
      "Keng yumshoq bosh qismi va yerdan biroz ko'tarilgan vizual yengil platforma. Yotoqxonada tinch va muvozanatli atmosfera yaratadi.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85",
    colors: [
      { name: "Issiq Tosh", hex: "#CFC7B8" },
      { name: "Tungi Kulrang", hex: "#4D4B47" },
      { name: "Krem Zig'ir", hex: "#EBE5DA" },
    ],
  },
  {
    id: "md-11",
    sku: "MD-BED-009",
    name: "Kyoto Eman Tumbasi",
    category: "Yotoqxona",
    price: 4200000,
    oldPrice: null,
    inStock: true,
    isNew: false,
    dimensions: { width: 55, depth: 42, height: 48 },
    material: "Massiv eman, bronza tutqich, Blum mexanizmi",
    warranty: "5 yil",
    origin: "Toshkent / Avstriya furniturasi",
    description:
      "Yapon minimalizmi va Yevropa hunarmandchiligi uyg'unligi. Ovoz chiqarmasdan yopiladigan ikki qavatli saqlash tizimi.",
    image:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=85",
    colors: [
      { name: "Tabiiy Eman", hex: "#C5A880" },
      { name: "To'q Yong'oq", hex: "#5C4430" },
    ],
  },
  {
    id: "md-12",
    sku: "MD-LGT-003",
    name: "Arko Bronza Torsheri",
    category: "Yoritish",
    price: 5400000,
    oldPrice: 6100000,
    inStock: true,
    isNew: true,
    dimensions: { width: 42, depth: 42, height: 162 },
    material: "Cho'tkalangan bronza, opal mat shisha, 2700K LED",
    warranty: "3 yil",
    origin: "Italiya dizayni",
    description:
      "Ko'zni charchatmaydigan issiq tarqoq yorug'lik beruvchi pol chirog'i. Sensorli dimmer yorqinlikni istalgan darajaga sozlash imkonini beradi.",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=85",
    colors: [
      { name: "Tinch Bronza", hex: "#8C6D46" },
      { name: "Mat Qora", hex: "#1F1E1D" },
    ],
  },
  {
    id: "md-13",
    sku: "MD-LGT-007",
    name: "Solis Alabaster Stol Chirog'i",
    category: "Yoritish",
    price: 3850000,
    oldPrice: null,
    inStock: true,
    isNew: false,
    dimensions: { width: 28, depth: 28, height: 44 },
    material: "Tabiiy Ispaniya alabasteri, latun asos",
    warranty: "3 yil",
    origin: "Yevropa xomashyosi",
    description:
      "Yorug'lik yoqilganda tabiiy tosh ichidagi yumshoq tomirlar jonlanadi. Konsol va yotoqxona tumbasi uchun haykaltaroshlik darajasidagi yoritgich.",
    image:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=85",
    colors: [
      { name: "Alabaster / Latun", hex: "#E5DEC9" },
      { name: "Alabaster / Qora", hex: "#353330" },
    ],
  },
];

const LOOKBOOK_HOTSPOTS = [
  {
    id: "hs-1",
    productId: "md-01",
    x: 42,
    y: 62,
    label: "01",
  },
  {
    id: "hs-2",
    productId: "md-08",
    x: 56,
    y: 78,
    label: "02",
  },
  {
    id: "hs-3",
    productId: "md-04",
    x: 78,
    y: 65,
    label: "03",
  },
  {
    id: "hs-4",
    productId: "md-12",
    x: 20,
    y: 38,
    label: "04",
  },
];

const TESTIMONIALS = [
  {
    id: "t-1",
    author: "Kamola Rustamova",
    role: "Interyer me'mori, Studio K",
    project: "Tashkent City rezidensiyasi",
    quote:
      "Loyihalarimizda proporsiya va mato fakturasi hal qiluvchi ahamiyatga ega. Mebelni dodasi jamoasi Milano divanini aynan chizmamizdagi o'lcham va travertin rangida mukammal bajarib berdi.",
  },
  {
    id: "t-2",
    author: "Sardorbek Alimov",
    role: "Uy egasi",
    project: "Mirzo Ulug'bek, 180 m² xonadon",
    quote:
      "Nordic eman stoli va Como kreslolarini showroomda ko'rib tanladik. Yetkazib berish va o'rnatish madaniyati Yevropa darajasida — ortiqcha shovqinsiz, o'z vaqtida va juda ozoda.",
  },
  {
    id: "t-3",
    author: "Dilnoza Karimova",
    role: "Butik-mehmonxona asoschisi",
    project: "Samarqand Darvoza loyihasi",
    quote:
      "Ikki yildan beri mehmonxonamizning barcha yotoqxonalarida Lucca karavotlari xizmat qilmoqda. Matosi ham, yog'och karkasi ham ilk kungi ko'rinishini yo'qotmagan.",
  },
];

const PROMO_CODES = {
  IMEBEL10: { discount: 0.1, label: "10% chegirma (IMEBEL10)" },
  DODASI10: { discount: 0.1, label: "10% chegirma (DODASI10)" },
  MEBEL15: { discount: 0.15, label: "15% maxsus chegirma (MEBEL15)" },
};

function formatPrice(amount) {
  return new Intl.NumberFormat("uz-UZ").format(amount).replace(/,/g, " ") + " so'm";
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="7.5" />
      <line x1="16.5" y1="16.5" x2="21" y2="21" />
    </svg>
  );
}

function HeartIcon({ filled }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M12 20.5s-7.5-4.8-9.5-9.2C1.1 8.1 2.9 4.5 6.5 4.5c2.1 0 3.7 1.1 5.5 3 1.8-1.9 3.4-3 5.5-3 3.6 0 5.4 3.6 4 6.8-2 4.4-9.5 9.2-9.5 9.2z" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 8h12l1 12H5L6 8z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="3" y1="7" x2="21" y2="7" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="17" x2="21" y2="17" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="4" y1="12" x2="20" y2="12" />
      <polyline points="14 6 20 12 14 18" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4h6v2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <polyline points="4 12 9 17 20 6" />
    </svg>
  );
}

export default function App() {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("mebelni_dodasi_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("mebelni_dodasi_wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedCategory, setSelectedCategory] = useState("Barchasi");
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [selectedColors, setSelectedColors] = useState(() => {
    const initial = {};
    PRODUCTS.forEach((p) => {
      initial[p.id] = p.colors[0].name;
    });
    return initial;
  });

  const [activeHotspot, setActiveHotspot] = useState(LOOKBOOK_HOTSPOTS[0].id);

  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [modalQty, setModalQty] = useState(1);
  const [modalColor, setModalColor] = useState("");

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState("");

  const [checkoutForm, setCheckoutForm] = useState({
    fullName: "",
    phone: "+998 ",
    district: TASHKENT_DISTRICTS[0],
    address: "",
    deliveryType: "standard",
    note: "",
  });
  const [checkoutErrors, setCheckoutErrors] = useState({});
  const [orderConfirmation, setOrderConfirmation] = useState(null);

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("");

  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    try {
      localStorage.setItem("mebelni_dodasi_cart", JSON.stringify(cart));
    } catch {
      // ignore storage quota errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("mebelni_dodasi_wishlist", JSON.stringify(wishlist));
    } catch {
      // ignore storage quota errors
    }
  }, [wishlist]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setQuickViewProduct(null);
        setIsCartOpen(false);
        setIsWishlistOpen(false);
        setIsMobileMenuOpen(false);
        setIsCheckoutOpen(false);
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const hasOverlay =
      Boolean(quickViewProduct) ||
      isCartOpen ||
      isWishlistOpen ||
      isMobileMenuOpen ||
      isCheckoutOpen;
    document.body.style.overflow = hasOverlay ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [quickViewProduct, isCartOpen, isWishlistOpen, isMobileMenuOpen, isCheckoutOpen]);

  const showToast = (message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    let list = PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === "Barchasi" || product.category === selectedCategory;
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.material.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });

    if (sortBy === "price-asc") {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      list = [...list].sort((a, b) => Number(b.isNew) - Number(a.isNew));
    }

    return list;
  }, [selectedCategory, searchQuery, sortBy]);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const cartSubtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const discountAmount = useMemo(() => {
    if (!appliedPromo) return 0;
    return Math.round(cartSubtotal * appliedPromo.discount);
  }, [cartSubtotal, appliedPromo]);

  const deliveryFee = useMemo(() => {
    if (cart.length === 0) return 0;
    if (checkoutForm.deliveryType === "express") return 450000;
    return 0;
  }, [cart.length, checkoutForm.deliveryType]);

  const cartTotal = Math.max(0, cartSubtotal - discountAmount + deliveryFee);

  const wishlistProducts = useMemo(
    () => PRODUCTS.filter((p) => wishlist.includes(p.id)),
    [wishlist]
  );

  const activeHotspotProduct = useMemo(() => {
    const spot = LOOKBOOK_HOTSPOTS.find((h) => h.id === activeHotspot);
    if (!spot) return null;
    return PRODUCTS.find((p) => p.id === spot.productId) || null;
  }, [activeHotspot]);

  const handleSelectColor = (productId, colorName) => {
    setSelectedColors((prev) => ({ ...prev, [productId]: colorName }));
  };

  const handleAddToCart = (product, colorName, qty = 1) => {
    const chosenColor = colorName || selectedColors[product.id] || product.colors[0].name;
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === product.id && item.color === chosenColor
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qty,
        };
        return updated;
      }
      return [
        ...prev,
        {
          id: product.id,
          sku: product.sku,
          name: product.name,
          price: product.price,
          image: product.image,
          color: chosenColor,
          dimensions: product.dimensions,
          quantity: qty,
        },
      ];
    });
    showToast(`"${product.name}" savatchaga qo'shildi`);
  };

  const handleUpdateCartQty = (id, color, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id && item.color === color) {
            return { ...item, quantity: item.quantity + delta };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveFromCart = (id, color) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.color === color)));
    showToast("Mahsulot savatchadan o'chirildi");
  };

  const handleToggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast(`"${product.name}" sevimlilardan olib tashlandi`);
        return prev.filter((id) => id !== product.id);
      }
      showToast(`"${product.name}" sevimlilarga qo'shildi`);
      return [...prev, product.id];
    });
  };

  const openQuickView = (product) => {
    setQuickViewProduct(product);
    setModalQty(1);
    setModalColor(selectedColors[product.id] || product.colors[0].name);
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (!code) {
      setPromoError("Promokodni kiriting");
      return;
    }
    if (PROMO_CODES[code]) {
      setAppliedPromo({ code, ...PROMO_CODES[code] });
      setPromoError("");
      setPromoInput("");
      showToast(`${code} promokodi muvaffaqiyatli qo'llandi`);
    } else {
      setPromoError("Bunday promokod topilmadi (Masalan: IMEBEL10)");
    }
  };

  const handleOpenCheckout = () => {
    if (cart.length === 0) return;
    setIsCartOpen(false);
    setOrderConfirmation(null);
    setCheckoutErrors({});
    setIsCheckoutOpen(true);
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (checkoutForm.fullName.trim().length < 3) {
      errors.fullName = "Ism va familiyangizni to'liq kiriting";
    }
    const digits = checkoutForm.phone.replace(/\D/g, "");
    if (digits.length < 12) {
      errors.phone = "Telefon raqamini to'liq kiriting (+998 XX XXX XX XX)";
    }
    if (checkoutForm.deliveryType !== "pickup" && checkoutForm.address.trim().length < 6) {
      errors.address = "Ko'cha, uy va xonadon manzilini kiriting";
    }

    if (Object.keys(errors).length > 0) {
      setCheckoutErrors(errors);
      return;
    }

    const orderNumber = "MD-" + String(Math.floor(100000 + Math.random() * 900000));
    setOrderConfirmation({
      orderNumber,
      customer: checkoutForm.fullName,
      total: cartTotal,
      district: checkoutForm.district,
      deliveryType: checkoutForm.deliveryType,
    });
    setCart([]);
    setAppliedPromo(null);
    showToast(`Buyurtma #${orderNumber} qabul qilindi`);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(newsletterEmail.trim())) {
      setNewsletterStatus("error");
      return;
    }
    setNewsletterStatus("success");
    setNewsletterEmail("");
    showToast("Yopiq katalog va yangiliklarga obuna bo'ldingiz");
  };

  const scrollToSection = (sectionId) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const heroFeaturedProduct = PRODUCTS[0];

  return (
    <div className="site-wrapper">
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <div className="container announcement-inner">
          <span>Toshkent bo'ylab bepul yetkazib berish va professional o'rnatish</span>
          <span className="announcement-divider" aria-hidden="true">/</span>
          <span>
            Birinchi buyurtma uchun <strong>IMEBEL10</strong> promokodi — 10% chegirma
          </span>
        </div>
      </div>

      {/* Sticky Header */}
      <header className="site-header">
        <div className="container header-inner">
          <div className="header-left">
            <button
              type="button"
              className="icon-btn mobile-only"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Menyuni ochish"
            >
              <MenuIcon />
            </button>
            <a href="#top" className="brand-logo" aria-label="Mebelni dodasi bosh sahifa">
              <span className="brand-name">Mebelni dodasi</span>
              <span className="brand-sub">iMebel Atelier</span>
            </a>
          </div>

          <nav className="desktop-nav" aria-label="Asosiy navigatsiya">
            <button type="button" onClick={() => scrollToSection("katalog")}>
              Katalog
            </button>
            <button type="button" onClick={() => scrollToSection("kolleksiyalar")}>
              Kolleksiyalar
            </button>
            <button type="button" onClick={() => scrollToSection("interyer")}>
              Interyer
            </button>
            <button type="button" onClick={() => scrollToSection("showroom")}>
              Showroom
            </button>
            <button type="button" onClick={() => scrollToSection("aloqa")}>
              Aloqa
            </button>
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className={`icon-btn ${isSearchOpen ? "active" : ""}`}
              onClick={() => setIsSearchOpen((prev) => !prev)}
              aria-label="Qidirish"
            >
              <SearchIcon />
            </button>

            <button
              type="button"
              className="icon-btn count-btn"
              onClick={() => setIsWishlistOpen(true)}
              aria-label="Sevimlilar"
            >
              <HeartIcon filled={wishlist.length > 0} />
              <span className="badge-count">{wishlist.length}</span>
            </button>

            <button
              type="button"
              className="icon-btn count-btn"
              onClick={() => setIsCartOpen(true)}
              aria-label="Savatcha"
            >
              <BagIcon />
              <span className="badge-count">{cartCount}</span>
            </button>
          </div>
        </div>

        {/* Live Search Expandable Bar */}
        {isSearchOpen && (
          <div className="header-search-bar">
            <div className="container search-bar-inner">
              <SearchIcon />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  const catalogEl = document.getElementById("katalog");
                  if (catalogEl && e.target.value.length === 1) {
                    catalogEl.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                placeholder="Mahsulot nomi, material yoki artikul bo'yicha qidiring (masalan: eman, divan, travertin)..."
                autoFocus
              />
              {searchQuery && (
                <button
                  type="button"
                  className="text-clear-btn"
                  onClick={() => setSearchQuery("")}
                >
                  Tozalash
                </button>
              )}
              <button
                type="button"
                className="icon-btn"
                onClick={() => setIsSearchOpen(false)}
                aria-label="Qidiruvni yopish"
              >
                <CloseIcon />
              </button>
            </div>
          </div>
        )}
      </header>

      <main id="top">
        {/* Editorial Hero Section */}
        <section className="hero-section">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="hero-meta">
                <span className="eyebrow">KOLLEKSIYA № 04 / 2026</span>
                <span className="meta-line" aria-hidden="true" />
                <span className="eyebrow-muted">TOSHKENT ATELYESI</span>
              </div>

              <h1 className="hero-title">
                Sokin hashamat va arxitektura aniqligi.
              </h1>

              <p className="hero-subtitle">
                Tabiiy eman yog'ochi, Rim travertini va italyan bukle matolaridan yaratilgan
                zamonaviy mebel kolleksiyasi. Har bir chiziq vaqt sinovidan o'tish uchun
                loyihalangan.
              </p>

              <div className="hero-actions">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => scrollToSection("katalog")}
                >
                  <span>Katalogni ko'rish</span>
                  <ArrowRightIcon />
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => scrollToSection("interyer")}
                >
                  Interyer lookbook
                </button>
              </div>

              <div className="hero-metrics">
                <div className="metric-item">
                  <span className="metric-value">13+</span>
                  <span className="metric-label">Mualliflik modellari</span>
                </div>
                <div className="metric-item">
                  <span className="metric-value">5 yil</span>
                  <span className="metric-label">Rasmiy kafolat</span>
                </div>
                <div className="metric-item">
                  <span className="metric-value">100%</span>
                  <span className="metric-label">Tabiiy xomashyo</span>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-image-frame">
                <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85"
                  alt="Mebelni dodasi zamonaviy minimalist mehmonxona interyeri"
                />
              </div>

              <div className="hero-spec-strip">
                <div className="spec-col">
                  <span className="spec-label">ASOSIY MODEL</span>
                  <strong className="spec-val">{heroFeaturedProduct.name}</strong>
                </div>
                <div className="spec-col">
                  <span className="spec-label">O'LCHAMLAR</span>
                  <strong className="spec-val">
                    {heroFeaturedProduct.dimensions.width} × {heroFeaturedProduct.dimensions.depth} ×{" "}
                    {heroFeaturedProduct.dimensions.height} sm
                  </strong>
                </div>
                <div className="spec-col">
                  <span className="spec-label">NARXI</span>
                  <strong className="spec-val">{formatPrice(heroFeaturedProduct.price)}</strong>
                </div>
                <button
                  type="button"
                  className="spec-link-btn"
                  onClick={() => openQuickView(heroFeaturedProduct)}
                >
                  Batafsil
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Catalog Section */}
        <section id="katalog" className="catalog-section">
          <div className="container">
            <div className="section-header-row">
              <div>
                <span className="eyebrow">01 / KATALOG</span>
                <h2 className="section-title">Saralangan mebel kolleksiyasi</h2>
              </div>
              <p className="section-desc">
                Barcha mahsulotlar Toshkentdagi ustaxonamizda Yevropa furniturasi va tabiiy
                materiallar asosida tayyorlanadi.
              </p>
            </div>

            {/* Filters, Search & Sort Controls */}
            <div className="catalog-toolbar">
              <div className="category-tabs" role="tablist" aria-label="Mahsulot kategoriyalari">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={selectedCategory === category}
                    className={`category-tab ${selectedCategory === category ? "active" : ""}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="toolbar-right">
                <div className="inline-search">
                  <SearchIcon />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Katalogdan izlash..."
                    aria-label="Katalogdan izlash"
                  />
                </div>

                <select
                  className="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Saralash tartibi"
                >
                  <option value="featured">Tavsiya etilgan</option>
                  <option value="newest">Yangi modellar</option>
                  <option value="price-asc">Arzonidan qimmatiga</option>
                  <option value="price-desc">Qimmatidan arzoniga</option>
                </select>
              </div>
            </div>

            <div className="catalog-count-row">
              <span>Jami {filteredProducts.length} ta mahsulot ko'rsatilmoqda</span>
              {(selectedCategory !== "Barchasi" || searchQuery) && (
                <button
                  type="button"
                  className="reset-filter-btn"
                  onClick={() => {
                    setSelectedCategory("Barchasi");
                    setSearchQuery("");
                    setSortBy("featured");
                  }}
                >
                  Filtrlarni tozalash
                </button>
              )}
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="empty-catalog">
                <h3>So'rovingiz bo'yicha mahsulot topilmadi</h3>
                <p>Boshqa kalit so'z kiriting yoki barcha kategoriyalarni ko'ring.</p>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setSelectedCategory("Barchasi");
                    setSearchQuery("");
                  }}
                >
                  Barcha mahsulotlarni ko'rsatish
                </button>
              </div>
            ) : (
              <div className="product-grid">
                {filteredProducts.map((product) => {
                  const isWishlisted = wishlist.includes(product.id);
                  const currentColor = selectedColors[product.id] || product.colors[0].name;

                  return (
                    <article key={product.id} className="product-card">
                      <div className="product-media">
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          onClick={() => openQuickView(product)}
                        />

                        <div className="product-badges">
                          {product.isNew && <span className="tag-badge">YANGI</span>}
                          {!product.inStock && (
                            <span className="tag-badge muted">BUYURTMA ASOSIDA</span>
                          )}
                          {product.oldPrice && (
                            <span className="tag-badge accent">
                              -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          className={`card-wishlist-btn ${isWishlisted ? "active" : ""}`}
                          onClick={() => handleToggleWishlist(product)}
                          aria-label="Sevimlilarga qo'shish"
                        >
                          <HeartIcon filled={isWishlisted} />
                        </button>

                        <button
                          type="button"
                          className="quick-view-trigger"
                          onClick={() => openQuickView(product)}
                        >
                          Tezkor ko'rish
                        </button>
                      </div>

                      <div className="product-body">
                        <div className="product-top-meta">
                          <span className="product-cat">{product.category}</span>
                          <span className="product-dims">
                            {product.dimensions.width} × {product.dimensions.depth} ×{" "}
                            {product.dimensions.height} sm
                          </span>
                        </div>

                        <h3 className="product-name" onClick={() => openQuickView(product)}>
                          {product.name}
                        </h3>

                        <p className="product-material">{product.material}</p>

                        <div className="swatch-row">
                          <div className="swatch-list" role="group" aria-label="Rang variantlari">
                            {product.colors.map((color) => (
                              <button
                                key={color.name}
                                type="button"
                                className={`swatch-dot ${
                                  currentColor === color.name ? "selected" : ""
                                }`}
                                style={{ backgroundColor: color.hex }}
                                title={color.name}
                                aria-label={`Rang: ${color.name}`}
                                onClick={() => handleSelectColor(product.id, color.name)}
                              />
                            ))}
                          </div>
                          <span className="swatch-name">{currentColor}</span>
                        </div>

                        <div className="product-footer">
                          <div className="price-stack">
                            <span className="price-current">{formatPrice(product.price)}</span>
                            {product.oldPrice && (
                              <span className="price-old">{formatPrice(product.oldPrice)}</span>
                            )}
                          </div>

                          <button
                            type="button"
                            className="btn-card-add"
                            onClick={() => handleAddToCart(product, currentColor, 1)}
                          >
                            Savatchaga
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Interactive Lookbook Section ("Interyerdan xarid qiling") */}
        <section id="interyer" className="lookbook-section">
          <div className="container">
            <div className="section-header-row">
              <div>
                <span className="eyebrow">02 / INTERYERDAN XARID QILING</span>
                <h2 className="section-title">Toshkentdagi zamonaviy rezidensiya</h2>
              </div>
              <p className="section-desc">
                Surat ustidagi raqamlangan nuqtalarga bosing va xonadagi har bir mebel
                tafsilotlari bilan bevosita tanishing.
              </p>
            </div>

            <div className="lookbook-layout">
              <div className="lookbook-stage">
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1500&q=85"
                  alt="Interyerdan xarid qiling - mehmonxona kompozitsiyasi"
                />

                {LOOKBOOK_HOTSPOTS.map((spot) => {
                  const isActive = activeHotspot === spot.id;
                  return (
                    <button
                      key={spot.id}
                      type="button"
                      className={`hotspot-pin ${isActive ? "active" : ""}`}
                      style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                      onClick={() => setActiveHotspot(spot.id)}
                      aria-label={`Interyer elementi ${spot.label}`}
                    >
                      <span>{spot.label}</span>
                    </button>
                  );
                })}
              </div>

              <aside className="lookbook-panel">
                <div className="lookbook-panel-head">
                  <span className="eyebrow">TANLANGAN ELEMENT</span>
                  <span className="lookbook-counter">
                    {LOOKBOOK_HOTSPOTS.find((h) => h.id === activeHotspot)?.label} / 0
                    {LOOKBOOK_HOTSPOTS.length}
                  </span>
                </div>

                {activeHotspotProduct && (
                  <div className="lookbook-card">
                    <div className="lookbook-thumb">
                      <img
                        src={activeHotspotProduct.image}
                        alt={activeHotspotProduct.name}
                      />
                    </div>
                    <span className="product-cat">{activeHotspotProduct.category}</span>
                    <h3 className="lookbook-product-title">{activeHotspotProduct.name}</h3>
                    <p className="lookbook-product-desc">{activeHotspotProduct.description}</p>

                    <div className="lookbook-specs">
                      <div>
                        <span>O'lcham</span>
                        <strong>
                          {activeHotspotProduct.dimensions.width} ×{" "}
                          {activeHotspotProduct.dimensions.depth} ×{" "}
                          {activeHotspotProduct.dimensions.height} sm
                        </strong>
                      </div>
                      <div>
                        <span>Narxi</span>
                        <strong>{formatPrice(activeHotspotProduct.price)}</strong>
                      </div>
                    </div>

                    <div className="lookbook-actions">
                      <button
                        type="button"
                        className="btn-primary full-width"
                        onClick={() => handleAddToCart(activeHotspotProduct)}
                      >
                        Savatchaga qo'shish
                      </button>
                      <button
                        type="button"
                        className="btn-secondary full-width"
                        onClick={() => openQuickView(activeHotspotProduct)}
                      >
                        To'liq spetsifikatsiya
                      </button>
                    </div>
                  </div>
                )}

                <div className="lookbook-list-nav">
                  {LOOKBOOK_HOTSPOTS.map((spot) => {
                    const item = PRODUCTS.find((p) => p.id === spot.productId);
                    if (!item) return null;
                    return (
                      <button
                        key={spot.id}
                        type="button"
                        className={`lookbook-list-item ${
                          activeHotspot === spot.id ? "active" : ""
                        }`}
                        onClick={() => setActiveHotspot(spot.id)}
                      >
                        <span className="list-num">{spot.label}</span>
                        <span className="list-name">{item.name}</span>
                        <span className="list-price">{formatPrice(item.price)}</span>
                      </button>
                    );
                  })}
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Materials & Craftsmanship Section */}
        <section id="kolleksiyalar" className="materials-section">
          <div className="container">
            <div className="section-header-row">
              <div>
                <span className="eyebrow">03 / MATERIAL VA SIFAT</span>
                <h2 className="section-title">Vaqt o'tishi bilan qadri oshadigan me'morlik</h2>
              </div>
              <p className="section-desc">
                Biz sintetik taqlidlar o'rniga faqat sertifikatlangan tabiiy yog'och, tosh va
                Yevropa tekstil fabrikalarining matolaridan foydalanamiz.
              </p>
            </div>

            <div className="materials-grid">
              <article className="material-card">
                <div className="material-index">I</div>
                <h3>Tabiiy eman yog'ochi</h3>
                <p>
                  Kamerada 8–10% namlikkacha quritilgan Yevropa eman va Amerika yong'og'i massivi.
                  Har bir detal qo'lda sayqallanadi va zaharsiz tabiiy mat moy bilan himoyalanadi.
                </p>
                <ul className="material-specs">
                  <li>FSC sertifikatlangan xomashyo</li>
                  <li>Yorilishga qarshi ko'p bosqichli quritish</li>
                  <li>Ovoz chiqarmaydigan Avstriya furniturasi</li>
                </ul>
              </article>

              <article className="material-card">
                <div className="material-index">II</div>
                <h3>Italyan matolari</h3>
                <p>
                  Lombardiya va Belgiya to'qimachilik uylaridan keltirilgan bukle, zig'ir va mat
                  velor kolleksiyalari. 80 000+ Martindale ishqalanish chidamliligi va dog'dan
                  himoya qatlami.
                </p>
                <ul className="material-specs">
                  <li>Oson tozalanadigan Easy-Clean tolalar</li>
                  <li>Gipoallergen va nafas oluvchi struktura</li>
                  <li>40 dan ortiq arxitektura rang palitrasi</li>
                </ul>
              </article>

              <article className="material-card">
                <div className="material-index">III</div>
                <h3>5 yillik rasmiy kafolat</h3>
                <p>
                  Har bir buyurtma karkas mustahkamligi, furnitura ishlashi va yumshoq qatlamlar
                  bo'yicha 5 yillik rasmiy kafolat pasporti hamda servis xizmati bilan topshiriladi.
                </p>
                <ul className="material-specs">
                  <li>Bepul diagnostika va sozlash xizmati</li>
                  <li>Toshkent bo'ylab shaxsiy montaj brigadasi</li>
                  <li>Kafolatdan keyingi mato yangilash dasturi</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* Showroom & Client Testimonials */}
        <section id="showroom" className="showroom-section">
          <div className="container">
            <div className="showroom-grid">
              <div className="showroom-image-box">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85"
                  alt="Mebelni dodasi Toshkent showroom zali"
                />
              </div>

              <div className="showroom-info">
                <span className="eyebrow">04 / TOSHKENT SHOWROOM</span>
                <h2 className="section-title">Materiallarni jonli his qiling</h2>
                <p className="showroom-lead">
                  Showroomimizda barcha asosiy divanlar, travertin stollar va 120 dan ortiq mato
                  namunalari bilan tanishishingiz, interyer me'morimizdan bepul maslahat olishingiz
                  mumkin.
                </p>

                <div className="showroom-details-grid">
                  <div className="detail-block">
                    <span className="detail-label">MANZIL</span>
                    <p>Toshkent sh., Mirobod tumani, Taras Shevchenko ko'chasi, 24-uy</p>
                  </div>
                  <div className="detail-block">
                    <span className="detail-label">ISH VAQTI</span>
                    <p>Dushanba – Shanba: 10:00 – 20:00</p>
                    <p>Yakshanba: 11:00 – 18:00</p>
                  </div>
                  <div className="detail-block">
                    <span className="detail-label">ALOQA</span>
                    <p>+998 71 200 45 80</p>
                    <p>atelier@mebelnidodasi.uz</p>
                  </div>
                  <div className="detail-block">
                    <span className="detail-label">SHAXSIY UCHRASHUV</span>
                    <p>Dizayner va me'morlar uchun yopiq materiallar kutubxonasi mavjud.</p>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    showToast("Showroom tashrif so'rovi uchun +998 71 200 45 80 raqamiga bog'laning");
                  }}
                >
                  <span>Tashrifni rejalashtirish</span>
                  <ArrowRightIcon />
                </button>
              </div>
            </div>

            {/* Testimonials */}
            <div className="testimonials-block">
              <div className="section-header-row compact">
                <div>
                  <span className="eyebrow">05 / MIJOZLAR FIKRI</span>
                  <h2 className="section-title">Loyihalar va ishonch</h2>
                </div>
              </div>

              <div className="testimonials-grid">
                {TESTIMONIALS.map((item) => (
                  <blockquote key={item.id} className="testimonial-card">
                    <p className="testimonial-quote">“{item.quote}”</p>
                    <footer className="testimonial-meta">
                      <strong>{item.author}</strong>
                      <span>{item.role}</span>
                      <span className="testimonial-project">{item.project}</span>
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="aloqa" className="site-footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand-col">
              <div className="brand-logo">
                <span className="brand-name">Mebelni dodasi</span>
                <span className="brand-sub">iMebel Atelier</span>
              </div>
              <p className="footer-about">
                Zamonaviy Yevropa minimalizmi va o'zbek hunarmandchiligi uyg'unligida yaratilgan
                arxitektura mebellari. Toshkent, 2026.
              </p>
            </div>

            <div className="footer-nav-col">
              <h4>Katalog</h4>
              <ul>
                {CATEGORIES.filter((c) => c !== "Barchasi").map((cat) => (
                  <li key={cat}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat);
                        scrollToSection("katalog");
                      }}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-nav-col">
              <h4>Kompaniya</h4>
              <ul>
                <li>
                  <button type="button" onClick={() => scrollToSection("interyer")}>
                    Interyer lookbook
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => scrollToSection("kolleksiyalar")}>
                    Material va sifat
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => scrollToSection("showroom")}>
                    Toshkent showroom
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => setIsCartOpen(true)}>
                    Savatcha va buyurtma
                  </button>
                </li>
              </ul>
            </div>

            <div className="footer-newsletter-col">
              <h4>Yopiq katalog va yangiliklar</h4>
              <p>
                Yangi kolleksiyalar, showroom taqdimotlari va maxsus takliflar haqida birinchi
                bo'lib xabardor bo'ling.
              </p>
              <form className="newsletter-form" onSubmit={handleNewsletterSubmit} noValidate>
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => {
                    setNewsletterEmail(e.target.value);
                    setNewsletterStatus("");
                  }}
                  placeholder="Elektron pochtangiz"
                  aria-label="Elektron pochtangiz"
                />
                <button type="submit" className="btn-primary">
                  Obuna
                </button>
              </form>
              {newsletterStatus === "error" && (
                <p className="form-error">Iltimos, to'g'ri elektron pochta manzilini kiriting.</p>
              )}
              {newsletterStatus === "success" && (
                <p className="form-success">Rahmat! Siz yangiliklar ro'yxatiga qo'shildingiz.</p>
              )}
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 Mebelni dodasi (iMebel Atelier). Barcha huquqlar himoyalangan.</span>
            <div className="footer-legal">
              <span>Toshkent, O'zbekiston</span>
              <span>+998 71 200 45 80</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div
          className="overlay-backdrop"
          onClick={() => setIsMobileMenuOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Mobil navigatsiya"
        >
          <div className="drawer-panel left" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <span className="brand-name">Mebelni dodasi</span>
              <button
                type="button"
                className="icon-btn"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Yopish"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="mobile-nav-links">
              <button type="button" onClick={() => scrollToSection("katalog")}>
                Katalog
              </button>
              <button type="button" onClick={() => scrollToSection("kolleksiyalar")}>
                Kolleksiyalar va Sifat
              </button>
              <button type="button" onClick={() => scrollToSection("interyer")}>
                Interyer Lookbook
              </button>
              <button type="button" onClick={() => scrollToSection("showroom")}>
                Showroom
              </button>
              <button type="button" onClick={() => scrollToSection("aloqa")}>
                Aloqa
              </button>
            </div>
            <div className="mobile-drawer-footer">
              <p>Taras Shevchenko ko'chasi, 24-uy, Toshkent</p>
              <strong>+998 71 200 45 80</strong>
            </div>
          </div>
        </div>
      )}

      {/* Product Detail / Quick View Modal */}
      {quickViewProduct && (
        <div
          className="overlay-backdrop center"
          onClick={() => setQuickViewProduct(null)}
          role="dialog"
          aria-modal="true"
          aria-label={quickViewProduct.name}
        >
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setQuickViewProduct(null)}
              aria-label="Oynani yopish"
            >
              <CloseIcon />
            </button>

            <div className="product-modal-grid">
              <div className="product-modal-media">
                <img src={quickViewProduct.image} alt={quickViewProduct.name} />
              </div>

              <div className="product-modal-info">
                <div className="modal-meta-top">
                  <span className="eyebrow">{quickViewProduct.category}</span>
                  <span className="sku-code">SKU: {quickViewProduct.sku}</span>
                </div>

                <h2 className="modal-title">{quickViewProduct.name}</h2>

                <div className="modal-price-row">
                  <span className="modal-price">{formatPrice(quickViewProduct.price)}</span>
                  {quickViewProduct.oldPrice && (
                    <span className="price-old">{formatPrice(quickViewProduct.oldPrice)}</span>
                  )}
                  <span className={`stock-pill ${quickViewProduct.inStock ? "in" : "order"}`}>
                    {quickViewProduct.inStock ? "Omborda mavjud" : "Buyurtma asosida (14 kun)"}
                  </span>
                </div>

                <p className="modal-description">{quickViewProduct.description}</p>

                {/* Dimensions Table */}
                <div className="dimensions-box">
                  <span className="box-label">O'LCHAMLAR JADVALI (SM)</span>
                  <table className="dimensions-table">
                    <thead>
                      <tr>
                        <th>Eni</th>
                        <th>Chuqurligi</th>
                        <th>Balandligi</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{quickViewProduct.dimensions.width} sm</td>
                        <td>{quickViewProduct.dimensions.depth} sm</td>
                        <td>{quickViewProduct.dimensions.height} sm</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="modal-specs-list">
                  <div>
                    <span>Material:</span>
                    <strong>{quickViewProduct.material}</strong>
                  </div>
                  <div>
                    <span>Kafolat:</span>
                    <strong>{quickViewProduct.warranty}</strong>
                  </div>
                  <div>
                    <span>Ishlab chiqarish:</span>
                    <strong>{quickViewProduct.origin}</strong>
                  </div>
                </div>

                {/* Color Picker */}
                <div className="modal-color-section">
                  <span className="box-label">
                    RANG / QOPLAMA: <strong>{modalColor}</strong>
                  </span>
                  <div className="swatch-list large">
                    {quickViewProduct.colors.map((color) => (
                      <button
                        key={color.name}
                        type="button"
                        className={`swatch-dot ${modalColor === color.name ? "selected" : ""}`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                        onClick={() => {
                          setModalColor(color.name);
                          handleSelectColor(quickViewProduct.id, color.name);
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Quantity & Actions */}
                <div className="modal-purchase-bar">
                  <div className="qty-control">
                    <button
                      type="button"
                      onClick={() => setModalQty((q) => Math.max(1, q - 1))}
                      aria-label="Miqdorni kamaytirish"
                    >
                      −
                    </button>
                    <span>{modalQty}</span>
                    <button
                      type="button"
                      onClick={() => setModalQty((q) => q + 1)}
                      aria-label="Miqdorni oshirish"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className="btn-primary flex-grow"
                    onClick={() => {
                      handleAddToCart(quickViewProduct, modalColor, modalQty);
                      setQuickViewProduct(null);
                      setIsCartOpen(true);
                    }}
                  >
                    Savatchaga qo'shish — {formatPrice(quickViewProduct.price * modalQty)}
                  </button>

                  <button
                    type="button"
                    className={`icon-btn bordered ${
                      wishlist.includes(quickViewProduct.id) ? "active" : ""
                    }`}
                    onClick={() => handleToggleWishlist(quickViewProduct)}
                    aria-label="Sevimlilarga qo'shish"
                  >
                    <HeartIcon filled={wishlist.includes(quickViewProduct.id)} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Wishlist Slide-over Drawer */}
      {isWishlistOpen && (
        <div
          className="overlay-backdrop"
          onClick={() => setIsWishlistOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Sevimlilar ro'yxati"
        >
          <div className="drawer-panel right" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div>
                <h3>Sevimlilar</h3>
                <span className="drawer-sub">{wishlistProducts.length} ta mahsulot</span>
              </div>
              <button
                type="button"
                className="icon-btn"
                onClick={() => setIsWishlistOpen(false)}
                aria-label="Yopish"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="drawer-body">
              {wishlistProducts.length === 0 ? (
                <div className="drawer-empty">
                  <p>Sevimlilar ro'yxatingiz hozircha bo'sh.</p>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => {
                      setIsWishlistOpen(false);
                      scrollToSection("katalog");
                    }}
                  >
                    Katalogga o'tish
                  </button>
                </div>
              ) : (
                <div className="drawer-items-list">
                  {wishlistProducts.map((item) => (
                    <div key={item.id} className="drawer-item">
                      <img src={item.image} alt={item.name} />
                      <div className="drawer-item-info">
                        <div className="drawer-item-top">
                          <h4>{item.name}</h4>
                          <button
                            type="button"
                            className="remove-item-btn"
                            onClick={() => handleToggleWishlist(item)}
                            aria-label="O'chirish"
                          >
                            <TrashIcon />
                          </button>
                        </div>
                        <span className="drawer-item-meta">{item.category}</span>
                        <strong className="drawer-item-price">{formatPrice(item.price)}</strong>
                        <button
                          type="button"
                          className="btn-inline-action"
                          onClick={() => {
                            handleAddToCart(item);
                            setIsWishlistOpen(false);
                            setIsCartOpen(true);
                          }}
                        >
                          Savatchaga o'tkazish
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cart Slide-over Drawer */}
      {isCartOpen && (
        <div
          className="overlay-backdrop"
          onClick={() => setIsCartOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Savatcha"
        >
          <div className="drawer-panel right" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div>
                <h3>Savatcha</h3>
                <span className="drawer-sub">{cartCount} ta mahsulot</span>
              </div>
              <button
                type="button"
                className="icon-btn"
                onClick={() => setIsCartOpen(false)}
                aria-label="Savatchani yopish"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="drawer-body">
              {cart.length === 0 ? (
                <div className="drawer-empty">
                  <p>Savatchangizda hali mahsulot yo'q.</p>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => {
                      setIsCartOpen(false);
                      scrollToSection("katalog");
                    }}
                  >
                    Kolleksiyani ko'rish
                  </button>
                </div>
              ) : (
                <div className="drawer-items-list">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.color}`} className="drawer-item">
                      <img src={item.image} alt={item.name} />
                      <div className="drawer-item-info">
                        <div className="drawer-item-top">
                          <h4>{item.name}</h4>
                          <button
                            type="button"
                            className="remove-item-btn"
                            onClick={() => handleRemoveFromCart(item.id, item.color)}
                            aria-label="Mahsulotni o'chirish"
                          >
                            <TrashIcon />
                          </button>
                        </div>
                        <span className="drawer-item-meta">Rang: {item.color}</span>
                        <div className="drawer-item-bottom">
                          <div className="qty-control small">
                            <button
                              type="button"
                              onClick={() => handleUpdateCartQty(item.id, item.color, -1)}
                              aria-label="Kamaytirish"
                            >
                              −
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => handleUpdateCartQty(item.id, item.color, 1)}
                              aria-label="Oshirish"
                            >
                              +
                            </button>
                          </div>
                          <strong className="drawer-item-price">
                            {formatPrice(item.price * item.quantity)}
                          </strong>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="drawer-footer">
                <form className="promo-form" onSubmit={handleApplyPromo}>
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => {
                      setPromoInput(e.target.value);
                      setPromoError("");
                    }}
                    placeholder="Promokod (masalan: IMEBEL10)"
                    aria-label="Promokod"
                  />
                  <button type="submit" className="btn-secondary">
                    Qo'llash
                  </button>
                </form>

                {promoError && <p className="form-error">{promoError}</p>}

                {appliedPromo && (
                  <div className="applied-promo-tag">
                    <span>{appliedPromo.label}</span>
                    <button
                      type="button"
                      onClick={() => setAppliedPromo(null)}
                      aria-label="Promokodni bekor qilish"
                    >
                      ×
                    </button>
                  </div>
                )}

                <div className="cart-totals">
                  <div className="total-row">
                    <span>Mahsulotlar summasi</span>
                    <span>{formatPrice(cartSubtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="total-row discount">
                      <span>Chegirma ({appliedPromo.code})</span>
                      <span>− {formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="total-row">
                    <span>Toshkent bo'ylab yetkazish</span>
                    <span>Bepul</span>
                  </div>
                  <div className="total-row grand">
                    <span>Jami to'lov</span>
                    <strong>{formatPrice(cartSubtotal - discountAmount)}</strong>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn-primary full-width"
                  onClick={handleOpenCheckout}
                >
                  <span>Buyurtmani rasmiylashtirish</span>
                  <ArrowRightIcon />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div
          className="overlay-backdrop center"
          onClick={() => setIsCheckoutOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Buyurtma berish"
        >
          <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setIsCheckoutOpen(false)}
              aria-label="Yopish"
            >
              <CloseIcon />
            </button>

            {orderConfirmation ? (
              <div className="order-success-box">
                <div className="success-mark">
                  <CheckIcon />
                </div>
                <span className="eyebrow">BUYURTMA QABUL QILINDI</span>
                <h2>Rahmat, {orderConfirmation.customer}!</h2>
                <p>
                  Buyurtma raqamingiz: <strong>{orderConfirmation.orderNumber}</strong>. Menejerimiz
                  30 daqiqa ichida siz bilan bog'lanib, yetkazib berish vaqtini tasdiqlaydi.
                </p>
                <div className="confirmation-summary">
                  <div>
                    <span>Hudud:</span>
                    <strong>{orderConfirmation.district}</strong>
                  </div>
                  <div>
                    <span>Jami summa:</span>
                    <strong>{formatPrice(orderConfirmation.total)}</strong>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setOrderConfirmation(null);
                  }}
                >
                  Do'konga qaytish
                </button>
              </div>
            ) : (
              <div className="checkout-grid">
                <form className="checkout-form" onSubmit={handleCheckoutSubmit} noValidate>
                  <span className="eyebrow">RASMIYLASHTIRISH</span>
                  <h2 className="modal-title">Buyurtma ma'lumotlari</h2>

                  <div className="form-group">
                    <label htmlFor="fullName">Ism va familiya *</label>
                    <input
                      id="fullName"
                      type="text"
                      value={checkoutForm.fullName}
                      onChange={(e) =>
                        setCheckoutForm({ ...checkoutForm, fullName: e.target.value })
                      }
                      placeholder="Masalan: Jasur Karimov"
                    />
                    {checkoutErrors.fullName && (
                      <span className="form-error">{checkoutErrors.fullName}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Telefon raqami *</label>
                    <input
                      id="phone"
                      type="tel"
                      value={checkoutForm.phone}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                      placeholder="+998 90 123 45 67"
                    />
                    {checkoutErrors.phone && (
                      <span className="form-error">{checkoutErrors.phone}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="district">Toshkent tumani</label>
                    <select
                      id="district"
                      value={checkoutForm.district}
                      onChange={(e) =>
                        setCheckoutForm({ ...checkoutForm, district: e.target.value })
                      }
                    >
                      {TASHKENT_DISTRICTS.map((dist) => (
                        <option key={dist} value={dist}>
                          {dist}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Yetkazib berish turi</label>
                    <div className="delivery-options">
                      <label
                        className={`delivery-option ${
                          checkoutForm.deliveryType === "standard" ? "active" : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="deliveryType"
                          value="standard"
                          checked={checkoutForm.deliveryType === "standard"}
                          onChange={(e) =>
                            setCheckoutForm({ ...checkoutForm, deliveryType: e.target.value })
                          }
                        />
                        <div>
                          <strong>Standart yetkazib berish (2–3 kun)</strong>
                          <span>Bepul — ko'tarish va yig'ish bilan</span>
                        </div>
                      </label>

                      <label
                        className={`delivery-option ${
                          checkoutForm.deliveryType === "express" ? "active" : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="deliveryType"
                          value="express"
                          checked={checkoutForm.deliveryType === "express"}
                          onChange={(e) =>
                            setCheckoutForm({ ...checkoutForm, deliveryType: e.target.value })
                          }
                        />
                        <div>
                          <strong>Ekspress yetkazish (24 soat ichida)</strong>
                          <span>450 000 so'm — ustuvor montaj brigadasi</span>
                        </div>
                      </label>

                      <label
                        className={`delivery-option ${
                          checkoutForm.deliveryType === "pickup" ? "active" : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="deliveryType"
                          value="pickup"
                          checked={checkoutForm.deliveryType === "pickup"}
                          onChange={(e) =>
                            setCheckoutForm({ ...checkoutForm, deliveryType: e.target.value })
                          }
                        />
                        <div>
                          <strong>Showroomdan olib ketish</strong>
                          <span>Bepul — Taras Shevchenko ko'chasi, 24</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {checkoutForm.deliveryType !== "pickup" && (
                    <div className="form-group">
                      <label htmlFor="address">Aniq manzil *</label>
                      <input
                        id="address"
                        type="text"
                        value={checkoutForm.address}
                        onChange={(e) =>
                          setCheckoutForm({ ...checkoutForm, address: e.target.value })
                        }
                        placeholder="Ko'cha nomi, uy, pod'yezd, qavat"
                      />
                      {checkoutErrors.address && (
                        <span className="form-error">{checkoutErrors.address}</span>
                      )}
                    </div>
                  )}

                  <div className="form-group">
                    <label htmlFor="note">Qo'shimcha izoh (ixtiyoriy)</label>
                    <textarea
                      id="note"
                      rows="2"
                      value={checkoutForm.note}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, note: e.target.value })}
                      placeholder="Qulay qo'ng'iroq vaqti yoki yuk lifti haqida ma'lumot..."
                    />
                  </div>

                  <button type="submit" className="btn-primary full-width">
                    Buyurtmani tasdiqlash — {formatPrice(cartTotal)}
                  </button>
                </form>

                <aside className="checkout-summary">
                  <h3>Buyurtma tarkibi ({cartCount})</h3>
                  <div className="checkout-items">
                    {cart.map((item) => (
                      <div key={`${item.id}-${item.color}`} className="checkout-item-row">
                        <img src={item.image} alt={item.name} />
                        <div>
                          <strong>{item.name}</strong>
                          <span>
                            {item.color} × {item.quantity}
                          </span>
                        </div>
                        <span className="checkout-item-price">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="cart-totals">
                    <div className="total-row">
                      <span>Jami mahsulotlar</span>
                      <span>{formatPrice(cartSubtotal)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="total-row discount">
                        <span>Chegirma ({appliedPromo.code})</span>
                        <span>− {formatPrice(discountAmount)}</span>
                      </div>
                    )}
                    <div className="total-row">
                      <span>Yetkazib berish</span>
                      <span>{deliveryFee === 0 ? "Bepul" : formatPrice(deliveryFee)}</span>
                    </div>
                    <div className="total-row grand">
                      <span>To'lov summasi</span>
                      <strong>{formatPrice(cartTotal)}</strong>
                    </div>
                  </div>
                </aside>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      <div className="toast-container" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast-item">
            <CheckIcon />
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}