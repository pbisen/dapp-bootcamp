import React, { Component } from 'react';
import './App.css';

import { loadWeb3 , loadToken, loadExchange } from '../store/interactions';
import { connect } from 'react-redux';
import Navbar from './Navbar'
import Content from './Content';
import { contractsLoadedSelector } from '../store/selectors';



class App extends Component {
  componentWillMount(){
    this.loadBlockchainData(this.props.dispatch);
  }

  async loadBlockchainData(dispatch){
    const web3 = loadWeb3(dispatch)
    // const network = await web3.eth.net.getNetworkType();
    const networksID = await web3.eth.net.getId();
    // const accounts  = await loadAccount(web3, dispatch);
    // //const ABI = Token.abi;
    // const networks = Token.networks;
    const token = await loadToken(web3, networksID, dispatch);
    if(!token){
      window.alert("Token Contract not found. Change network from Metamask");
    }
    const exchange = await loadExchange(web3, networksID, dispatch);
    if(!token){
      window.alert("Exhange Contract not found. Change network from Metamask");
    }
    // const totalSupply = await token.methods.totalSupply().call();

  }


  
  render() {

    return (
      <div>
        <Navbar />
        {this.props.contractsLoaded ? <Content /> : <div className='content'></div>}
        
    </div>  
    );
  }
}


function mapStateToProps(state){
  return{
    contractsLoaded: contractsLoadedSelector(state)
  }
}

export default connect(mapStateToProps)(App);

