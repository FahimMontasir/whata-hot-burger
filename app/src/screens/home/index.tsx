import React from 'react';
//data
import {exploreData} from '../../config/exploreData';
//components
import {Box, Container, Scroll} from '../../common';
import ExploreBox from './components/ExploreBox';
import HeroBox from './components/HeroBox';
import ServiceBox from './components/ServiceBox';
import {HomeProps} from '../../types/routeTypes';

const HomeScreen = ({navigation}: HomeProps) => {
  return (
    <Container>
      <Scroll alignCenter>
        <HeroBox />
        <Box width="100%" height="130px" pv="10px" color="gray">
          <Scroll horizontal>
            <ServiceBox
              onPress={() =>
                navigation.navigate('Service', {serviceName: 'Physiotherapy'})
              }
            />
            <ServiceBox title="Gynecology" />
            <ServiceBox title="Medicine" />
            <ServiceBox title="Orthopedics" />
            <ServiceBox title="Skin" />
            <ServiceBox title="Gastroenterologist" />
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
