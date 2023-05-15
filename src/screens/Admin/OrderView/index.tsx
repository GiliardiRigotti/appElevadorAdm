import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "../../../components/Header";
import { Box, Button, ButtonTitle, Card, Container, Description, Item, Label, List, Wrapper } from "./styles";
import { colors } from "../../../constants/colors";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context";
import { ActivityIndicator, TextInput } from "react-native";
import Input from "../../../components/Input";

interface Props {
    data: IOrder
}

interface Items {
    name: string | null
    amount: number | null
    price: number | null
}

export default function OrderView() {
    const route = useRoute()
    const { data } = route.params as Props
    const [load, setLoad] = useState<boolean>(false)
    const [form, setForm] = useState<IOrder>(data)
    const [items, setItems] = useState<Items[]>([])
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [item, setItem] = useState<Items>({
        name: '',
        amount: 0,
        price: 0
    })
    const { updateOrder } = useContext(AppContext)
    const navigation = useNavigation()

    async function handleUpdateStatusOrder() {
        setLoad(true)
        try {
            if (data.status == "aberto") {
                await updateOrder(data.id, { ...data, status: "em andamento" })
                return
            } else if (data.status == "em andamento") {
                await updateOrder(data.id, { ...data, items: items, status: "finalizado" })
                return
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoad(false)
        }
    }

    function handleAddItemToItems() {
        if (item.name != null) {
            items.push(item)
            setItem({
                name: null,
                amount: null,
                price: null
            })
            if (items.length > 0) {
                items.map((item) => {
                    setTotalPrice(totalPrice + item.price)
                })
            }
        }
    }
    return (
        <>
            <Header title="Chamada" />
            <Container>
                <Card>
                    <Wrapper>
                        <Box>
                            <Label>
                                Problema
                            </Label>
                            <Description>
                                {data.description}
                            </Description>
                        </Box>
                    </Wrapper>
                    <Wrapper>
                        <Box>
                            <Label>
                                Resumo
                            </Label>
                            <Description>
                                {data.description}
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
                        {
                            data.status == "finalizado" ?
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
                    {
                        data.status == "em andamento" &&
                        <Input title="Solução" textArea onChangeText={(value) => setForm({ ...form, solution: value })} width={95} />
                    }
                    {
                        data.status == "em andamento" &&
                        <>
                            {
                                items.length > 0 &&
                                <>
                                    <Label>
                                        Item usado
                                    </Label>
                                    <List>
                                        <Wrapper>
                                            <Item>
                                                <Description>
                                                    Item
                                                </Description>
                                            </Item>
                                            <Item>
                                                <Description>
                                                    Quantidade
                                                </Description>
                                            </Item>
                                            <Item>
                                                <Description>
                                                    Valor Unitario
                                                </Description>
                                            </Item>
                                            <Item>
                                                <Description>
                                                    Valor
                                                </Description>
                                            </Item>
                                        </Wrapper>
                                        {
                                            items?.map((item, index) => (
                                                <Wrapper key={index}>
                                                    <Item>
                                                        <Description>
                                                            {item.name}
                                                        </Description>
                                                    </Item>
                                                    <Item>
                                                        <Description>
                                                            {item.amount}
                                                        </Description>
                                                    </Item>
                                                    <Item>
                                                        <Description>
                                                            R${item.price}
                                                        </Description>
                                                    </Item>
                                                    <Item>
                                                        <Description>
                                                            R${item.amount * item.price}
                                                        </Description>
                                                    </Item>
                                                </Wrapper>
                                            ))
                                        }
                                        <Wrapper>
                                            <Item>
                                                <Description>
                                                    Total
                                                </Description>
                                            </Item>
                                            <Item>
                                                <Description>
                                                    {totalPrice}
                                                </Description>
                                            </Item>
                                        </Wrapper>
                                    </List>
                                </>
                            }
                            <Wrapper>
                                <Input title="Nome" onChangeText={(value) => setItem({ ...item, name: value })} width={35} value={item.name} />
                                <Input title="Quantidade" onChangeText={(value) => setItem({ ...item, amount: parseInt(value) })} keyboard="decimal-pad" width={25} value={item.amount} />
                                <Input title="Valor Unitario" onChangeText={(value) => setItem({ ...item, price: parseInt(value) })} keyboard="decimal-pad" width={25} value={item.price} />
                            </Wrapper>
                            <Button onPress={handleAddItemToItems}>
                                <ButtonTitle>
                                    Adicionar Item
                                </ButtonTitle>
                            </Button>
                        </>
                    }
                </Card>
                {
                    data.status !== "finalizado" &&
                    <Button style={{ backgroundColor: data.status == "em andamento" ? colors.red : colors.green }} onPress={handleUpdateStatusOrder}>
                        {
                            load ?
                                <ActivityIndicator size={20} color={colors.white} animating />
                                :
                                data.status == "em andamento" ?
                                    <ButtonTitle>
                                        Finalizar a manutenção
                                    </ButtonTitle>
                                    :
                                    <ButtonTitle>
                                        Iniciar a manutenção
                                    </ButtonTitle>
                        }
                    </Button>
                }
                <Button onPress={() => navigation.goBack()}>
                    <ButtonTitle>
                        Voltar
                    </ButtonTitle>
                </Button>
            </Container >
        </>
    )
}