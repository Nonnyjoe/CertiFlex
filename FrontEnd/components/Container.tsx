import clsx from 'clsx';
import { CSSProperties, HTMLAttributes, ReactNode, StyleHTMLAttributes } from 'react';

interface ContainerProps {
    className?: string;
    children?: ReactNode;
    style?: CSSProperties;
}

export function Container({ className, style, ...props }: ContainerProps) {
    return (
        <div
            className={clsx('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)}
            {...props}
            style={style}
        />
    );
}