import React, {useEffect, useState} from 'react';
import {Widget} from '../../../app/components/Widget';
import {useDispatch, useSelector} from 'react-redux';
import {poolInfoSelector} from '../../pool/selectors';
import {convertNQTStringToNumber} from '@burstjs/util';
import {mapUnitToCapacity} from '../../../utils/mapUnitToCapacity';
import {FormattedMessage, FormattedPlural, useIntl} from 'react-intl';
import {Button, FormControl, InputLabel, MenuItem, Select, TextField, Theme, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Unit} from '../../../typings/Unit';
import {thunks} from '../../pool/slice';
import {SubscriptionOrder} from '../../../typings/SubscriptionOrder';
import {calculateSubscriptionCosts} from '../helpers/calculateCosts';
import {currentAccountSelector} from '../../account/selectors';
import {SecondsPerDay} from '../../../utils/constants';

const useStyle = makeStyles((theme: Theme) => ({
        form: {
            display: "flex",
            justifyContent: 'center',
        },
        formControl: {
            marginRight: theme.spacing(1)
        },
        buttons: {
            marginTop: theme.spacing(2),
            display: "flex",
            justifyContent: "flex-end",
            alignItems:'center',
            '& #error-message': {
                marginRight: theme.spacing(2)
            }
        }
    })
);

export const NewSubscriptionWidget: React.FC = () => {
    const dispatch = useDispatch();
    const poolInfo = useSelector(poolInfoSelector);
    const account = useSelector(currentAccountSelector);
    const intl = useIntl();
    const t = (id: string, values?: Record<string, any>): string => intl.formatMessage({id}, values);
    const classes = useStyle();
    const [formData, setFormData] = useState({
        period: '1',
        capacity: '50',
        unit: 'M'
    });
    const [orderInvalid, setOrderInvalid] = useState(false);
    useEffect(validateOrder);

    if (!poolInfo) return null; // use skeleton just for the case it's needed

    const {costs} = poolInfo;
    const burst = convertNQTStringToNumber(costs.burstPlanck);
    const unit = mapUnitToCapacity(costs.unit);
    const capacity = costs.capacity;
    const subtitle = intl.formatMessage({id: "subscription.costs.text"}, {
        burst,
        unit,
        capacity
    });

    function createOrder(): SubscriptionOrder {
        const SecsPerMonth = SecondsPerDay * 30;
        return {
            capacity: (+formData.capacity),
            periodSecs: (+formData.period) * SecsPerMonth,
            unit: formData.unit as Unit,
        };
    }

    function validateOrder() {
        const order = createOrder();
        if(!account.balanceNQT){
            setOrderInvalid(true);
            return
        }
        const hasSufficientBalance = calculateSubscriptionCosts(costs, order).lt(account.balanceNQT)
        setOrderInvalid(!hasSufficientBalance)
    }

    const handleChange = (id: 'period' | 'capacity' | 'unit') => (e: any) => {
        setFormData({
            ...formData,
            // @ts-ignore
            [id]: e.target.value
        });
        validateOrder()
    };

    function handleOrder() {
        if(orderInvalid) return;
        const order = createOrder();
        dispatch(thunks.orderSubscription(order))
    }

    return (
        <Widget
            title="New Subscription"
            subtitle={subtitle}
        >
            <div className={classes.form}>
                <FormControl className={classes.formControl}>
                    <TextField id="capacity-input"
                               type="number"
                               label={t('subscription.form.label.capacity')}
                               value={formData.capacity}
                               onChange={handleChange('capacity')}
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="unit-select">
                        <FormattedMessage id='subscription.form.label.unit'/>
                    </InputLabel>
                    <Select
                        value={formData.unit}
                        onChange={handleChange('unit')}
                        inputProps={{
                            name: 'unit',
                            id: 'unit-select',
                        }}
                    >{
                        ['M', 'G', 'T'].map(u =>
                            <MenuItem key={u} value={u}>{mapUnitToCapacity(u as Unit)}</MenuItem>
                        )
                    }
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="period-select"><FormattedMessage
                        id='subscription.form.label.period'/></InputLabel>
                    <Select
                        value={formData.period}
                        onChange={handleChange('period')}
                        inputProps={{
                            name: 'period',
                            id: 'period-select',
                        }}
                    >{
                        ['1', '3', '6', '12'].map(months =>
                            <MenuItem key={months} value={months}>
                                <FormattedPlural
                                    value={+months}
                                    one={t("subscription.form.text.monthPeriods", {months})}
                                    other={t("subscription.form.text.monthPeriods:plural", {months})}
                                />
                            </MenuItem>
                        )
                    }
                    </Select>
                </FormControl>
            </div>
            <div className={classes.buttons}>
                {orderInvalid && <Typography id="error-message" variant='caption' color='error'>
                    <FormattedMessage id="error.insufficient_balance"/>
                </Typography>}
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleOrder}
                    disabled={orderInvalid}
                >
                    <FormattedMessage id="button.order"/>
                </Button>
            </div>
        </Widget>
    )
};
