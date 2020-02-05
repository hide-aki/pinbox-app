import {MenuAction} from '../../../../typings/MenuAction';

export const ActionNames = {
    OpenSubscriptions: 'openSubscriptions',
    NewSubscription: 'newSubscriptions'
};

const ActionLabels = {
    [ActionNames.OpenSubscriptions]: 'dashboard.capacity.actions.openSubscriptions',
    [ActionNames.NewSubscription]: 'dashboard.capacity.actions.newSubscription',
};

const createAction = (actionName: string, context: any = null): MenuAction => (
    {
        context,
        // @ts-ignore
        labelId: ActionLabels[actionName],
        name: actionName,
    }
);

// @ts-ignore
export const createActions = (): MenuAction[] => Object.keys(ActionNames).map(k => createAction(ActionNames[k]));
