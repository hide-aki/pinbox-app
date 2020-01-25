import React from 'react';
import {makeStyles, Theme} from '@material-ui/core';
import IpfsUpIcon from '../../images/ipfs-logo-vector-ice.svg'
import IpfsDownIcon from '../../images/ipfs-logo-vector-black.svg'


interface IpfsIconProps {
    isUp: boolean
    size?: string,
}

const DefaultSize = '1rem';

const _IpfsIcon: React.FC<IpfsIconProps> = (props, ref) => {
    const {isUp, size = DefaultSize, ...other} = props;
    return (
        <div ref={ref} {...other}>
            <img src={isUp ? IpfsUpIcon : IpfsDownIcon}
                 alt='ipfs-status'
                 style={{height: size, width: size}}
            />
        </div>
    )
};

export const IpfsIcon = React.forwardRef(_IpfsIcon);
