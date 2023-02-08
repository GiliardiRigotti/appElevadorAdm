import { StatusBar } from "expo-status-bar";
import { Button, Container, Title } from "./styles";
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { colors } from "../../constants/colors";
import { useContext } from "react";
import { AppContext } from "../../context";

interface Props {
    title?: string
}


export default function Header({ title }: Props) {
    const { user } = useContext(AppContext)
    return (
        <>
            <StatusBar style="light" />
            <Container>
                {
                    title != null ?
                        <Title>
                            {title}
                        </Title>
                        :
                        <Title>
                            {user && user.name}
                        </Title>

                }

                <Button>
                    <Icon name="logout" size={20} color={colors.white} />
                </Button>
            </Container>
        </>
    )
}