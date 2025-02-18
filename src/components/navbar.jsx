'use client'
import { ChevronRight, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link"; 

import { ModeToggle } from "./dark-mode";
import { MobileNavbar } from "./mobileNavigation";
import { NavUser } from "./user";

const categories = [
  { label: "Ayollar kiyimi", href: "/products/womens-fashion" },
  { label: "Erkaklar kiyimi", href: "/products/mens-fashion" },
  { label: "Elektronika", href: "/products/electronics" },
  { label: "Uy & Lifestyle", href: "/products/home-lifestyle" },
  { label: "Tibbiyot", href: "/products/medicine" },
  { label: "Sport & Ochiq havo", href: "/products/sports" },
  { label: "Bolalar uchun & O'yinchoqlar", href: "/products/baby-toys" },
  { label: "Baqqollik & Uy hayvonlari", href: "/products/groceries" },
  { label: "Salomatlik & Go'zallik", href: "/products/health" },
]

export function Navbar() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Categories</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category.href}
                    href={category.href}
                    className="flex items-center justify-between py-2 text-sm hover:text-primary"
                  >
                    {category.label}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
         <div className="flex gap-3">
         <Link href="/" className="text-xl font-bold">Exclusive</Link>
         <ModeToggle />
         </div>
        </div>
     
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium">Home</Link>
          <Link href="/contact" className="text-sm font-medium">Contact</Link>
          <Link href="/about" className="text-sm font-medium">About</Link>
          <NavUser/>
        </nav>
        {/* <SearchBar /> */}
      </div>
      <MobileNavbar/>
    </header>
  );
}
