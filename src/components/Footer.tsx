import { BookOpen } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#2d1b4e]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h3 
              className="text-2xl font-bold gradient-text mb-2"
              style={{ fontFamily: 'Cinzel Decorative, serif' }}
            >
              TERRENOR
            </h3>
            <p className="text-[#e0e0e0]/60 text-sm">
              Um mundo de fantasia sombria e magia ancestral.
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <BookOpen className="w-5 h-5 text-[#9d4edd]" />
            <span className="text-[#e0e0e0]/60 text-sm">
              © 2026 Terrenor. Todos os direitos reservados.
            </span>
          </div>
        </div>
        
        {/* Rune Decoration */}
        <div className="mt-8 flex justify-center">
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#9d4edd]/50 to-transparent" />
        </div>
      </div>
    </footer>
  );
}
