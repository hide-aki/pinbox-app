import {Widget} from '../../../../app/components/Widget';
import {CapacityChart} from '../../components/CapacityChart';
import React from 'react';
import {useIntl} from 'react-intl';
import Big from 'big.js';
import {useSelector} from 'react-redux';
import {capacitySelector} from '../../selectors';
import {ActionNames, createActions} from './actions';
import {MenuAction} from '../../../../typings/MenuAction';
import { useHistory } from 'react-router-dom';
import {RouteProviders} from '../../../../routing/routes';

interface CapacityWidgetProps {
}

const actions = createActions();

export const CapacityWidget: React.FC<CapacityWidgetProps> = (props) => {
    const intl = useIntl();
    const history = useHistory();
    const capacities = useSelector(capacitySelector);

    function handleAction(action: MenuAction) : void {
        switch(action.name){
            case ActionNames.NewSubscription:
            case ActionNames.OpenSubscriptions:
                history.push(RouteProviders.Subscriptions())
        }
    }

    return (
        <Widget
            title={intl.formatMessage({id: "dashboard.capacity.title"})}
            subtitle={intl.formatMessage({id: "dashboard.capacity.subtitle"})}
            actions={actions}
            onActionClick={handleAction}
        >
            <CapacityChart
                capacities={capacities}
                subscriptions={[
                    Big(400000),
                    Big(5000000),
                    Big(15000000)
                ]}
            />
        </Widget>
    )
};
