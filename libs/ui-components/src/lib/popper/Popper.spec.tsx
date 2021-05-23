import { render } from '@testing-library/react';

import Popper from './Popper';

describe('Popper', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Popper />);
    expect(baseElement).toBeTruthy();
  });
});
