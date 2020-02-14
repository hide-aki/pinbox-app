import React, {useContext} from 'react';
import {ElectronContext} from './contexts/ElectronContext';

interface IProps {
    url: string,
}

export const BrowserLink: React.FC<IProps> = ({url, children}) => {
    const electronService = useContext(ElectronContext);

    const openLink = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        electronService.isElectronApp
            ? electronService.openExternalLink(url)
            : window.open(url, '_blank')
    };

    return (
        <a href={url} onClick={openLink}>
            {children}
        </a>
    )
};
