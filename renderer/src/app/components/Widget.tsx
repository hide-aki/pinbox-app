import React from 'react';
import {OnEventFn} from '../../typings/OnEventFn';
import {Card, CardContent, CardHeader} from '@material-ui/core';
import {ActionMenu} from './ActionMenu/ActionMenu';
import {voidFn} from '../../utils/voidFn';
import {MenuAction} from '../../typings/MenuAction';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
        root: {
            padding: theme.spacing(1)
        }
    })
);


interface WidgetProps {
    title: string,
    subtitle?: string,
    actions?: MenuAction[],
    onActionClick?: OnEventFn<MenuAction>
}

export const Widget: React.FC<WidgetProps> = (props) => {
    const classes = useStyles();
    const {children, title, actions = [], subtitle = '', onActionClick = voidFn} = props;
    return (
        <Card>
            <CardHeader
                action={
                    <ActionMenu actions={actions} onAction={onActionClick}/>
                }
                title={title}
                subheader={subtitle}
            >
            </CardHeader>
            <CardContent classes={{root: classes.root}}>
                {children}
            </CardContent>
        </Card>
    )
};
