import React from "react";
import { Container, Description, Title, Wrapper } from "./styles";

export default function Order(data: IOrder){
    return(
        <Container>
            <Title>
                {data.title}
            </Title>
            <Wrapper>
                <Description>
                    {data.description}
                </Description>
            </Wrapper>
        </Container>
    )
}