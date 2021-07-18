import React from 'react';
import { render } from '@testing-library/react';

import Membre from './membre';

describe('Membre', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Membre />);
    expect(baseElement).toBeTruthy();
  });
});
