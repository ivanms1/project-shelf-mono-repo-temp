import * as React from 'react';
import { InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

interface Button extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'grey';
}
declare function Button({ children, variant, ...props }: Button): JSX.Element;

interface FormInput extends InputHTMLAttributes<HTMLInputElement> {
    register: any;
    round?: boolean;
    label?: string;
    error?: FieldError | undefined;
    wrapperStyles?: string;
}
declare function FormInput({ name, id, type, label, register, ...props }: FormInput): JSX.Element;

export { Button, FormInput };
