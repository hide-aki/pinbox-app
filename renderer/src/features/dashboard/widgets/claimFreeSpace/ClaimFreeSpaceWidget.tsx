import React, {useState} from 'react';
import {Widget} from '../../../../app/components/Widget';
import {translate} from '../../../../utils/translate';
import {FormattedHTMLMessage, FormattedMessage, useIntl} from 'react-intl';
import {makeStyles, Theme} from '@material-ui/core/styles';
import {ProgressButton} from '../../../../app/components/ProgressButton';
import {useDispatch, useSelector} from 'react-redux';
import {thunks} from '../../../pool/slice';
import {currentAccountSelector} from '../../../account/selectors';
import {isOrderingSelector} from '../../../pool/selectors';
import {Chip, Typography} from '@material-ui/core';
import ClaimImage from '../../../../images/claimspace.png';
import clsx from 'clsx';
import DoneIcon from '@material-ui/icons/Done'
import {green} from '@material-ui/core/colors';
import {AskForPinDialog} from '../../../../app/components/AskForPinDialog';
import {Tristate} from '../../../../typings/Tristate';

const useStyle = makeStyles((theme: Theme) => ({
        root: {
            position: 'relative',
            '& img': {
                position: 'absolute',
                width: '256px',
                right: theme.spacing(3),
                bottom: theme.spacing(3),
            }
        },
        body: {
            display: 'flex',
            flexDirection: 'column',
            width: '80%',
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

export const ClaimFreeSpaceWidget: React.FC = () => {
    const classes = useStyle();
    const intl = useIntl();
    const {claimSpaceState} = useSelector(currentAccountSelector);
    const isOrdering = useSelector(isOrderingSelector);
    const dispatch = useDispatch();
    const t = translate(intl);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleClick = () => {
        setDialogOpen(true);
    };

    const handleDialogClosed = (pin:string|null): void => {
        setDialogOpen(false);
        if(pin !== null){
            dispatch(thunks.claimFreeSpace(pin));
        }
    };

    const hasClaimed = claimSpaceState !== Tristate.NotStartedYet;

    return (
        <div className={classes.root}>
            <AskForPinDialog open={dialogOpen} onClose={handleDialogClosed}/>
            <Widget
                title={t('dashboard.claim_space.title')}
                subtitle={t('dashboard.claim_space.subtitle')}
            >
                <img src={ClaimImage} alt="Claim Free Space Image"/>
                <div className={classes.body}>
                    <Typography variant='body1' className={classes.paragraph}>
                        <FormattedHTMLMessage id='dashboard.claim_space.description:html'/>
                    </Typography>
                    {hasClaimed
                        ? (
                            <div className={classes.center}>
                                <Chip
                                    className={classes.claimedChip}
                                    icon={<DoneIcon style={{color:'white'}}/>}
                                    label={t('dashboard.claim_space.claimed')}
                                />
                            </div>
                        )
                        : (
                            <ProgressButton
                                className={classes.center}
                                isProgressing={isOrdering}
                                variant='contained'
                                color='secondary'
                                onClick={handleClick}
                                disabled={hasClaimed}
                            >
                                <FormattedMessage id={'button.claim'}/>
                            </ProgressButton>)
                    }
                    <Typography variant='caption' className={clsx(classes.paragraph, classes.center)}>
                        <FormattedMessage id='dashboard.claim_space.caption'/>
                    </Typography>
                </div>
            </Widget>
        </div>
    )
};
