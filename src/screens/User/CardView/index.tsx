import { useNavigation, useRoute } from "@react-navigation/native";
import { Box, Button, ButtonTitle, Card, Container, Description, Label } from "./styles";
import Header from "../../../components/Header";

interface Props{
    data:{
        title: string
        description: string
    }
}

export default function CardView(){
    const route = useRoute()
    const navigation = useNavigation()
    const {data} = route.params as Props

    return(
        <>
            <Header title={data.title}/>
            <Container>
                <Card>
                    <Label>
                        Descrição
                    </Label>
                    <Description>
                        {data.description}
                    </Description>
                </Card>
                <Button onPress={()=>navigation.goBack()}>
                    <ButtonTitle>
                        Voltar
                    </ButtonTitle>
                </Button>
            </Container>
        </>
    )
}