// @ts-expect-error - Silk component lacks type definitions
import Silk from "./components/Silk";
import Navbar from "./sections/Navbar";
import { Routes, Route, useLocation } from "react-router";
import Home from "./pages/Home";
import { AuthPage } from "./pages/AuthPage";

export default function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';

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
      {!isAuthPage && <Navbar />}

      {/* Page sections */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </div>
  );
}
