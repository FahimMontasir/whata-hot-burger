import React from 'react';
import styled from 'styled-components/native';

interface IProps {
  children: React.ReactNode;
  color?: string;
  light?: boolean;
  justify?: string;
  align?: string;
}

//attention!
const Container = ({
  children,
  color,
  light,
  justify = 'flex-start',
  align = 'stretch',
}: IProps) => {
  return (
    <SafeArea justify={justify} align={align}>
      <CustomStatusBar color={color} light={light} />
      {children}
    </SafeArea>
  );
};
export default Container;

type StatusProps = {
  color?: string;
  light?: boolean;
};

const CustomStatusBar = styled.StatusBar.attrs<StatusProps>(p => ({
  backgroundColor: p.color ? p.color : p.theme.colors.white,
  barStyle: p.light ? 'light-content' : 'dark-content',
}))<StatusProps>``;

type AreaProps = {
  justify?: string;
  align?: string;
};

const SafeArea = styled.SafeAreaView<AreaProps>`
  flex-grow: 1;
  background-color: ${p => p.theme.colors.white};
  justify-content: ${p => p.justify};
  align-items: ${p => p.align};
`;
