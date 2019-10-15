import React from 'react';
import {
    StepLabel,
    Stepper,
    Step,
    makeStyles,
    Theme,
    createStyles,
    Button
} from '@material-ui/core';
import {FormattedMessage} from 'react-intl';
import {useHistory} from 'react-router';
import {PassphraseGeneratorStep} from './PassphraseGeneratorStep';
import {AccountInformationStep} from './AccountInformationStep';
import {CreatePinStep} from '../CreatePinStep';
import {FinishStep} from './FinishStep';
import {SecureKeyService} from '../../../logic/SecureKeyService';
import {RoutePaths} from '../../../routes';

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
    const pre = (id: string): string => `account.create.${id}`;
    return [
        pre('generate_passphrase'),
        pre('show_account_info'),
        pre('create_pin'),
        pre('finish'),
    ];
}

enum Steps {
    GeneratePassphrase,
    AccountInformation,
    CreatePin,
    Finish,
    Max,
}

interface IStepContentProviderProps {
    step: number,
    passphrase: string,
    onNextReady: (isReady: boolean) => void,
    onPassphraseChanged: (passphrase: string) => void,
    onPinChanged: (pin: string) => void,
}

const StepContentProvider = (props: IStepContentProviderProps): any => {
    const {step, passphrase, onNextReady, onPinChanged, onPassphraseChanged} = props;
    switch (step) {
        case Steps.GeneratePassphrase:
            return <PassphraseGeneratorStep
                onReady={onNextReady}
                onPassphraseChanged={onPassphraseChanged}
            />;
        case Steps.AccountInformation:
            return <AccountInformationStep
                onReady={onNextReady}
                passphrase={passphrase}
            />;
        case Steps.CreatePin:
            return <CreatePinStep
                onReady={onNextReady}
                onPinChanged={onPinChanged}
            />;
        case Steps.Finish:
            return <FinishStep
                onReady={onNextReady}
            />;
        default:
            return 'Unknown step';
    }
};


export const AccountCreator: React.FC = (props: any) => {
    const classes = useStyles();
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
        setPassphrase('');
        // redirect
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

    const handlePassphraseChanged = (passphrase: string) => {
        setPassphrase(passphrase)
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
                    onPinChanged={handlePinChanged}
                    onPassphraseChanged={handlePassphraseChanged}
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
