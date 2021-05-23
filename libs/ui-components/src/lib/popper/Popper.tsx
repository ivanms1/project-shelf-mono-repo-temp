import React, { useRef, useState } from 'react';
import { usePopper } from 'react-popper';

import { Container } from './style';

export interface PopperProps {
  children: React.ReactNode;
  reference: any;
  options: any[];
}

function Popper({ children, reference, options }: PopperProps) {
  const [visible, setVisibility] = useState(false);

  const referenceRef = useRef(null);
  const popperRef = useRef(null);

  const { styles, attributes } = usePopper(
    referenceRef.current,
    popperRef.current,
    options
  );

  useOnClickOutside(referenceRef, setVisibility);

  return (
    <React.Fragment>
      {reference(referenceRef, () => setVisibility(!visible))}
      <Container ref={popperRef} style={styles.popper} {...attributes.popper}>
        {visible && <div style={styles.offset}>{children}</div>}
      </Container>
    </React.Fragment>
  );
}

export default Popper;
