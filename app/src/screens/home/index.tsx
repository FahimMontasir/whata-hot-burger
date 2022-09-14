import React from 'react';
//data
import {exploreData} from '../../config/exploreData';
//components
import {Box, Container, Scroll} from '../../common';
import ExploreBox from './components/ExploreBox';
import ServiceBox from './components/ServiceBox';
import {HomeProps} from '../../types/routeTypes';
import CarouselBox from './components/carousel';

const HomeScreen = ({navigation}: HomeProps) => {
  return (
    <Container>
      <Scroll alignCenter>
        <CarouselBox />
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
