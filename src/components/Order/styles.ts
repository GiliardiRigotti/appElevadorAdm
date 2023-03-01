import styled from 'styled-components/native';
import { colors } from '../../constants/colors';

export const Container = styled.TouchableOpacity`
    width: 95%;
    margin-top: 10px;
    border-radius: 5px;
    background-color: ${colors.gray};
    padding: 10px;
`;

export const Wrapper = styled.View`
    margin-top: 8px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const Title = styled.Text`
    font-size: 18px;
`;

export const Description = styled.Text`
    font-size: 16px;
`;

export const Label = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color:${colors.blue};
`;

export const Box = styled.View`
    width: 40%;
`;