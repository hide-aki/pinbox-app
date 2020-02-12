import React, {useEffect, useState} from 'react';
import {Chip, LinearProgress, makeStyles, Theme} from '@material-ui/core';
import DoneTwoTone from '@material-ui/icons/DoneTwoTone';
import VerifiedTwoTone from '@material-ui/icons/VerifiedUserTwoTone';
import HelpTwoTone from '@material-ui/icons/HelpTwoTone';
import {FormattedHTMLMessage, FormattedMessage, useIntl} from 'react-intl';
import {AccountState, BurstAccountService} from '../../../../../services/BurstAccountService';
import {green, grey, red} from '@material-ui/core/colors';
import {ProgressButton} from '../../../../../app/components/ProgressButton';
import {useDispatch} from 'react-redux';
import {applicationSlice} from '../../../../../app/slice';
import {translate} from '../../../../../utils/translate';

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
    icon: React.ReactElement | undefined,
    chipColor: string
}

const getStateViews = (accountState: AccountState): IStateView => {
    let labelId = '';
    let description = '';
    let icon = undefined;
    let chipColor = grey[500];
    const iconStyle = {color: 'white'};
    switch (accountState) {
        case AccountState.Active:
            labelId = 'account.state.active';
            description = 'account.state.active.description';
            icon = <VerifiedTwoTone style={iconStyle}/>;
            chipColor = green[500];
            break;
        case AccountState.Inactive:
            labelId = 'account.state.inactive';
            description = 'account.state.inactive.description';
            icon = <DoneTwoTone style={iconStyle}/>;
            break;
        case AccountState.NotFound:
            labelId = 'account.state.notfound';
            description = 'account.state.notfound.description';
            icon = <HelpTwoTone style={iconStyle}/>;
            chipColor = red[500];
            break;
    }
    return {
        labelId,
        icon,
        description,
        chipColor,
    }
};

enum ActivationState {
    NotActivatedYet,
    Activating,
    Activated
}

export const VerifyAccountStep: React.FC<IProps> =
    ({passphrase, onReady}) => {
        const accountInfo = burstAccountService.getAccountIdentifiers(passphrase);
        const intl = useIntl();
        const dispatch = useDispatch();
        const classes = useStyles();
        const [accountState, setAccountState] = useState(AccountState.Undefined);
        const [activationState, setActivationState] = useState(ActivationState.NotActivatedYet);

        useEffect(() => {
            const fetchAccountState = async () => {
                const state = await burstAccountService.verifyAccount(accountInfo.accountId);
                setAccountState(state);
                onReady(state === AccountState.Active)
            };
            fetchAccountState()
            onReady(false)
        }, [accountInfo.accountId]);

        const handleActivate = async () => {
            setActivationState(ActivationState.Activating);
            try {
                await burstAccountService.activateAccount(accountInfo.publicKey);
                dispatch(applicationSlice.actions.showSuccessMessage(translate(intl)('account.activate.success')));
                setActivationState(ActivationState.Activated);
            } catch (e) {
                dispatch(applicationSlice.actions.showErrorMessage(translate(intl)('error.activation_failed')));
                setActivationState(ActivationState.NotActivatedYet);
            } finally {
                onReady(true)
            }
        };

        const {labelId, description, icon, chipColor} = getStateViews(accountState);

        const showActivationButton = (accountState === AccountState.Inactive || accountState === AccountState.NotFound)
            && (activationState !== ActivationState.Activated);

        return (
            <div className={classes.root}>
                <div className={classes.accountInfo}>
                    <FormattedMessage id={'account.set.verify_account.your_address_is'}/>
                    <h2>{accountInfo.burstAddress}</h2>
                </div>
                <div>
                    {
                        accountState === AccountState.Undefined
                            ? (
                                <div className={classes.verifying}>
                                    <LinearProgress/>
                                    <FormattedMessage id={'account.set.verify_account.verifying'}/>
                                </div>
                            )
                            :
                            (
                                <div className={classes.chip}>
                                    <Chip
                                        label={intl.formatMessage({id: labelId})}
                                        icon={icon}
                                        style={{backgroundColor: chipColor, color: 'white'}}
                                    />
                                    <FormattedHTMLMessage id={description}/>
                                </div>
                            )
                    }
                </div>
                {
                    showActivationButton &&
                    <ProgressButton
                      variant='contained'
                      color='secondary'
                      isProgressing={activationState === ActivationState.Activating}
                      onClick={handleActivate}
                    >
                      <FormattedMessage id='button.activate_account'/>
                    </ProgressButton>
                }
            </div>
        )
    };
