import React from 'react';
import {FormControl, InputLabel, MenuItem, Select} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {selectSettings} from './selectors';
import {settingsSlice} from './slice'
import {SettingsService} from '../../services/SettingsService';
import {useIntl} from 'react-intl';

const {actions} = settingsSlice;

const availableLanguages = new SettingsService().getAvailableLanguages();

export const SettingsForm: React.FC = () => {
    const dispatch = useDispatch();
    const intl = useIntl();
    const settings = useSelector(selectSettings);

    const t = (id:string): string => intl.formatMessage({id});

    const handlerMap = {
        language: actions.setLanguage
    };

    const handleChange = (field: string) => (e: any) => {
        // @ts-ignore
        const value = e.target.value;
        // @ts-ignore
        const handler = handlerMap[field];
        if (handler) {
            dispatch(handler(value))
        }
    };

    return (
        <FormControl>
            <InputLabel htmlFor="language-select">Language</InputLabel>
            <Select
                value={settings.language}
                onChange={handleChange('language')}
                inputProps={{
                    name: 'language',
                    id: 'language-select',
                }}
            >{
                availableLanguages.map(l =>
                    <MenuItem key={l} value={l}>{t(`language.${l}`)}</MenuItem>
                )
            }
            </Select>
        </FormControl>
    );
};

