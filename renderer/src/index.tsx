import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './app';
import {IntlProvider} from 'react-intl';
import {messages} from './translations';

//const language = navigator.language.split(/[-_]/)[0];  // language without region code
const language = 'de';

declare global {
    interface Window {
        require: any;
    }
}

ReactDOM.render(
// @ts-ignore
    <IntlProvider key={language} locale={language} messages={messages[language]}>
        <App/>
    </IntlProvider>
    , document.getElementById('root'));


