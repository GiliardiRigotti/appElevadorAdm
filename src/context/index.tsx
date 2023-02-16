import React, { createContext, useCallback, useEffect, useState } from 'react'

import firestore from "@react-native-firebase/firestore"

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
    createUser: (newUser: IUser) => Promise<boolean>
    updateUser: (id: number, updateUser: IUser) => Promise<boolean>
    deleteUser: (id: number) => Promise<boolean>
    createTip: (newTip: ITip) => Promise<boolean>
    updateTip: (id: number, updateTip: ITip) => Promise<boolean>
    deleteTip: (id: number) => Promise<boolean>
    createNotification: (newNotification: INotification) => Promise<boolean>
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

    const createUser = useCallback(async (newUser: IUser) => {
        try {
            await firestore().collection('users').add({
                ...newUser, created_at: firestore.FieldValue.serverTimestamp()
            })
            showNotification({
                title: "Sucesso",
                description: "Efetuado o cadastro de usuario",
                duration: 2500,
                type: "success"
            })
            return true
        } catch (error) {
            console.log("Error: ", error)
            showNotification({
                title: "Aviso",
                description: "Erro ao cadastrar o usuario",
                duration: 2500,
                type: "error"
            })
            return false
        }
    }, [])

    const updateUser = useCallback(async (id: number, newUser: IUser) => {
        try {
            await firestore().collection('users')
            showNotification({
                title: "Sucesso",
                description: "Efetuado o cadastro de usuario",
                duration: 2500,
                type: "success"
            })
            return true
        } catch (error) {
            showNotification({
                title: "Aviso",
                description: "Erro ao cadastrar o usuario",
                duration: 2500,
                type: "error"
            })
            return false
        }
    }, [])

    const createTip = useCallback(async (newTip: ITip) => {
        try {
            await firestore().collection('tips').add(newTip)
            showNotification({
                title: "Sucesso",
                description: "Efetuado o cadastro da sugestão",
                duration: 2500,
                type: "success"
            })
            return true
        } catch (error) {
            showNotification({
                title: "Aviso",
                description: "Erro ao cadastrar a sugestão",
                duration: 2500,
                type: "error"
            })
            return false
        }
    }, [])

    const createNotification = useCallback(async (newNotification: INotification) => {
        try {
            await firestore().collection('notifications').add(newNotification)
            showNotification({
                title: "Sucesso",
                description: "Efetuado a enviar a notificação",
                duration: 2500,
                type: "success"
            })
            return true
        } catch (error) {
            showNotification({
                title: "Aviso",
                description: "Erro ao enviar a notificaçãoo",
                duration: 2500,
                type: "error"
            })
            return false
        }
    }, [])



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

    const getListUsers = useCallback(async () => {
        try {
            const users = await firestore().collection('users').onSnapshot(querySnapshot => {
                const data = querySnapshot.docs.map(docs => {
                    return {
                        id: docs.id,
                        ...docs.data()
                    }
                }) as IUser[]

                console.log(data)
                setListUsers(data)
            })
            return () => users();
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
        try {
            const { user } = await auth().signInWithEmailAndPassword(username, password)
            const listUser = await getListUsers()
            console.log(listUser)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }, [])

    const forgotPassword = useCallback(async ({ username }: ISignIn) => {
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
        <AppContext.Provider value={{ userAuth, login, listUsers, listNotifications, listTips, forgotPassword, createUser, createTip, createNotification }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppProvider, AppContext }