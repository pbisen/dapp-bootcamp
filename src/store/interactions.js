import { 
    web3Loaded,
    web3AccountLoaded,
    tokenLoaded,
    exchangeLoaded
} from "./actions";
import Web3 from 'web3';

export const loadWeb3 = (dispatch) => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    dispatch(web3Loaded(web3));
    return web3;
}

export const loadAccount = async (web3, dispatch) => {
    const accounts  = await web3.eth.getAccounts();
    const account = accounts[0];
    dispatch(web3AccountLoaded(account))
    return account;
}

export const loadToken = (web3, abi, contractAddress, dispatch) => {

    try{    
        const token = new web3.eth.Contract(abi, contractAddress);
        dispatch(tokenLoaded(token));
        return token;
    }
    catch(error){
        window.alert("Contract not deployd to the current network.");
        return null;
    }
}

export const loadExchange = (web3, abi, contractAddress, dispatch) => {

    try{    
        const exchange = new web3.eth.Contract(abi, contractAddress);
        dispatch(exchangeLoaded(exchange));
        return exchange;
    }
    catch(error){
        window.alert("Contract not deployd to the current network.");
        return null;
    }
}