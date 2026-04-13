import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Catalog from "./components/Catalog";
import Benefits from "./components/Benefits";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <About />
        <Catalog />
        <Benefits />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
