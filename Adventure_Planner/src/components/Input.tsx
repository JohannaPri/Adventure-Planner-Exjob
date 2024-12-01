import React, { forwardRef } from 'react';

type InputProps = {
    containerClass: string
    inputClass: string
    children?: React.ReactNode
} & Omit<React.ComponentProps<'input'>, 'children'>

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ containerClass, inputClass, children, ...rest }: InputProps, ref) => {
    return (
        <div className={containerClass}>
            <input ref={ref} className={inputClass} {...rest} />
            {children}
        </div>
    )
}
);

Input.displayName = 'Input';