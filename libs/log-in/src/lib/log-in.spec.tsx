import React from 'react';
import { render } from '@testing-library/react';

import LogIn from './log-in';

describe('LogIn', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LogIn />);
    expect(baseElement).toBeTruthy();
  });
});
