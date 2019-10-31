import React from 'react';
import {Button, FormControl, InputLabel, makeStyles, MenuItem, Select, Theme} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {selectSettings} from './selectors';
import {settingsSlice} from './slice'
import {SettingsService} from '../../services/SettingsService';
import {useIntl} from 'react-intl';
import {applicationSlice} from '../../app/slice';
import {RoutePaths} from '../../routing/routes';
import {useHistory} from 'react-router';

const {actions} = settingsSlice;

const settingsService = new SettingsService();
const availableLanguages = settingsService.getAvailableLanguages();
const availablePeers = settingsService.getAvailablePeers();

const useStyles = makeStyles((theme: Theme) => ({
        root: {},
        balance: {
            margin: theme.spacing(4, 0)
        },
        text: {
            textAlign: "justify"
        },
        pool: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        },
        normalFont: {
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.fontSize,
            fontWeight: 400,
        },
        expand: {
            display: "flex",
            flexDirection: "column"
        },
        vspacing: {
            margin: theme.spacing(4, 0)
        },
        reset: {}
    })
);


export const SettingsForm: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const intl = useIntl();
    const settings = useSelector(selectSettings);

    const t = (id: string): string => intl.formatMessage({id});

    const handlerMap = {
        language: actions.setLanguage,
        peer: actions.setPeer
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


    const reset = () => {
        dispatch(applicationSlice.actions.reset());
        history.replace(RoutePaths.Login)
    };

    return (
        <React.Fragment>
            <FormControl>
                <InputLabel htmlFor="language-select">{t('settings.label.language')}</InputLabel>
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
            <div className={classes.vspacing}/>
            <FormControl>
                <InputLabel htmlFor="peer-select">{t('settings.label.peer')}</InputLabel>
                <Select
                    value={settings.peer}
                    onChange={handleChange('peer')}
                    inputProps={{
                        name: 'peer',
                        id: 'peer-select',
                    }}
                >{
                    availablePeers.map(n =>
                        <MenuItem key={n} value={n}>{n}</MenuItem>
                    )
                }
                </Select>
                <div className={classes.vspacing}/>
                <div>
                    <small>{t("settings.danger_zone")}</small>
                    <p id='account-reset'>{t("settings.reset_explanation")}</p>
                    <Button variant="contained" color="secondary"
                            onClick={reset}>{t("settings.reset")}</Button>
                </div>
            </FormControl>
        </React.Fragment>
    );
};

