import { Logo } from '@/lib/components/shared/logo'
import { TCategories } from '@/lib/definitions'
import Link from 'next/link'


export const Footer = ({ categories }: { categories: TCategories }) => {

	return (<>
		<footer className="mt-auto bg-rose-700 py-16">
			<div className="container mx-auto">
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
					<div>
						<Link className="block text-white uppercase font-extrabold" href="/">
							GoldBook
						</Link>

						<p
							className="mt-6 max-w-md text-center leading-relaxed text-white dark:text-white sm:max-w-xs sm:text-left"
						>
							Your go-to app for unbeatable shopping deals. Explore a world of savings today!
						</p>

					</div>

					<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2">
						<div className="text-center sm:text-left">
							<p className="text-lg font-medium text-white dark:text-white">About Us</p>

							<ul className="mt-8 space-y-4 text-sm">
								<li>
									<Link
										className="capitalize text-white transition hover:text-white/75 dark:text-white dark:hover:text-white/75"
										href="/company-history"
									>
										Company History
									</Link>
								</li>

								<li>
									<Link
										className="capitalize text-white transition hover:text-white/75 dark:text-white dark:hover:text-white/75"
										href="/contact-us"
									>
										Contact Us
									</Link>
								</li>
							</ul>
						</div>

					</div>
				</div>

				<div className="mt-12 border-t border-white pt-6 dark:border-white">
					<div className="text-center sm:flex sm:justify-between sm:text-left">
						<p className="text-sm text-white dark:text-white">
							<span className="block sm:inline">All rights reserved &copy; Goldbook</span>
						</p>

						{/* <p className="mt-4 text-sm text-white dark:text-white sm:order-first sm:mt-0">
							
						</p> */}
					</div>
				</div>
			</div>
		</footer>
	</>
	)
}

