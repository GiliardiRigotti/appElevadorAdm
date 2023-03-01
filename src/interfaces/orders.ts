interface IOrder {
    id: string,
    idClient: string
    title: string
    description: string
    solution?: string
    items?: IItems[]
    status?: 'aberto' | 'em andamento' | 'finalizado'
    laborPrice?: number
    create_at?: string
    close_at?: string | null
}

interface IItems {
    name: string
    amount: number
    price: number
}