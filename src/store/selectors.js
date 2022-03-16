import { create, get } from "lodash";
import { createSelector } from "reselect";

const account = state => get(state, 'web3.account', null);
export const accountSelector = createSelector(account, (a) => {return a});

const tokenLoaded = state => get(state, 'token.loaded', false);
export const tokenLoadedSelector = create(tokenLoaded, tl => tl); 


const exchangeLoaded = state => get(state, 'exchange.loaded', false);
export const exchangeLoadedSelector = create(exchangeLoaded, el => el); 


export const contractsLoadedSelector = createSelector(
    tokenLoaded,
    exchangeLoaded,
    (tl,el)=>(tl && el)
)

