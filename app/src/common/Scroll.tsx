import styled from 'styled-components/native';

interface IProps {
  alignCenter?: boolean;
  horizontal?: boolean;
}

const Scroll = styled.ScrollView.attrs<IProps>(p => ({
  showsHorizontalScrollIndicator: false,
  showsVerticalScrollIndicator: false,
  horizontal: p.horizontal ? true : false,
  contentContainerStyle: {
    alignItems: p.alignCenter ? 'center' : 'flex-start',
  },
}))<IProps>``;

export default Scroll;
