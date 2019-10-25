import React, {useEffect, useState} from 'react';
import {Chip, LinearProgress, makeStyles, Theme} from '@material-ui/core';
import DoneTwoTone from '@material-ui/icons/DoneTwoTone';
import VerifiedTwoTone from '@material-ui/icons/VerifiedUserTwoTone';
import HelpTwoTone from '@material-ui/icons/HelpTwoTone';
import {FormattedHTMLMessage, FormattedMessage, useIntl} from 'react-intl';
import {AccountState, BurstAccountService} from '../../../../../services/BurstAccountService';

const useStyles = makeStyles((theme: Theme) => ({
        root: {
            width: "90%",
            textAlign: "center",
        },
        accountInfo: {},
        verifying: {
            paddingBottom: "1em",
            "& >span": {
                marginTopTop: "1em",
                fontSize: "small",
            }
        },
        chip: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: "1em",
            margin: "0 auto",
            width: "70%",
            "& >span": {
                marginLeft: "2rem",
                textAlign: "justify",
            },
        },
    })
);

interface IProps {
    onReady: (isReady: boolean) => void,
    passphrase: string,
}

const burstAccountService = new BurstAccountService();

interface IStateView {
    labelId: string,
    description: string,
    icon: React.ReactElement | undefined
}

const getStateViews = (accountState: AccountState): IStateView => {
    let labelId = '';
    let description = '';
    let icon = undefined;
    switch (accountState) {
        case AccountState.ACTIVE:
            labelId = 'account.state.active';
            description = 'account.state.active.description';
            icon = <VerifiedTwoTone/>;
            break;
        case AccountState.INACTIVE:
            labelId = 'account.state.inactive';
            description = 'account.state.inactive.description';
            icon = <DoneTwoTone/>;
            break;
        case AccountState.NOT_FOUND:
            labelId = 'account.state.notfound';
            description = 'account.state.notfound.description';
            icon = <HelpTwoTone/>;
            break;
    }
    return {
        labelId,
        icon,
        description,
    }
};

export const VerifyAccountStep: React.FC<IProps> =
    ({onReady, passphrase}) => {
        const accountInfo = burstAccountService.getAccountIdentifiers(passphrase);
        const intl = useIntl();
        const classes = useStyles();
        const [accountState, setAccountState] = useState<AccountState>(AccountState.UNDEFINED);

        useEffect(() => {
            const fetchAccountState = async () => {
                const state = await burstAccountService.verifyAccount(accountInfo.accountId);
                setAccountState(state);
            };
            fetchAccountState()
        }, []);

        const {labelId, description, icon} = getStateViews(accountState);

        return (
            <div className={classes.root}>
                <div className={classes.accountInfo}>
                    <FormattedMessage id={'account.set.verify_account.your_address_is'}/>
                    <h2>{accountInfo.burstAddress}</h2>
                </div>
                {
                    accountState === AccountState.UNDEFINED
                        ? (
                            <div className={classes.verifying}>
                                <LinearProgress/>
                                <FormattedMessage id={'account.set.verify_account.verifying'}/>
                            </div>
                        )
                        :
                        (
                            <div className={classes.chip}>
                                <Chip color="secondary"
                                      label={intl.formatMessage({id: labelId})}
                                      icon={icon}/>
                                <FormattedHTMLMessage id={description}/>
                            </div>
                        )
                }
            </div>
        )
    };
