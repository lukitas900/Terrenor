import { TabletopProvider } from './TabletopContext';
import { MapBoard } from './MapBoard';
import { LeftSidebar } from './LeftSidebar';
import { RightSidebar } from './RightSidebar';

export const TabletopPage = () => {
  return (
    <TabletopProvider>
      <div className="flex h-screen w-full overflow-hidden pt-16 mt-0 bg-[#0d0d12]">
        <LeftSidebar />
        <div className="flex-1 relative h-full shrink">
          <MapBoard />
        </div>
        <RightSidebar />
      </div>
    </TabletopProvider>
  );
};
