
import FlashSales from '@/components/flash-sales'
import { Hero } from '@/components/hero'

import { SearchBar } from '@/components/search'
import React from 'react'

export default function Hpmepage() {
  return (
    <div>
      <div className='flex  justify-end mr-7'>
      <SearchBar/>
      </div>
       
      <Hero/>
       <div>
       <FlashSales/>
       </div>
    </div>
  )
}
