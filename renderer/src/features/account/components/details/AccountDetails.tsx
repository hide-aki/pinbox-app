import React from 'react';
import {
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    makeStyles,
    Theme,
    Tooltip,
    Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreTwoTone'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUserTwoTone'
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedInTwoTone';
import {FormattedMessage, useIntl} from 'react-intl';
import {LabeledTextField} from './LabeledTextField';
import {BurstAccount} from '../../../../typings/BurstAccount';
import {translate} from '../../../../utils/translate';
import {BurstReadonlyField} from '../../../../app/components/BurstReadonlyField';
import {Tristate} from '../../../../typings/Tristate';
import {isEmptyString} from '../../../../utils/isEmptyString';
import Chip from '@material-ui/core/Chip';
import {blue, green} from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) => ({
        root: {},
        header: {},
        chip: {
            margin: theme.spacing(2, 1, 0, 0),
            color: 'white',
            '& svg': {
                color: 'white',
            }
        },
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
        expand: {
            display: "flex",
            flexDirection: "column"
        },
        vspacing: {
            margin: theme.spacing(4, 0)
        },
    })
);

interface IProps {
    account: BurstAccount,
}

export const AccountDetails: React.FC<IProps> =
    ({account}) => {
        const classes = useStyles();
        const t = translate(useIntl());
        const {account: accountId, accountRS, publicKey, claimSpaceState} = account;
        const hasClaimedFreeSpace = claimSpaceState === Tristate.Finished;
        const isActive = !isEmptyString(publicKey);

        return (
            <div className={classes.root}>
                <div className={classes.header}>
                    <Typography variant='h4'><FormattedMessage id="account.details.title"/></Typography>
                    <Typography variant='body1'><FormattedMessage id="account.details.description"/></Typography>

                    {
                        isActive && (
                            <Tooltip title={t('account.state.active.description')}>
                                <Chip
                                    className={classes.chip}
                                    icon={<VerifiedUserIcon/>}
                                    label={t('account.state.active')}
                                    style={{backgroundColor: green[600]}}
                                />
                            </Tooltip>
                        )
                    }
                    {
                        hasClaimedFreeSpace && (
                            <Tooltip title={t('account.state.claimedFreeSpace.description')}>
                                <Chip
                                    className={classes.chip}
                                    icon={<AssignmentTurnedInIcon/>}
                                    label={t('account.state.claimedFreeSpace')}
                                    style={{backgroundColor: blue[700]}}
                                />
                            </Tooltip>
                        )
                    }

                </div>
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
