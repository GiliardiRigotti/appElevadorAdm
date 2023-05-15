import styled from 'styled-components/native';
import { colors } from '../../../constants/colors';

export const Container = styled.View`
  flex:1;
  align-items: center;
`;

export const Card = styled.View`
  margin-top: 8px;
  padding:10px;
  border-radius: 5px;
  background-color:${colors.gray};
  width: 95%;
`;

export const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Box = styled.View`
  margin-top: 8px;
`;

export const Label = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color:${colors.blue};
`;

export const Description = styled.Text`
  font-size:16px;
`;

export const Button = styled.TouchableOpacity`
    margin-top:10px;
    width:60%;
    height:5%;
    background-color:${colors.blue};
    border-radius:8px;
    align-items: center;
    justify-content: center;
`;

export const ButtonTitle = styled.Text`
    font-size: 16px
    font-weight:bold;
    color:${colors.white};
`;