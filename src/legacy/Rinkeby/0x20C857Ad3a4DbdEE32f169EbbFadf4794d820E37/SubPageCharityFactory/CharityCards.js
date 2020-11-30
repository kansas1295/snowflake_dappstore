/* eslint-disable */

import React, { Component } from 'react';
import Web3 from 'web3';
import CardDeadline from '../Useable/CardDeadline';
import CharityContractABI from '../ABI/CharityContractABI';
import hydro from '../Images/hydro.png';


let numeral = require('numeral');

export default class CharityCards extends Component {

	constructor(props) {
		super(props)
			this.state = {
            charityContract:[],
            title:'',
 
            unixTime:0,
            account:[],
            blockNumber:0,

            deadline:0,
            funded:0,
            charityGoal:0,
            charityStatus:1,
            loading:true,
                     
        }
      
	}


	componentDidMount(){
      this._isMounted = true;
      this.loadBlockchain();
    }
    
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
            const accounts = await web3.eth.getAccounts();
       
             if (this._isMounted){
            this.setState({account: accounts[0]}); 
             }

            const charityContract = new web3.eth.Contract(CharityContractABI,this.props.charityAddress);
            if (this._isMounted){
                this.setState({charityContract:charityContract},()=>console.log());
            }
            const title = await charityContract.methods.title().call()
            if (this._isMounted){
                this.setState({title:title},()=>console.log());
            }

            const charityGoal = await charityContract.methods.charityGoal().call()
            if (this._isMounted){
                this.setState({charityGoal:web3.utils.fromWei(charityGoal)},()=>console.log());
            }

            const charityStatus = await charityContract.methods.checkState().call()
            const deadline = await charityContract.methods.raiseBy().call()

            if (this._isMounted){
                this.setState({unixTime:deadline.slice(0,10),
                               deadline:new Date(parseInt(deadline,10)*1000),
                               charityStatus:parseInt(charityStatus),
                });
            }
            this.setState({loading:false})

            const funded = await charityContract.methods.currentBalance().call()
            if (this._isMounted){
                this.setState({funded:web3.utils.fromWei(funded)},()=>console.log());
            }
          
            charityContract.events.fundingReceived({toBlock:'latest'})
            .on('data',async(log) => {  

            const incomingDonation = await charityContract.methods.currentBalance().call()
            if (this._isMounted){
                    this.setState({funded:web3.utils.fromWei(incomingDonation)},()=>console.log());
                }
          })
            
        }


  render() {
    let percentage = '0.00%';
    if(this.state.charityGoal > 0){
    percentage = numeral((this.state.funded)*100/this.state.charityGoal).format('0.00')+ "%";
    }
    let title = this.state.title;
    if(this.state.title.length > 35){
        title = this.state.title.slice(0,35) + '...';
    }
    
    return (
        
        <div className="charityCard">

            <h3 className="charity-card-header small" title={this.state.title}>
            <strong> {title} </strong>
            </h3>

            <div className="card-list">	
            {!this.state.loading &&<ul className="list-group list-group-flush"> 
                   <CardDeadline deadline={this.state.deadline} unixTime={this.state.unixTime} charityStatus={this.state.charityStatus}/>
                    <li className="list-group-charity small"><img src={hydro} className="mb-1 mr-1"  border={1} alt="Hydro logo" width={20}/> {numeral(this.state.funded).format('0,00')}/{numeral(this.state.charityGoal).format('0,00')}<div class="progress"><div class="progress-inner" style={{"width":percentage }}></div><div class="progress-outer" style={{"width":"100%" }}></div><p className="  mb-0 text-center">{percentage}</p></div></li>	
                </ul>}
                {this.state.loading &&<div className = "charity-awaiting-approval">Loading...</div>}
			    </div>          
        
            </div>
		);
	}
}