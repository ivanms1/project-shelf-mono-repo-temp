import styled from 'styled-components';

import { ButtonProps } from '.';

export const CustomButton = styled.button<ButtonProps>`
  display: inline-block;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;

  background-color: ${({ kind }) => {
    switch (kind) {
      case 'approve':
        return '#20c997';
      case 'disapprove':
        return '#d70330';
      case 'logout':
        return '#1B74E4';
      case 'delete':
        return '#f53434';
      default:
        return '#2ECC71';
    }
  }};
  padding: ${({ kind }) => {
    switch (kind) {
      case 'delete':
        return '10px 0px';
      case 'approve':
        return '7px 0px';
      case 'disapprove':
        return '7px 0px';
      default:
        return '10px 0px';
    }
  }};
  border-radius: 7px;
  color: white;
  width: 100%;

  font-weight: ${({ size }) => {
    switch (size) {
      case 'big':
        return '800';
      case 'medium':
        return '600';
      default:
        return '400';
    }
  }};
  letter-spacing: 1px;
  font-size: ${({ fontSize }) => {
    switch (fontSize) {
      case 'big':
        return '21px';
      case 'medium':
        return '18px';
      case 'small':
        return '15px';
      default:
        return '18px';
    }
  }};
  border: ${({ kind }) => {
    switch (kind) {
      case 'logout':
        return '1px solid #1B74E4';
      case 'delete':
        return '1px solid #F53803';
      case 'edit':
        return '1px solid #2ECC71';

      default:
        return 'none';
    }
  }};
  outline: none;

  :hover {
    transform: scale(1.02);
    transition: 0.2s linear;
  }

  :active {
    transform: translateY(2px) scale(1.02);
  }
  ${({ addCSS }: any) => addCSS}

  @media screen and (max-width:600px) {
    font-size: ${({ size }) => {
      switch (size) {
        case 'big':
          return '18px';
        case 'medium':
          return '16px';
        case 'small':
          return '14px';
        default:
          return '18px';
      }
    }};
    padding: ${({ kind }) => {
      switch (kind) {
        case 'delete':
          return '10px 0px';
        case 'approve':
          return '7px 12px';
        default:
          return '10px 0px';
      }
    }};
  }
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;