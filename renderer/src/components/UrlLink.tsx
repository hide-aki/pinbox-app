import React, {useContext} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core';
import {ElectronContext} from './contexts/ElectronContext';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            cursor: 'pointer',
        },
    }),
);

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
