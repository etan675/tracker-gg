import React, { ReactNode } from 'react';

type Props = Readonly<{
    children: ReactNode
}>;

const layout = ({ children }: Props) => {
    return (
        <div>
            {children}
        </div>
    )
};

export default layout;