"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import API from "@/lib/axios"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function CategoryProducts() {
  const params = useParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get(`/products/${params.category}`)
        setProducts(response.data)
      } catch (error) {
        console.error("Mahsulotlarni yuklashda xatolik:", error)
      } finally {
        setLoading(false)
      }
    }

    if (params.category) {
      fetchProducts()
    }
  }, [params.category])

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Yuklanmoqda...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {params.category
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}{" "}
        mahsulotlari
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="relative h-[200px] mb-4">
              <img src={`http://localhost:4000${product.image}`} alt={product.name} />
              </div>
              <h3 className="font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">${product.price}</span>
                <Button variant="outline">Savatga qo'shish</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

