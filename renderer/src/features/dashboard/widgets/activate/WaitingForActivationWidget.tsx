import React, {useState} from 'react';
import {FormattedHTMLMessage, FormattedMessage, useIntl} from 'react-intl';
import {useDispatch, useSelector} from 'react-redux';
import {activationStateSelector} from '../../../account/selectors';
import {makeStyles, Theme} from '@material-ui/core/styles';
import {green} from '@material-ui/core/colors';
import {Widget} from '../../../../app/components/Widget';
import {translate} from '../../../../utils/translate';
import ProcessingImage from '../../../../images/processing.png';
import {Typography} from '@material-ui/core';
import {ProgressButton} from '../../../../app/components/ProgressButton';
import {accountThunks} from '../../../account/slice';
import {AskForPinDialog} from '../../../../app/components/AskForPinDialog';
import {SecureKeyService} from '../../../../services/SecureKeyService';
import {Tristate} from '../../../../typings/Tristate';

const useStyle = makeStyles((theme: Theme) => ({
        root: {
            position: 'relative',
            '& img': {
                position: 'absolute',
                height: '148px',
                right: theme.spacing(3),
                bottom: theme.spacing(3),
                animation: '2s ease-in-out 0s infinite alternate pulse',
            }
        },
        body: {
            display: 'flex',
            flexDirection: 'column',
            width: '70%',
            justifyContent: 'center'
        },
        paragraph: {
            margin: theme.spacing(2, 0, 2, 0),
            textAlign: 'justify',
        },
        claimedChip: {
            color: 'white',
            backgroundColor: green[500],
            animation: '2s ease-in-out 0s infinite alternate pulse',
        },
        center: {
            textAlign: 'center',
        }
    })
);

export const WaitingForActivationWidget: React.FC = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const t = translate(useIntl());
    const [requestState, setRequestState] = useState(Tristate.NotStartedYet);
    const activationState = useSelector(activationStateSelector);

    const [dialogOpen, setDialogOpen] = useState(false);

    const handleClick = () => {
        setDialogOpen(true);
    };

    const handleDialogClosed = (pin: string | null): void => {
        setDialogOpen(false);
        if (pin !== null) {
            const {publicKey} = new SecureKeyService().getKeys(pin);
            setRequestState(Tristate.Pending);
            dispatch(accountThunks.activateBurstAccount(publicKey, (success) => {
                setRequestState(success ? Tristate.Finished : Tristate.NotStartedYet)
            }));
        }
    };

    const hasNotActivatedYet = activationState === Tristate.NotStartedYet

    return (
        <div className={classes.root}>
            <AskForPinDialog open={dialogOpen} onClose={handleDialogClosed}/>
            <Widget
                title={t("dashboard.activating.title")}
                subtitle={t(hasNotActivatedYet ? "dashboard.activating.subtitle.notactivatedyet": "dashboard.activating.subtitle")}

            >
                <img src={ProcessingImage} alt="Account Being Activated Image" style={hasNotActivatedYet ? {animation: 'none'} : {}}/>
                <div className={classes.body}>
                    <Typography variant='body1' className={classes.paragraph}>
                        <FormattedHTMLMessage id={ hasNotActivatedYet
                           ? 'dashboard.activating.description.notactivatedyet:html'
                           : 'dashboard.activating.description:html'
                        }/>
                    </Typography>
                    {
                        hasNotActivatedYet &&
                        <ProgressButton
                          className={classes.center}
                          isProgressing={requestState === Tristate.Pending}
                          variant='contained'
                          color='secondary'
                          onClick={handleClick}
                          disabled={requestState === Tristate.Finished}
                        >
                          <FormattedMessage id={'button.activate_account'}/>
                        </ProgressButton>
                    }
                </div>
            </Widget>
        </div>
    )
};
