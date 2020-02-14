import {Widget} from '../../../../app/components/Widget';
import {CapacityChart} from '../../components/CapacityChart';
import React from 'react';
import {useIntl} from 'react-intl';
import {useSelector} from 'react-redux';
import {capacitySelector} from '../../selectors';
import {ActionNames, createActions} from './actions';
import {MenuAction} from '../../../../typings/MenuAction';
import {useHistory} from 'react-router-dom';
import {RouteProviders} from '../../../../routing/routes';
import {convertCapacityToBig} from '../../../../utils/convertCapacityToBig';
import {subscriptionsSelector} from '../../../account/selectors';

interface CapacityWidgetProps {
}

const actions = createActions();

export const CapacityWidget: React.FC<CapacityWidgetProps> = (props) => {
    const intl = useIntl();
    const history = useHistory();
    const capacities = useSelector(capacitySelector);
    const subscriptions = useSelector(subscriptionsSelector);

    function handleAction(action: MenuAction): void {
        switch (action.name) {
            case ActionNames.NewSubscription:
            case ActionNames.OpenSubscriptions:
                history.push(RouteProviders.Subscriptions())
        }
    }

    const subscriptionsCapacities = subscriptions.map(s => convertCapacityToBig({capacity: s}));

    return (
        <Widget
            title={intl.formatMessage({id: "dashboard.capacity.title"})}
            subtitle={intl.formatMessage({id: "dashboard.capacity.subtitle"})}
            actions={actions}
            onActionClick={handleAction}
        >
            <CapacityChart
                capacities={capacities}
                subscriptions={subscriptionsCapacities}
            />
        </Widget>
    )
};
