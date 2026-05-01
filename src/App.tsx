import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu as MenuIcon, 
  X, 
  MapPin, 
  Phone, 
  Instagram, 
  Clock, 
  Calendar, 
  Star, 
  ChevronRight,
  UtensilsCrossed,
  Wine,
  Coffee,
  CheckCircle2,
  Navigation,
  Globe,
  Beer,
  Sparkles
} from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';

type Language = 'es' | 'en' | 'it' | 'fr' | 'ru' | 'zh';

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ru', name: 'Pусский', flag: '🇷🇺' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
];

const translations: Record<Language, any> = {
  es: {
    heroTitle: "Sabor y Tradición en el Corazón de Candelaria",
    heroSub: "Cocina internacional, tapas auténticas y los mejores vinos. Abierto de 11:00 a 22:30.",
    reserveBtn: "RESERVAR POR WHATSAPP",
    about: "Sobre Nosotros",
    aboutText1: "Somos una tasca familiar ubicada en la Rambla de los Menceyes. Te invitamos a descubrir una selección única de tapas, vinos canarios y platos mediterráneos.",
    aboutText2: "Ideal para disfrutar de la gastronomía italiana y canaria en el mejor ambiente de Tenerife.",
    menuTitle: "Nuestras Especialidades",
    menuSub: "Combinando lo mejor de Italia y Canarias.",
    sommelier: "Sommelier Virtual",
    sommelierSub: "Encuentra el maridaje perfecto para tu plato.",
    pairing: {
      tapas: "Tapas Canarias",
      italian: "Pasta Italiana",
      wine: "Selección de Vinos",
      beer: "Cervezas Artesanales"
    }
  },
  en: {
    heroTitle: "Flavor and Tradition in the Heart of Candelaria",
    heroSub: "International cuisine, authentic tapas, and the best wines. Open 11:00 to 22:30.",
    reserveBtn: "RESERVE VIA WHATSAPP",
    about: "About Us",
    aboutText1: "We are a family-run tavern located in Rambla de los Menceyes. Discover a unique selection of tapas, Canarian wines, and Mediterranean dishes.",
    aboutText2: "Ideal for enjoying Italian and Canarian gastronomy in Tenerife's best atmosphere.",
    menuTitle: "Our Specialties",
    menuSub: "Combining the best of Italy and the Canary Islands.",
    sommelier: "Virtual Sommelier",
    sommelierSub: "Find the perfect pairing for your dish.",
    pairing: {
      tapas: "Canarian Tapas",
      italian: "Italian Pasta",
      wine: "Wine Selection",
      beer: "Craft Beers"
    }
  },
  it: {
    heroTitle: "Sapore e Tradizione nel Cuore di Candelaria",
    heroSub: "Cucina internazionale, tapas autentiche e i migliori vini. Aperto dalle 11:00 alle 22:30.",
    reserveBtn: "PRENOTA SU WHATSAPP",
    about: "Chi Siamo",
    aboutText1: "Siamo una taverna familiare situata nella Rambla de los Menceyes. Scopri una selezione unica di tapas, vini canarini e piatti mediterranei.",
    aboutText2: "Ideale per gustare la gastronomia italiana e canarina nella migliore atmosfera di Tenerife.",
    menuTitle: "Le Nostre Specialità",
    menuSub: "Unendo il meglio dell'Italia e delle Canarie.",
    sommelier: "Sommelier Virtuale",
    sommelierSub: "Trova l'abbinamento perfetto per il tuo piatto.",
    pairing: {
      tapas: "Tapas Canarie",
      italian: "Pasta Italiana",
      wine: "Selezione di Vini",
      beer: "Birre Artigianali"
    }
  },
  fr: {
    heroTitle: "Saveur et Tradition au Cœur de Candelaria",
    heroSub: "Cuisine internationale, tapas authentiques et les meilleurs vins. Ouvert de 11h00 à 22h30.",
    reserveBtn: "RÉSERVER SUR WHATSAPP",
    about: "À Propos",
    aboutText1: "Nous sommes une taverne familiale située sur la Rambla de l'un Menceyes. Découvrez une sélection unique de tapas, de vins canariens et de plats méditerranéens.",
    aboutText2: "Idéal pour savourer la gastronomie italienne et canarienne dans la meilleure ambiance de Tenerife.",
    menuTitle: "Nos Spécialités",
    menuSub: "Alliant le meilleur de l'Italie et des Canaries.",
    sommelier: "Sommelier Virtuel",
    sommelierSub: "Trouvez l'accord parfait pour votre plat.",
    pairing: {
      tapas: "Tapas Canariennes",
      italian: "Pâtes Italiennes",
      wine: "Sélection de Vins",
      beer: "Bières Artisanales"
    }
  },
  ru: {
    heroTitle: "Вкус и традиции в самом сердце Канделарии",
    heroSub: "Международная кухня, аутентичные тапас и лучшие вина. Открыто с 11:00 до 22:30.",
    reserveBtn: "ЗАБРОНИРОВАТЬ В WHATSAPP",
    about: "О нас",
    aboutText1: "Мы — семейная таверна, расположенная на Рамбла-де-лос-Менсейес. Откройте для себя уникальный выбор тапас, канарских вин и средиземноморских блюд.",
    aboutText2: "Идеально подходит для наслаждения итальянской и канарской гастрономией в лучшей атмосфере Тенерифе.",
    menuTitle: "Наши фирменные блюда",
    menuSub: "Сочетание лучшего из Италии и Канарских островов.",
    sommelier: "Виртуальный сомелье",
    sommelierSub: "Найдите идеальное сочетание для вашего блюда.",
    pairing: {
      tapas: "Канарские тапас",
      italian: "Итальянская паста",
      wine: "Выбор вин",
      beer: "Крафтовое пиво"
    }
  },
  zh: {
    heroTitle: "坎德拉里亚心脏地带的风味与传统",
    heroSub: "国际美食、正宗西班牙小吃及顶级佳酿。营业时间：11:00至22:30。",
    reserveBtn: "通过 WHATSAPP 预订",
    about: "关于我们",
    aboutText1: "我们是一家位于 Menceyes 大道的家族式酒馆。在这里，您可以品尝到独特的西班牙小吃、加那利群岛葡萄酒和地中海美食。",
    aboutText2: "在特内里费岛最棒的氛围中享受意大利和加那利美食的理想场所。",
    menuTitle: "我们的特色",
    menuSub: "融合意大利与加那利群岛的精华。",
    sommelier: "虚拟侍酒师",
    sommelierSub: "为您的菜肴寻找完美的搭配。",
    pairing: {
      tapas: "加那利小吃",
      italian: "意大利面",
      wine: "葡萄酒精品",
      beer: "精酿啤酒"
    }
  }
};

const WHATSAPP_NUMBER = "34613976465";

export default function App() {
  const [lang, setLang] = useState<Language>('es');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [reserveDate, setReserveDate] = useState('');
  const [reserveTime, setReserveTime] = useState('');
  const [reservePeople, setReservePeople] = useState('2');
  const [reserveName, setReserveName] = useState('');
  const [scrolled, setScrolled] = useState(false);
  
  const T = useMemo(() => translations[lang], [lang]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppReserve = () => {
    const text = encodeURIComponent(
      `Hola, me gustaría hacer una reserva en La Bodeguita.
Fecha: ${reserveDate || '[Insertar fecha]'}
Horario: ${reserveTime || '[Insertar hora]'}
Número de personas: ${reservePeople}
Nombre del cliente: ${reserveName || '[Insertar nombre]'}
Solicitud especial: [Insertar texto]`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
    setIsReserveModalOpen(false);
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-off-white selection:bg-primary-burgundy/30">
      {/* WhatsApp Fixed Button */}
      <motion.button 
        onClick={() => setIsReserveModalOpen(true)}
        className="sticky-whatsapp-btn"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Phone className="w-6 h-6 mr-2" />
        <span className="font-semibold text-sm">Reservar</span>
      </motion.button>

      {/* Header */}
      <header className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5 text-white'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-burgundy rounded-full flex items-center justify-center text-white font-serif font-bold text-xl">LB</div>
            <div>
              <h1 className={`text-xl font-bold font-serif leading-none tracking-tight ${scrolled ? 'text-primary-burgundy' : 'text-white'}`}>La Bodeguita</h1>
              <p className={`text-[10px] uppercase tracking-widest ${scrolled ? 'text-gray-500' : 'text-gray-200'}`}>Tapas & Vinos</p>
            </div>
          </div>

          <nav className="hidden md:flex gap-6 items-center">
            {/* Language Switcher */}
            <div className="flex gap-2 mr-4 bg-black/10 p-1 rounded-full">
              {languages.map((l) => (
                <button 
                  key={l.code} 
                  onClick={() => setLang(l.code)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-lg hover:bg-white/20 transition-all ${lang === l.code ? 'bg-white shadow-sm scale-110' : ''}`}
                  title={l.name}
                >
                  {l.flag}
                </button>
              ))}
            </div>
            
            <a href="#carta" className={`font-medium hover:text-primary-olive transition-colors ${scrolled ? 'text-gray-700' : 'text-white'}`}>Carta</a>
            <a href="#contacto" className={`font-medium hover:text-primary-olive transition-colors ${scrolled ? 'text-gray-700' : 'text-white'}`}>Contacto</a>
            
            <button 
              onClick={() => setIsReserveModalOpen(true)}
              className="px-5 py-2 bg-primary-burgundy text-white rounded-full font-semibold text-sm hover:scale-105 transition-all outline-none"
            >
              {T.reserveBtn.split(' ')[0]}
            </button>
          </nav>

          <button className="md:hidden" onClick={() => setIsMenuOpen(true)}>
             <MenuIcon className={scrolled ? 'text-gray-900' : 'text-white'} />
          </button>
        </div>
      </header>

      {/* Reservation Modal */}
      <AnimatePresence>
        {isReserveModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
            >
              <button 
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-900"
                onClick={() => setIsReserveModalOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
              
              <h3 className="text-2xl font-bold font-serif text-gray-900 mb-6 flex items-center gap-2">
                <Calendar className="text-primary-burgundy" /> Reservar Mesa
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Nombre</label>
                  <input 
                    type="text" 
                    placeholder="Tu nombre" 
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-burgundy outline-none"
                    value={reserveName}
                    onChange={(e) => setReserveName(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Fecha</label>
                    <input 
                      type="date" 
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl"
                      value={reserveDate}
                      onChange={(e) => setReserveDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Hora</label>
                    <input 
                      type="time" 
                      min="11:00"
                      max="22:30"
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl"
                      value={reserveTime}
                      onChange={(e) => setReserveTime(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Personas</label>
                  <select 
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl"
                    value={reservePeople}
                    onChange={(e) => setReservePeople(e.target.value)}
                  >
                    {[1,2,3,4,5,6,0].map(n => (
                      <option key={n} value={n === 0 ? '7+' : n}>{n === 0 ? 'Más de 6' : n} personas</option>
                    ))}
                  </select>
                </div>
                
                <button 
                  onClick={handleWhatsAppReserve}
                  className="w-full py-4 bg-green-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-600 transition-colors mt-6 shadow-lg shadow-green-200"
                >
                  <Phone className="w-5 h-5" /> Enviar por WhatsApp
                </button>
                <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest mt-4">Confirmación inmediata vía chat</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Updated Hero */}
        <section id="inicio" className="relative h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=2000" 
              alt="Bodega" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          
          <div className="container mx-auto px-4 z-10 text-white pt-20">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <div className="flex gap-2 mb-6">
                 {languages.map(l => (
                   <span key={l.code} className={`text-xs p-1 px-2 rounded-full border border-white/20 ${lang === l.code ? 'bg-primary-burgundy' : 'bg-white/5'}`}>{l.code.toUpperCase()}</span>
                 ))}
              </div>
              <h1 className="text-5xl md:text-8xl font-bold mb-6 leading-tight font-serif">
                {T.heroTitle}
              </h1>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl font-light">
                {T.heroSub}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setIsReserveModalOpen(true)}
                  className="px-8 py-5 bg-primary-burgundy text-white rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform"
                >
                  <Calendar className="w-6 h-6" />
                  {T.reserveBtn}
                </button>
                <a 
                  href="#carta"
                  className="px-8 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-white/20 transition-all font-sans"
                >
                  Explore menu
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Innovative Section: Virtual Sommelier */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="bg-primary-olive rounded-[3rem] p-8 md:p-16 text-white grid md:grid-cols-2 gap-12 items-center">
              <motion.div {...fadeIn}>
                <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
                  <Sparkles className="text-yellow-300 w-5 h-5" />
                  <span className="text-sm font-bold uppercase tracking-widest">{T.sommelier}</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold mb-6 italic">{T.sommelierSub}</h2>
                <p className="text-lg text-white/80 mb-8 leading-relaxed">
                  ¿No sabes qué vino elegir con tu Pasta Carbonara o tu Queso Asado Canario? Nuestro equipo te asesora para que la experiencia sea sublime.
                </p>
                <div className="space-y-4">
                  {[
                    { pair: "Tapas Canarias + Vino Blanco Gual", icon: <Wine /> },
                    { pair: "Pasta Italiana + Malvasía Volcánica", icon: <UtensilsCrossed /> },
                    { pair: "Vinos Tintos + Vetas de Queso Ahumado", icon: <CheckCircle2 /> }
                  ].map((p, i) => (
                    <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl hover:bg-white/10 transition-colors">
                      <div className="p-3 bg-white/20 rounded-xl">{p.icon}</div>
                      <span className="font-medium text-lg">{p.pair}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              <div className="relative">
                 <img 
                  src="https://images.unsplash.com/photo-1547595628-c61a29f496f0?auto=format&fit=crop&q=80&w=1000" 
                  alt="Wine selection" 
                  className="rounded-3xl shadow-2xl relative z-10"
                />
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary-burgundy/20 rounded-full blur-3xl z-0" />
              </div>
            </div>
          </div>
        </section>

        {/* Updated Specialty Section with Canarian/Italian Mix */}
        <section id="carta" className="py-24 bg-off-white">
          <div className="container mx-auto px-4 text-center mb-16">
            <motion.div {...fadeIn}>
              <h2 className="text-4xl md:text-6xl font-bold mb-4">{T.menuTitle}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">{T.menuSub}</p>
            </motion.div>
          </div>

          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { 
                name: "Trofie al Pesto", 
                tag: T.pairing.italian,
                img: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&q=80&w=800",
                desc: "Pasta artesanal italiana con albahaca fresca y piñones."
              },
              { 
                name: "Queso Asado con Mojo", 
                tag: T.pairing.tapas,
                img: "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&q=80&w=800",
                desc: "Auténtico queso palmero con mojos tradicionales canarios."
              },
              { 
                name: "Selección Craft Beer", 
                tag: T.pairing.beer,
                img: "https://images.unsplash.com/photo-1532635241-17e820acc59f?auto=format&fit=crop&q=80&w=800",
                desc: "Cervezas artesanales locales e internacionales."
              },
              { 
                name: "Lasagna Tradizionale", 
                tag: T.pairing.italian,
                img: "https://images.unsplash.com/photo-1560717845-968823efbee1?auto=format&fit=crop&q=80&w=800",
                desc: "Receta secreta de la nonna con carne seleccionada."
              },
              { 
                name: "Papas Arrugadas", 
                tag: T.pairing.tapas,
                img: "https://images.unsplash.com/photo-1596797038530-2c39bb8ed291?auto=format&fit=crop&q=80&w=800",
                desc: "El clásico canario con mojo picón y cilantro."
              },
              { 
                name: "Bodega de Autor", 
                tag: T.pairing.wine,
                img: "https://images.unsplash.com/photo-1506377247377-2a5b3b0ca3ef?auto=format&fit=crop&q=80&w=800",
                desc: "Vinos de Tenerife con DO Tacoronte-Acentejo."
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                {...fadeIn}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="h-64 overflow-hidden relative">
                   <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-primary-burgundy">
                     {item.tag}
                   </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3">{item.name}</h3>
                  <p className="text-gray-500 mb-6 line-clamp-2">{item.desc}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-primary-olive font-bold">12€ - 18€</span>
                    <button className="w-10 h-10 bg-off-white rounded-full flex items-center justify-center group-hover:bg-primary-burgundy group-hover:text-white transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Multilingual Experience banner */}
        <section className="py-12 bg-gray-900 overflow-hidden">
          <div className="flex whitespace-nowrap animate-infinite-scroll">
            {languages.concat(languages).map((l, i) => (
              <div key={i} className="flex items-center gap-4 mx-12">
                 <span className="text-4xl">{l.flag}</span>
                 <span className="text-white text-2xl font-serif font-bold uppercase tracking-wider">{l.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Contact/Footer */}
        <footer id="contacto" className="bg-gray-900 text-white pt-24 pb-12">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-4xl md:text-6xl font-serif font-bold mb-12">Tenerife + Italy = <span className="text-primary-olive">Love</span></h3>
            <div className="grid md:grid-cols-4 gap-8 text-left mb-24">
               <div>
                  <h4 className="text-gray-500 uppercase tracking-widest text-xs font-bold mb-6">Language</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {languages.map(l => (
                      <button key={l.code} onClick={() => setLang(l.code)} className={`text-sm ${lang === l.code ? 'text-white font-bold' : 'text-gray-500'}`}>
                        {l.flag} {l.name}
                      </button>
                    ))}
                  </div>
               </div>
               <div>
                  <h4 className="text-gray-500 uppercase tracking-widest text-xs font-bold mb-6">Visit</h4>
                  <p className="text-lg">Rambla de los Menceyes, s/n</p>
                  <p className="text-gray-400">38530 Candelaria, Tenerife</p>
               </div>
               <div>
                  <h4 className="text-gray-500 uppercase tracking-widest text-xs font-bold mb-6">Talk</h4>
                  <p className="text-lg font-bold">+34 613 97 64 65</p>
                  <p className="text-gray-400">WhatsApp for bookings</p>
               </div>
               <div>
                  <h4 className="text-gray-500 uppercase tracking-widest text-xs font-bold mb-6">Schedule</h4>
                  <p className="text-lg">11:00 — 22:30</p>
                  <p className="text-primary-burgundy font-bold">Mon & Tue Closed</p>
               </div>
            </div>
            <p className="text-gray-700 text-sm">© {new Date().getFullYear()} La Bodeguita Candelaria. Made with ❤️ in Tenerife.</p>
          </div>
        </footer>
      </main>

      <style>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          display: flex;
          width: max-content;
          animation: infinite-scroll 40s linear infinite;
        }
      `}</style>
    </div>
  );
}
