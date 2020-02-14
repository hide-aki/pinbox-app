import React from 'react';
import {Widget} from '../../../app/components/Widget';
import {SubscriptionTable} from '../components/SubscriptionTable';
import {voidFn} from '../../../utils/voidFn';
import {useSelector} from 'react-redux';
import {subscriptionsSelector} from '../../account/selectors';
import {translate} from '../../../utils/translate';
import {useIntl} from 'react-intl';

export const SubscriptionsWidget : React.FC = () => {
    const t=translate(useIntl());
    const subscriptions = useSelector(subscriptionsSelector);
    return (
        <Widget
            title={t("subscriptions.list.title")}
            subtitle={t("subscriptions.list.subtitle")}
        >
            <SubscriptionTable subscriptions={subscriptions} onCancel={voidFn}/>
        </Widget>
    )
};
