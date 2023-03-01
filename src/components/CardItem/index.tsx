import { useNavigation } from "@react-navigation/native";
import { Box, Button, Container, Description, Options, Title, Wrapper, styles } from "./styles";
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { colors } from "../../constants/colors";
import { showNotification } from "../../utils/notification";
import { useContext, useState } from "react";
import { AppContext } from "../../context";
import { ActivityIndicator, View } from "react-native";

interface Props {
    id: string
    name: string
    description?: string
    type: 'user' | 'tip' | 'notification'
    onPress?: ()=> void
}

export default function CardItem({id, name, description, type, onPress }: Props) {
    const [isLoad, setIsLoad] = useState<boolean>(false)
    const {deleteUser, deleteTip} = useContext(AppContext)


    async function handleDelete(){

        if(type == 'user'){
            await deleteUser(id)
        }else if(type == 'tip'){
            await deleteTip(id)
        }else if(type == 'notification'){
            
        }else{
            showNotification({
                title:'Aviso',
                description:'Não existe esta opção',
                type:'error',
                duration:1500
            })
        }
    }

    async function handleUpdate(){

    }

    return (
        <Container style={styles.shadow} onPress={onPress}>
            <Title>
                {name}
            </Title>
            {
                type !== 'notification' &&
                <Options>
                    <Button onPress={handleUpdate}>
                        <Icon name="pencil" size={20} color={colors.blue} />
                    </Button>
                    <Button onPress={handleDelete}>
                    {
                            isLoad?
                                <ActivityIndicator size='small' animating color={colors.red}/>
                            :
                                <Icon name="delete" size={20} color={colors.red} />
                        }
                    </Button>
            </Options>
            }
            
        </Container>
    )
}