import './App.css';
import { MapPanel } from './components/map-display/MapPanel';
import { SubwayBoard } from './components/subway-display/SubwayBoard';
import { mockTrainData } from './mockData';

function App() {
  return (
    <div className="h-screen w-screen grid grid-rows-[auto,1fr] overflow-hidden bg-zinc-900 text-white">
      <header className="py-2 bg-black">
        <h1 className="text-center text-xl font-bold">
          NYC Subway Arrivals
        </h1>
      </header>
      <main className="grid grid-cols-[2fr,1fr]">
        <div className="p-4 overflow-hidden">
          <SubwayBoard trainData={mockTrainData} />
        </div>
        <MapPanel />
      </main>
    </div>
  );
}

export default App;
