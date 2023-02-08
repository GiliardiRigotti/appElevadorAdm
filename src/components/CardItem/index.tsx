import { useNavigation } from "@react-navigation/native";
import { Box, Button, Container, Description, Options, Title, Wrapper, styles } from "./styles";
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { colors } from "../../constants/colors";

interface Props {
    name: string
    description?: string
}

export default function CardItem({ name, description }: Props) {

    return (
        <Container>

            <Title>
                {name}
            </Title>

            {
                description &&
                <Description>
                    {description}
                </Description>
            }
            <Options>
                <Button>
                    <Icon name="pencil" size={20} color={colors.blue} />
                </Button>
                <Button>
                    <Icon name="delete" size={20} color={colors.red} />
                </Button>
            </Options>

        </Container>
    )
}