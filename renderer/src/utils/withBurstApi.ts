import {Api} from '@burstjs/core';
import {HttpError} from '@burstjs/http';
import {BurstService} from '../services/BurstService';
import {OnEventFn} from '../typings/OnEventFn';

export type WithApiFn<T> = (api: Api) => Promise<T>

export const withBurstApi = (burstService: BurstService) => async <T>(withApiFn: WithApiFn<T>, onError?: OnEventFn<Error>): Promise<T|void> => {
    try {
        return await withApiFn(burstService.api)
    } catch (e) {
        let error = e instanceof HttpError
            ? new Error(burstService.getTranslationIdForError(e))
            : e;
        if (onError) {
            onError(error)
        } else {
            throw error
        }
    }
};
