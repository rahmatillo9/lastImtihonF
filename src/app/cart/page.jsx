"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { jwtDecode } from "jwt-decode"
import API from "@/lib/axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"

export default function CartPage() {
  const [products, setProducts] = useState([])
  const [couponCode, setCouponCode] = useState("")
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          router.push("/login")
          return
        }

        const decoded = jwtDecode(token)
        console.log("D:",decoded )
        const userId = decoded.id

        const response = await API.get(`/cart-items/user/${userId}`)
        // API javobi shaklida ma'lumotlarni moslashtiramiz
        const cartItems = response.data.cart || []
        setProducts(cartItems.map(item => ({ 
          id: item.id,
          name: item.product.name,
          price: parseFloat(item.product.price), // Bu yerda price qator qiymati bo'lishi kerak
          quantity: item.quantity,
          image: item.product.image,
          stock: item.product.stock
        })))
        console.log("C", cartItems)
      } catch (error) {
        toast.error("Savatni yuklashda xatolik yuz berdi")
      } finally {
        setLoading(false)
      }
    }

    fetchCart()
  }, [router])

  const updateQuantity = async (productId, newQuantity) => {
    try {
      if (newQuantity === 0) {
        await API.delete(`/cart-items/${productId}`)
        setProducts(products.filter((product) => product.id !== productId))
        toast.success("Mahsulot savatdan olib tashlandi")
      } else {
        await API.put(`/cart-items/${productId}`, {
          quantity: newQuantity,
        })
        setProducts(
          products.map((product) => (product.id === productId ? { ...product, quantity: newQuantity } : product)),
        )
        toast.success("Mahsulot miqdori yangilandi")
      }
    } catch (error) {
      toast.error("Xatolik yuz berdi")
      console.error("Error updating quantity:", error)
    }
  }

  const addToCart = async (productId) => {
    try {
      const response = await API.post("/cart-items", {
        productId,
        quantity: 1,
      })

      const newProduct = {
        id: response.data.id,
        name: response.data.product.name,
        price: parseFloat(response.data.product.price),
        quantity: response.data.quantity,
        image: response.data.product.image,
        stock: response.data.product.stock
      }
      setProducts([...products, newProduct])
      toast.success("Mahsulot savatga qo'shildi")
    } catch (error) {
      toast.error("Mahsulotni qo'shishda xatolik yuz berdi")
      console.error("Error adding to cart:", error)
    }
  }

  const calculateSubtotal = (price, quantity) => {
    return price * quantity
  }

  const calculateTotal = () => {
    return products.reduce((total, product) => total + calculateSubtotal(product.price, product.quantity), 0)
  }

  const handleApplyCoupon = () => {
    toast.info("Kupon kodi tekshirilmoqda...")
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Yuklanmoqda...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="space-y-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col md:flex-row items-center justify-between gap-4 border-b pb-4"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={80}
                    height={80}
                    className="rounded-lg"
                  />
                  <span className="font-medium">{product.name}</span>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4">
                  <span className="text-gray-600">${product.price}</span>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(product.id, product.quantity - 1)}
                    >
                      -
                    </Button>
                    <span className="w-12 text-center">{product.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(product.id, product.quantity + 1)}
                    >
                      +
                    </Button>
                  </div>

                  <span className="font-medium">${calculateSubtotal(product.price, product.quantity)}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Button variant="outline" onClick={() => router.push("/shop")}>
            Xarid qilishga qaytish
          </Button>

          <div className="flex gap-4">
            <Input placeholder="Kupon kodi" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
            <Button onClick={handleApplyCoupon}>Kuponni qo'llash</Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Jami:</span>
                <span>${calculateTotal()}</span>
              </div>
              <div className="flex justify-between">
                <span>Yetkazib berish:</span>
                <span>Bepul</span>
              </div>
              <div className="flex justify-between font-medium text-lg">
                <span>Umumiy summa:</span>
                <span>${calculateTotal()}</span>
              </div>

              <div className="space-y-4 pt-4">
                <Button className="w-full" variant="default" onClick={() => router.push("/checkout")}>
                  Buyurtma berish
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

