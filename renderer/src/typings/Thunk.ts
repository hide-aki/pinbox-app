import {ThunkAction} from 'redux-thunk';
import {AnyAction} from '@reduxjs/toolkit';

export type Thunk = ThunkAction<void, any, null, AnyAction>
