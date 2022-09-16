import React from 'react';
//data
import {exploreData} from '../../config/exploreData';
//components
import {Box, Container, Scroll} from '../../common';
import FoodBox from './components/FoodBox';
import ComboBox from './components/ComboBox';
import {HomeProps} from '../../types/routeTypes';
import CarouselBox from './components/carousel';
import {useGetComboByCategoryQuery} from '../../store/redux/api/combo';
import {ImgSkeleton} from '../../common/OnlineImage';

export interface CProp {
  _id: string;
  photoUrls: string[];
  category: string;
}

const HomeScreen = ({navigation}: HomeProps) => {
  const {data, isSuccess, isLoading} =
    useGetComboByCategoryQuery('Special deals');

  console.log(data);

  return (
    <Container>
      <Scroll alignCenter>
        <CarouselBox />
        <Box width="100%" height="130px" pv="10px" color="gray">
          <Scroll horizontal>
            {isLoading &&
              ['1', '2', '3'].map(i => (
                <Box key={i} mv="5px" mh="10px" radius="4px" elevation="3">
                  <ImgSkeleton width={150} height={100} radius={4} />
                </Box>
              ))}
            {isSuccess &&
              data.array.map((c: CProp) => (
                <ComboBox
                  key={c._id}
                  uri={c.photoUrls[0]}
                  onPress={() =>
                    navigation.navigate('Combo', {
                      id: c._id,
                      category: c.category,
                      photoUrls: c.photoUrls,
                    })
                  }
                />
              ))}
          </Scroll>
        </Box>
        <Box row>
          {exploreData.map(item => (
            <FoodBox
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
