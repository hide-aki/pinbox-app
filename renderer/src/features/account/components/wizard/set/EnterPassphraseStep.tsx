import React from 'react';
import {makeStyles, TextField, Theme} from '@material-ui/core';
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
            width: "100%"
        }
    })
);

interface IProps {
    onReady: (isReady: boolean) => void,
    onPassphraseChanged: (passphrase: string) => void,
}

export const EnterPassphraseStep: React.FC<IProps> =
    ({onReady, onPassphraseChanged}) => {
        const classes = useStyles();
        const intl = useIntl();

        const handleChange = ({target}: any): void => {
            const isMinLength = target.value.length > 0;
            onReady(isMinLength);
            onPassphraseChanged(target.value);
        };

        return (
            <div className={classes.root}>
                <p className={classes.text}>
                    <FormattedHTMLMessage id="account.set.passphrase_description"/>
                </p>
                <TextField
                    id="standard-password-input"
                    label={intl.formatMessage({
                        id: "input.enter_passphrase"
                    })}
                    className={classes.passphraseField}
                    autoComplete="off"
                    margin="normal"
                    onChange={handleChange}
                />
            </div>
        )
    };
