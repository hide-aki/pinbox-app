import React from 'react';
import {makeStyles, Theme} from '@material-ui/core';
import {FormattedHTMLMessage, useIntl} from 'react-intl';

const useStyles = makeStyles((theme: Theme) => ({
        root: {
            width: "90%",
            textAlign: "center",
        },
        text: {
            textAlign: "justify"
        },
        passphraseField: {
            textAlign: "center",
            margin: theme.spacing(2,0, 4 ,0),
            fontSize: theme.typography.h4.fontSize,
            width: "20rem"
        }
    })
);

interface IProps {
    onReady: (isReady: boolean) => void,
}

export const FinishStep: React.FC<IProps> =
    ({onReady}) => {
        const classes = useStyles();
        const intl = useIntl();

        return (
            <div className={classes.root}>
                <p className={classes.text}>
                    <FormattedHTMLMessage id="account.finish.summary"/>
                </p>
            </div>
        )
    };
