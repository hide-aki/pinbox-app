import React, {ReactElement} from 'react';
import {makeStyles, Theme} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
        root: {
            paddingTop: theme.spacing(2)
        },
        label: {
        },
        text: {
            fontFamily: "monospace",
            margin: theme.spacing(1, 0)
        },
    })
);

type SizeType = 'large' | 'small' | 'default'

interface IProps {
    label: string,
    children: string | ReactElement,
    size?: SizeType
}

// @ts-ignore
const Text = ({size = 'default', children, ...props}) => {
    switch(size){
        case 'small': return <h4 {...props}>{children}</h4>;
        case 'large': return <h2 {...props}>{children}</h2>;
        default: return <h3 {...props}>{children}</h3>
    }
};

export const LabeledTextField = (props: IProps) => {
    const {label, children, size = 'default'} = props;
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <small className={classes.label}>{label}
            </small>
            <Text size={size} className={classes.text}>{children}</Text>
        </div>
    )
};
