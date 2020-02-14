import {Subscription} from '../../../typings/Subscription';
import {OnEventFn} from '../../../typings/OnEventFn';
import React from 'react';
import MaterialTable from 'material-table';
import {translate} from '../../../utils/translate';
import {useIntl} from 'react-intl';
import {TableIcons} from '../../../app/components/TableIcons';

interface IProps {
    subscriptions: Subscription[]
    onCancel: OnEventFn<Subscription>
}

interface RowData {
    orderDate: string,
    expiryDate: string,
    capacity: string,
    cancelable: boolean
}

export const SubscriptionTable: React.FC<IProps> = ({subscriptions,}) => {
    const intl = useIntl();
    const t = translate(intl);

    function toRowData(subscription: Subscription): RowData {
        console.log('toRow', subscription.startTimestamp, subscription.endTimestamp)
        return {
            orderDate: intl.formatDate(new Date(subscription.startTimestamp)),
            expiryDate: intl.formatDate(new Date(subscription.endTimestamp)),
            cancelable: subscription.cancelable,
            capacity: `${subscription.value} ${subscription.unit}`
        }
    }

    return (
        <MaterialTable
            icons={TableIcons}
            title={t("subscriptions.list.table.title")}
            columns={[
                {title: t('subscriptions.list.table.column.orderDate'), field: 'orderDate'},
                {title: t('subscriptions.list.table.column.expiryDate'), field: 'expiryDate'},
                {title: t('subscriptions.list.table.column.capacity'), field: 'capacity'},
            ]}
            data={subscriptions.map(toRowData)}
            options={{
                actionsColumnIndex: -1,
                search: false,
                sorting: true
            }}
        />
    )
};
