import React from 'react';
import styled from 'styled-components/native';

const RightComponent = () => {
  return <Logo />;
};
export default RightComponent;

const Logo = styled.Image.attrs({
  source: require('../../../assets/icons/logo.png'),
})`
  height: 50px;
  width: 50px;
  margin-right: 10px;
`;
