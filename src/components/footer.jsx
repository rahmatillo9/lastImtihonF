import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* 1. Kategoriyalar */}
          <div>
            <h3 className="text-lg font-semibold">Bo‘limlar</h3>
            <ul className="mt-4 space-y-2 text-gray-400">
              <li><Link href="/womens-fashion" className="hover:text-white">Ayollar kiyimi</Link></li>
              <li><Link href="/mens-fashion" className="hover:text-white">Erkaklar kiyimi</Link></li>
              <li><Link href="/electronics" className="hover:text-white">Elektronika</Link></li>
              <li><Link href="/home-lifestyle" className="hover:text-white">Uy va Lifestyle</Link></li>
              <li><Link href="/sports" className="hover:text-white">Sport va Outdoor</Link></li>
            </ul>
          </div>

          {/* 2. Aloqa Ma’lumotlari */}
          <div>
            <h3 className="text-lg font-semibold">Biz bilan bog‘lanish</h3>
            <p className="mt-4 text-gray-400">📍 Manzil: Toshkent, O‘zbekiston</p>
            <p className="text-gray-400">📞 Telefon: +998 932688278</p>
            <p className="text-gray-400">📧 Email: ismoilsayfiddinov06@gmail.com</p>
          </div>

          {/* 3. Ijtimoiy Tarmoqlar */}
          <div>
            <h3 className="text-lg font-semibold">Bizni kuzatib boring</h3>
            <div className="flex space-x-4 mt-4">
              <Link href="https://facebook.com" className="hover:text-blue-500"><Facebook className="w-6 h-6" /></Link>
              <Link href="https://instagram.com" className="hover:text-pink-500"><Instagram className="w-6 h-6" /></Link>
              <Link href="https://twitter.com" className="hover:text-blue-400"><Twitter className="w-6 h-6" /></Link>
            </div>
          </div>

        </div>

        {/* Pastki qism */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Barcha huquqlar himoyalangan | <Link href={'https://www.butcher4.uz/'}><span className="text-blue-400 font-semibold">Butcher</span></Link></p>
        </div>
      </div>
    </footer>
  );
}
