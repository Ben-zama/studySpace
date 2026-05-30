import Hero from "../sections/Hero";
import SpatialMap from "../sections/SpatialMap";
import Pricing from "../sections/Pricing";
import Marketplace from "../sections/Marketplace";
import GreenStudy from "../sections/GreenStudy";
import Footer from "../sections/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <SpatialMap />
      <Pricing />
      <Marketplace />
      <GreenStudy />
      <Footer />
    </main>
  );
}
