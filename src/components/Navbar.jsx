import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { supabase } from "../supabaseClient";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let lastYPos = window.scrollY;
    const handleScroll = () => {
      const currentYPos = window.scrollY;
      const isScrollingUp = currentYPos < lastYPos;

      setHidden(!isScrollingUp && currentYPos > 300);
      setScrolled(currentYPos > 50);
      lastYPos = currentYPos;
    };

    window.addEventListener("scroll", handleScroll, false);
    return () => window.removeEventListener("scroll", handleScroll, false);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase.from("service_categories").select("*");
      if (data) setCategories(data);
    };
    fetchCategories();
  }, []);

  const isActivePath = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { name: "Ana Sayfa", path: "/" },
    { name: "Tedaviler", path: "/tedaviler", hasMegaMenu: true },
    { name: "Hakkımızda", path: "/hakkimizda" },
    { name: "İletişim", path: "/iletisim" },
  ];

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed left-0 right-0 z-50 transition-all lg:px-10 px-2 ${
          scrolled
            ? `bg-white/95 backdrop-blur-md shadow-sm py-3 w-full md:w-[97vw] mx-auto px-4 ${
                hidden ? "-top-2" : "top-3"
              } md:rounded-full border border-slate-200`
            : "top-0 py-5 bg-white border-b border-slate-100"
        }`}
      >
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between">

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img
                src="/images/simdent-logo.png"
                alt="Sim Dent Logo"
                className="h-10 md:h-12 w-auto object-contain"
              />
            </motion.div>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.1 }}
                  className="relative"
                  onMouseEnter={() => link.hasMegaMenu && setIsMegaMenuOpen(true)}
                  onMouseLeave={() => link.hasMegaMenu && setIsMegaMenuOpen(false)}
                >
                  <Link
                    to={link.path}
                    className={`flex items-center gap-1 transition-colors font-bold tracking-wide text-sm ${
                      isActivePath(link.path)
                        ? "text-blue-600"
                        : "text-slate-600 hover:text-blue-600"
                    }`}
                  >
                    {link.name}
                    {link.hasMegaMenu && <FiChevronDown size={14} />}
                  </Link>

                  {/* Mega Menu */}
                  {link.hasMegaMenu && (
                    <AnimatePresence>
                      {isMegaMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white shadow-2xl rounded-3xl border border-slate-100 p-8 grid grid-cols-2 gap-6 mt-4 z-50"
                        >
                          <div className="col-span-2 mb-2">
                            <h3 className="text-lg font-black text-slate-900">Tedavi Hizmetlerimiz</h3>
                            <p className="text-sm text-slate-500">Size en uygun tedavi yöntemini keşfedin</p>
                          </div>
                          <div className="grid grid-cols-1 gap-3">
                            {categories.map((cat) => (
                              <Link
                                key={cat.id}
                                to={`/tedaviler?category=${cat.id}`}
                                className="group flex items-center gap-4 p-3 rounded-2xl hover:bg-blue-50 transition-all"
                              >
                                <div className="h-10 w-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                  {cat.name[0]}
                                </div>
                                <div className="flex-1">
                                  <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{cat.name}</p>
                                  <p className="text-xs text-slate-500 line-clamp-1">{cat.description}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                          <div className="bg-slate-50 rounded-2xl p-6 flex flex-col justify-center text-center">
                            <p className="font-bold text-slate-900 mb-2">Hangi Tedavi Uygun?</p>
                            <p className="text-xs text-slate-500 mb-4">Uzmanlarımız size en doğru yolu göstermek için burada.</p>
                            <Link
                              to="/randevu"
                              className="px-4 py-2 bg-blue-600 text-white text-xs rounded-full font-bold hover:bg-blue-700 transition-all"
                            >
                              Ücretsiz Danışın
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="pl-4 border-l border-slate-200"
              >
                <Link
                  to="/randevu"
                  className="px-6 py-2.5 bg-blue-600 text-white text-sm rounded-full font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-900/10 block"
                >
                  Randevu Al
                </Link>
              </motion.div>
            </div>

            <div className="md:hidden flex items-center">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg transition-colors text-slate-600 hover:bg-blue-50 hover:text-blue-600"
              >
                {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
              </motion.button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-slate-100 overflow-hidden mt-3 rounded-2xl shadow-xl absolute left-4 right-4"
            >
              <div className="px-6 py-4 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block py-3 font-bold text-lg ${
                        isActivePath(link.path)
                          ? "text-blue-600"
                          : "text-slate-700 hover:text-blue-600"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="pt-4 mt-2 border-t border-slate-100"
                >
                  <Link
                    to="/randevu"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center px-6 py-3.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-md"
                  >
                    Randevu Al
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;