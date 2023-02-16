import React, { createContext, useCallback, useEffect, useState } from 'react'

import firestore from "@react-native-firebase/firestore"

import { ISignIn, IUser, IUserAuth } from '../interfaces/user';
import { INotification } from '../interfaces/notification';
import { ITip } from '../interfaces/tip';
import { showNotification } from '../utils/notification';

import auth from "@react-native-firebase/auth"

interface AppContextData {
    userAuth: IUserAuth | null
    login: ({ email, password }: ISignIn) => Promise<boolean>
    forgotPassword: ({ email }: ISignIn) => Promise<boolean>
    createUser: (newUser: IUser) => Promise<boolean>
    updateUser: (id: string, updateUser: IUser) => Promise<boolean>
    deleteUser: (id: string) => Promise<boolean>
    createTip: (newTip: ITip) => Promise<boolean>
    updateTip: (id: string, updateTip: ITip) => Promise<boolean>
    deleteTip: (id: string) => Promise<boolean>
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
                description: "Deletado a recomendação selecionado",
                duration: 2500,
                type: "success"
            })
            return true
        } catch (error) {
            showNotification({
                title: "Aviso",
                description: "Erro ao deletar o recomendação deletado",
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

                console.log(data)
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

                console.log(data)
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

                console.log(data)
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

    const login = useCallback(async ({ email, password }: ISignIn) => {
        try {
            await auth().signInWithEmailAndPassword(email, password)
            await getListUsers()
            await getListNotifications()
            await getListTips()
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

    const forgotPassword = useCallback(async ({ email } : ISignIn) => {
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
        <AppContext.Provider value={{ userAuth, login, listUsers, listNotifications, listTips, forgotPassword, createUser, createTip, createNotification, updateUser, deleteUser, updateTip, deleteTip }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppProvider, AppContext }