import { store } from '@/lib/store'
import { Metadata } from 'next'
import Link from 'next/link'

import { Banner } from '@/lib/components/product/banner'
import { Features } from '@/lib/components/shared/features'
import { Card as CategoriesCard } from '@/lib/components/categories/card'
import { Slider as ProductSlider } from '@/lib/components/product/slider'
import { Partners } from '@/lib/components/shared/partners'
import { MobileApps } from '@/lib/components/shared/mobile-apps'

export const metadata: Metadata = {
  title: "Best Online Shopping Store | Free Shipping | 100% Refund",
  description: "Shop online for Electronics, Fashion, Home & Kitchen, Beauty & Grooming, Health, Toys, Baby, Books, Sports, etc. on desertcart. ✓Secure Shopping Platform ✓70M+ Products ✓FREE Delivery ✓FREE Returns",
}

export default async function Home() {

  const { categories } = store.getState().categories;
  const { products } = store.getState().products;

  return (
    <>
      <Banner />

      <Features />

      <section className='py-10'>
        <Partners />
      </section>

    </>
  )
}
