import { useParams, Link } from 'react-router-dom';
import { kingdoms } from '../data/kingdoms';
import { ArrowLeft, Crown, Scroll, MapPin } from 'lucide-react';

export function KingdomDetail() {
    const { id } = useParams<{ id: string }>();
    const kingdom = kingdoms.find(k => k.id === id);

    if (!kingdom) {
        return (
            <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-[#e0e0e0] mb-4">Reino não encontrado</h1>
                    <Link to="/mapa" className="text-[#9d4edd] hover:underline">
                        Voltar para o Mapa
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <Link
                    to="/mapa"
                    className="inline-flex items-center gap-2 text-[#e0e0e0]/60 hover:text-[#9d4edd] transition-colors mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Voltar para o Mapa
                </Link>

                {/* Header Cover Style */}
                <div className="bg-[#1a0b2e]/50 rounded-2xl border border-[#2d1b4e]/50 overflow-hidden mb-8 shadow-[0_0_30px_rgba(157,78,221,0.1)]">
                    {kingdom.image ? (
                        <div className="relative h-[300px] md:h-[400px] w-full">
                            <img
                                src={kingdom.image}
                                alt={kingdom.name}
                                className="w-full h-full object-cover opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                <h1
                                    className="text-4xl md:text-6xl font-bold text-[#e0e0e0] mb-2 drop-shadow-lg"
                                    style={{ fontFamily: 'Cinzel Decorative, serif' }}
                                >
                                    {kingdom.name}
                                </h1>
                            </div>
                        </div>
                    ) : (
                        <div className="p-8 pb-4">
                            <h1
                                className="text-4xl md:text-5xl font-bold text-[#e0e0e0] mb-2"
                                style={{ fontFamily: 'Cinzel Decorative, serif' }}
                            >
                                {kingdom.name}
                            </h1>
                        </div>
                    )}

                    <div className="p-8 pt-4">
                        <p className="text-lg text-[#e0e0e0]/80 leading-relaxed mb-6">
                            {kingdom.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#2d1b4e]/50">
                            <div className="flex items-start gap-4 p-4 bg-[#2d1b4e]/20 rounded-xl">
                                <Crown className="w-6 h-6 text-[#c9a227] shrink-0 mt-1" />
                                <div>
                                    <span className="text-xs text-[#e0e0e0]/50 block mb-1">Governante / Líder</span>
                                    <span className="text-sm font-semibold text-[#e0e0e0]">{kingdom.leader}</span>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-[#2d1b4e]/20 rounded-xl">
                                <Scroll className="w-6 h-6 text-[#9d4edd] shrink-0 mt-1" />
                                <div>
                                    <span className="text-xs text-[#e0e0e0]/50 block mb-1">Religião Dominante</span>
                                    <span className="text-sm font-semibold text-[#e0e0e0]">{kingdom.religion}</span>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-[#2d1b4e]/20 rounded-xl">
                                <MapPin className="w-6 h-6 text-[#22c55e] shrink-0 mt-1" />
                                <div>
                                    <span className="text-xs text-[#e0e0e0]/50 block mb-1">Localização</span>
                                    <span className="text-sm font-semibold text-[#e0e0e0]">
                                        Lat: {kingdom.position.top} | Long: {kingdom.position.left}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
