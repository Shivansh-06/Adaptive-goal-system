import type { HTMLAttributes, ReactNode } from 'react';
import { clsx } from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

const Card = ({ className, children, ...props }: CardProps) => {
    return (
        <div className={clsx('bg-white shadow rounded-lg overflow-hidden', className)} {...props}>
            {children}
        </div>
    );
};

export default Card;
