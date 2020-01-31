import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import {FormattedMessage} from 'react-intl';

interface StylesProps{
    expanded: boolean
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    secondaryHeading: {
        fontSize: (props:StylesProps) => theme.typography.pxToRem(props.expanded ? 16 : 10),
        color: (props:StylesProps) => props.expanded ? theme.palette.text.primary : theme.palette.text.secondary,
        transition: 'font-size 0.5s'
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
    },
    helper: {
        padding: theme.spacing(1, 2),
    },
    noPadding:{
        padding: 0
    }
}));

interface ForgotPinPanelProps {
    onConfirm: () => void
}

export const ForgotPinPanel: React.FC<ForgotPinPanelProps> = ({onConfirm}) => {
    const [expanded, setExpanded] = useState(false);
    const classes = useStyles({expanded});

    function handleExpansionChange(_:any, isExpanded:boolean){
        setExpanded(isExpanded)
    }

    return (
        <div className={classes.root}>
            <ExpansionPanel elevation={0} onChange={handleExpansionChange}>
                <ExpansionPanelSummary
                    classes={{root: classes.noPadding}}
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1c-content"
                    id="panel1c-header"
                >
                    <Typography className={classes.secondaryHeading}>
                            <FormattedMessage id="app.forgot_pin_panel.title"/>
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.details}>
                    <div className={`${classes.helper}`}>
                        <Typography variant="caption">
                            <FormattedMessage id="app.forgot_pin_panel.description"/>
                        </Typography>
                    </div>
                </ExpansionPanelDetails>
                <Divider/>
                <ExpansionPanelActions>
                    <Button size="small" color="secondary" onClick={onConfirm}>
                        <FormattedMessage id="btn.reset"/>
                    </Button>
                </ExpansionPanelActions>
            </ExpansionPanel>
        </div>
    );
}
