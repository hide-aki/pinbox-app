import React from 'react';
import {ElectronService} from '../../logic/ElectronService';

export const ElectronContext = React.createContext(new ElectronService());
export const ElectronProvider = ElectronContext.Provider;
export const ElectronConsumer = ElectronContext.Consumer;
