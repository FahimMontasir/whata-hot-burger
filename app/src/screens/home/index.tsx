import React from 'react';
//data
import {exploreData} from '../../config/exploreData';
//components
import {Box, Container, Scroll} from '../../common';
import ExploreBox from './components/ExploreBox';
import ServiceBox from './components/ServiceBox';
import {HomeProps} from '../../types/routeTypes';
import CarouselBox from './components/carousel';
import {Button} from '@rneui/base';
import {useDispatch, useSelector} from 'react-redux';
import {
  getToken,
  login,
  logout,
} from '../../store/redux/slices/localStorageAuth';

const HomeScreen = ({navigation}: HomeProps) => {
  const dispatch = useDispatch();
  const token = useSelector(getToken);

  console.log('token', token);

  const loginAsync = () => {
    dispatch(login({token: '12a34'}));
    console.log('cli');
  };

  const logoutAsync = async () => {
    dispatch(logout());
  };

  return (
    <Container>
      <Scroll alignCenter>
        <CarouselBox />
        <Button title="log in" onPress={loginAsync} />
        <Button title="log out" onPress={logoutAsync} />
        <Box width="100%" height="130px" pv="10px" color="gray">
          <Scroll horizontal>
            <ServiceBox
              onPress={() =>
                navigation.navigate('Service', {serviceName: 'Physiotherapy'})
              }
            />
            <ServiceBox title="Special hot dog" />
            <ServiceBox title="hot" />
            <ServiceBox title="spicy" />
            <ServiceBox title="burgers" />
            <ServiceBox title="discount" />
          </Scroll>
        </Box>
        <Box row>
          {exploreData.map(item => (
            <ExploreBox
              key={item.id}
              onPress={() => console.log(item.navigateScreen)}
              title={item.title}
              iconName={item.iconName}
              iconType={item.iconType}
              higLighted={item.highlighted}
            />
          ))}
        </Box>
      </Scroll>
    </Container>
  );
};
export default HomeScreen;
