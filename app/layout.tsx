import { Inter } from 'next/font/google'
import './globals.css'
import StoreProvider from '@/app/store-provider'
import { getCategories } from '@/lib/features/categories/categoriesSlice'
import { store } from '@/lib/store'
import { cookies } from 'next/headers'

const inter = Inter({ subsets: ['latin'] })

import { Header } from '@/lib/components/shared/layout/header/header'
import { Footer } from '@/lib/components/shared/layout/footer'
import { Alert } from '@/lib/components/shared/alert'
import { Cookies } from '@/lib/components/shared/cookies'

import { getProducts } from '@/lib/features/products/productsSlice'
import { getUser, setUser } from '@/lib/features/auth/authSlice'
import { IUser } from '@/lib/definitions'
import { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: "Best Online Shopping Store | Free Shipping | 100% Refund",
  description: "Shop online for Electronics, Fashion, Home & Kitchen, Beauty & Grooming, Health, Toys, Baby, Books, Sports, etc. on desertcart. ✓Secure Shopping Platform ✓70M+ Products ✓FREE Delivery ✓FREE Returns",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  await store.dispatch(getCategories());
  await store.dispatch(getProducts());

  const { categories } = store.getState().categories;
  const { products } = store.getState().products;

  const cookieStore = cookies()
  const token = cookieStore.get('token')
  let user: null | IUser = null;

  if (token && token.value) {
    await store.dispatch(getUser(token.value as string)).unwrap().then((res: IUser) => {
      user = res;
      store.dispatch(setUser(res));
    })
  }

  return (
    <html lang="en">
      <head><link rel="icon" href="/favicon.png" /></head>
      <body className={inter.className}>
        <StoreProvider preloadedState={{
          categories: {
            categories
          },
          products: {
            products
          },
          auth: {
            user
          }
        }}>
          <div className="app bg-white dark:bg-gray-900">
            <Header />

            {children}

            <Footer categories={categories} />

            <Alert />

            <Cookies />
          </div>
        </StoreProvider>
      </body>
    </html >
  )
}