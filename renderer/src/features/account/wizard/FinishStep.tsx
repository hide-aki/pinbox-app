import React from 'react';
import {makeStyles, Theme} from '@material-ui/core';
import {FormattedHTMLMessage, useIntl} from 'react-intl';
import FinishImage from '../../../images/account_finish.png';

const useStyles = makeStyles((theme: Theme) => ({
        root: {
            width: "90%",
            textAlign: "center",
        },
        text: {
            textAlign: "justify"
        },
        imageContainer: {
            overflowY: "hidden",
            height: 240
        },
        image: {
            width: "100%"
        }
    })
);

interface IProps {
    onReady: (isReady: boolean) => void,
}

export const FinishStep: React.FC<IProps> =
    ({onReady}) => {
        const classes = useStyles();
        return (
            <div className={classes.root}>
                <div className={classes.imageContainer}>
                    <img className={classes.image} src={FinishImage} alt='Finish'/>
                </div>
                <p className={classes.text}>
                    <FormattedHTMLMessage id="account.finish.summary"/>
                </p>
            </div>
        )
    };
