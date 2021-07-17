import React from 'react';

import Spinner from '../Spinner';

import { CustomButton } from './style';

export type Kind = 'approve' | 'disapprove' | 'logout' | 'delete' | 'edit';
export type Size = 'big' | 'medium' | 'small';
export type FontSize = 'big' | 'medium' | 'small';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  kind?: Kind | undefined;
  size?: Size | undefined;
  fontSize?: FontSize | undefined;
  loading?: boolean | undefined;
  children: React.ReactNode;
  addCSS?: any | undefined;
}

function Button({ loading, children, ...props }: ButtonProps) {
  return (
    <CustomButton {...props}>{loading ? <Spinner /> : children}</CustomButton>
  );
}

export default Button;
