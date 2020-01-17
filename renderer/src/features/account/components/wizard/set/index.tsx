import React, {useContext} from 'react';
import {Button, createStyles, makeStyles, Step, StepLabel, Stepper, Theme} from '@material-ui/core';
import {useHistory} from 'react-router';
import {FormattedMessage} from 'react-intl';
import {CreatePinStep} from '../CreatePinStep';
import {FinishStep} from '../FinishStep';
import {SecureKeyService} from '../../../../../services/SecureKeyService';
import {RoutePaths} from '../../../../../routing/routes';
import {EnterPassphraseStep} from './EnterPassphraseStep';
import {VerifyAccountStep} from './VerifyAccountStep';
import {useDispatch} from 'react-redux';
import {BurstAccountService} from '../../../../../services/BurstAccountService';
import {thunks} from '../../../slice';
import {ElectronContext} from '../../../../../components/contexts/ElectronContext';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '90%',
        },
        content: {
            display: 'flex',
            justifyContent: 'center',
        },
        backButton: {
            marginRight: theme.spacing(1),
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    }),
);

function getSteps() {
    const pre = (id: string): string => `account.set.${id}`;
    return [
        pre('enter_passphrase'),
        pre('verify_account'),
        pre('create_pin'),
        pre('finish'),
    ];
}

enum Steps {
    InsertPassphrase,
    VerifyAccount,
    CreatePin,
    Finish,
    Max,
}

interface IStepContentProviderProps {
    step: number,
    onNextReady: (isReady: boolean) => void,
    passphrase: string,
    onPinChanged: (pin: string) => void,
    onPassphraseChanged: (passphrase: string) => void,
}

const StepContentProvider = (props: IStepContentProviderProps): any => {
    const {step, passphrase, onNextReady, onPassphraseChanged, onPinChanged} = props;
    switch (step) {
        case Steps.InsertPassphrase:
            return <EnterPassphraseStep
                onReady={onNextReady}
                onPassphraseChanged={onPassphraseChanged}
            />;
        case Steps.VerifyAccount:
            return <VerifyAccountStep
                onReady={onNextReady}
                passphrase={passphrase}
            />;
        case Steps.CreatePin:
            return <CreatePinStep
                onReady={onNextReady}
                onPinChanged={onPinChanged}
            />;
        case Steps.Finish:
            return <FinishStep/>;
        default:
            return 'Unknown step';
    }
};


export const AccountSetter: React.FC = (props: any) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const electronService = useContext(ElectronContext);
    const [activeStep, setActiveStep] = React.useState(0);
    const [isNextStepReady, setIsNextStepReady] = React.useState(false);
    const [pin, setPin] = React.useState('');
    const [passphrase, setPassphrase] = React.useState('');
    const history = useHistory();
    const steps = getSteps();

    const handleNext = () => {
        const nextStep = Math.min(activeStep + 1, Steps.Max);
        setActiveStep(() => nextStep);
        setIsNextStepReady(nextStep !== Steps.Max);
    };

    const handleFinished = () => {
        const secureKeyService = new SecureKeyService();
        secureKeyService.storeKeys(pin, passphrase);
        electronService.sendMessage({
            messageName: 'NewAccount',
            payload: passphrase
        });
        const burstAccountService = new BurstAccountService();
        const {accountId} = burstAccountService.getAccountIdentifiers(passphrase);
        dispatch(thunks.fetchBurstAccountInfo(accountId));
        history.push(RoutePaths.Index)
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => Math.max(prevActiveStep - 1, 0));
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleNextReady = (isReady: boolean) => {
        setIsNextStepReady(isReady);
    };

    const handlePinChanged = (pin: string) => {
        setPin(pin)
    };

    const handlePassphraseChanged = (pin: string) => {
        setPassphrase(pin)
    };

    return (
        <div>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel>
                            <FormattedMessage id={label}/>
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div className={classes.content}>
                <StepContentProvider
                    step={activeStep}
                    passphrase={passphrase}
                    onNextReady={handleNextReady}
                    onPassphraseChanged={handlePassphraseChanged}
                    onPinChanged={handlePinChanged}
                />
            </div>
            <div>
                {activeStep === steps.length ? (
                    <Button onClick={handleReset}>Reset</Button>
                ) : (
                    <div>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            className={classes.backButton}
                        >
                            <FormattedMessage id='button.previous'/>
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                activeStep === steps.length - 1
                                    ? handleFinished()
                                    : handleNext()
                            }}
                            disabled={!isNextStepReady}
                        >
                            <FormattedMessage id={
                                activeStep === steps.length - 1
                                    ? 'button.finish'
                                    : 'button.next'
                            }
                            />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
};

