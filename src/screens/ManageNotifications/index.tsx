import { useContext } from "react";
import CardUser from "../../components/CardItem";
import Header from "../../components/Header";
import { Container } from "../../styles/global";
import { AppContext } from "../../context";
import AddButton from "../../components/AddButton";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";


export default function ManageNotifications() {
    const navigation = useNavigation()
    const { listNotifications } = useContext(AppContext)
    return (
        <>
            <Header title="Notificações" />
            <Container>
                <ScrollView
                    style={{
                        width: "100%"
                    }}
                    contentContainerStyle={{
                        alignItems: "center",
                    }}
                >
                    {
                        listNotifications.map((item, index) => <CardUser key={index} name={item.title} description={item.description} />)
                    }
                </ScrollView>
            </Container>
            <AddButton onPress={() => navigation.navigate("CreateNotification")} />
        </>

    )
}