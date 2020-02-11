import React from 'react';
import {OnEventFn} from '../../typings/OnEventFn';
import {Card, CardContent, CardHeader} from '@material-ui/core';
import {ActionMenu} from './ActionMenu/ActionMenu';
import {voidFn} from '../../utils/voidFn';
import {MenuAction} from '../../typings/MenuAction';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
        root: {
            // @ts-ignore
            opacity: ({transparent = true}) => transparent ? 0.95 : 1.0,
        }
    })
);

interface WidgetProps {
    title: string,
    subtitle?: string,
    actions?: MenuAction[],
    onActionClick?: OnEventFn<MenuAction>,
    transparent?: boolean,
}

export const Widget: React.FC<WidgetProps> = (props) => {
    const classes = useStyles(props);
    const {children, title, actions = [], subtitle = '', onActionClick = voidFn} = props;
    return (
        <Card className={classes.root}>
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
