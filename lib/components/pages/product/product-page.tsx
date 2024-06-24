'use client'

import { RootState } from "@/lib/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Filters as ProductFilters } from "@/lib/components/product/filters"
import { Card as ProductCard } from "@/lib/components/product/card"
import { BRANDS, COLORS, RATINGS, SIZES } from "@/lib/utils/constants";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { IProduct } from "@/lib/definitions";


interface IFilters {
    categories: {
        name: string;
        value: string;
        type: string;
        checked: boolean;
    }[];
    brands: {
        name: string;
        value: string;
        type: string;
        checked: boolean;
    }[];
    size: {
        name: string;
        value: string;
        type: string;
        checked: boolean;
    }[];
    color: {
        name: string;
        value: string;
        type: string;
        checked: boolean;
    }[];
    rating: {
        name: string;
        value: string;
        type: string;
        checked: boolean;
    }[];
}

export const ProductPage = () => {
    const router = useRouter();
    const pathname = usePathname();

    const { products } = useSelector((state: RootState) => state.products);
    const { categories } = useSelector((state: RootState) => state.categories);

    const [grid, setGrid] = useState(false)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [filteredProducts, setFilteredProducts] = useState([])
    const [totalProducts, setTotalProducts] = useState(0)
    const [filters, setFilters] = useState({} as IFilters)



    let defaultFilters = {
        categories: categories.map((category) => ({
            name: category,
            value: category,
            type: 'select',
            checked: false
        })),
        brands: BRANDS.map((brand) => ({
            ...brand,
            type: 'select',
            checked: false
        })),
        size: SIZES.map((size) => ({
            ...size,
            type: 'size',
            checked: false
        })),
        color: COLORS.map((color) => ({
            ...color,
            type: 'color',
            checked: false
        })),
        rating: RATINGS.map((rating) => ({
            ...rating,
            type: 'rating',
            checked: false
        }))
    };

    const searchParams = useSearchParams();
    const categoryQuery = searchParams.get('category');

    if (categoryQuery) {
        if (categoryQuery.includes(',')) {
            categoryQuery.split(',').map((category) => {
                defaultFilters.categories = defaultFilters.categories.map((categoryItem) => {
                    if (categoryItem.value === category) {
                        categoryItem.checked = true;
                    }
                    return categoryItem;
                });
            })
        }
        defaultFilters.categories = defaultFilters.categories.map((categoryItem) => {
            if (categoryItem.value === categoryQuery) {
                categoryItem.checked = true;
            }
            return categoryItem;
        });
    }


    useEffect(() => {
        setFilteredProducts(JSON.parse(JSON.stringify(products)))
        setFilters(JSON.parse(JSON.stringify(defaultFilters)))
    }, [])

    useEffect(() => {
        if (categoryQuery) {
            setFilters(JSON.parse(JSON.stringify(defaultFilters)));
        }
    }, [categoryQuery]);


    useEffect(() => {
        setTotalProducts(filteredProducts.length);
    }, [filteredProducts])



    const filterProducts = () => {
        const _products = JSON.parse(JSON.stringify(products));
        setFilteredProducts(_products.filter((product: IProduct) => {
            const selectedCategories = filters.categories.filter((x) => x.checked).map((x) => x.value);
            const selectedBrands = filters.brands.filter((x) => x.checked).map((x) => x.value);
            const selectedSizes = filters.size.filter((x) => x.checked).map((x) => x.value);
            const selectedColors = filters.color.filter((x) => x.checked).map((x) => x.value);
            const selectedRatings = filters.rating.filter((x) => x.checked).map((x) => x.value);

            const categoryPass =
                !selectedCategories.length || selectedCategories.includes(product.category);
            const brandPass = !selectedBrands.length || selectedBrands.includes(product.brand);
            const sizePass = !selectedSizes.length || selectedSizes.some((size) => product.size === size);
            const colorPass =
                !selectedColors.length || selectedColors.some((color) => product.color === color);

            const ratingPass =
                !selectedRatings.length ||
                selectedRatings.some((rating) => Math.round(product.rating.rate) === parseInt(rating));

            return categoryPass && brandPass && sizePass && colorPass && ratingPass;
        }));
    };

    useEffect(() => {
        if (Object.keys(filters).length > 0) {
            filterProducts();
        }
    }, [filters]);

    const handleFilterChange = (filters: IFilters) => {
        setUrlParams(filters);
        setFilters({ ...filters });
    };

    const setUrlParams = (filters: IFilters) => {
        const checkedCategories = filters.categories.filter((x) => x.checked);
        const params = new URLSearchParams(searchParams);

        if (checkedCategories.length > 0) {
            params.set('category', checkedCategories.map((x) => x.value).join(','));
        } else {
            params.delete('category');
        }
        const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
        window.history.replaceState({}, '', newUrl);
    }

    const clearFilters = () => {
        setUrlParams(defaultFilters);
        setFilters(JSON.parse(JSON.stringify(defaultFilters)));
    };

    const handleDrawerClick = () => {
        setIsDrawerOpen(!isDrawerOpen);
        document.body.classList.toggle('overflow-hidden');
    };

    return (
        <>
            <hr />
            {Object.keys(filters).length > 0 && (
                <div className="container grid grid-cols-2 items-start gap-6 pb-16 pt-4 md:grid-cols-4">
                    <div className="text-center md:hidden">
                        <button
                            className="mb-2 mr-2 block rounded-lg px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 md:hidden"
                            type="button"
                            data-drawer-target="drawer-example"
                            data-drawer-show="drawer-example"
                            aria-controls="drawer-example"
                            onClick={handleDrawerClick}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-filter"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
                                />
                            </svg>
                        </button>
                    </div>

                    <div
                        className={`fixed left-0 top-0 z-40 h-screen w-80 overflow-y-auto border border-gray-200 bg-white shadow transition-transform dark:border-gray-600 dark:bg-gray-900 ${isDrawerOpen
                            ? 'right-0'
                            : '-translate-x-full'}`}
                        aria-labelledby="drawer-label"
                    >
                        <div className="sticky top-0 bg-white px-4 pb-2 pt-4 dark:bg-gray-900">
                            <h5
                                id="drawer-label"
                                className="inline-flex items-center text-base font-semibold text-gray-500 dark:text-gray-400"
                            >
                                <svg
                                    className="mr-2 h-5 w-5"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                ><path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                    clipRule="evenodd"
                                ></path>
                                </svg>
                                Filters
                            </h5>
                            <button
                                type="button"
                                className="absolute right-2.5 top-2.5 inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={handleDrawerClick}
                            >
                                <svg
                                    aria-hidden="true"
                                    className="h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                ><path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                                </svg>
                                <span className="sr-only">Close menu</span>
                            </button>
                        </div>

                        {/* <ProductFilters onFilterChange={handleFilterChange} filters={filters} /> */}
                    </div>
                    <div
                        className={`fixed inset-0 z-30 bg-gray-900/50 dark:bg-gray-900/80 ${isDrawerOpen
                            ? 'd-block'
                            : 'hidden'}`}
                        onClick={handleDrawerClick}
                    ></div>

                    {/* <div
                        className="hidden rounded border border-gray-200 bg-white shadow dark:border-gray-600 dark:bg-gray-900 md:block"
                    >
                        <ProductFilters onFilterChange={handleFilterChange} filters={filters} />
                    </div> */}

                    <div className="col-span-3">
                        {totalProducts > 0 && (
                            <div className="mb-4 flex items-center">
                                <p className="dark:text-gray-300">{totalProducts + 15} Products Showing</p>
                                <div className="ml-auto flex gap-2">
                                    <div
                                        className={`${grid
                                            ? 'border-primary bg-primary text-white'
                                            : ' border-gray-300 text-gray-600'}
                                    flex h-9 w-10 cursor-pointer items-center justify-center rounded border dark:text-white`}
                                        onClick={() => {
                                            setGrid(true);
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                d="M6 1v3H1V1zM1 0a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm14 12v3h-5v-3zm-5-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zM6 8v7H1V8zM1 7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zm14-6v7h-5V1zm-5-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1z"
                                            />
                                        </svg>
                                    </div>
                                    <div
                                        className={`${!grid
                                            ? 'bg-primary text-white'
                                            : 'border border-gray-300 text-gray-600'} flex h-9 w-10 cursor-pointer items-center justify-center rounded border dark:text-white`}
                                        onClick={() => {
                                            setGrid(false);
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.5 11.5A.5.5 0 0 1 5 11h10a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5m-2-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m-2-4A.5.5 0 0 1 1 3h10a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        )}

                        {totalProducts < 1 && (
                            <div className="flex h-96 flex-col items-center justify-center">
                                <p className="text-2xl font-semibold text-gray-500 dark:text-gray-300">No products found</p>
                                <button
                                    className="ml-2 block text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                                    onClick={clearFilters}
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}

                        <div className={`grid grid-cols-1 gap-6 ${grid ? 'sm:grid-cols-2 xl:grid-cols-3' : ''}`}>
                            {
                                filteredProducts.map((product, i) => {
                                    return (
                                        <ProductCard product={product} grid={grid} key={`product-${i}`} />
                                    )
                                })
                            }
                        </div>

                        <div className={`grid grid-cols-1 gap-6 ${grid ? 'sm:grid-cols-2 xl:grid-cols-3' : ''}`}>
                            {[
                                {
                                    "id": 1,
                                    "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 2 Laptops",
                                    "price": 109.95,
                                    "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
                                    "category": "electronics",
                                    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
                                    "rating": {
                                        "rate": 3.9,
                                        "count": 120
                                    },
                                    "color": "yellow",
                                    "size": "xs",
                                    "quantity": 1,
                                    "brand": "apple"
                                },
                                {
                                    "id": 2,
                                    "title": "Samsung Galaxy S21 Ultra",
                                    "price": 999.99,
                                    "description": "Samsung Galaxy S21 Ultra with 108MP camera, 100x space zoom, and 6.8-inch display.",
                                    "category": "electronics",
                                    "image": "https://m.media-amazon.com/images/I/610KvwSCMYL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
                                    "rating": {
                                        "rate": 4.7,
                                        "count": 3400
                                    },
                                    "color": "black",
                                    "size": "large",
                                    "quantity": 1,
                                    "brand": "samsung"
                                },
                                {
                                    "id": 3,
                                    "title": "Sony WH-1000XM4 Wireless Noise-Canceling Headphones",
                                    "price": 349.99,
                                    "description": "Industry-leading noise canceling with Dual Noise Sensor technology. Next-level music with Edge-AI, co-developed with Sony Music Studios Tokyo.",
                                    "category": "electronics",
                                    "image": "https://m.media-amazon.com/images/I/51DkbWZIg+L._AC_UY218_.jpg",
                                    "rating": {
                                        "rate": 4.8,
                                        "count": 5000
                                    },
                                    "color": "black",
                                    "size": "one size",
                                    "quantity": 1,
                                    "brand": "sony"
                                },
                                {
                                    "id": 4,
                                    "title": "Apple MacBook Pro 13-inch",
                                    "price": 1299.99,
                                    "description": "Apple MacBook Pro 13-inch with M1 chip, 8GB RAM, and 256GB SSD.",
                                    "category": "electronics",
                                    "image": "https://m.media-amazon.com/images/I/61L5QgPvgqL.__AC_SY445_SX342_QL70_FMwebp_.jpg",
                                    "rating": {
                                        "rate": 4.9,
                                        "count": 2300
                                    },
                                    "color": "silver",
                                    "size": "13-inch",
                                    "quantity": 1,
                                    "brand": "apple"
                                },
                                {
                                    "id": 5,
                                    "title": "Canon EOS R5",
                                    "price": 3899.99,
                                    "description": "Canon EOS R5 full-frame mirrorless camera with 8K video recording and 45MP resolution.",
                                    "category": "electronics",
                                    "image": "https://m.media-amazon.com/images/I/71hpUUcC5uL._AC_UY218_.jpg",
                                    "rating": {
                                        "rate": 4.6,
                                        "count": 1200
                                    },
                                    "color": "black",
                                    "size": "full-frame",
                                    "quantity": 1,
                                    "brand": "canon"
                                },
                                {
                                    "id": 6,
                                    "title": "Nintendo Switch",
                                    "price": 299.99,
                                    "description": "Nintendo Switch with neon blue and red Joy-Con. Handheld gaming console with 6.2-inch screen.",
                                    "category": "electronics",
                                    "image": "https://m.media-amazon.com/images/I/61-PblYntsL._SL1500_.jpg",
                                    "rating": {
                                        "rate": 4.8,
                                        "count": 8000
                                    },
                                    "color": "multicolor",
                                    "size": "one size",
                                    "quantity": 1,
                                    "brand": "nintendo"
                                },
                                {
                                    "id": 7,
                                    "title": "Samsung 49-Inch Odyssey G9 Gaming Monitor",
                                    "price": 1399.99,
                                    "description": "Samsung 49-Inch Odyssey G9 Gaming Monitor with 240Hz refresh rate, 1000R curved screen, and QLED panel.",
                                    "category": "electronics",
                                    "image": "https://m.media-amazon.com/images/I/81r8JazRcoL._AC_SL1500_.jpg",
                                    "rating": {
                                        "rate": 3.6,
                                        "count": 1200
                                    },
                                    "color": "black",
                                    "size": "49-inch",
                                    "quantity": 1,
                                    "brand": "samsung"
                                },
                                {
                                    "id": 8,
                                    "title": "Nintendo Switch OLED Model",
                                    "price": 349.99,
                                    "description": "Nintendo Switch OLED Model with 7-inch OLED screen, enhanced audio, and 64GB internal storage.",
                                    "category": "electronics",
                                    "image": "https://m.media-amazon.com/images/I/41bicWJ2fbL._SY300_SX300_QL70_FMwebp_.jpg",
                                    "rating": {
                                        "rate": 3.8,
                                        "count": 1500
                                    },
                                    "color": "white",
                                    "size": "one size",
                                    "quantity": 1,
                                    "brand": "nintendo"
                                },
                                {
                                    "id": 9,
                                    "title": "Apple iPad Pro 12.9-inch",
                                    "price": 1099.00,
                                    "description": "Apple iPad Pro 12.9-inch with M1 chip, 128GB storage, and Liquid Retina XDR display.",
                                    "category": "electronics",
                                    "image": "https://m.media-amazon.com/images/I/81FH2j7EnJL._AC_SL1500_.jpg",
                                    "rating": {
                                        "rate": 4,
                                        "count": 2500
                                    },
                                    "color": "space gray",
                                    "size": "12.9-inch",
                                    "quantity": 1,
                                    "brand": "apple"
                                },
                                {
                                    "id": 10,
                                    "title": "Sony PlayStation 5 Console",
                                    "price": 499.99,
                                    "description": "Sony PlayStation 5 Console with Ultra HD Blu-ray disc drive, 825GB SSD, and DualSense wireless controller.",
                                    "category": "electronics",
                                    "image": "https://m.media-amazon.com/images/I/51fM0CKG+HL._AC_UY218_.jpg",
                                    "rating": {
                                        "rate": 4.9,
                                        "count": 6800
                                    },
                                    "color": "white",
                                    "size": "825GB",
                                    "quantity": 1,
                                    "brand": "sony"
                                },
                                {
                                    "id": 11,
                                    "title": "Anker PowerCore 26800 Portable Charger",
                                    "price": 59.99,
                                    "description": "Anker PowerCore 26800 Portable Charger with 26800mAh capacity, PowerIQ and VoltageBoost technology.",
                                    "category": "electronics",
                                    "image": "https://m.media-amazon.com/images/I/61vj2BPDpuL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
                                    "rating": {
                                        "rate": 4,
                                        "count": 18000
                                    },
                                    "color": "black",
                                    "size": "26800mAh",
                                    "quantity": 1,
                                    "brand": "anker"
                                },
                                {
                                    "id": 12,
                                    "title": "Logitech G Pro X Superlight Wireless Gaming Mouse",
                                    "price": 149.99,
                                    "description": "Logitech G Pro X Superlight Wireless Gaming Mouse with HERO 25K sensor, 25,600 DPI, and ultra-lightweight design.",
                                    "category": "electronics",
                                    "image": "https://m.media-amazon.com/images/I/51uy8gOG-iL._AC_UY218_.jpg",
                                    "rating": {
                                        "rate": 4.8,
                                        "count": 4200
                                    },
                                    "color": "black",
                                    "size": "one size",
                                    "quantity": 1,
                                    "brand": "logitech"
                                },
                                {
                                    "id": 13,
                                    "title": "Samsung QN90A Neo QLED 4K Smart TV",
                                    "price": 1997.99,
                                    "description": "Samsung QN90A Neo QLED 4K Smart TV with Quantum Matrix Technology, Neo Quantum Processor 4K, and Object Tracking Sound.",
                                    "category": "electronics",
                                    "image": "https://m.media-amazon.com/images/I/71VDnA2bx6L._AC_UY218_.jpg",
                                    "rating": {
                                        "rate": 3.8,
                                        "count": 1500
                                    },
                                    "color": "black",
                                    "size": "65-inch",
                                    "quantity": 1,
                                    "brand": "samsung"
                                },
                                {
                                    "id": 14,
                                    "title": "GoPro HERO9 Black",
                                    "price": 379.99,
                                    "description": "GoPro HERO9 Black with 5K video recording, 20MP photos, and HyperSmooth 3.0 stabilization.",
                                    "category": "electronics",
                                    "image": "https://m.media-amazon.com/images/I/81Szbr4wo5L._AC_UY218_.jpg",
                                    "rating": {
                                        "rate": 4.2,
                                        "count": 5600
                                    },
                                    "color": "black",
                                    "size": "one size",
                                    "quantity": 1,
                                    "brand": "gopro"
                                },
                                {
                                    "id": 15,
                                    "title": "Bose SoundLink Revolve+ Portable Bluetooth Speaker",
                                    "price": 299.00,
                                    "description": "Bose SoundLink Revolve+ Portable Bluetooth Speaker with 360-degree sound, water-resistant design, and up to 16 hours of battery life.",
                                    "category": "electronics",
                                    "image": "https://m.media-amazon.com/images/I/61+DpMdBNJL._AC_UY218_.jpg",
                                    "rating": {
                                        "rate": 4.3,
                                        "count": 2500
                                    },
                                    "color": "triple black",
                                    "size": "one size",
                                    "quantity": 1,
                                    "brand": "bose"
                                }
                            ].map((product, i) => (
                                <ProductCard product={product} grid={grid} key={`product-${i}`} />
                            ))}
                        </div>
                    </div>
                </div >
            )}
        </>
    )
}