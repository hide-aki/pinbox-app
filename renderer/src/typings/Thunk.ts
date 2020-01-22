import {ThunkAction} from 'redux-thunk';
import {Action, AnyAction} from '@reduxjs/toolkit';

export type Thunk = ThunkAction<void, any, null, AnyAction>
