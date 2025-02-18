"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import API from "@/lib/axios"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function Register() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      await API.post("/users", data)
      toast.success("Muvaffaqiyatli ro'yxatdan o'tdingiz!")
      router.push("/login")
    } catch (error) {
      toast.error("Ro'yxatdan o'tish muvaffaqiyatsiz tugadi. Qayta urinib ko'ring!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen  bg-gray-100 dark:bg-gray-900">
      <div className="hidden lg:block lg:w-1/2">
        <Image src="/Side.png" alt="Side image" width={705} height={500} className="object-cover w-full h-full" />
      </div>
      <Card className="w-full max-w-md shadow-md lg:w-1/2">
        <CardHeader>
          <CardTitle className="text-center">Ro'yxatdan o'tish</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label>To'liq ism</Label>
              <Input
                type="text"
                placeholder="To'liq ismingizni kiriting"
                {...register("fullname", { required: "To'liq ism kiritish majburiy" })}
              />
              {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname.message}</p>}
            </div>

            <div>
              <Label>Taxallus</Label>
              <Input
                type="text"
                placeholder="Taxallusingizni kiriting"
                {...register("nickname", { required: "Taxallus kiritish majburiy" })}
              />
              {errors.nickname && <p className="text-red-500 text-sm">{errors.nickname.message}</p>}
            </div>

            <div>
              <Label>Email</Label>
              <Input type="email" placeholder="Emailingizni kiriting" {...register("email")} />
            </div>

            <div>
              <Label>Parol</Label>
              <Input
                type="password"
                placeholder="Parolingizni kiriting"
                {...register("password", { required: "Parol kiritish majburiy", minLength: 6 })}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Ro'yxatdan o'tilmoqda..." : "Ro'yxatdan o'tish"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

