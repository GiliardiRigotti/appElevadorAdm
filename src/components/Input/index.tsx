import { Box, Container, TextInput, Title } from "./styles"

interface Props {
    title: string
    onChangeText: (value: string) => void
    placeholder?: string
    secureTextEntry?: boolean
    textArea?: boolean
    width?: number
    keyboard?: 'decimal-pad' | 'number-pad' | 'default'
    value?: string | number
}

export default function Input({ title, onChangeText, placeholder, secureTextEntry = false, textArea = false, keyboard = 'default', width = 60, value }: Props) {
    return (
        <Container style={{ width: `${width}%` }}>
            <Title>
                {title}
            </Title>
            <Box>
                {
                    textArea ?
                        <TextInput
                            placeholder={placeholder}
                            onChangeText={onChangeText}
                            textAlignVertical="top"
                            editable
                            multiline={true}
                            numberOfLines={10}
                            value={value}
                        />
                        :
                        <TextInput placeholder={placeholder} onChangeText={onChangeText} secureTextEntry={secureTextEntry} keyboardType={keyboard} value={value} />
                }
            </Box>
        </Container>
    )
}