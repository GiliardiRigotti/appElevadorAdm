import { ScrollView } from "react-native-gesture-handler";
import Header from "../../../components/Header";
import { Container } from "./styles";
import { useContext } from "react";
import { AppContext } from "../../../context";
import Order from "../../../components/Order";

export default function ManageOrderOfService() {
    const {listOrders} = useContext(AppContext)
    return (
        <>
            <Header title="Ordens de Serviços" />
            <ScrollView>
                <Container>
                    {
                        listOrders.map((item)=> <Order key={item.id} data={item}/>)
                    }
                </Container>
            </ScrollView>
        </>
    )
}