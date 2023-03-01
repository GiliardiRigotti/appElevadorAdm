import React from "react";
import { Box, Container, Description, Label, Title, Wrapper } from "./styles";
import { useNavigation } from "@react-navigation/native";

interface Props{
    data: IOrder
}

export default function Order({data}: Props){
    const navigation = useNavigation()
    console.log(data.create_at)
    return(
        <Container onPress={()=> navigation.navigate("OrderView", {data: data})}>
             <Wrapper>
                <Box>
                    <Label>
                        Problema
                    </Label>
                    <Description>
                        {data.title}
                    </Description>
                </Box>
                <Box>
                    <Label>
                        Data de Abertura
                    </Label>
                    <Description>
                        {data.create_at}
                    </Description>
                </Box>
            </Wrapper>
            <Wrapper>
                <Box>
                    <Label>
                        Status
                    </Label>
                    <Description>
                        {data.status}
                    </Description>
                </Box>
                <Box>
                    <Label>
                        Data da conclusão
                    </Label>
                    <Description>
                        {data.create_at}
                    </Description>
                </Box>
            </Wrapper>
        </Container>
    )
}