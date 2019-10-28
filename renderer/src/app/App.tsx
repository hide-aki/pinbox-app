import React from 'react';
import {useSelector} from 'react-redux';
import {store} from './store';
import {AppRouter} from '../routing/AppRouter';
import {onAppStart} from './onAppStart';
import {IntlProvider} from 'react-intl';
import {messages} from '../translations';
import {selectLanguage} from '../features/settings/selectors';

onAppStart(store);

export const App: React.FC = () => {
    const language = useSelector(selectLanguage);
    return (
        // @ts-ignore
        <IntlProvider key={language} locale={language} messages={messages[language]}>
            <AppRouter/>
        </IntlProvider>
    )
};
