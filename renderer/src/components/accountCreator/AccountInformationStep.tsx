import React from 'react';
import {Button, Checkbox, FormControlLabel, Grid, makeStyles, Paper, Theme} from '@material-ui/core';
import PublicTwoTone from '@material-ui/icons/PublicTwoTone';
import SecurityTwoTone from '@material-ui/icons/SecurityTwoTone';
import PrintTwoTone from '@material-ui/icons/PrintTwoTone';

import Guilloche from '../../images/certificate1280.jpg';
import {generateMasterKeys, getAccountIdFromPublicKey} from '@burstjs/crypto';
import {FormattedHTMLMessage, FormattedMessage, useIntl} from 'react-intl';
import {convertNumericIdToAddress} from '@burstjs/util';

const useStyles = makeStyles((theme: Theme) => ({
        root: {},
        certificate: {
            printColorAdjust: 'exact',
            backgroundImage: `url(${Guilloche})`,
            backgroundSize: 'cover',
            backgroundPositionY: 'center',
            margin: theme.spacing(4)
        },
        grid: {
            padding: theme.spacing(2, 8),
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
            width: '90%'
        },
        confirmation: {
            display: 'flex',
            flexFlow: 'column',
            textAlign: 'justify',
            alignItems: 'center',
            margin: theme.spacing(2, 4),
            '& button': {
                marginBottom: theme.spacing(2),
                width: 'fit-content'
            }
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
    burstAddress: string,
    accountId: string,
}

const getAccountInformation = (passphrase: string): IAccountInfoType => {
    if (!passphrase || !passphrase.length) {
        return {
            publicKey: '',
            burstAddress: '',
            accountId: '',
        }
    }
    const {publicKey} = generateMasterKeys(passphrase);
    const accountId = getAccountIdFromPublicKey(publicKey);
    const burstAddress = convertNumericIdToAddress(accountId);
    return {
        publicKey,
        burstAddress,
        accountId,
    }
};

const printCertificate = (): void => {
    window.print()
};

export const AccountInformationStep: React.FC<IProps> =
    ({onReady, passphrase}) => {
        const classes = useStyles();
        const intl = useIntl();
        const {burstAddress, publicKey, accountId} = getAccountInformation(passphrase);
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
                                <LabeledInfo labelId="account.info.burst_accountId" text={accountId}/>
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
                <div className={classes.confirmation}>
                    <p><FormattedHTMLMessage id="account.info.secure_information"/></p>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<PrintTwoTone/>}
                        onClick={printCertificate}
                    >
                        <FormattedMessage id="button.print"/>
                    </Button>
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={({target}) => onReady(target.checked)}
                                value="hasSecured"/>
                        }
                        label={intl.formatMessage({
                            id: "account.info.has_secured"
                        })}
                    />
                </div>
            </div>
        )
    };
