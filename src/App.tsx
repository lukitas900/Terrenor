import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Header, Footer } from './components';
import {
  Home,
  Players,
  PlayerDetail,
  Races,

  RaceDetail,
  Spells,
  SpellDetail,
  Religions,
  Items,
  ItemDetail,
  Map,
  Tabletop,
  KingdomDetail,
  Tales,
  CharacterDetail
} from './pages';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const { pathname } = useLocation();
  const hideFooter = pathname === '/tabuleiro';

  return (
    <div className="min-h-screen bg-[#0a0a0a] bg-gradient-to-b from-transparent via-[#1a0b2e]/10 to-[#0a0a0a] grain-overlay">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jogadores" element={<Players />} />
          <Route path="/jogadores/:id" element={<PlayerDetail />} />
          <Route path="/racas" element={<Races />} />

          <Route path="/racas/:id" element={<RaceDetail />} />
          <Route path="/magias" element={<Spells />} />
          <Route path="/magias/:id" element={<SpellDetail />} />
          <Route path="/religioes" element={<Religions />} />
          <Route path="/itens" element={<Items />} />
          <Route path="/itens/:id" element={<ItemDetail />} />
          <Route path="/mapa" element={<Map />} />
          <Route path="/reinos/:id" element={<KingdomDetail />} />
          <Route path="/contos" element={<Tales />} />
          <Route path="/contos/:id" element={<CharacterDetail />} />
          <Route path="/tabuleiro" element={<Tabletop />} />
        </Routes>
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
