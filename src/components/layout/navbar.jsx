"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { User, Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [navbarBg, setNavbarBg] = useState("bg-transparent text-white");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (
      pathname.includes("login") ||
      pathname.includes("register") ||
      pathname === "/profile"
    ) {
      setNavbarBg("bg-white shadow-md text-blue-500");
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavbarBg("bg-white shadow-md text-blue-500");
      } else {
        setNavbarBg("bg-transparent text-white");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "AboutUs", href: "/aboutus" },
    { name: "ContactUs", href: "/contactus" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-50 transition-all duration-300 ${navbarBg}`}
    >
      <div className="text-2xl md:text-3xl font-bold tracking-wide">Consultancy</div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6">
        {navLinks.map(({ name, href }) => (
          <Link key={name} href={href}>
            <span
              className={`px-4 py-2 rounded-full font-semibold transition-all cursor-pointer ${
                pathname === href
                  ? "bg-blue-500 text-white shadow-md"
                  : "hover:bg-blue-500 hover:text-white"
              }`}
            >
              {name}
            </span>
          </Link>
        ))}
        <Link href="/profile">
          <User className="cursor-pointer hover:opacity-80" size={24} />
        </Link>
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white text-blue-500 shadow-md flex flex-col items-center py-4 space-y-4 md:hidden">
          {navLinks.map(({ name, href }) => (
            <Link key={name} href={href} onClick={() => setMenuOpen(false)}>
              <span
                className={`text-lg font-medium ${
                  pathname === href ? "underline" : "hover:text-blue-700"
                }`}
              >
                {name}
              </span>
            </Link>
          ))}
          <Link href="/profile" onClick={() => setMenuOpen(false)}>
            <User size={24} />
          </Link>
        </div>
      )}
    </nav>
  );
}
