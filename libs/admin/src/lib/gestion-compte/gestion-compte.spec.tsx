import React from 'react';
import { render } from '@testing-library/react';

import GestionCompte from './gestion-compte';

describe('GestionCompte', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GestionCompte />);
    expect(baseElement).toBeTruthy();
  });
});
