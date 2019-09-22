import Button from '@material-ui/core/Button';
import {FormattedMessage} from 'react-intl';
import React, {useContext} from 'react';
import {ElectronContext} from './contexts/ElectronContext';

export const DemoButton: React.FC = () => {
    const electronService = useContext(ElectronContext);
    return (
        <Button variant="contained" color="primary" onClick={e =>
            electronService.sendMessage({
                messageName: 'Test',
                payload: {foo: 'bar'}
            })
        }>
            <FormattedMessage id="button.click_me"
                              defaultMessage={"Click me!"}
            />
        </Button>
    )
};
