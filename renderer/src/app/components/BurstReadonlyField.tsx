import {InputAdornment, TextField} from '@material-ui/core';
import React from 'react';
import {useIntl} from 'react-intl';
import {FormattingService} from '../../services/FormattingService';

interface BurstReadonlyFieldProps {
    label: string
    planck: string,
    digits?: number,
    size?: 'large'|'normal'
}

export const BurstReadonlyField: React.FC<BurstReadonlyFieldProps> = (props) => {
    const {label, planck, size = 'normal',  digits = 4} = props;
    const burst = new FormattingService(useIntl()).formatBurstValue(planck);
    return (
        <TextField
            variant="outlined"
            label={label}
            fullWidth
            disabled
            value={burst}
            InputProps={{
                endAdornment: <InputAdornment position="end">BURST</InputAdornment>,
                inputProps: {
                    style: {fontSize: size === 'large'? "2em" : "1em", color: "black"}
                }
            }}
        />

    )
};
