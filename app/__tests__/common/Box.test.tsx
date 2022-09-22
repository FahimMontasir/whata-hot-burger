import 'react-native';
import {render} from '@testing-library/react-native';
import {Box} from '../../src/common';

describe('BoxTest', () => {
  it('should work', async () => {
    const {debug} = render(<Box />);

    debug();
  });
});
