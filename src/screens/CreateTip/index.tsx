import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";
import Input from "../../components/Input";
import { Container } from "../../styles/global";
import { Button, ButtonCancel, ButtonTitle } from "./styles";
import { TextInput } from "react-native";
import { useState } from "react";
import { ITip } from "../../interfaces/tip";
import { showNotification } from "../../utils/notification";

export default function CreateTip() {
    const navigation = useNavigation()
    const [form, setForm] = useState<ITip>({
        title: '',
        description: ''
    })

    async function handleCreateTip() {
        if (form.title != "" && form.description != "") {
            console.log("Foi criada um recomendação")
            return
        }
        showNotification({
            title: "Aviso",
            description: "Preencha os campos corretamente",
            type: "warn",
            duration: 2000
        })

    }
    return (
        <>
            <Header title="Criar Recomendação" />
            <Container>
                <Input title="Titulo" onChangeText={(value) => setForm({ ...form, title: value })} />
                <Input title="Mensagem" onChangeText={(value) => setForm({ ...form, description: value })} textArea />
                <Button onPress={handleCreateTip}>
                    <ButtonTitle>
                        Criar
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