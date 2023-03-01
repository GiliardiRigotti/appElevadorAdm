import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "../../../components/Header";
import { Box, Button, ButtonTitle, Card, Container, Description, Label, Wrapper } from "./styles";

interface Props{
    data: IOrder
}

export default function OrderView(){
    const route = useRoute()
    const {data} = route.params as Props
    const navigation = useNavigation()
    return(
        <>
            <Header title="Chamada"/>
            <Container>
                <Card>
                    <Box>
                        <Label>
                            Problema
                        </Label>
                        <Description>
                            {data.description}
                        </Description>
                    </Box>
                    <Box>
                        <Label>
                            Resumo
                        </Label>
                        <Description>
                            {data.description}
                        </Description>
                    </Box>
                    <Wrapper>
                    <Box>
                        <Label>
                            Status
                        </Label>
                        <Description>
                            {data.status}
                        </Description>
                    </Box>
                    {
                        data.status == "finalizado"?
                        <Box>
                            <Label>
                                Data Conclusão
                            </Label>
                            <Description>
                                {data.close_at}
                            </Description>
                        </Box>
                        :
                        <Box>
                            <Label>
                                Data Abertura
                            </Label>
                            <Description>
                                {data.create_at}
                            </Description>
                        </Box>
                    }
                    </Wrapper>
                    {
                        data.solution &&
                            <Box>
                                <Label>
                                    Solução
                                </Label>
                                <Description>
                                    {data.solution}
                                </Description>
                            </Box>
                        }
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