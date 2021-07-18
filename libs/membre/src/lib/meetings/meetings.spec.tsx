import { render } from '@testing-library/react';

import Meetings from './meetings';

describe('Meetings', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Meetings />);
    expect(baseElement).toBeTruthy();
  });
});
