import { useState } from 'react';
import { Search, Scroll, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { characters } from '../data/characters';

export function Tales() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCharacters = characters.filter((char) => {
        const term = searchTerm.toLowerCase();
        return (
            char.name.toLowerCase().includes(term) ||
            char.title.toLowerCase().includes(term) ||
            char.description.toLowerCase().includes(term)
        );
    });

    const notaveis = filteredCharacters.filter(char => char.type === 'notavel');
    const mitos = filteredCharacters.filter(char => char.type === 'mito');

    const renderCard = (char: typeof characters[0]) => (
        <Link
            to={`/contos/${char.id}`}
            key={char.id}
            className="group bg-[#1a0b2e]/50 rounded-xl overflow-hidden border border-[#2d1b4e]/50 transition-all duration-300 hover:border-[#c9a227]/50 hover:shadow-[0_0_30px_rgba(201,162,39,0.2)] relative min-h-[440px] flex flex-col block"
        >
            {char.image && (
                <div className="absolute inset-0 z-0">
                    <img
                        src={char.image}
                        alt={char.name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-[#0a0a0a]/10" />
                </div>
            )}

            <div className={`relative z-10 p-5 mt-auto flex flex-col backdrop-blur-[2px] ${!char.image ? 'h-full' : ''}`}>
                <div className="mb-2">
                    <Scroll className="w-5 h-5 text-[#c9a227]/60 mb-2" />
                    <h3
                        className="text-xl md:text-2xl font-bold text-[#e0e0e0] group-hover:text-[#c9a227] transition-colors mb-1 shadow-black drop-shadow-md"
                        style={{ fontFamily: 'Cinzel Decorative, serif' }}
                    >
                        {char.name}
                    </h3>
                </div>

                <p className="inline-block px-3 py-1 bg-[#c9a227]/20 border border-[#c9a227]/30 rounded-lg text-[#c9a227] text-xs font-semibold mb-4 w-max shadow-black drop-shadow-md">
                    {char.title}
                </p>
                <div className="bg-[#0a0a0a]/60 p-3 rounded-lg border border-[#2d1b4e]/50 flex-1">
                    <p className="text-[#e0e0e0]/90 text-sm leading-relaxed drop-shadow-sm">
                        {char.description}
                    </p>
                </div>
            </div>
        </Link>
    );

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            {/* Background with slight magical feel */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#1a0b2e]/30 to-[#0a0a0a]" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#c9a227]/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#9d4edd]/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <h1
                        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 gradient-text"
                        style={{ fontFamily: 'Cinzel Decorative, serif' }}
                    >
                        Contos de Terrenor
                    </h1>
                    <p className="text-lg text-[#e0e0e0]/70 max-w-2xl mx-auto mb-8">
                        Figuras notáveis, folclore, mitos e lendas que ecoam pelas tavernas e palácios do continente.
                    </p>

                    {/* Search */}
                    <div className="relative max-w-xl mx-auto">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-[#e0e0e0]/50" />
                        </div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-11 pr-4 py-3 bg-[#1a0b2e]/50 border border-[#2d1b4e]/50 rounded-xl text-[#e0e0e0] placeholder-[#e0e0e0]/50 focus:outline-none focus:ring-2 focus:ring-[#c9a227]/50 focus:border-transparent transition-all"
                            placeholder="Buscar por nome, título ou palavra-chave..."
                        />
                    </div>
                </div>

                {filteredCharacters.length === 0 ? (
                    <div className="text-center py-20">
                        <Sparkles className="w-12 h-12 text-[#9d4edd]/30 mx-auto mb-4" />
                        <p className="text-xl text-[#e0e0e0]/50 font-medium" style={{ fontFamily: 'Cinzel Decorative, serif' }}>
                            Nenhuma lenda encontrada nos arquivos.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-16">
                        {/* Figuras Notáveis Section */}
                        {notaveis.length > 0 && (
                            <section>
                                <div className="border-b border-[#2d1b4e]/50 pb-4 mb-8">
                                    <h2
                                        className="text-3xl font-bold text-[#e0e0e0]"
                                        style={{ fontFamily: 'Cinzel Decorative, serif' }}
                                    >
                                        Figuras Notáveis
                                    </h2>
                                    <p className="text-[#e0e0e0]/60 mt-2">
                                        Líderes, magos e heróis que deixaram sua marca física na história escrita de Terrenor.
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {notaveis.map(renderCard)}
                                </div>
                            </section>
                        )}

                        {/* Mitos e Folclores Section */}
                        {mitos.length > 0 && (
                            <section>
                                <div className="border-b border-[#2d1b4e]/50 pb-4 mb-8">
                                    <h2
                                        className="text-3xl font-bold text-[#c9a227]"
                                        style={{ fontFamily: 'Cinzel Decorative, serif' }}
                                    >
                                        Mitos & Folclore
                                    </h2>
                                    <p className="text-[#e0e0e0]/60 mt-2">
                                        Entidades lendárias, seitas e artefatos dos quais a veracidade se perdeu nas fábulas do tempo.
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {mitos.map(renderCard)}
                                </div>
                            </section>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
