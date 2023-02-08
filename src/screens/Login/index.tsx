import { Image, KeyboardAvoidingView } from "react-native";
import Input from "../../components/Input";
import { images } from "../../assets/images";
import { Button, ButtonTitle } from "./styles";
import { useContext, useState } from "react";
import { ISignUp } from "../../interfaces/user";
import { useNavigation } from "@react-navigation/native";
import { showNotification } from "../../utils/notification";
import { AppContext } from "../../context";
import { Container } from "../../styles/global";

export default function Login() {
    const navigation = useNavigation()
    const { login } = useContext(AppContext)
    const [formLogin, setFormLogin] = useState<ISignUp>({
        username: null,
        password: null
    })

    async function handleSignIn() {
        if (formLogin.username != null && formLogin.password != null) {
            console.log("Entrou")
            const auth = await login(formLogin)
            if (auth) {
                console.log("Entrou 2")
                navigation.navigate("Home")
            }
            return
        }
        showNotification({
            title: "Aviso",
            description: "Verifica se os campos foram preenchidos",
            type: "warn",
            duration: 2000,
        })
    }

    return (
        <Container>
            <KeyboardAvoidingView
                behavior="position"
                keyboardVerticalOffset={40}
                contentContainerStyle={{
                    alignItems: "center",
                    width: "100%",
                }}
                style={{ width: "100%" }}
            >
                <Image source={images.logo} style={{ width: 450, height: 300, resizeMode: "contain" }} />
                <Input title="Usuario" onChangeText={(value) => setFormLogin({ ...formLogin, username: value })} placeholder="Usuario" />
                <Input title="Senha" onChangeText={(value) => setFormLogin({ ...formLogin, password: value })} placeholder="Senha" secureTextEntry />
            </KeyboardAvoidingView>
            <Button onPress={handleSignIn}>
                <ButtonTitle>
                    Entrar
                </ButtonTitle>
            </Button>
        </Container>
    )
}