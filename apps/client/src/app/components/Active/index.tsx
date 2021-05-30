import React from 'react';

import { Container, PulseButton } from './style';

interface ActiveProps {
  active?: boolean;
}

function Active({ active = false }: ActiveProps) {
  return (
    <Container>
      <PulseButton active={active}></PulseButton>
    </Container>
  );
}

export default Active;
