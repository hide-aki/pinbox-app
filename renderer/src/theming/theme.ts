import { createMuiTheme } from '@material-ui/core/styles';
import {Colors} from './colors';

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: Colors.BurstBlue
        },
    },
    // extend if needed
});
