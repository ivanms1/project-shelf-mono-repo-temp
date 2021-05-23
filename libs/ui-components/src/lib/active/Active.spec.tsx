import { render } from '@testing-library/react';

import Active from './Active';

describe('Active', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Active />);
    expect(baseElement).toBeTruthy();
  });
});
