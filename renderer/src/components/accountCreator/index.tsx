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
import {PassphraseGeneratorStep} from './PassphraseGeneratorStep';


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
        pre('select_pool'),
        pre('finish'),
    ];
}

interface IStepContentProviderProps {
    step: number,
    onNextReady: (isReady:boolean) => void
}

const StepContentProvider = (props: IStepContentProviderProps): any => {
    switch (props.step) {
        case 0:
            return <PassphraseGeneratorStep onReady={props.onNextReady}/>;
        case 1:
            return 'Write Down Passphrase';
        case 2:
            return 'Create Pin';
        case 3:
            return 'Select Pool';
        case 4:
            return 'Finish';
        default:
            return 'Unknown step';
    }
};

const MAX_STEPS = 4;

export const AccountCreator: React.FC = () => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [isNextStepReady, setIsNextStepReady] = React.useState(false);
    const steps = getSteps();
    const handleNext = () => {
        setActiveStep(prevActiveStep => Math.min(prevActiveStep + 1, MAX_STEPS));
        setIsNextStepReady(false);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => Math.max(prevActiveStep - 1, 0));
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleNextReady = (isReady:boolean) => {
        setIsNextStepReady(isReady);
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
                <StepContentProvider step={activeStep} onNextReady={handleNextReady}/>
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
                            onClick={handleNext}
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

