import { useState, useEffect } from 'react';
import { TabletopProvider } from './TabletopContext';
import { MapBoard } from './MapBoard';
import { LeftSidebar } from './LeftSidebar';
import { RightSidebar } from './RightSidebar';
import { ChevronLeft, ChevronRight, Menu, Settings } from 'lucide-react';

export const TabletopPage = () => {
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1200;
      if (mobile) {
        setLeftOpen(false);
        setRightOpen(false);
      } else {
        setLeftOpen(true);
        setRightOpen(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <TabletopProvider>
      <div className="flex h-screen w-full overflow-hidden pt-16 mt-0 bg-[#0d0d12] relative">
        
        {/* Left Sidebar Toggle (Floating if closed) */}
        {!leftOpen && (
          <button 
            onClick={() => setLeftOpen(true)}
            className="absolute left-6 top-6 z-[100] bg-[#1a0b2e]/80 backdrop-blur-md border border-[#9d4edd]/50 p-3 rounded-xl text-[#9d4edd] hover:text-white shadow-[0_0_20px_rgba(157,78,221,0.3)] transition-all hover:scale-110 active:scale-95 group"
            title="Abrir Ferramentas"
          >
            <Menu size={24} className="group-hover:rotate-12 transition-transform" />
          </button>
        )}

        {/* Left Sidebar Content */}
        <div className={`transition-all duration-500 ease-in-out ${leftOpen ? 'w-[17rem] translate-x-0' : 'w-0 -translate-x-full opacity-0 overflow-hidden'} h-full shrink-0 relative border-r border-[#2d1b4e]/50 z-50 bg-[#111116]`}>
          <div className="w-[17rem] h-full relative">
            <LeftSidebar />
            <button 
              onClick={() => setLeftOpen(false)}
              className="absolute -right-3 top-8 bg-[#2d1b4e] border border-[#9d4edd]/30 rounded-full p-1.5 text-gray-400 hover:text-[#9d4edd] z-[70] transition-all shadow-xl hover:bg-[#1a0b2e]"
            >
              <ChevronLeft size={18} />
            </button>
          </div>
        </div>

        {/* Map Board */}
        <div className="flex-1 relative h-full shrink overflow-hidden bg-[#0d0d12]">
          <MapBoard />
        </div>

        {/* Right Sidebar Content */}
        <div className={`transition-all duration-500 ease-in-out ${rightOpen ? 'w-[20rem] translate-x-0' : 'w-0 translate-x-full opacity-0 overflow-hidden'} h-full shrink-0 relative border-l border-[#2d1b4e]/50 z-50 bg-[#111116]`}>
           <div className="w-[20rem] h-full relative">
             <RightSidebar />
             <button 
               onClick={() => setRightOpen(false)}
               className="absolute -left-3 top-8 bg-[#2d1b4e] border border-[#9d4edd]/30 rounded-full p-1.5 text-gray-400 hover:text-[#9d4edd] z-[70] transition-all shadow-xl hover:bg-[#1a0b2e]"
             >
               <ChevronRight size={18} />
             </button>
           </div>
        </div>

        {/* Right Sidebar Toggle (Floating if closed) */}
        {!rightOpen && (
          <button 
            onClick={() => setRightOpen(true)}
            className="absolute right-6 top-6 z-[100] bg-[#1a0b2e]/80 backdrop-blur-md border border-[#9d4edd]/50 p-3 rounded-xl text-[#9d4edd] hover:text-white shadow-[0_0_20px_rgba(157,78,221,0.3)] transition-all hover:scale-110 active:scale-95 group"
            title="Abrir Dashboard"
          >
            <Settings size={24} className="group-hover:rotate-90 transition-transform duration-500" />
          </button>
        )}

      </div>
    </TabletopProvider>
  );
};
