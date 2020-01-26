import {FileTreeAction} from '../typings/fileTreeAction';

export const ActionNames = {
    Rename: 'rename', Remove: 'remove'
};

const ActionLabels = {
    [ActionNames.Rename]: 'dashboard.filetree.actions.rename',
    [ActionNames.Remove]: 'dashboard.filetree.actions.remove',
};

const createAction = (actionName: string, context: any): FileTreeAction => (
    {
        context,
        // @ts-ignore
        labelId: ActionLabels[actionName],
        name: actionName,
    }
);

export const createActions = (context: any, actionNames: string[]): FileTreeAction[] =>
    actionNames.map(actionName => createAction(actionName, context));

