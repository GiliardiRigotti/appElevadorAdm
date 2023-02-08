import React, { createContext, useCallback, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ISignIn, IUser, IUserAuth } from '../interfaces/user';
import { INotification } from '../interfaces/notification';
import { ITip } from '../interfaces/tip';
import { api, urls } from '../services/api';
import { showNotification } from '../utils/notification';

interface AppContextData {
    user: IUser | null
    userAuth: IUserAuth | null
    login: ({ username, password }: ISignIn) => Promise<boolean>
    createUser: ({ }) => Promise<boolean>
    updateUser: (id: number) => Promise<boolean>
    deleteUser: (id: number) => Promise<boolean>
    listUsers: IUser[]
    listNotifications: INotification[]
    listTips: ITip[]
}

const AppContext = createContext({} as AppContextData)

function AppProvider({ children }: any) {
    const [userAuth, setUserAuth] = useState<IUserAuth | null>(null)
    const [listUsers, setListUsers] = useState<IUser[]>([])
    const [listNotifications, setListNotifications] = useState<INotification[]>([])
    const [listTips, setListTips] = useState<ITip[]>([])

    const mockupUsers: IUser[] = [
        {
            name: "Cond. Beira Mar",
            address: "Rua abc",
            number: "123",
            district: "Centro",
            city: "Baln. Piçarras",
            email: "joao@email.com",
            phone: "(47)99999-9999"
        },
        {
            name: "Res. Jardim Belo",
            address: "Rua def",
            number: "456",
            district: "Itacolomi",
            city: "Baln. Piçarras",
            email: "paulo@email.com",
            phone: "(47)99999-8888"
        },
        {
            name: "Ed. Osvaldo",
            address: "Rua ghi",
            number: "789",
            district: "Santo Antonio",
            city: "Baln. Piçarras",
            email: "adalberto@email.com",
            phone: "(47)99999-7777"
        },
        {
            name: "Cond. Horizonte",
            address: "Rua jlm",
            number: "1011",
            district: "Nossa Senhora de Fatima",
            city: "Baln. Piçarras",
            email: "pedro@email.com",
            phone: "(47)99999-6666"
        },

    ]

    const mockupNotifications: INotification[] = [
        {
            title: "Aviso!",
            description: "Tempestade se aproximando, tente não usar o elevador"
        },
        {
            title: "Aviso!",
            description: "Passou o prazo para da manutenção preventiva!"
        },
        {
            title: "Aviso!",
            description: "Pagamento em atraso"
        },
    ]

    const mockupTips: ITip[] = [
        {
            title: "Recomendações em mal tempo?",
            description: "Em caso de mal tempo tiver muita ttrovoada, não se recomenda a utilização do elevador"
        },
        {
            title: "Caso de excesso de peso e o elevador parar?",
            description: "Neste caso, se recomenda em aguardar o reinicio do elevador e ele descera no andar abaixo e descer as pessoas e ligar para o tecnico para averiguação se houve algum dano no elevador"
        },
        {
            title: "Recomendações em quais produtos de limpeza eu posso usar para limpar elevador?",
            description: "Recomendado usar pano umido para limpeza e limpa vidro para limpar o espelho"
        }


    ]

    const getListNotifications = useCallback(async (): Promise<INotification[]> => {
        try {
            const { data } = await api.get(urls.notification)
            return data
        } catch (error) {
            showNotification({
                title: "Aviso",
                description: "Erro ao pegar a lista das notificações",
                duration: 1500,
                type: "error"
            })
            return []
        }
    }, [])

    const getListUsers = useCallback(async (): Promise<IUser[]> => {
        try {
            const { data } = await api.get(urls.user)
            return data
        } catch (error) {
            showNotification({
                title: "Aviso",
                description: "Erro ao pegar a lista das notificações",
                duration: 1500,
                type: "error"
            })
            return []
        }
    }, [])

    const login = useCallback(async ({ username, password }: ISignIn) => {
        console.log("login")
        const { data } = await api.post(urls.login, {username, password})
            console.log(data)
        /* try {
            
             setUserAuth({ name: data.name, jwt: data.refreshToken.id })
            const users: IUser[] = await getListUsers() || []
            const notifications: INotification[] = await getListNotifications() || []
            console.log(notifications)
            setListUsers(users)
            setListNotifications(notifications)
            setListTips(mockupTips) 
            return true
        } catch (error) {
            console.log(error)
            return false
        } */
    }, [])

    return (
        <AppContext.Provider value={{ userAuth, login, listUsers, listNotifications, listTips }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppProvider, AppContext }