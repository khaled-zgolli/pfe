import React from 'react';
import { render } from '@testing-library/react';

import Projets from './projets';

describe('Projets', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Projets />);
    expect(baseElement).toBeTruthy();
  });
});
