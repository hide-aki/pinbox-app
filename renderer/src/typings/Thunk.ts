import {ThunkAction} from 'redux-thunk';
import {Action} from '@reduxjs/toolkit';

export type Thunk = ThunkAction<void, any, null, Action<string>>
