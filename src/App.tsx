import Silk from "./components/Silk";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import SpatialMap from "./sections/SpatialMap";
import Pricing from "./sections/Pricing";
import Marketplace from "./sections/Marketplace";
import GreenStudy from "./sections/GreenStudy";
import Footer from "./sections/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen w-full overflow-x-auto">
      {/* Global Silk background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Silk
          speed={5}
          scale={1}
          color="#1A2B4C"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      {/* Fixed navigation */}
      <Navbar />

      {/* Page sections */}
      <main>
        <Hero />
        <SpatialMap />
        <Pricing />
        <Marketplace />
        <GreenStudy />
        <Footer />
      </main>
    </div>
  );
}
