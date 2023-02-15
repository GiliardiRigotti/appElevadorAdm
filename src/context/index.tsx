import React, { createContext, useCallback, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ISignIn, IUser, IUserAuth } from '../interfaces/user';
import { INotification } from '../interfaces/notification';
import { ITip } from '../interfaces/tip';
import { api, urls } from '../services/api';
import { showNotification } from '../utils/notification';

import auth from "@react-native-firebase/auth"

interface AppContextData {
    user: IUser | null
    userAuth: IUserAuth | null
    login: ({ username, password }: ISignIn) => Promise<boolean>
    forgotPassword: ({ username }: ISignIn) => Promise<boolean>
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
        try {
            const {user} = await auth().signInWithEmailAndPassword(username, password)
            console.log(user)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }, [])

    const forgotPassword = useCallback(async ({ username }: ISignIn) => {
        console.log("login")
        try {
            await auth().sendPasswordResetEmail(username)
            showNotification({
                title: "Aviso",
                description: "Enviado email para redefinição da senha",
                duration: 2000,
                type: "success"
            })
            return true
        } catch (error) {
            console.log(error)
            showNotification({
                title: "Aviso",
                description: "Verifique seu email",
                duration: 2000,
                type: "error"
            })
            return false
        }
    }, [])

    return (
        <AppContext.Provider value={{ userAuth, login, listUsers, listNotifications, listTips }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppProvider, AppContext }