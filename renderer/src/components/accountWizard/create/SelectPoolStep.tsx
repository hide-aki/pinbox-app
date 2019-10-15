import React from 'react';
import {
    createStyles,
    FormControl,
    FormHelperText,
    makeStyles,
    MenuItem,
    Select,
    TextField,
    Theme
} from '@material-ui/core';
import {FormattedHTMLMessage, useIntl} from 'react-intl';
import {IPoolDescription} from '../../../typings/IPoolDescription';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        text: {
            textAlign: "justify"
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);


interface IProps {
    onReady: (isReady: boolean) => void,
    availablePools: Array<IPoolDescription>,
}

export const SelectPoolStep: React.FC<IProps> =
    ({onReady, availablePools}) => {
        const classes = useStyles();
        const intl = useIntl();
        const [selectedPool, setSelectedPool] = React.useState({url:''});

        // @ts-ignore
        const handleChange = (e): void => {
            setSelectedPool({url: e.target.url})
        };

        return (
            <div className={classes.root}>
                <p className={classes.text}>
                    Select Pool
                </p>
                <FormControl>
                    <Select
                        value={selectedPool.url}
                        onChange={handleChange}
                        name="pool"
                        displayEmpty
                        className={classes.selectEmpty}
                    >
                        <MenuItem value="" disabled>
                            Select a Pool
                        </MenuItem>
                        {
                            availablePools.map(ap => <MenuItem key={ap.url} value={ap.url}>{ap.name}</MenuItem>)
                        }
                    </Select>
                    <FormHelperText>Placeholder</FormHelperText>
                </FormControl>
            </div>
        )
    };
