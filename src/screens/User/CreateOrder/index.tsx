import { useNavigation } from "@react-navigation/native";

import Header from "../../../components/Header";
import Input from "../../../components/Input";
import { Container } from "../../../styles/global";
import { Button, ButtonCancel, ButtonTitle } from "./styles";
import { showNotification } from "../../../utils/notification";
import { IUser } from "../../../interfaces/user";
import { useContext, useState } from "react";
import { AppContext } from "../../../context";
import Checkbox from "../../../components/Checkbox";
import { KeyboardAvoidingView, Platform } from "react-native";

export default function CreateOrder() {
    const { createUser } = useContext(AppContext)
    const [isLoad, setIsLoad] = useState<boolean>(false)
    const [form, setForm] = useState<IUser>({
        name: "",
        address: "",
        city: "",
        district: "",
        email: "",
        number: "",
        phone: "",
        password: "",
        administrator: false
    })
    const navigation = useNavigation()

    async function handleSignUp() {
        try {
            setIsLoad(true)
            if (form.name !== "" && form.address !== "" && form.city !== "" && form.district !== "" && form.email !== "" && form.number !== "" && form.phone !== "" && form.password !== "") {
                const newUser = await createUser(form)
                if (newUser) {
                    showNotification({
                        title: "Aviso",
                        description: "Foi cadastrado com sucesso",
                        type: "success",
                        duration: 2000
                    })
                    navigation.navigate("ManageUsers")
                    setIsLoad(false)
                    return
                }
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
                description: "Erro ao cadastrar, tenta mais tarde",
                type: "error",
                duration: 2000
            })
        }
    }
    return (
        <>
            <Header title="Criação de usuário" />
            <KeyboardAvoidingView
                behavior="padding"
                style={{ flex: 1, width: "100%" }}
                keyboardVerticalOffset={80}
            >
                <Container>
                    <Input title="Nome" onChangeText={(value) => setForm({ ...form, name: value })} />
                    <Input title="E-mail" onChangeText={(value) => setForm({ ...form, email: value })} />
                    <Input title="Senha" onChangeText={(value) => setForm({ ...form, password: value })} secureTextEntry />
                    <Input title="DDD + Telefone" onChangeText={(value) => setForm({ ...form, phone: value })} />
                    <Input title="Cidade" onChangeText={(value) => setForm({ ...form, city: value })} />
                    <Input title="Bairro" onChangeText={(value) => setForm({ ...form, district: value })} />
                    <Input title="Endereço" onChangeText={(value) => setForm({ ...form, address: value })} />
                    <Input title="Numero" onChangeText={(value) => setForm({ ...form, number: value })} />
                    <Checkbox title="Administrador?" value={form.administrator} onPress={() => setForm({ ...form, administrator: !form.administrator })} />
                    <Button onPress={handleSignUp} disabled={isLoad}>
                        <ButtonTitle>
                            Cadastrar
                        </ButtonTitle>
                    </Button>
                    <ButtonCancel onPress={() => navigation.navigate("Home")} disabled={isLoad}>
                        <ButtonTitle>
                            Cancelar
                        </ButtonTitle>
                    </ButtonCancel>
                </Container>
            </KeyboardAvoidingView>
        </>
    )
}