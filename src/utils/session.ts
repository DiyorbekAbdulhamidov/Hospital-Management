import store from 'store2';
import config from '../config';
import { IEntity } from '../modules/auth/types';

export const getSession = (): IEntity.Token => store.get(config.api.tokensKEY) || {};

export const clearSession = () => store.remove(config.api.tokensKEY);

export const setSession = (tokens: IEntity.Token) => store.set(config.api.tokensKEY, tokens);
