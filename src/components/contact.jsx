"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Phone, Mail } from "lucide-react"
import API from "@/lib/axios"

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
        const response = await API.post("/contacts", formData);
        if (response.status === 201) {
          toast.success("So'rovingiz muvaffaqiyatli yuborildi!");
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
        } else {
          toast.error(error.response?.data?.message || "Xatolik yuz berdi. Qayta urinib ko'ring!");
        }
        
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Biz bilan bog'laning</h2>
            <div className="flex items-center gap-3 text-gray-600">
              <Phone className="w-5 h-5" />
              <div>
                <p className="font-medium">24/7 kunu tun xizmatdamiz</p>
                <p>Telefon: +998991112222</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">Bizga yozing</h2>
            <div className="flex items-start gap-3 text-gray-600">
              <Mail className="w-5 h-5 mt-1" />
              <div>
                <p className="font-medium">Formani to'ldiring va biz 24 soat ichida siz bilan bog'lanamiz</p>
                <p>Email: customer@edulabs.com</p>
                <p>Email: support@edulabs.com</p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4  p-6 rounded-lg">
          <div>
          <Input
  type="text"
  name="name"
  placeholder="Ismingiz"
  value={formData.name}
  onChange={handleChange}
  required
  disabled={loading} 
  className="w-full"
/>

          </div>

          <div>
            <Input
              type="email"
              name="email"
              placeholder="Email manzilingiz"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>

          <div>
            <Input
              type="tel"
              name="phone"
              placeholder="Telefon raqamingiz"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>

          <div>
            <Textarea
              name="message"
              placeholder="Xabaringiz"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full min-h-[150px]"
            />
          </div>

          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white" disabled={loading}>
            {loading ? "Yuborilmoqda..." : "Xabar yuborish"}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ContactForm

