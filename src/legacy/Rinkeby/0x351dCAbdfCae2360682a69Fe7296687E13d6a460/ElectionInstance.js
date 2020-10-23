/* eslint-disable */


import React, { Component } from 'react';
import Web3 from 'web3';
import './style.css';
import Registration from './Registration';
import VerificationPage from './VerificationPage';
import ChartPage from './ChartPage';
import ProfilePage from './ProfilePage';

export default class ElectionFactory extends Component {


	constructor(props) {
		super(props)
			this.state = {
            electionABI:[],
            accounts:[],
            blockNumber:'',       
        }
       
	}


	componentDidMount(){
	  this._isMounted = true;
      this.loadBlockchain();
	}
    //Dynamically loads the Smart Contract ABI using etherscan & loads the blockchain data.
    async loadBlockchain(){
    
        const ApiKey='ZPRBBU2E6Z4QMEXPI7BWMCMVK7I6XZ6ZXE';
            fetch('https://api-rinkeby.etherscan.io/api?module=contract&action=getsourcecode&address='+this.props.Address+'&apikey='+ApiKey)
            .then(res =>res.json())
            .then((data)=> { 
               
                    this.setState({electionABI:JSON.parse(data.result[0].ABI)},()=> console.log())
                }).catch(console.log)
            
            
            const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));  
            const network = await web3.eth.net.getNetworkType();

            const accounts = await web3.eth.getAccounts();
       
             if (this._isMounted){
            this.setState({account: accounts[0]}); 
             }

            const electionContract = new web3.eth.Contract(this.state.electionABI,this.props.Address);
            if (this._isMounted){
                this.setState({electionContract:electionContract},()=>console.log());
            }
            const title = await electionContract.methods.snowflakeName().call()
            if (this._isMounted){
                this.setState({title:title});
            }
           


        }
 

  render() {    
   
        /*Sub Page of Election Page */
        let subBody = <div className="spinner"/>
        if(this.state.title !== null){
           
        if(this.props.subPage === 1 && this.state.title !== null){
            subBody = <Registration electionABI={this.state.electionABI} electionAddress={this.props.Address} ein={this.props.ein} account={this.state.account}/>
        }
        else if(this.props.subPage === 2 && this.state.title !== null){
            subBody = <VerificationPage electionABI={this.state.electionABI} electionAddress={this.props.Address} ein={this.props.ein} account={this.state.account}/>
        }

        else if(this.props.subPage === 3 && this.state.title !== null){
            subBody = <ChartPage electionABI={this.state.electionABI} electionAddress={this.props.Address} ein={this.props.ein} account={this.state.account}/>
        }

        else if(this.props.subPage === 4 && this.state.title !== null){
            subBody = <ProfilePage electionABI={this.state.electionABI} electionAddress={this.props.Address} ein={this.props.ein} account={this.state.account} goToVoting={this.subPageVoting}/>
        }
    }

    return (
        
        <div>

            <div>
               {subBody}            
            </div>
            </div>
		);
	}
}
