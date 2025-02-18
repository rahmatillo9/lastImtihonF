"use client" 
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Users2, ShoppingBag, Headphones, Shield } from "lucide-react";
import CountUp from "react-countup";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h1 className="text-4xl font-bold mb-4">Bizning Hikoya</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Biz 2025-yilda tashkil topgan kompaniya bo'lib, mijozlarimizga eng sifatli mahsulotlarni taqdim etishni o'z
            oldimizga maqsad qilib qo'yganmiz. Bizning jamoamiz har bir mijozga alohida e'tibor qaratadi va ularning
            ehtiyojlarini qondirish uchun tinimsiz mehnat qiladi.
          </p>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <img src="NJ.jpg" alt="NJ" className="object-cover w-full h-full" />
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6 hover:bg-red-500">
            <ShoppingBag className="h-8 w-8 mb-2 text-primary" />
            <h3 className="text-2xl font-bold">
              <CountUp end={10500} duration={2.5} separator="," />
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Faol mijozlar</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6 hover:bg-red-500">
            <Users2 className="h-8 w-8 mb-2 text-primary" />
            <h3 className="text-2xl font-bold">
              <CountUp end={33000} duration={2.5} separator="," />
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Xaridlar soni</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6 hover:bg-red-500">
            <Headphones className="h-8 w-8 mb-2 text-primary" />
            <h3 className="text-2xl font-bold">
              <CountUp end={45500} duration={2.5} separator="," />
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Mijozlar xizmati</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6 hover:bg-red-500">
            <Shield className="h-8 w-8 mb-2 text-primary" />
            <h3 className="text-2xl font-bold">
              <CountUp end={25000} duration={2.5} separator="," />
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Xavfsiz tranzaksiyalar</p>
          </CardContent>
        </Card>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Bizning Jamoa</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Butcher",
              position: "Direktor",
              image: "/Butcher.jpg",
            },
            {
              name: "Ahmed",
              position: "Marketing Menejeri",
              image: "/Ahmed.jpg",
            },
            {
              name: "Rahmatillo",
              position: "Texnik Direktor",
              image: "/Rahmatillo.jpg",
            },
          ].map((member, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="relative h-[300px] mb-4 rounded-lg overflow-hidden">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{member.position}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-center">
          <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">Bepul yetkazib berish</h3>
          <p className="text-gray-600 dark:text-gray-300">Barcha buyurtmalar uchun bepul yetkazib berish xizmati</p>
        </div>
        <div className="text-center">
          <Headphones className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">24/7 Mijozlar xizmati</h3>
          <p className="text-gray-600 dark:text-gray-300">Har qanday vaqtda yordam va maslahat</p>
        </div>
        <div className="text-center">
          <Shield className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">Xavfsiz to'lov</h3>
          <p className="text-gray-600 dark:text-gray-300">100% xavfsiz to'lov kafolati</p>
        </div>
      </div>
    </div>
  );
}