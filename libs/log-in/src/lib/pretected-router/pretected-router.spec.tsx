import { render } from '@testing-library/react';

import PretectedRouter from './pretected-router';

describe('PretectedRouter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PretectedRouter />);
    expect(baseElement).toBeTruthy();
  });
});
