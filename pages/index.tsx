import { useState, useEffect, useCallback } from 'react'
import axios from "axios";
import useInfiniteScroll from 'react-infinite-scroll-hook';

import SearchBar from '../components/SearchBar'
import PokemonCard from '../components/PokemonCard'
import { Pokemon, Pagination, Carousel } from '../types';

export default function Home() {
    const [q, setQ] = useState<string>('')
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [pokemons, setPokemons] = useState<Pokemon[]>([])
    const [pagination, setPagination] = useState<Pagination>({
        total: 0,
        total_page: 0,
        current_page: 1,
        limit: 18,
    })
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any>(null)
    const [carouselApi, setCarouselApi] = useState<any>(null)
    const [carousel, setCarousel] = useState<Carousel[]>([
        { id: 0, image: 'https://picsum.photos/seed/banner1/600/200' },
        { id: 1, image: 'https://picsum.photos/seed/banner2/600/200' },
        { id: 2, image: 'https://picsum.photos/seed/banner3/600/200' },
    ])

    useEffect(() => {
        const interval = setInterval(() => {
            setCarouselApi((prev: number) => {
                const next = prev === null ? 0 : (prev + 1) % carousel.length
                return next
            })
        }, 3000) // Change slide every 3 seconds

        return () => clearInterval(interval)
    }, [carousel.length])

    useEffect(() => {
        setCarouselApi(0)
    }, [])

    const fetchPokemons = useCallback(async (page: number, isLoadMore = false) => {
        try {
            setLoading(true)
            setError(null)
            const listRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pokemons`, {
                params: {
                    page: page,
                    limit: pagination.limit,
                    ...(q && { name: q })
                }
            })
            const listData = listRes.data.data.result
            const paginationData = listRes.data.data.pagination

            if (isLoadMore) {
                setPokemons(prev => [...prev, ...listData])
            } else {
                setPokemons(listData)
            }

            setPagination(prev => ({
                ...prev,
                total: paginationData.total,
                total_page: paginationData.total_page,
                current_page: page
            }))
        } catch (error) {
            console.error('Error fetching pokemons:', error)
            setError(error)
        } finally {
            setLoading(false)
        }
    }, [searchQuery, pagination.limit])

    const handleSearch = () => {
        setSearchQuery(q)
    }

    useEffect(() => {
        fetchPokemons(1, false)
    }, [searchQuery])

    const hasNextPage = pagination.current_page < pagination.total_page

    const loadMore = () => {
        if (!loading && hasNextPage) {
            fetchPokemons(pagination.current_page + 1, true)
        }
    }

    const [infiniteRef] = useInfiniteScroll({
        loading,
        hasNextPage,
        onLoadMore: loadMore,
        disabled: Boolean(error),
        rootMargin: '0px 0px 400px 0px',
    })

    return (
        <main className=" w-full min-h-[100%] h-full p-6 overflow-auto flex flex-col gap-6">
            <>
                {/* Top Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                    <div className="lg:col-span-9 h-full min-h-[200px]">
                        <div className="relative w-full h-full min-h-[100%] overflow-hidden rounded-md">
                            {carousel.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="absolute inset-0 transition-opacity duration-1000"
                                    style={{
                                        opacity: carouselApi === index ? 1 : 0,
                                        pointerEvents: carouselApi === index ? 'auto' : 'none'
                                    }}
                                >
                                    <img
                                        src={item.image}
                                        alt={`Banner ${item.id}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                            {/* Navigation Dots */}
                            <div className="absolute bottom-4 left-1/2 transform flex gap-2">
                                {carousel.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCarouselApi(index)}
                                        className={`w-2 h-2 rounded-full transition-all ${carouselApi === index
                                            ? 'bg-white w-6'
                                            : 'bg-white/50 hover:bg-white/75'
                                            }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-3 flex flex-col gap-4 h-full min-h-[200px]">
                        <img src='https://picsum.photos/seed/banner1/600/200' alt='Static Banner' className="w-full h-full object-cover" />
                        <img src='https://picsum.photos/seed/banner2/600/200' alt='Static Banner' className="w-full h-full object-cover " />
                    </div>
                </div>

                {/* Middle Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-[100%] h-full relative">
                    <aside className="absolute top-[100px] w-[10%] lg:w-full lg:col-span-1 lg:static lg:min-h-[100%] lg:h-full">
                        <img src='https://picsum.photos/seed/left/300/600' alt='Static Banner' className="w-full h-full object-cover" />
                    </aside>

                    <section className="lg:col-span-8 min-h-[100%] h-full overflow-hidden gap-3 flex flex-col">
                        <SearchBar value={q} onChange={(e) => setQ(e.target.value)} onSearch={handleSearch} />

                        <div className="h-full overflow-y-auto ">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                {pokemons.map(p => (
                                    <PokemonCard key={p.name} p={p} />
                                ))}
                            </div>
                            {(loading || hasNextPage) && (
                                <div ref={infiniteRef} className="flex justify-center py-4">
                                    {loading && (
                                        <div className="text-gray-600">Loading more...</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </section>

                    <aside className="absolute top-[100px] w-[10%] right-0 lg:w-full lg:col-span-3 lg:static lg:min-h-[100%] lg:h-full">
                        <img src='https://picsum.photos/seed/left/300/600' alt='Static Banner' className="w-full h-full object-cover" />
                    </aside>
                </div>
            </>
        </main>
    )
}
