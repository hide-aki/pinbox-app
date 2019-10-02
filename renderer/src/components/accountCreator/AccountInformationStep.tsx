import React from 'react';

interface IProps {
    onReady: (isReady: boolean) => void,
    passphrase: string,
}

export const AccountInformationStep: React.FC<IProps> =
    ({onReady, passphrase}) => {
        return (
            <React.Fragment>
                <h2>Account Information</h2>
                <h4>{passphrase}</h4>
            </React.Fragment>
        )
    };

