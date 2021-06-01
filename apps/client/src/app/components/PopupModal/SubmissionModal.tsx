import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../Button';

import { ReactComponent as BeerSVG } from '../../../assets/beer.svg';

import {
  StyledModal,
  Body,
  Title,
  ImgContainer,
  Message,
  CustomDone,
} from './SubmissionStyle';

interface SubmissionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const SubmissionModal = ({ isOpen, onRequestClose }: SubmissionModalProps) => {
  const history = useHistory();

  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={false}
    >
      <Body>
        <Title>Project submitted !</Title>
        <ImgContainer>
          <BeerSVG />
        </ImgContainer>
        <Message>
          Now have a beer while the admins approve this project.
        </Message>
        <Button
          addCSS={CustomDone}
          onClick={() => {
            onRequestClose();
            history.push('/my-projects');
          }}
        >
          Done
        </Button>
      </Body>
    </StyledModal>
  );
};

export default SubmissionModal;
