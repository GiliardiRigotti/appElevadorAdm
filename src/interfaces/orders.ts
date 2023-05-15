interface IOrder {
    id: string,
    idClient: string
    title: string
    description: string
    solution?: string
    items?: IItems[]
    status?: 'aberto' | 'em andamento' | 'finalizado'
    laborPrice?: number
    create_at?: {
        seconds: number,
        nanoseconds: number
    }
    close_at?: {
        seconds: number,
        nanoseconds: number
    }
}

interface IItems {
    name: string
    amount: number
    price: number
}