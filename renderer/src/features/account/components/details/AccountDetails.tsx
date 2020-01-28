import React from 'react';
import {
    Button,
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
import {Account} from '@burstjs/core';
import {LabeledTextField} from './LabeledTextField';
import {formattingService} from '../../../../services/FormattingService';
import {useDispatch, useSelector} from 'react-redux';
import {selectCurrentPool} from '../../../pools/selectors';
import {RoutePaths} from '../../../../routing/routes';
import {useHistory} from 'react-router';
import {BrowserLink} from '../../../../components/BrowserLink';
import {applicationSlice} from '../../../../app/slice';

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
    account: Account,
}


export const AccountDetails: React.FC<IProps> =
    ({account}) => {
        const classes = useStyles();
        const history = useHistory();
        const currentPool = useSelector(selectCurrentPool);
        const intl = useIntl();
        const t = (id: string) => intl.formatMessage({id});

        // @ts-ignore
        const {account: accountId, accountRS, keys : {publicKey}} = account;
        const balance = formattingService.formatBurstBalance(account);

        const gotoPools = () => {
            history.push(RoutePaths.Pools)
        };

        return (
            <div className={classes.root}>
                <div className={classes.balance}>
                    <TextField
                        variant="outlined"
                        label={t("account.info.balance")}
                        fullWidth
                        disabled
                        defaultValue={balance}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">BURST</InputAdornment>,
                            inputProps: {
                                style: {fontSize: "2em", color: "black"}
                            }
                        }}
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
                <LabeledTextField label={t("account.details.pool_current")} size='large'>
                    <div className={classes.pool}>
                        <BrowserLink url={currentPool ? currentPool.url : ''}>
                            {currentPool ? currentPool.name : ''}
                        </BrowserLink>
                        <Button className={classes.normalFont}
                                onClick={gotoPools}>{t("account.details.select_pool")}</Button>
                    </div>
                </LabeledTextField>
            </div>
        )
    };
