import React from 'react';

import { Container, PulseButton } from './styles';

export interface ActiveProps {
  active: boolean;
}

function Active({ active }: ActiveProps) {
  return (
    <Container>
      <PulseButton active={active}></PulseButton>
    </Container>
  );
}

export default Active;
