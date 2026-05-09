import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollToTopButton } from "./ScrollToTopButton";

export function PublicLayout() {
  const loc = useLocation();
  useEffect(() => { window.scrollTo({ top: 0 }); }, [loc.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={loc.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
