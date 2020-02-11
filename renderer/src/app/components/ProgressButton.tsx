import {makeStyles} from '@material-ui/core/styles';
import {Button, ButtonProps, CircularProgress, Theme} from '@material-ui/core';
import React from 'react';
import clsx from 'clsx';


const useStyle = makeStyles((theme: Theme) => ({
        root: {
            position: "relative",
        },
        buttonProgress: {
            color: 'darkgrey',
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
        },
    })
);

interface ProgressButtonProps extends ButtonProps {
    isProgressing: boolean,
}

export const ProgressButton: React.FC<ProgressButtonProps> = (props) => {
    const classes = useStyle();
    const {isProgressing, children, disabled = false, className, ...others} = props;
    return (
        <div className={clsx(classes.root, className)}>
            <Button
                disabled={isProgressing || disabled}
                {...others}
            >
                {children}
            </Button>
            {isProgressing && <CircularProgress size={24} className={classes.buttonProgress}/>}
        </div>
    )
};
