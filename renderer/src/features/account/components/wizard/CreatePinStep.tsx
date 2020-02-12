import React, {useEffect} from 'react';
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
        pinField: {
            textAlign: "center",
            margin: theme.spacing(2,0, 4 ,0),
            fontSize: theme.typography.h4.fontSize,
            width: "20rem"
        }
    })
);

interface IProps {
    onReady: (isReady: boolean) => void,
    onPinChanged: (pin: string) => void,
}

const MIN_PIN_LENGTH = 4;

export const CreatePinStep: React.FC<IProps> =
    ({onReady, onPinChanged}) => {
        const classes = useStyles();
        const intl = useIntl();

        useEffect(() => {
            onReady(false)
        }, []);

        const handleChange = ({target}: any): void => {
            const isMinLength = target.value.length >= MIN_PIN_LENGTH;
            onReady(isMinLength);
            onPinChanged(target.value);
        };

        return (
            <div className={classes.root}>
                <p className={classes.text}>
                    <FormattedHTMLMessage id="account.pin.explanation"/>
                </p>
                <TextField
                    id="standard-password-input"
                    label={intl.formatMessage({
                        id: "input.enter_pin"
                    })}
                    className={classes.pinField}
                    type="password"
                    autoComplete="off"
                    margin="normal"
                    onChange={handleChange}
                />
            </div>
        )
    };
