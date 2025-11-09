type Pokemon = {
    name: string
    id: number
    image: string
    types: string[]
    width: number
    height: number
}

type Pagination = {
    total: number
    total_page: number
    current_page: number
    limit: number
}

type Carousel = {
    id: number
    image: string
}

export type { Pokemon, Pagination, Carousel };