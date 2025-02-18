"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import API from "@/lib/axios"

function FlashSales() {
  const [products, setProducts] = useState([])
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 23,
    minutes: 19,
    seconds: 56,
  })
  const router = useRouter()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get("/products")
        setProducts(response.data) // .json() emas, .data ishlatish kerak
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }
  
    fetchProducts()
  }, [])
  

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setTimeLeft((prev) => {
  //       if (prev.seconds > 0) {
  //         return { ...prev, seconds: prev.seconds - 1 }
  //       } else if (prev.minutes > 0) {
  //         return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
  //       } else if (prev.hours > 0) {
  //         return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
  //       } else if (prev.days > 0) {
  //         return {
  //           ...prev,
  //           days: prev.days - 1,
  //           hours: 23,
  //           minutes: 59,
  //           seconds: 59,
  //         }
  //       }
  //       return prev
  //     })
  //   }, 1000)

  //   return () => clearInterval(timer)
  // }, [])

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
    return sum / reviews.length
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="h-6 w-2 bg-red-500" />
          <h2 className="text-2xl font-bold">Chegirmalar</h2>
        </div>
        {/* <div className="flex gap-4 text-center">
          <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg min-w-[60px]">
            <div className="text-xl font-bold">{String(timeLeft.days).padStart(2, "0")}</div>
            <div className="text-xs text-gray-500">Kun</div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg min-w-[60px]">
            <div className="text-xl font-bold">{String(timeLeft.hours).padStart(2, "0")}</div>
            <div className="text-xs text-gray-500">Soat</div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg min-w-[60px]">
            <div className="text-xl font-bold">{String(timeLeft.minutes).padStart(2, "0")}</div>
            <div className="text-xs text-gray-500">Daqiqa</div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg min-w-[60px]">
            <div className="text-xl font-bold">{String(timeLeft.seconds).padStart(2, "0")}</div>
            <div className="text-xs text-gray-500">Soniya</div>
          </div>
        </div> */}
      </div>

      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scroll-smooth">
          {products.map((product) => (
            <Card key={product.id} className="flex-shrink-0 w-[280px]">
              <CardContent className="p-4">
                <div className="relative">
                  <div className="absolute top-2 left-2 z-10 bg-red-500 text-white px-2 py-1 text-sm rounded">-15%</div>
                  <button className="absolute top-2 right-2 z-10 p-1.5  rounded-full shadow-md">
                    <Heart className="w-5 h-5 " />
                  </button>
                  <div className="relative h-[200px] mb-4">
                   <img src={`http://localhost:4000${product.image}` } onClick={() => router.push(`/oneProduct/${product.id}`)} alt={product.name}  />
                  </div>
                </div>
                <h3 className="font-semibold mb-2" onClick={() => router.push(`/oneProduct/${product.id}`)}>{product.name}</h3>
                <div className="flex items-center gap-2 mb-2" onClick={() => router.push(`/oneProduct/${product.id}`)}>
                  <div className="text-lg font-bold">${product.price}</div>
                  <div className="text-sm text-gray-500 line-through">
                    ${(Number.parseFloat(product.price) * 1.15).toFixed(2)}
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < calculateAverageRating(product.review) ? "text-yellow-400" : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-sm text-gray-500">({product.review?.length || 0})</span>
                </div>
                {/* <Button className="w-full" variant="outline" onClick={() => router.push('/savatga')} >
                  Savatga qo'shish
                </Button> */}
              </CardContent>
            </Card>
          ))}
        </div>
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2  shadow-md p-2 rounded-full hidden md:block"
          onClick={() => {
            const container = document.querySelector(".scroll-smooth")
            container.scrollBy({ left: -300, behavior: "smooth" })
          }}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2  shadow-md p-2 rounded-full hidden md:block"
          onClick={() => {
            const container = document.querySelector(".scroll-smooth")
            container.scrollBy({ left: 300, behavior: "smooth" })
          }}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default FlashSales

