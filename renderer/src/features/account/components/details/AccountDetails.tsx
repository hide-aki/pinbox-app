import React from 'react';
import {
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    InputAdornment,
    makeStyles,
    TextField,
    Theme,
    Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreTwoTone'
import {useIntl} from 'react-intl';
import {LabeledTextField} from './LabeledTextField';
import {FormattingService} from '../../../../services/FormattingService';
import {BurstAccount} from '../../../../typings/BurstAccount';
import {translate} from '../../../../utils/translate';
import {BurstReadonlyField} from '../../../../app/components/BurstReadonlyField';

const useStyles = makeStyles((theme: Theme) => ({
        root: {},
        balance: {
            margin: theme.spacing(4, 0)
        },
        text: {
            textAlign: "justify"
        },
        pool: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        },
        normalFont: {
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.fontSize,
            fontWeight: 400,
        },
        expand: {
            display: "flex",
            flexDirection: "column"
        },
        vspacing: {
            margin: theme.spacing(4, 0)
        },
        reset: {}
    })
);

interface IProps {
    account: BurstAccount,
}

export const AccountDetails: React.FC<IProps> =
    ({account}) => {
        const classes = useStyles();
        const intl = useIntl();
        const t = translate(intl);

        // @ts-ignore
        const {account: accountId, accountRS, publicKey} = account;

        return (
            <div className={classes.root}>
                <div className={classes.balance}>
                    <BurstReadonlyField
                        label={t("account.info.balance")}
                        planck={account.balanceNQT}
                        size="large"
                    />
                </div>
                <LabeledTextField label={t("account.info.burst_address")} size='large'>{accountRS}</LabeledTextField>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon/>}
                    >
                        <Typography>{t("account.details.expansion_hint")}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.expand}>
                        <LabeledTextField label={t("account.info.burst_accountId")}>{accountId}</LabeledTextField>
                        <LabeledTextField label={t("account.info.burst_publickey")}
                                          size='small'>{publicKey}</LabeledTextField>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <div className={classes.vspacing}/>
            </div>
        )
    };
