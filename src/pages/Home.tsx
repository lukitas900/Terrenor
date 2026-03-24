import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import {
  Sword, Sparkles, BookOpen, Package, Map,
  ChevronRight, Users, Castle, Scroll, MapPin, Crown
} from 'lucide-react';
import { races } from '../data/races';
import { kingdoms } from '../data/kingdoms';
import { characters } from '../data/characters';

const features = [
  {
    title: 'Raças',
    description: 'Conheça as diversas raças de Terrenor, desde as jogáveis até as divindades e criaturas míticas.',
    icon: Sword,
    to: '/racas',
    color: '#22c55e',
    stats: '23+ Raças',
  },
  {
    title: 'Magias',
    description: 'Explore o vasto grimório de magias: suporte, dano, anti-suporte e as raras encontráveis.',
    icon: Sparkles,
    to: '/magias',
    color: '#9d4edd',
    stats: '40+ Magias',
  },
  {
    title: 'Religiões',
    description: 'Descubra as crenças e dogmas que movem os povos de Terrenor.',
    icon: BookOpen,
    to: '/religioes',
    color: '#c9a227',
    stats: '5 Fés',
  },
  {
    title: 'Itens',
    description: 'Armas, armaduras, pedras mágicas e artefatos lendários esperam por você.',
    icon: Package,
    to: '/itens',
    color: '#ef4444',
    stats: '50+ Itens',
  },
  {
    title: 'Mapa',
    description: 'Explore o continente de Terrenor e seus reinos.',
    icon: Map,
    to: '/mapa',
    color: '#3b82f6',
    stats: '12 Reinos',
  },
];

export function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      jogavel: '#22c55e',
      deus: '#c9a227',
      mitologica: '#ef4444',
      extinta: '#6b7280',
    };
    return colors[category] || '#9d4edd';
  };

  const featuredRaces = races.slice(0, 10);
  const featuredKingdoms = kingdoms.slice(0, 6);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-title',
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out', delay: 0.5 }
      );

      gsap.fromTo('.hero-subtitle',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 1 }
      );

      gsap.fromTo('.hero-cta',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.7)', delay: 1.5 }
      );

      gsap.fromTo('.feature-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.features-grid',
            start: 'top 80%',
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen pt-0 pb-12">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/hero-bg.jpg"
            alt="Terrenor Landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-transparent to-[#0a0a0a]/80" />
        </div>

        {/* Rune Ring Decoration */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] md:w-[800px] md:h-[800px] border border-[#9d4edd]/20 rounded-full animate-rotate-slow" />
          <div className="absolute w-[250px] h-[250px] sm:w-[450px] sm:h-[450px] md:w-[700px] md:h-[700px] border border-[#c9a227]/10 rounded-full animate-rotate-slow" style={{ animationDirection: 'reverse', animationDuration: '90s' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4">
          <h1
            className="hero-title text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-glow mb-4"
            style={{ fontFamily: 'Cinzel Decorative, serif' }}
          >
            TERRENOR
          </h1>
          <p className="hero-subtitle text-lg sm:text-xl md:text-2xl text-[#e0e0e0]/80 mb-8 tracking-widest">
            Um Mundo Forjado nas Sombras
          </p>
          <Link
            to="/mapa"
            className="hero-cta inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#2d1b4e] to-[#4a2c7a] rounded-lg text-[#e0e0e0] font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(157,78,221,0.4)]"
          >
            Entrar no Reino
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#9d4edd]/40 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${4 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] via-[#1a0b2e]/30 to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 px-4">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 gradient-text"
              style={{ fontFamily: 'Cinzel Decorative, serif' }}
            >
              Explore Terrenor
            </h2>
            <p className="text-lg text-[#e0e0e0]/70 max-w-2xl mx-auto">
              Descubra todos os segredos do continente, desde suas raças até seus artefatos mais poderosos.
            </p>
          </div>

          <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.to}
                className="feature-card group p-6 bg-[#1a0b2e]/50 rounded-xl border border-[#2d1b4e]/50 transition-all duration-300 hover:border-[#9d4edd]/50 hover:shadow-[0_0_30px_rgba(157,78,221,0.2)]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="p-3 rounded-lg transition-colors"
                    style={{ backgroundColor: `${feature.color}20` }}
                  >
                    <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                  </div>
                  <span
                    className="text-xs font-medium px-2 py-1 rounded"
                    style={{
                      backgroundColor: `${feature.color}20`,
                      color: feature.color
                    }}
                  >
                    {feature.stats}
                  </span>
                </div>

                <h3
                  className="text-xl font-bold text-[#e0e0e0] mb-2 group-hover:text-[#9d4edd] transition-colors"
                  style={{ fontFamily: 'Cinzel Decorative, serif' }}
                >
                  {feature.title}
                </h3>

                <p className="text-[#e0e0e0]/60 text-sm">
                  {feature.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '23+', label: 'Raças', icon: Users },
              { value: '40+', label: 'Magias', icon: Scroll },
              { value: '50+', label: 'Itens', icon: Package },
              { value: '12', label: 'Reinos', icon: Castle },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-[#1a0b2e]/30 rounded-xl border border-[#2d1b4e]/30"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-[#9d4edd]" />
                <div
                  className="text-3xl font-bold text-[#c9a227] mb-1"
                  style={{ fontFamily: 'Cinzel Decorative, serif' }}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-[#e0e0e0]/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* MUNDO DE TERRENOR SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#2d1b4e]/50 bg-gradient-to-b from-[#0a0a0a] to-transparent">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          {/* Text Left */}
          <div className="lg:w-1/2">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-[#e0e0e0]"
              style={{ fontFamily: 'Cinzel Decorative, serif' }}
            >
              O MUNDO DE <br className="hidden sm:block" /> <span className="text-[#9d4edd]">TERRENOR</span>
            </h2>
            <p className="text-[#e0e0e0]/70 mb-4 leading-relaxed">
              Um continente marcado por guerras anciãs, onde a magia flui como rios e o perigo espreita em cada sombra. Dos picos imponentes de Arvandor às profundezas das catacumbas de Grimfort, aventuras aguardam aqueles corajosos o suficiente para buscá-las.
            </p>
            <p className="text-[#e0e0e0]/70 mb-8 leading-relaxed">
              Os reinos de Terrenor mantêm relações neutras, evitando conflitos através de rotas comerciais que beneficiam a todos. Mas nem tudo é paz — vilas isoladas, cavernas inexploradas e monstros nunca antes vistos aguardam os aventureiros.
            </p>
          </div>
          {/* Map Image Right */}
          <div className="lg:w-1/2 relative mt-8 lg:mt-0">
            <div className="absolute inset-0 bg-[#c9a227] blur-[100px] opacity-20" />
            <div className="rounded-xl overflow-hidden border-[1px] border-[#c9a227]/40 shadow-[0_0_40px_rgba(201,162,39,0.15)] relative z-10 w-full transition-transform duration-500 hover:scale-[1.02]">
              <img src="/map-of-terrenor.png" alt="Map of Terrenor" className="w-full h-auto block" />
            </div>
          </div>
        </div>
      </section>

      {/* RAÇAS DE TERRENOR SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-[#1a0b2e]/30 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-3xl sm:text-4xl font-bold mb-4 gradient-text"
              style={{ fontFamily: 'Cinzel Decorative, serif' }}
            >
              RAÇAS DE TERRENOR
            </h2>
            <p className="text-[#e0e0e0]/70 max-w-2xl mx-auto">
              Do nobre Draconato ao misterioso Silvis, cada raça traz sua própria história, cultura e magia para o mundo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {featuredRaces.map((race) => (
              <Link
                key={race.id}
                to={`/racas/${race.id}`}
                className="group bg-[#1a0b2e]/50 rounded-xl overflow-hidden border border-[#2d1b4e]/50 transition-all duration-300 hover:border-[#9d4edd]/50 hover:shadow-[0_0_30px_rgba(157,78,221,0.2)] relative min-h-[360px] flex flex-col"
              >
                {race.image && (
                  <div className="absolute inset-0 z-0">
                    <img
                      src={race.image}
                      alt={race.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
                  </div>
                )}

                <div className={`relative z-10 p-5 mt-auto flex flex-col ${!race.image ? 'h-full' : ''}`}>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3
                      className="text-lg font-bold text-[#e0e0e0] group-hover:text-[#9d4edd] transition-colors"
                      style={{ fontFamily: 'Cinzel Decorative, serif' }}
                    >
                      {race.name}
                    </h3>
                  </div>
                  <p className="text-[#e0e0e0]/60 text-xs line-clamp-2 mt-1 mb-2">
                    {race.description}
                  </p>

                  {/* Category Badge that also serves as icon logic if we want */}
                  <span
                    className="self-start px-2 py-1 rounded text-[10px] font-medium shrink-0 mt-1 mb-2"
                    style={{
                      backgroundColor: `${getCategoryColor(race.category)}20`,
                      color: getCategoryColor(race.category),
                      border: `1px solid ${getCategoryColor(race.category)}40`
                    }}
                  >
                    {race.categoryLabel}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/racas"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#9d4edd]/50 rounded-lg text-[#e0e0e0] font-medium transition-all duration-300 hover:bg-[#9d4edd]/10 hover:shadow-[0_0_20px_rgba(157,78,221,0.2)]"
            >
              Ver todas as raças
            </Link>
          </div>
        </div>
      </section>

      {/* REINOS E CIDADES SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-3xl sm:text-4xl font-bold mb-4 gradient-text"
              style={{ fontFamily: 'Cinzel Decorative, serif' }}
            >
              REINOS & CIDADES
            </h2>
            <p className="text-[#e0e0e0]/70 max-w-2xl mx-auto">
              Cada reino possui sua própria cultura, governo e segredos. Explore as maravilhas e perigos de Terrenor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredKingdoms.map((kingdom, idx) => (
              <Link
                key={idx}
                to={`/mapa`}
                className="group block bg-[#1a0b2e]/50 rounded-xl overflow-hidden border border-[#2d1b4e]/50 transition-all duration-300 hover:border-[#9d4edd]/50 hover:shadow-[0_0_30px_rgba(157,78,221,0.2)]"
              >
                {kingdom.image ? (
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={kingdom.image}
                      alt={kingdom.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-[#2d1b4e]/20 flex items-center justify-center">
                    <Castle className="w-12 h-12 text-[#9d4edd]/30" />
                  </div>
                )}

                <div className="p-5">
                  <h3
                    className="text-xl font-bold text-[#e0e0e0] group-hover:text-[#9d4edd] transition-colors mb-2"
                    style={{ fontFamily: 'Cinzel Decorative, serif' }}
                  >
                    {kingdom.name}
                  </h3>

                  <p className="text-[#e0e0e0]/60 text-sm line-clamp-2 mb-4">
                    {kingdom.description}
                  </p>

                  <div className="pt-3 flex items-center gap-2">
                    <Crown className="w-4 h-4 text-[#c9a227]" />
                    <span className="text-xs text-[#c9a227]/90">{kingdom.leader}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/mapa"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#9d4edd]/50 rounded-lg text-[#e0e0e0] font-medium transition-all duration-300 hover:bg-[#9d4edd]/10 hover:shadow-[0_0_20px_rgba(157,78,221,0.2)]"
            >
              Explorar Mapa Interativo
            </Link>
          </div>
        </div>
      </section>

      {/* FIGURAS NOTÁVEIS SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-[#1a0b2e]/30 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-3xl sm:text-4xl font-bold mb-4 gradient-text"
              style={{ fontFamily: 'Cinzel Decorative, serif' }}
            >
              FIGURAS NOTÁVEIS
            </h2>
            <p className="text-[#e0e0e0]/70 max-w-2xl mx-auto">
              Líderes, heróis e lendas que moldaram a história de Terrenor.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {characters.filter(char => char.type === 'notavel').slice(0, 8).map((char) => (
              <div
                key={char.id}
                className="group bg-[#1a0b2e]/50 rounded-xl overflow-hidden border border-[#2d1b4e]/50 transition-all duration-300 hover:border-[#c9a227]/50 hover:shadow-[0_0_30px_rgba(201,162,39,0.2)] relative min-h-[440px] flex flex-col"
              >
                {char.image && (
                  <div className="absolute inset-0 z-0">
                    <img
                      src={char.image}
                      alt={char.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />
                  </div>
                )}

                <div className="relative z-10 p-5 mt-auto flex flex-col backdrop-blur-[2px]">
                  <h3
                    className="text-2xl font-bold text-[#e0e0e0] group-hover:text-[#c9a227] transition-colors mb-1"
                    style={{ fontFamily: 'Cinzel Decorative, serif' }}
                  >
                    {char.name}
                  </h3>
                  <p className="text-[#c9a227] text-sm font-medium mb-3">
                    {char.title}
                  </p>
                  <p className="text-[#e0e0e0]/70 text-sm line-clamp-4">
                    {char.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-[#2d1b4e]/30 bg-gradient-to-b from-transparent to-[#0d0d12]/50">
        <div className="max-w-7xl mx-auto text-center">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4 gradient-text"
            style={{ fontFamily: 'Cinzel Decorative, serif' }}
          >
            ATLAS DE TERRENOR
          </h2>
          <p className="text-[#e0e0e0]/70 max-w-2xl mx-auto mb-12">
            Explore o continente e descubra os segredos de cada região.
          </p>

          <div className="relative rounded-2xl overflow-hidden border-[1px] border-[#c9a227]/30 shadow-[0_0_50px_rgba(201,162,39,0.15)] block w-full bg-[#0a0a0a]">
            <Link to="/mapa" className="block relative group overflow-hidden">
              <img src="/map-of-terrenor.png" alt="Atlas de Terrenor" className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-[#0a0a0a]/40 group-hover:bg-[#0a0a0a]/10 transition-colors flex items-center justify-center backdrop-blur-[2px] group-hover:backdrop-blur-none">
                <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <span className="px-8 py-4 bg-[#0a0a0a]/95 text-[#e0e0e0] font-bold tracking-widest border border-[#c9a227]/50 rounded-lg flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-[#c9a227]" />
                    ABRIR MAPA INTERATIVO
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
