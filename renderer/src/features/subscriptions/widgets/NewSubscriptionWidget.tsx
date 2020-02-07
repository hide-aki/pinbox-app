import React, {useEffect, useState} from 'react';
import {Widget} from '../../../app/components/Widget';
import {useDispatch, useSelector} from 'react-redux';
import {isOrderingSelector, poolInfoSelector} from '../../pool/selectors';
import {convertNQTStringToNumber} from '@burstjs/util';
import {mapUnitToCapacity} from '../../../utils/mapUnitToCapacity';
import {FormattedMessage, FormattedPlural, useIntl} from 'react-intl';
import {FormControl, Grid, InputLabel, MenuItem, Select, TextField, Theme, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Unit} from '../../../typings/Unit';
import {thunks} from '../../pool/slice';
import {SubscriptionOrder} from '../../../typings/SubscriptionOrder';
import {calculateSubscriptionCosts} from '../helpers/calculateCosts';
import {currentAccountSelector} from '../../account/selectors';
import {SecondsPerDay} from '../../../utils/constants';
import {BurstReadonlyField} from '../../../app/components/BurstReadonlyField';
import Big from 'big.js';
import {translate} from '../../../utils/translate';
import {ProgressButton} from '../../../app/components/ProgressButton';


const useStyle = makeStyles((theme: Theme) => ({
        form: {
            width: "80%",
            margin: "0 auto"
        },
        vspace: {
            height: theme.spacing(2)
        },
        formControl: {
            marginRight: theme.spacing(1)
        },
        buttons: {
            marginTop: theme.spacing(2),
            display: "flex",
            justifyContent: "flex-end",
            alignItems: 'center',
            '& #error-message': {
                marginRight: theme.spacing(2)
            },
        },
        loadingButton: {
            position: "relative"
        },
        buttonProgress: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
        },
    })
);

export const NewSubscriptionWidget: React.FC = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const poolInfo = useSelector(poolInfoSelector);
    const account = useSelector(currentAccountSelector);
    const isOrdering = useSelector(isOrderingSelector);
    const intl = useIntl();
    // const t = (id: string, values?: Record<string, any>): string => intl.formatMessage({id}, values);
    const t = translate(intl);
    const [formData, setFormData] = useState({
        period: '1',
        capacity: '50',
        unit: 'M'
    });
    const [orderInvalid, setOrderInvalid] = useState(false);
    const [subscriptionCosts, setSubscriptionCosts] = useState('0');

    useEffect(() => {
        if(!poolInfo) return;
        const costs = calculateCosts();
        setSubscriptionCosts(costs.toString());
        setOrderInvalid(costs.gte(account.balanceNQT || '0'))
    }, [formData, account, poolInfo]);

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

    function calculateCosts(): Big {
        return !account.balanceNQT ? Big(0) : calculateSubscriptionCosts(costs, createOrder());
    }

    const handleChange = (id: 'period' | 'capacity' | 'unit') => (e: any) => {
        setFormData({
            ...formData,
            // @ts-ignore
            [id]: e.target.value
        });
    };

    function handleOrder() {
        if (orderInvalid) return;
        const order = createOrder();
        dispatch(thunks.orderSubscription(order))
    }

    return (
        <Widget
            title="New Subscription"
            subtitle={subtitle}
        >
            <Grid
                container
                justify="center"
            >
                <Grid item xs={12} md={6}>
                    <Grid container justify="center" spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <FormControl className={classes.formControl}
                                         fullWidth
                            >
                                <TextField id="capacity-input"
                                           type="number"
                                           label={t('subscription.form.label.capacity')}
                                           value={formData.capacity}
                                           onChange={handleChange('capacity')}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl
                                fullWidth
                                className={classes.formControl}
                            >
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
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl
                                fullWidth
                                className={classes.formControl}>
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
                        </Grid>
                    </Grid>
                </Grid>
                <Grid className={classes.vspace} item xs={12}/>
                <Grid item xs={12} sm={4}>
                    <BurstReadonlyField label={"Costs"} planck={subscriptionCosts}/>
                </Grid>
            </Grid>
            <div className={classes.buttons}>
                {orderInvalid && <Typography id="error-message" variant='caption' color='error'>
                  <FormattedMessage id="error.insufficient_balance"/>
                </Typography>}
                <ProgressButton
                    isProgressing={isOrdering}
                    variant="contained"
                    color="secondary"
                    onClick={handleOrder}
                >
                    <FormattedMessage id="button.order"/>
                </ProgressButton>
            </div>
        </Widget>
    )
};
