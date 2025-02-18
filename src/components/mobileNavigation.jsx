"use client";
import { Contact, Home, Store, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const mobileNavItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Contact, label: "Contact", href: "/contact" },
  { icon: Store, label: "About", href: "/about" },
  { icon: User, label: "Profile", href: "/profile" },
];

export function MobileNavbar() {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: 100 }} // Ilk yuklanishda pastdan chiqadi
      animate={{ y: 0 }} // Keyin joyiga tushadi
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-gray-800 md:hidden"
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-around items-center h-16">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-300 ${
                  isActive
                    ? "text-white"
                    : "text-gray-400 hover:text-gray-200 hover:scale-110"
                }`}
              >
                <motion.div whileTap={{ scale: 0.9 }}>
                  <Icon className="w-6 h-6" />
                </motion.div>
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
