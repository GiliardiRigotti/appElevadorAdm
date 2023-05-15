import React, { useEffect, useState } from "react";
import { Box, Container, Description, Label, Title, Wrapper } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../constants/colors";

interface Props {
    data: IOrder
}

export default function Order({ data }: Props) {
    const navigation = useNavigation()
    const [color, setColor] = useState<String>()
    console.log(data.create_at?.seconds)
    useEffect(() => {
        switch (data.status) {
            case "aberto":
                setColor(colors.green)
                break;
            case "em andamento":
                setColor(colors.yellow)
                break;
            case "finalizado":
                setColor(colors.red)
                break;
            default:
                setColor(colors.gray)
                break;
        }
    }, [color])
    return (
        <Container style={{ backgroundColor: color }} onPress={() => navigation.navigate("OrderView", { data: data })}>
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