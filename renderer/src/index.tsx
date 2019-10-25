import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './features/app/App';
import * as serviceWorker from './serviceWorker';
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
        <App />
    </IntlProvider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
