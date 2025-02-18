"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BadgeCheck, CreditCard, LogOut } from "lucide-react"
import API from "@/lib/axios"
import { jwtDecode } from "jwt-decode"

export function NavUser() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      const decodedToken = jwtDecode(token)
      fetchUserData(decodedToken.id)
    }
  }, [])

  const fetchUserData = async (userId) => {
    try {
      const response = await API.get(`/users/${userId}`)
      setUser(response.data)
    } catch (error) {
      console.error("Foydalanuvchi ma'lumotlarini olishda xatolik:", error)
    }
  }

  const handleNavigate = (path) => {
    router.push(path)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    setUser(null)
    router.push("/")
  }

  if (!user) {
    return (
      <Link href="/register" className="text-sm font-medium">
        Ro'yxatdan o'tish
      </Link>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarImage src={`http://localhost:4000${user.profile_image}`} alt={user.nickname} />
          <AvatarFallback>{user.nickname.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel
          className="font-normal cursor-pointer"
          onClick={() => handleNavigate("/edit-profile")}
        >
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.nickname}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {/* <DropdownMenuItem>
            <Sparkles className="mr-2 h-4 w-4" />
            <span>Pro versiyaga o'tish</span>
          </DropdownMenuItem> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BadgeCheck className="mr-2 h-4 w-4" />
            <span>Hisob</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>To'lovlar</span>
          </DropdownMenuItem>
          {/* <DropdownMenuItem>
            <Bell className="mr-2 h-4 w-4" />
            <span>Bildirishnomalar</span>
          </DropdownMenuItem> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Chiqish</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}