import React from 'react';
import { render } from '@testing-library/react';

import Membres from './membres';

describe('Membres', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Membres />);
    expect(baseElement).toBeTruthy();
  });
});
