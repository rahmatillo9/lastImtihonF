"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import API from "@/lib/axios"
import { jwtDecode } from "jwt-decode"
import { useParams } from "next/navigation"
import { toast } from "sonner"

export default function ProductDetail() {
  const params = useParams()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(0)
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      const decodedToken = jwtDecode(token)
      setUserId(decodedToken.id)
    }
  }, [])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await API.get(`/products/id/${params.id}`)
        console.log("Id", response.data)
        setProduct(response.data)
      } catch (error) {
        console.error("Mahsulotni yuklashda xatolik:", error)
        toast.error("Mahsulotni yuklashda xatolik")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.id])

  const handleAddToCart = async () => {
    try {
      await API.post("/cart-items", {
        userId: userId,
        productId: product?.id,
        quantity: 1,
      })
      setQuantity(1) // Faqat bir marta qo'shish uchun qiymatni 1 ga o'zgartirdik
      toast.success("Mahsulot savatga qo'shildi")
    } catch (error) {
      console.error("Savatga qo'shishda xatolik:", error)
      toast.error("Savatga qo`shishda xatolik yuz berdi")
    }
  }

  if (loading) {
    return <div className="container mx-auto p-4">Yuklanmoqda...</div>
  }

  if (!product) {
    return <div className="container mx-auto p-4">Mahsulot topilmadi</div>
  }

  const formatPrice = (price) => {
    return Number.parseFloat(price).toLocaleString("uz-UZ", {
      style: "currency",
      currency: "UZS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Mahsulot rasmi */}
        <div className="relative h-[400px] rounded-lg overflow-hidden bg-white">
          <img src={`http://localhost:4000${product.image}`} alt={product.name} />
        </div>

        {/* Mahsulot ma'lumotlari */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`h-4 w-4 ${
                      index < (product.review && product.review.length > 0 ? product.review[0].rating : 0)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">{product.review ? product.review.length : 0} ta sharh</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300">{product.description}</p>
          </div>

          <div className="border-t border-b py-4">
            <p className="text-3xl font-bold text-primary">{formatPrice(product.price)}</p>
            <p className="text-sm text-gray-500 mt-1">Omborda: {product.stock} dona</p>
          </div>

          <div>
            <Button 
              size="lg" 
              className="w-full" 
              onClick={quantity === 0 ? handleAddToCart : () => router.push("/cart")}
            >
              {quantity === 0 ? (
                <>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Savatga qo'shish
                </>
              ) : (
                "Savatga o'tish"
              )}
            </Button>
          </div>

          {/* Sharhlar */}
          {product.review && product.review.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Sharhlar</h2>
              <div className="space-y-4">
                {product.review.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, index) => (
                          <Star
                            key={index}
                            className={`h-4 w-4 ${
                              index < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        {new Date(review.created_at).toLocaleDateString("uz-UZ")}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}