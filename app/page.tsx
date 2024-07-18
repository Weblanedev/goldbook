import { store } from '@/lib/store'
import { Metadata } from 'next'
import Link from 'next/link'
import Image from "next/image";

import { Banner } from '@/lib/components/product/banner'
import { Features } from '@/lib/components/shared/features'
// import { Card as CategoriesCard } from '@/lib/components/categories/card'
// import { Slider as ProductSlider } from '@/lib/components/product/slider'
// import { Partners } from '@/lib/components/shared/partners'
// import { MobileApps } from '@/lib/components/shared/mobile-apps'

export const metadata: Metadata = {
  title: "Goldbook - Best Online Shopping Store | Free Shipping | 100% Refund",
  description: "Shop online for Electronics, Fashion, Home & Kitchen, Beauty & Grooming, Health, Toys, Baby, Books, Sports, etc. on desertcart. ✓Secure Shopping Platform ✓70M+ Products ✓FREE Delivery ✓FREE Returns",
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: 'https://th.bing.com/th/id/OIP.lWQt24n04e7pQp7cJJA5EgAAAA?rs=1&pid=ImgDetMain',
        href: 'https://th.bing.com/th/id/OIP.lWQt24n04e7pQp7cJJA5EgAAAA?rs=1&pid=ImgDetMain',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: 'https://th.bing.com/th/id/OIP.lWQt24n04e7pQp7cJJA5EgAAAA?rs=1&pid=ImgDetMain',
        href: 'https://th.bing.com/th/id/OIP.lWQt24n04e7pQp7cJJA5EgAAAA?rs=1&pid=ImgDetMain',
      },
    ],
  },
}
export default async function Home() {

  const { categories } = store.getState().categories;
  const { products } = store.getState().products;

  return (
    <>
      <Banner />

      <Features />

      {/* <section className='py-10'>
        <Partners />
      </section> */}

      <section className="container mx-auto px-4 md:px-16 flex flex-col lg:flex-row items-center lg:gap-20 gap-14 py-20">
        <div className="flex flex-col gap-2 flex-1">
          <span className="text-yellow-600 uppercase block font-semibold tracking-widest">

          </span>
          <h2 className=" capitalize text-3xl md:text-4xl xl:text-5xl font-bold my-3">
            Need Help?
          </h2>
          <p className="text-lg leading-loose">
            Contact us to schedule a consultation or visit our retail outlet to explore our selection of premium goods.
          </p>
          {/* <Link href="/contact">
          <button className="mt-5 w-fit md:text-base text-sm hover:border-2 border-2 border-transparent font-semibold py-3 px-8 md:px-10 text-white bg-rose-700 hover:border-rose-700 hover:bg-yellow-600 hover:shadow-yellow-600 hover:shadow-2xl rounded-xl">
            Contact Us
          </button>
          </Link> */}
        </div>

        <div className="flex-1 relative w-full">
          <div className="md:before:w-full md:before:h-full md:before:absolute md:before:-bottom-24 lg:before:-bottom-20 xl:before:-right-5 lg:before:-right-12 md:before:-right-16 md:before:bg-right-bottom md:before:bg-contain md:before:bg-no-repeat before:-z-50 before:bg-none md:before:bg-[url('/videobg.png')]">
            <Image
              src={"https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
              width={300}
              height={300}
              alt="core features"
              className="object-cover w-full md:w-[90%] xl:w-4/5 rounded-lg"
            />
          </div>
        </div>
      </section>

    </>
  )
}
