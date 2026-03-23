import { useParams, Link } from 'react-router-dom';
import { characters } from '../data/characters';
import { ArrowLeft, Scroll } from 'lucide-react';

export function CharacterDetail() {
  const { id } = useParams<{ id: string }>();
  const character = characters.find(c => c.id === id);

  if (!character) {
    return (
      <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#e0e0e0] mb-4">Mito ou Figura Notável não encontrado</h1>
          <Link to="/contos" className="text-[#9d4edd] hover:underline">
            Voltar para Contos
          </Link>
        </div>
      </div>
    );
  }

  const isMyth = character.type === 'mito';

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link 
          to="/contos"
          className="inline-flex items-center gap-2 text-[#e0e0e0]/60 hover:text-[#9d4edd] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para Contos
        </Link>

        {/* Content Section */}
        <div className="bg-[#1a0b2e]/50 rounded-2xl border border-[#2d1b4e]/50 overflow-hidden mb-8 grid md:grid-cols-12 gap-0 shadow-lg shadow-[#0a0a0a]">
          
          {character.image && (
             <div className="md:col-span-5 relative min-h-[400px] md:min-h-full bg-[#0a0514]">
                <img 
                  src={character.image} 
                  alt={character.name}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0b2e]/90 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#1a0b2e]/90" />
             </div>
          )}

          <div className={`p-8 md:p-10 flex flex-col justify-center ${character.image ? 'md:col-span-7' : 'md:col-span-12'}`}>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Scroll className="w-6 h-6 text-[#c9a227]" />
                <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${isMyth ? 'bg-[#9d4edd]/20 text-[#9d4edd] border-[#9d4edd]/30' : 'bg-[#c9a227]/20 text-[#c9a227] border-[#c9a227]/30'}`}>
                  {isMyth ? 'Mito' : 'Notável'}
                </span>
              </div>
              <h1 
                className="text-4xl md:text-5xl font-bold text-[#e0e0e0] mb-3 drop-shadow-md"
                style={{ fontFamily: 'Cinzel Decorative, serif' }}
              >
                {character.name}
              </h1>
              <p className="text-xl text-[#c9a227] font-medium drop-shadow-sm">
                {character.title}
              </p>
            </div>

            <div className="bg-[#0a0a0a]/60 p-6 rounded-xl border border-[#2d1b4e]/50 shadow-md">
              <h2 
                className="text-2xl font-bold text-[#e0e0e0] mb-4"
                style={{ fontFamily: 'Cinzel Decorative, serif' }}
              >
                História e Lendas
              </h2>
              <div className="space-y-4">
                {(character as any).fullDescription ? (
                  (character as any).fullDescription.split('\n').map((paragraph: string, i: number) => (
                    <p key={i} className="text-[#e0e0e0]/90 text-lg leading-relaxed text-justify">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p className="text-[#e0e0e0]/90 text-lg leading-relaxed text-justify">
                    {character.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
