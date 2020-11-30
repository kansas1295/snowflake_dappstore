/* eslint-disable */
import React, { Component } from 'react';
import Web3 from 'web3';
import CharityContractABI from '../ABI/CharityContractABI';
import TransactionRow from '../Useable/TransactionsRow';


export default class OverviewPage extends Component
{
  constructor(props)
  {
      super(props);
      this.state = {
        blocks: 5000000,
        loading: true,
        charityContract:[],
        transactions:[],
      };

	}

  //Loads Blockhain Data,
  async loadBlockchain(){
   
    this.setState({loading:true})
    let ethereum= window.ethereum;
    let web3=window.web3;

    if(typeof ethereum !=='undefined'){
    await ethereum.enable();
    web3 = new Web3(ethereum);       
    }
 
    else if (typeof web3 !== 'undefined'){
    console.log('Web3 Detected!')
    window.web3 = new Web3(web3.currentProvider);
    }
     
    else{console.log('No Web3 Detected')
    window.web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));  
    }  

    const charityContract =  new web3.eth.Contract(CharityContractABI, this.props.Address);
    this.setState({charityContract:charityContract});
		
    const blockNumber = await web3.eth.getBlockNumber();
    
    if (this._isMounted){
    this.state.charityContract.getPastEvents("fundingReceived",{fromBlock: 5000000, toBlock:'latest'})
    .then(events=>{

    if (this._isMounted){
      var newest = events;
      var newsort= newest.concat().sort((a,b)=> b.blockNumber- a.blockNumber); 
      this.setState({transactions:newsort});
          }
        }).catch((err)=>console.error(err)) 
      }
    setTimeout(()=>this.setState({loading:false}),1000)
  }

  
	render()
  {
    let body = '';

      
      if(this.state.loading){
        body = <div style={{width: '100%',textAlign:'center'}} >
        <div className="spinner"/></div>
      }
      
      else {
        body =
              <div className="table-wrapper">
                <table className="table-size">
                 <thead>
                 <tr>
                 <th>No.</th>
                 <th>From EIN</th>
                 <th>Amount</th>
                 <th>Tx Hash</th>
                 <th>Block</th>
                </tr>
              </thead>
              
              <tbody>
              </tbody>
              {this.state.transactions.map((transactions,index)=> <TransactionRow key ={index} transactions = {transactions} count={index}/> )}   
              </table>  
             </div>;
			        }
            


		return(
		  <div>
        <p>Recent Contributions</p>
          {body}
            <div className="mt-1">
                <button className="txButton" onClick={this.props.subPageMenu}> Go Back </button>
            </div>
      </div>
   
      
		);
  }

  componentDidMount() {
    this._isMounted = true;
    this.loadBlockchain();
  
  }

  componentWillUnmount() {
    this.isCancelled = true;
    this._isMounted = false;
  }


}

