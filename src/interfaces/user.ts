export interface IUser {
    name: string
    phone: string
    email: string
    city: string
    district: string
    address: string
    number: string
    password: string
}

export interface IUserAuth {
    name: string
    jwt: string
}

export interface ISignIn {
    username: string | null
    password: string | null
}