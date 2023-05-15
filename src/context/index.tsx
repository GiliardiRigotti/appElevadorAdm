import React, { createContext, useCallback, useEffect, useState } from 'react'

import firestore from "@react-native-firebase/firestore"

import { ISignIn, IUser, IUserAuth } from '../interfaces/user';
import { INotification } from '../interfaces/notification';
import { ITip } from '../interfaces/tip';
import { showNotification } from '../utils/notification';

import auth from "@react-native-firebase/auth"

interface AppContextData {
    userAuth: IUser | null
    userSigned: boolean
    login: ({ email, password }: ISignIn) => Promise<boolean>
    logout: () => void
    findUser: ({ email, password }: ISignIn) => void
    forgotPassword: ({ email }: ISignIn) => Promise<boolean>
    createUser: (newUser: IUser) => Promise<boolean>
    updateUser: (id: string, updateUser: IUser) => Promise<boolean>
    deleteUser: (id: string) => Promise<boolean>
    createOrder: (newOrder: IOrder) => Promise<boolean>
    updateOrder: (id: string, updateOrder: IOrder) => Promise<boolean>
    deleteOrder: (id: string) => Promise<boolean>
    createTip: (newTip: ITip) => Promise<boolean>
    updateTip: (id: string, updateTip: ITip) => Promise<boolean>
    deleteTip: (id: string) => Promise<boolean>
    createNotification: (newNotification: INotification) => Promise<boolean>
    listUsers: IUser[]
    listNotifications: INotification[]
    listTips: ITip[]
    listOrders: IOrder[]
}

const AppContext = createContext({} as AppContextData)

function AppProvider({ children }: any) {
    const [userSigned, setUserSigned] = useState(false)
    const [userAuth, setUserAuth] = useState<IUser | null>(null)
    const [listUsers, setListUsers] = useState<IUser[]>([])
    const [listNotifications, setListNotifications] = useState<INotification[]>([])
    const [listTips, setListTips] = useState<ITip[]>([])
    const [listOrders, setListOrders] = useState<IOrder[]>([])

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

    const updateUser = useCallback(async (id: string, updatedUser: IUser) => {
        try {
            await firestore().collection('users').doc(`${id}`).update(updatedUser)
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

    const deleteUser = useCallback(async (id: string) => {
        try {
            await firestore().collection('users').doc(`${id}`).delete()
            showNotification({
                title: "Sucesso",
                description: "Deletado o usuario selecionado",
                duration: 2500,
                type: "success"
            })
            return true
        } catch (error) {
            showNotification({
                title: "Aviso",
                description: "Erro ao deletar o usuario deletado",
                duration: 2500,
                type: "error"
            })
            return false
        }
    }, [])

    const findUser = useCallback(async ({ email, password }: ISignIn) => {
        try {
            const users = await firestore().collection('users').where('email', '==', email).onSnapshot(async querySnapshot => {
                const data = querySnapshot.docs.map(docs => {
                    return {
                        id: docs.id,
                        ...docs.data()
                    }
                }) as IUser[]
                if(data[0].email == email && data[0].password == password){
                    await getListUsers()
                    await getListNotifications()
                    await getListTips()
                    await getListOrderOfService()
                    setUserSigned(true)
                    setUserAuth(data[0])
                }else{
                    showNotification({
                        title: "Aviso",
                        description: "Verifica seu email/ senha",
                        duration: 2500,
                        type: "error"
                    })
                }
            })
            return () => users();
        } catch (error) {
            showNotification({
                title: "Aviso",
                description: "Erro ao logar",
                duration: 2500,
                type: "error"
            })
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

    const updateTip = useCallback(async (id: string, updatedTip: ITip) => {
        try {
            await firestore().collection('users').doc(`${id}`).update(updatedTip)
            showNotification({
                title: "Sucesso",
                description: "Efetuado atualização da recomendação",
                duration: 2500,
                type: "success"
            })
            return true
        } catch (error) {
            showNotification({
                title: "Aviso",
                description: "Erro ao atualizar da recomendação",
                duration: 2500,
                type: "error"
            })
            return false
        }
    }, [])

    const deleteTip = useCallback(async (id: string) => {
        try {
            await firestore().collection('tips').doc(`${id}`).delete()
            showNotification({
                title: "Sucesso",
                description: "Deletado a recomendação",
                duration: 2500,
                type: "success"
            })
            return true
        } catch (error) {
            showNotification({
                title: "Aviso",
                description: "Erro ao deletar o recomendação",
                duration: 2500,
                type: "error"
            })
            return false
        }
    }, [])

    const createOrder = useCallback(async (newOrder: IOrder) => {
        try {
            await firestore().collection('orders').add({
                ...newOrder, created_at: new Date().toISOString()
            })
            showNotification({
                title: "Sucesso",
                description: "Aberto a ordem de serviço",
                duration: 2500,
                type: "success"
            })
            return true
        } catch (error) {
            showNotification({
                title: "Aviso",
                description: "Erro ao abrir a ordem de serviço",
                duration: 2500,
                type: "error"
            })
            return false
        }
    }, [])

    const updateOrder = useCallback(async (id: string, updatedOrder: IOrder) => {
        try {
            await firestore().collection('orders').doc(`${id}`).update(updatedOrder)
            showNotification({
                title: "Sucesso",
                description: "Efetuado atualização da ordem de serviço",
                duration: 2500,
                type: "success"
            })
            return true
        } catch (error) {
            showNotification({
                title: "Aviso",
                description: "Erro ao atualizar a ordem de serviço",
                duration: 2500,
                type: "error"
            })
            return false
        }
    }, [])

    const deleteOrder = useCallback(async (id: string) => {
        try {
            await firestore().collection('orders').doc(`${id}`).delete()
            showNotification({
                title: "Sucesso",
                description: "Deletado a ordem de serviço",
                duration: 2500,
                type: "success"
            })
            return true
        } catch (error) {
            showNotification({
                title: "Aviso",
                description: "Erro ao deletar a ordem de serviço",
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



    const getListNotifications = useCallback(async () => {
        try {
            const notifications = await firestore().collection('notifications').onSnapshot(querySnapshot => {
                const data = querySnapshot.docs.map(docs => {
                    return {
                        id: docs.id,
                        ...docs.data()
                    }
                }) as INotification[]

                //console.log(data)
                setListNotifications(data)
            })
            return () => notifications();
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

    const getListTips = useCallback(async () => {
        try {
            const tips = await firestore().collection('tips').onSnapshot(querySnapshot => {
                const data = querySnapshot.docs.map(docs => {
                    return {
                        id: docs.id,
                        ...docs.data()
                    }
                }) as ITip[]

                //console.log(data)
                setListTips(data)
            })
            return () => tips();
        } catch (error) {
            showNotification({
                title: "Aviso",
                description: "Erro ao pegar a lista das recomendações",
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

                //console.log(data)
                setListUsers(data)
            })
            return () => users();
        } catch (error) {
            showNotification({
                title: "Aviso",
                description: "Erro ao pegar a lista de usuarios",
                duration: 1500,
                type: "error"
            })
            return []
        }
    }, [])

    const getListOrderOfService = useCallback(async () => {
        console.log("Orders")
        try {
            const orders = await firestore().collection('orders').onSnapshot(querySnapshot => {
                const data = querySnapshot.docs.map(docs => {
                    return {
                        id: docs.id,
                        ...docs.data()
                    }
                }) as IOrder[]

                console.log(data)
                setListOrders(data)
            })
            return () => orders();
        } catch (error) {
            showNotification({
                title: "Aviso",
                description: "Erro ao pegar a lista de chamados",
                duration: 1500,
                type: "error"
            })
            return []
        }
    }, [])

    const login = useCallback(async ({ email, password }: ISignIn) => {
        try {
            await auth().signInWithEmailAndPassword(email, password)
            await getListUsers()
            await getListNotifications()
            await getListTips()
            await getListOrderOfService()
            return true
        } catch (error) {
            showNotification({
                title: "Aviso",
                description: "Verifica seu email ou senha se foi digitado corretamente",
                duration: 2500,
                type: "error"
            })
            return false
        }
    }, [])

    const logout = useCallback(async () => {
        setUserAuth(null)
        setUserSigned(false)
    }, [])

    const forgotPassword = useCallback(async ({ email }: ISignIn) => {
        try {
            await auth().sendPasswordResetEmail(email)
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
        <AppContext.Provider value={{ logout, userSigned, findUser, userAuth, login, listUsers, listNotifications, listTips, forgotPassword, createUser, createTip, createNotification, updateUser, deleteUser, updateTip, deleteTip, createOrder, deleteOrder, updateOrder, listOrders }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppProvider, AppContext }