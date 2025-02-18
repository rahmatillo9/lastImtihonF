"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"


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

export function Hero() {
    return (
           <div className="container px-4 py-6">
          <div className="grid md:grid-cols-[220px_1fr] gap-6">
            {/* Sidebar Categories - Desktop Only */}
            <div className="hidden md:block space-y-2">
              {categories.map((category) => (
                <Link key={category.href} href={category.href} className="block py-2 text-sm hover:text-primary">
                  {category.label}
                </Link>
              ))}
            </div>
      <Carousel className="w-full">
        <CarouselContent>
          <CarouselItem>
            <div className="relative h-[300px] md:h-[400px] bg-black rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20" />
              <div className="relative z-10 flex flex-col justify-center h-full p-6 text-white">
                <div className="flex items-center mb-4">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OZWOk2eAfCAM1GX38sPAxnLcKp7xeC.png"
                    alt="iPhone 14"
                    className="w-auto h-32 md:h-48 object-contain"
                  />
                </div>
                <h2 className="text-2xl md:text-4xl font-bold mb-2">iPhone 14 Series</h2>
                <p className="text-lg md:text-xl mb-4">Up to 10% off Voucher</p>
                <Button variant="outline" className="w-fit text-white border-white hover:bg-white hover:text-black">
                  Shop Now
                </Button>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
            </div>
        </div>
    );
  }
  
