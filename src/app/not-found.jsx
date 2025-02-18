import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-7xl font-bold text-gray-800 dark:text-white">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mt-2">
        Sahifa topilmadi!
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mt-2 text-center">
        Kechirasiz, siz izlagan sahifa mavjud emas yoki o‘chirilgan.  
        Asosiy sahifaga qaytib, mahsulotlarni ko‘rishni davom ettiring.
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-lg transition duration-300"
      >
        Bosh sahifaga qaytish
      </Link>
    </div>
  );
}
