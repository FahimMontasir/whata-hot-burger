import React from 'react';

import {Touchable, OnlineImage} from '../../../common';

interface ComboProp {
  onPress: () => void;
  uri: string;
}

const ComboBox = ({onPress, uri}: ComboProp) => {
  return (
    <Touchable
      mv="5px"
      mh="10px"
      radius="4px"
      elevation="3"
      width="155px"
      height="100px"
      onPress={onPress}>
      <OnlineImage source={uri} width={155} height={100} radius={4} />
    </Touchable>
  );
};
export default ComboBox;
