/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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
  Navigation
} from 'lucide-react';
import { useState, useEffect } from 'react';

const WHATSAPP_NUMBER = "34613976465";
const WHATSAPP_MSG = encodeURIComponent(
  `Hola, me gustaría hacer una reserva en La Bodeguita.
Fecha: [Insertar DD/MM/AAAA]
Horario: [Insertar HH:MM - Rango de 11:00 a 22:30]
Número de personas: [Insertar número]
Nombre del cliente: [Insertar nombre]
Solicitud especial (opcional): [Insertar texto]`
);

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

const NAV_ITEMS = [
  { name: 'Inicio', href: '#inicio' },
  { name: 'Sobre Nosotros', href: '#sobre-nosotros' },
  { name: 'Carta', href: '#carta' },
  { name: 'Galería', href: '#galeria' },
  { name: 'Contacto', href: '#contacto' },
];

const STAR_DISHES = [
  {
    name: "Tapas Auténticas",
    description: "Variedad de sabores canarios y mediterráneos.",
    image: "https://images.unsplash.com/photo-1515443961218-1223b2d1064f?auto=format&fit=crop&q=80&w=800",
    category: "Nuestras Tapas"
  },
  {
    name: "Platos Mediterráneos",
    description: "Cocina internacional con toque local.",
    image: "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&q=80&w=800",
    category: "Platos"
  },
  {
    name: "Desayunos Especiales",
    description: "Para empezar el día con energía frente al mar.",
    image: "https://images.unsplash.com/photo-1496042399014-17f26f07b19c?auto=format&fit=crop&q=80&w=800",
    category: "Desayunos"
  },
  {
    name: "Selección de Vinos",
    description: "Los mejores caldos de la tierra y más.",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800",
    category: "Enoteca"
  }
];

const REVIEWS = [
  { name: "Andrés G.", comment: "Comida espectacular y servicio excelente. Las mejores tapas de la zona sin duda.", rating: 5 },
  { name: "Lucía M.", comment: "Ambiente muy agradable y acogedor. Los desayunos son increíbles.", rating: 5 },
  { name: "Carlos R.", comment: "Una joya en Candelaria. Selección de vinos canarios de primer nivel.", rating: 5 },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-off-white selection:bg-primary-burgundy/30">
      {/* WhatsApp Fixed Button */}
      <motion.a 
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="sticky-whatsapp-btn"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Phone className="w-6 h-6 mr-2" />
        <span className="font-semibold text-sm">Reservar</span>
      </motion.a>

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

          <nav className="hidden md:flex gap-8 items-center">
            {NAV_ITEMS.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className={`font-medium transition-colors hover:text-primary-olive ${scrolled ? 'text-gray-700' : 'text-white'}`}
              >
                {item.name}
              </a>
            ))}
            <a 
              href={WHATSAPP_URL} 
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-primary-burgundy text-white rounded-full font-semibold text-sm flex items-center gap-2 hover:bg-opacity-90 transition-all"
            >
              Reservar
            </a>
          </nav>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className={scrolled ? 'text-gray-900' : 'text-white'} /> : <MenuIcon className={scrolled ? 'text-gray-900' : 'text-white'} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <button className="absolute top-6 right-4" onClick={() => setIsMenuOpen(false)}>
              <X className="w-8 h-8 text-gray-900" />
            </button>
            {NAV_ITEMS.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className="text-2xl font-serif font-bold text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <a 
              href={WHATSAPP_URL}
              className="mt-4 px-8 py-4 bg-primary-burgundy text-white rounded-full font-bold text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Reservar por WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section id="inicio" className="relative h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=2000" 
              alt="Plato estrella La Bodeguita" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          
          <div className="container mx-auto px-4 z-10 text-white pt-20">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <h2 className="text-primary-olive font-sans font-bold tracking-widest uppercase text-sm mb-4">Candelaria, Tenerife</h2>
              <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
                La Bodeguita: Sabor y Tradición en el <span className="text-primary-burgundy">Corazón</span> de Candelaria.
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl font-light">
                Cocina internacional, tapas auténticas y los mejores vinos canarios. Disfruta de un ambiente acogedor de 11:00 a 22:30.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-primary-burgundy text-white rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform"
                >
                  <Calendar className="w-5 h-5" />
                  RESERVAR POR WHATSAPP
                </a>
                <a 
                  href="#carta"
                  className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-white/20 transition-all"
                >
                  Ver la Carta
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block"
          >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-white rounded-full" />
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="sobre-nosotros" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div {...fadeIn}>
                <img 
                  src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1200" 
                  alt="Interior de La Bodeguita" 
                  className="rounded-3xl shadow-2xl border-4 border-off-white"
                />
              </motion.div>
              <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
                <span className="text-warm-wood font-bold uppercase tracking-widest text-sm block mb-4">Nuestra Historia</span>
                <h2 className="text-3xl md:text-5xl font-bold mb-8 text-gray-900">Pasión por la Cocina <span className="text-primary-burgundy italic">Familiar</span></h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Somos una tasca familiar ubicada en la Rambla de los Menceyes de Candelaria. Te invitamos a descubrir una selección única de tapas, vinos canarios y platos mediterráneos en un ambiente acogedor.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Ideal para comidas de grupo, cenas románticas o un buen desayuno frente al mar. En La Bodeguita cada plato cuenta una historia de tradición y frescura.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-primary-olive w-6 h-6" />
                    <span className="font-medium">Vinos Locales</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-primary-olive w-6 h-6" />
                    <span className="font-medium">Huerta Canaria</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-primary-olive w-6 h-6" />
                    <span className="font-medium">Selección Gourmet</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-primary-olive w-6 h-6" />
                    <span className="font-medium">Espíritu Mediterráneo</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Menu Section */}
        <section id="carta" className="py-24 bg-off-white">
          <div className="container mx-auto px-4 text-center mb-16">
            <motion.div {...fadeIn}>
              <h2 className="text-4xl md:text-6xl font-bold mb-4">Lo que nos hace <span className="text-primary-burgundy">Únicos</span></h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Una muestra visual de nuestra cocina internacional y selección de vinos. Calidad y sabor en cada bocado (Precio medio: 10-20€/p).
              </p>
            </motion.div>
          </div>

          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STAR_DISHES.map((dish, idx) => (
              <motion.div 
                key={idx}
                {...fadeIn}
                transition={{ delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-lg cursor-pointer"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img 
                    src={dish.image} 
                    alt={dish.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
                  <span className="text-primary-olive font-bold text-xs uppercase tracking-widest mb-2 bg-white/90 px-3 py-1 rounded-full w-fit">
                    {dish.category}
                  </span>
                  <h3 className="text-2xl text-white font-bold mb-2">{dish.name}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity">
                    {dish.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Features / Icons */}
        <section className="py-16 bg-white border-y border-gray-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
              <motion.div {...fadeIn} className="text-center">
                <div className="w-16 h-16 bg-primary-burgundy/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <UtensilsCrossed className="text-primary-burgundy w-8 h-8" />
                </div>
                <h4 className="font-bold text-lg mb-2">Tapas</h4>
                <p className="text-gray-500 text-sm">Fusión internacional</p>
              </motion.div>
              <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="text-center">
                <div className="w-16 h-16 bg-primary-olive/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Wine className="text-primary-olive w-8 h-8" />
                </div>
                <h4 className="font-bold text-lg mb-2">Enoteca</h4>
                <p className="text-gray-500 text-sm">Vinos de selección</p>
              </motion.div>
              <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="text-center">
                <div className="w-16 h-16 bg-warm-wood/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Coffee className="text-warm-wood w-8 h-8" />
                </div>
                <h4 className="font-bold text-lg mb-2">Desayunos</h4>
                <p className="text-gray-500 text-sm">Comienza el día</p>
              </motion.div>
              <motion.div {...fadeIn} transition={{ delay: 0.3 }} className="text-center">
                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Star className="text-blue-500 w-8 h-8" />
                </div>
                <h4 className="font-bold text-lg mb-2">Ambiente</h4>
                <p className="text-gray-500 text-sm">Acogedor y familiar</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="py-24 bg-primary-burgundy text-white overflow-hidden">
          <div className="container mx-auto px-4 text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Lo que dicen de <span className="text-primary-olive">Nosotros</span></h2>
            <div className="flex justify-center gap-1 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 font-bold text-lg">4.5/5</span>
            </div>
          </div>

          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {REVIEWS.map((review, idx) => (
                <motion.div 
                  key={idx}
                  {...fadeIn}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl border border-white/20 flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex gap-1 mb-6">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-white text-white" />
                      ))}
                    </div>
                    <p className="text-lg italic mb-6 leading-relaxed">"{review.comment}"</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center font-bold text-sm">
                      {review.name[0]}
                    </div>
                    <span className="font-bold">{review.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <a 
                href="https://www.google.com/search?q=La+Bodeguita+Candelaria+resenas" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
              >
                Ver más reseñas en Google <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Gallery / Instagram Section */}
        <section id="galeria" className="py-24 bg-white text-center">
          <div className="container mx-auto px-4 mb-16">
            <h2 className="text-4xl font-bold mb-4">Nuestro Mundo en <span className="text-primary-olive">Instagram</span></h2>
            <p className="text-gray-500">Síguenos en @labodeguitacandelaria para no perderte nada.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 px-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="aspect-square bg-gray-100 overflow-hidden relative group">
                <img 
                  src={`https://images.unsplash.com/photo-${1500000000000 + i}?auto=format&fit=crop&q=80&w=600`} 
                  alt="Gallery" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=600";
                  }}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Instagram className="text-white w-8 h-8" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <a 
              href="https://instagram.com/labodeguitacandelaria" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-primary-burgundy text-primary-burgundy rounded-full font-bold hover:bg-primary-burgundy hover:text-white transition-all inline-flex items-center gap-2"
            >
              <Instagram className="w-5 h-5" />
              SÍGUENOS EN INSTAGRAM
            </a>
          </div>
        </section>

        {/* Footer / Contact */}
        <footer id="contacto" className="bg-gray-900 text-white pt-24 pb-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-16 mb-24">
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-primary-burgundy rounded-full flex items-center justify-center text-white font-serif font-bold text-2xl">LB</div>
                  <h3 className="text-2xl font-bold font-serif">La Bodeguita</h3>
                </div>
                <p className="text-gray-400 mb-8 max-w-xs">
                  Sabor y tradición en el corazón de Candelaria. Una tasca familiar donde la cocina internacional se encuentra con el alma canaria.
                </p>
                <div className="flex gap-4">
                  <a href="https://instagram.com/labodeguitacandelaria" className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href={WHATSAPP_URL} className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all">
                    <Phone className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-8">Ubicación y Horarios</h3>
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <MapPin className="text-primary-olive shrink-0 w-6 h-6" />
                    <span className="text-gray-400">Rambla de los Menceyes, s/n, 38530 Candelaria, Santa Cruz de Tenerife.</span>
                  </li>
                  <li className="flex gap-4">
                    <Clock className="text-primary-olive shrink-0 w-6 h-6" />
                    <div>
                      <p className="text-white font-medium">Miércoles a Domingo</p>
                      <p className="text-gray-400">11:00 - 22:30</p>
                      <p className="text-primary-burgundy font-medium mt-2">Lunes y Martes - Cerrado</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-8">Contacto Rápido</h3>
                <div className="space-y-4">
                  <a href="tel:+34613976465" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-primary-burgundy/20 transition-all">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest">Llamar directo</p>
                      <p className="font-bold">+34 613 97 64 65</p>
                    </div>
                  </a>
                  <a href={WHATSAPP_URL} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-green-500/20 transition-all">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest">Reservar Mesa</p>
                      <p className="font-bold">Chat WhatsApp</p>
                    </div>
                  </a>
                  <a 
                    href="https://www.google.com/maps/dir/?api=1&destination=Rambla+de+los+Menceyes+Candelaria" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-blue-500/20 transition-all">
                      <Navigation className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest">Guíame</p>
                      <p className="font-bold text-blue-400 uppercase text-xs tracking-widest">📌 Cómo llegar</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} La Bodeguita Candelaria. Todos los derechos reservados.
              </p>
              <div className="flex gap-8 text-sm text-gray-500">
                <a href="#" className="hover:text-white transition-colors">Aviso Legal</a>
                <a href="#" className="hover:text-white transition-colors">Privacidad</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
