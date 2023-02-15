import { useNavigation } from "@react-navigation/native";

import auth from "@react-native-firebase/auth"

import Header from "../../components/Header";
import Input from "../../components/Input";
import { Container } from "../../styles/global";
import { Button, ButtonCancel, ButtonTitle } from "./styles";
import { showNotification } from "../../utils/notification";
import { IUser } from "../../interfaces/user";
import { useState } from "react";

export default function CreateUser() {
    const [isLoad, setIsLoad] = useState<boolean>(false)
    const [form, setForm] = useState<IUser>({
        name:"",
        address:"",
        city:"",
        district:"",
        email:"",
        number:"",
        phone:"",
        password:"",
    })
    const navigation = useNavigation()

    async function handleSignUp() {
        try {
            setIsLoad(true)
            if (form.name !== "" && form.email !== "") {
                await auth().createUserWithEmailAndPassword(form.email, form.password)

                showNotification({
                    title: "Aviso",
                    description: "Foi enviado com sucesso a notificação",
                    type: "success",
                    duration: 2000
                })
                navigation.navigate("ManageUsers")
                setIsLoad(false)
                return
            }
            setIsLoad(false)
            showNotification({
                title: "Aviso",
                description: "Preencha os campos corretamente",
                type: "warn",
                duration: 2000
            })
        } catch (error) {
            setIsLoad(false)
            showNotification({
                title: "Aviso",
                description: "Erro ao enviar, tenta mais tarde",
                type: "error",
                duration: 2000
            })
        }
    }
    return (
        <>
            <Header title="Criação de usuário" />
            <Container>
                <Input title="Nome" onChangeText={(value) => setForm({...form, name: value})} />
                <Input title="E-mail" onChangeText={(value) => setForm({...form, email: value})} />
                <Input title="Senha" onChangeText={(value) => setForm({...form, password: value})} secureTextEntry/>
                <Input title="Telefone" onChangeText={(value) => setForm({...form, phone: value})} />
                <Input title="Cidade" onChangeText={(value) => setForm({...form, city: value})} />
                <Input title="Bairro" onChangeText={(value) => setForm({...form, district: value})} />
                <Input title="Endereço" onChangeText={(value) => setForm({...form, address: value})} />
                <Input title="Numero" onChangeText={(value) => setForm({...form, number: value})} />

                <Button onPress={handleSignUp} disabled={isLoad}>
                    <ButtonTitle>
                        Cadastrar
                    </ButtonTitle>
                </Button>
                <ButtonCancel onPress={() => navigation.navigate("Home")}  disabled={isLoad}>
                    <ButtonTitle>
                        Cancelar
                    </ButtonTitle>
                </ButtonCancel>
            </Container>
        </>
    )
}