import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Catalog from "./components/Catalog";
import Benefits from "./components/Benefits";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

import FormPage from "./pages/FormPage";

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <main>
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <About />
                <Catalog />
                <Benefits />
                <CTA />
              </>
            }
          />

          {/* New Form Page */}
          <Route path="/form" element={<FormPage />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}
