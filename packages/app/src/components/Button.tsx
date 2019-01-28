//@flow
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 50;
  border-bottom-left-radius: 20;
  border-bottom-right-radius: 20;
  border-top-left-radius: 20;
  border-top-right-radius: 20;
  margin-top: 20;
  background-color: #42a5f5;
  margin-left: auto;
  margin-right: auto;
`;

type Props = {
  onPress?: (void) => void,
  children?: Node
};

const Button = (props: Props) => (
  <Wrapper onPress={() => props.onPress()}>
    {props.children}
  </Wrapper>
);

export default Button;
