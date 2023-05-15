import styled from "styled-components/native"
import { colors } from "../../constants/colors"

export const Container = styled.View`
    margin-top:15px;
`;

export const Box = styled.View`
    border-width:1px;
    border-radius:8px;
    border-color:${colors.blue};
`;

export const Title = styled.Text`
    font-size:14px;
    color:${colors.blue};
    font-weight: bold;
`;

export const TextInput = styled.TextInput`
    padding-left:5px;
    padding-top:3px;
    padding-bottom:3px;
`;