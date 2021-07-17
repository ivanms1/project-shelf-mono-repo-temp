import React from 'react';
import Modal from 'react-modal';

import Button from '../Button';

import { ReactComponent as LogoutModalSVG } from '../../assets/Logout_Modal.svg';
import { ReactComponent as DeleteModalSVG } from '../../assets/Delete_Modal.svg';
import { ReactComponent as EditModalSVG } from '../../assets/Edit_Modal.svg';

import {
  StyledModal,
  CloseButton,
  Body,
  Description,
  ButtonContainer,
  CustomNoButton,
  CustomYesButton,
} from './style';

Modal.setAppElement('#root');

const MODAL_MESSAGES = {
  logout: {
    title: 'Logging Out ?',
    message: 'Are you sure you want to Logout ?',
    button_text_YES: 'YES',
    button_text_NO: 'NO',
    icon: LogoutModalSVG,
  },
  delete: {
    title: 'Delete Project ?',
    message: 'Are you sure you want to Delete it ?',
    button_text_YES: 'DELETE',
    button_text_NO: 'CANCEL',
    icon: DeleteModalSVG,
  },
  edit: {
    title: 'Edit the Project ?',
    message: (
      <p>
        Are you sure you want to Edit it ?
        <br />
        You will have to wait for approval again.
      </p>
    ),
    button_text_YES: 'EDIT',
    button_text_NO: 'CANCEL',
    icon: EditModalSVG,
  },
};

type Type = 'logout' | 'delete' | 'edit';

interface ModalStyleProps {
  isOpen: boolean;
  onRequestClose: () => void;
  type?: Type;
  onClick?: () => void;
}

function ModalStyle({
  isOpen,
  onRequestClose,
  type = 'logout',
  onClick,
}: ModalStyleProps) {
  const Icon = MODAL_MESSAGES[type].icon;
  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={false}
    >
      <Body>
        <CloseButton>
          <button onClick={onRequestClose}>X</button>
        </CloseButton>
        <Icon type={type} />
        <Description>
          <span>{MODAL_MESSAGES[type]?.title}</span>
          <span>{MODAL_MESSAGES[type]?.message}</span>
        </Description>

        <ButtonContainer>
          <Button addCSS={CustomNoButton} onClick={onRequestClose}>
            {MODAL_MESSAGES[type].button_text_NO}
          </Button>

          <Button
            kind={type}
            addCSS={CustomYesButton}
            onClick={() => onClick && onClick()}
          >
            {MODAL_MESSAGES[type].button_text_YES}
          </Button>
        </ButtonContainer>
      </Body>
    </StyledModal>
  );
}

export default ModalStyle;
