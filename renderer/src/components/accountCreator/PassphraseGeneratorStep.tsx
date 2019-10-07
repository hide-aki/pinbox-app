import React, {Component} from 'react';
import {Button, withStyles} from '@material-ui/core';
// @ts-ignore
import QRCode from 'qrcode.react';
import {PassPhraseGenerator} from '@burstjs/crypto';
import {FormattedHTMLMessage, FormattedMessage} from 'react-intl';
import {GeneratorSvgIcon} from './GeneratorSvgIcon';

const getRandomSeed = (): Buffer => {
    const buffer = new Buffer(128);
    crypto.getRandomValues(buffer);
    return buffer;
};

const styles = {
    root: {
        width: '90%',
    },
    generator: {
        display: 'flex',
        flexFlow: 'row',
        justifyContent: 'space-between',
        padding: '24px',
    },
    explanation: {
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'space-between',
        textAlign: 'justify',
        alignItems: 'center',
        paddingRight: '2rem',
        '& button':{
            marginTop: '0.5rem',
            width: "fit-content",
        }
    },
    passphrase: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid darkgrey',
        borderRadius: '4px',
        height: '24px',
        padding: '1rem',
        '& div': {
            fontFamily: 'monospace',
            fontWeight: '700',
        }
    }
};


interface IState {
    passphrase?: string,
    isGenerating?: boolean,
    randomString?: string,
}

interface IProps {
    onReady: (isReady:boolean) => void,
    classes: any,
    setPassphrase: any,
}

class _PassphraseGeneratorStep extends Component<IProps, IState> {
    private interval = null;
    private seed = new Buffer(128);

    constructor(props: IProps) {
        super(props);
        this.state = {
            passphrase: '',
            isGenerating: false,
            randomString: ''
        }
    }

    componentDidMount(): void {
        this.startGenerator();
    }

    componentWillUnmount(): void {
        this.stopGenerator();
    }

    private startGenerator(): void {
        const {onReady, setPassphrase} = this.props;
        // @ts-ignore
        clearInterval(this.interval);
        this.setState({
            isGenerating: true,
            randomString: '',
            passphrase: ''
        }, () => {
            onReady(false);
            setPassphrase(this.state.passphrase);
        });
        // @ts-ignore
        this.interval = setInterval(() => {
            this.setState({
                randomString: getRandomSeed().toString()
            });
        }, 100);
    };

    private stopGenerator(): void {
        const {onReady, setPassphrase} = this.props;

        // @ts-ignore
        clearInterval(this.interval);
        let phraseGenerator = new PassPhraseGenerator();
        phraseGenerator.reSeed(this.seed);
        this.setState({
            passphrase: phraseGenerator.generate().join(' '),
            isGenerating: false,
        }, () => {
            onReady(true);
            setPassphrase(this.state.passphrase);
        });
    };

    private toggleGenerator(): void {
        if (this.state.isGenerating) {
            this.stopGenerator()
        } else {
            this.startGenerator()
        }
    };

    render() {
        const {randomString, passphrase, isGenerating} = this.state;
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.passphrase}>
                    {
                        isGenerating ? <GeneratorSvgIcon size={18} /> : <div>{passphrase}</div>
                    }
                </div>
                <div className={classes.generator}>
                    <div className={classes.explanation}>
                        <FormattedHTMLMessage id={"account.create.qrcode_explanation"}/>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => this.toggleGenerator()}>
                            <FormattedMessage
                                id={`account.create.${isGenerating? 'button_stop' : 'button_generate'}`}
                            />
                        </Button>
                    </div>
                    <QRCode value={randomString}/>
                </div>
            </div>
        )
    }
}

// @ts-ignore
export const PassphraseGeneratorStep = withStyles(styles)(_PassphraseGeneratorStep);
