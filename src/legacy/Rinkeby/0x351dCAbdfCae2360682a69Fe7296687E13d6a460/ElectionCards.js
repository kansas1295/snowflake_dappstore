/* eslint-disable */

import React, { Component } from 'react';
import Web3 from 'web3';
import './style.css';
import Deadline from './Deadline';

export default class ElectionCards extends Component {


	constructor(props) {
		super(props)
			this.state = {
            electionFactory:'',
            electionABI:[],
            title:'',
            deadline:'',
            unixTime:'',
            account:[],
            blockNumber:'',
                     
        }
      
	}


	componentDidMount(){
      this._isMounted = true;
      this.getABI()
      this.loadBlockchain();
    }

    //Gets Smart Contract ABI Dynamically from etherscan
    async getABI(){
        const ApiKey='ZPRBBU2E6Z4QMEXPI7BWMCMVK7I6XZ6ZXE';
            fetch('https://api-rinkeby.etherscan.io/api?module=contract&action=getsourcecode&address='+this.props.Address+'&apikey='+ApiKey)
            .then(res =>res.json())
            .then((data)=> {               
                    this.setState({electionABI:JSON.parse(data.result[0].ABI)})
                }).catch(console.log)
    }

    //Loads Blockain Data
    async loadBlockchain(){
    
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
                this.setState({title:title},()=>console.log());
            }

            const deadline = await electionContract.methods.getDeadline().call()
            if (this._isMounted){
                this.setState({unixTime:deadline.slice(0,10),
                    deadline:new Date(parseInt(deadline.slice(0,10),10)*1000)});
            }

        }

       


  render() {
    

    return (
        
        <div className="electionCard">
            <h3 className="card-header small">
            <strong>
            {this.state.title} 
            </strong>
            </h3>
            <div className="card-list">
					
					<ul className="list-group list-group-flush">
						<Deadline deadline={this.state.deadline} unixTime={this.state.unixTime}/>
						
					</ul>
                    
					
		
					</div>          
        
            </div>
		);
	}
}
