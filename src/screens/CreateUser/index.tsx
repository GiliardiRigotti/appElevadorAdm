import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";
import Input from "../../components/Input";
import { Container } from "../../styles/global";
import { Button, ButtonCancel, ButtonTitle } from "./styles";

export default function CreateUser() {
    const navigation = useNavigation()

    async function handleSignUp() {
        try {
            if (form.title !== "" && form.description !== "") {
                const { data } = await api.post(urls.notification, form)
                showNotification({
                    title: "Aviso",
                    description: "Foi enviado com sucesso a notificação",
                    type: "success",
                    duration: 2000
                })
                console.log(data)
                navigation.navigate("ManageNotifications")
                return
            }
            showNotification({
                title: "Aviso",
                description: "Preencha os campos corretamente",
                type: "warn",
                duration: 2000
            })
        } catch (error) {
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
                <Input title="Nome" onChangeText={() => { }} />
                <Input title="E-mail" onChangeText={() => { }} />
                <Input title="Telefone" onChangeText={() => { }} />
                <Input title="Cidade" onChangeText={() => { }} />
                <Input title="Bairro" onChangeText={() => { }} />
                <Input title="Endereço" onChangeText={() => { }} />
                <Input title="Numero" onChangeText={() => { }} />
                <Button onPress={handleSignUp}>
                    <ButtonTitle>
                        Cadastrar
                    </ButtonTitle>
                </Button>
                <ButtonCancel onPress={() => navigation.navigate("Home")}>
                    <ButtonTitle>
                        Cancelar
                    </ButtonTitle>
                </ButtonCancel>
            </Container>
        </>
    )
}