"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import API from "@/lib/axios"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import Image from "next/image"

export default function LoginPage() {
  const [nickname, setNickname] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await API.post("/auth/login", { nickname, password })
      const token = response.data.access_token
      // console.log("token", response)

      localStorage.setItem("token", token)

      toast.success("Tizimga muvaffaqiyatli kirdingiz!")
      router.push("/")
    } catch (error) {
      toast.error("Noto'g'ri ma'lumotlar kiritildi!")
      console.error("Kirish xatosi:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="hidden lg:block lg:w-1/2">
        <Image src="/Side.png" alt="Yon tasvir" width={805} height={781} className="object-cover w-full h-full" />
      </div>
      <Card className="w-full max-w-sm shadow-lg lg:w-1/2">
        <CardHeader>
          <CardTitle>Tizimga kirish</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="nickname">Taxallus</Label>
              <Input
                id="nickname"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
                placeholder="Taxallusingizni kiriting"
              />
            </div>

            <div>
              <Label htmlFor="password">Parol</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Parolingizni kiriting"
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Kirish..." : "Kirish"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

