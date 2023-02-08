import { useContext } from "react";
import Header from "../../components/Header";
import { Container } from "../../styles/global";
import { AppContext } from "../../context";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import AddButton from "../../components/AddButton";
import CardItem from "../../components/CardItem";
import { useNavigation } from "@react-navigation/native";


export default function ManageUsers() {
    const navigation = useNavigation()
    const { listUsers } = useContext(AppContext)
    return (
        <>
            <Header />
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
                        listUsers.map((item, index) => <CardItem key={index} name={item.name} description={item.address} />)
                    }
                </ScrollView>
            </Container>
            <AddButton onPress={() => navigation.navigate("CreateUser")} />
        </>

    )
}