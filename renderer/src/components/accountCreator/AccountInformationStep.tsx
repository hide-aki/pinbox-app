import React from 'react';
import {Grid, makeStyles, Paper, Theme} from '@material-ui/core';
import PublicTwoTone from '@material-ui/icons/PublicTwoTone';
import SecurityTwoTone from '@material-ui/icons/SecurityTwoTone';

import Guilloche from '../../images/certificate1280.jpg';
import {generateMasterKeys, getAccountIdFromPublicKey} from '@burstjs/crypto';
import {FormattedHTMLMessage, FormattedMessage} from 'react-intl';
import {convertNumericIdToAddress} from '@burstjs/util';

const useStyles = makeStyles((theme: Theme) => ({
        root: {},
        certificate: {
            backgroundImage: `url(${Guilloche})`,
            backgroundSize: 'cover',
            backgroundPositionY: 'center',
            width: '90%',
            margin: theme.spacing(4)
        },
        grid: {
            padding: theme.spacing(4, 8),
        },
        icon: {
            padding: '2rem',
            fontSize: '4rem',
            opacity: 0.1,
        },
        info: {
            fontFamily: 'monospace',
            paddingRight: theme.spacing(4)
        },
        sectionDescription: {
            padding: theme.spacing(2, 4)
        },
        separator: {
            width: '100%'
        }
    })
);

interface IProps {
    onReady: (isReady: boolean) => void,
    passphrase: string,
}

interface ILabeledInfoProps {
    labelId: string,
    text: string
}

const LabeledInfo = (props: ILabeledInfoProps) => {
    const {labelId, text} = props;
    const classes = useStyles();
    return (
        <React.Fragment>
            <small className={classes.info}>
                <FormattedMessage id={labelId}/>
            </small>
            <h3 className={classes.info}>{text}</h3>
        </React.Fragment>
    )
};

interface IAccountInfoType {
    publicKey: string,
    burstAddress: string
}

const getAccountInformation = (passphrase: string): IAccountInfoType => {
    if (!passphrase || !passphrase.length) {
        return {
            publicKey: '',
            burstAddress: '',
        }
    }
    const {publicKey} = generateMasterKeys(passphrase);
    const accountId = getAccountIdFromPublicKey(publicKey);
    const burstAddress = convertNumericIdToAddress(accountId);
    return {
        publicKey,
        burstAddress,
    }
};

export const AccountInformationStep: React.FC<IProps> =
    ({onReady, passphrase}) => {
        const classes = useStyles();
        const {burstAddress, publicKey} = getAccountInformation(passphrase);
        return (
            <div className={classes.root}>
                <Paper className={classes.certificate}>
                    <Grid container className={classes.grid} spacing={1}>
                        <h3 className={classes.sectionDescription}>
                            <FormattedMessage id="account.info.title"/>
                        </h3>
                        <small className={classes.sectionDescription}>
                            <FormattedMessage id="account.info.public_section"/>
                        </small>
                        <Grid container spacing={1}>
                            <Grid item xs={3}>
                                <PublicTwoTone className={classes.icon}/>
                            </Grid>
                            <Grid item xs={9}>
                                <LabeledInfo labelId="account.info.burst_address" text={burstAddress}/>
                                <div style={{wordBreak: 'break-all'}}>
                                    <LabeledInfo labelId="account.info.burst_publickey" text={publicKey}/>
                                </div>
                            </Grid>
                        </Grid>
                        <hr className={classes.separator}/>
                        <small className={classes.sectionDescription}>
                            <FormattedHTMLMessage id="account.info.private_section"/>
                        </small>
                        <Grid container spacing={1}>
                            <Grid item xs={3}>
                                <SecurityTwoTone className={classes.icon}/>
                            </Grid>
                            <Grid item xs={9}>
                                <LabeledInfo labelId="account.info.your_passphrase" text={passphrase}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        )
    };
