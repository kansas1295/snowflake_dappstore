/* eslint-disable */

import React, { Component } from 'react';
import Web3 from 'web3';
import './Charity-style.css';
import ContributePage from './SubPageCharityInstance/ContributePage';
import RegistrationPage from './SubPageCharityInstance/RegistrationPage';
import OverviewPage from './SubPageCharityInstance/OverviewPage';
import CharityProfilePage from './SubPageCharityInstance/CharityProfilePage';
import CharityAdminPage from './SubPageCharityInstance/CharityAdminPage';
import CharityContractABI from './ABI/CharityContractABI';

export default class CharityInstance extends Component {


	constructor(props) {
		super(props)
			this.state = {
            charityContract:[],
            accounts:[],
            blockNumber:'',       
            title:'',
        }
       
	}


	componentDidMount(){
	  this._isMounted = true;
      this.loadBlockchain();
	}

    /*Loads the Charity contract selected by the user*/
    async loadBlockchain(){
    
        const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));  
        const network = await web3.eth.net.getNetworkType();
        const accounts = await web3.eth.getAccounts();
       
        if (this._isMounted){
            this.setState({account: accounts[0]}); 
        }
        const charityContract = new web3.eth.Contract(CharityContractABI,this.props.Address);
        if (this._isMounted){
            this.setState({charityContract:charityContract},()=>console.log());
        }
        const title = await charityContract.methods.snowflakeName().call()
        if (this._isMounted){
            this.setState({title:title},()=>console.log());
        }
           
    }
 
  render() {    
   let body =  '';
   let title = this.state.title;
    if(this.state.title.length > 50){
        title = this.state.title.slice(0,50) + '...';
    }

        /*Renders the page according to the user*/
        if(this.props.subPage === 2){
        body = <RegistrationPage subPageMenu = {this.props.subPageMenu} Address = {this.props.Address} ein = {this.props.ein}/>
        }

        else if(this.props.subPage === 3){
        body = <ContributePage subPageMenu = {this.props.subPageMenu} Address = {this.props.Address} ein = {this.props.ein} account = {this.props.account} subPageRegistration={this.props.subPageRegistration}/>
        }

        else if(this.props.subPage === 4){
        body = <CharityProfilePage subPageMenu = {this.props.subPageMenu} Address = {this.props.Address} ein = {this.props.ein} subPageRegistration={this.props.subPageRegistration} subPageContribute={this.props.subPageContribute}/>
        }
       
        else if(this.props.subPage === 5){
        body = <CharityAdminPage subPageMenu = {this.props.subPageMenu} Address = {this.props.Address} ein = {this.props.ein} account = {this.props.account}/>
        }

        else if(this.props.subPage === 6){
        body = <OverviewPage subPageMenu = {this.props.subPageMenu} Address = {this.props.Address}/>
        }

        else {
            body = <div style={{width: '100%',textAlign:'center'}}>
            <ul className="charity-menu align-items-center" style={{alignItems:'center'}}>
                <li className="charityInstance-Box" onClick={this.props.goToFactory}><div className="fontIcon"><i class="fas fa-seedling"/></div>Charities</li>
                <li className="charityInstance-Box" onClick={this.props.subPageRegistration}><div className="fontIcon"><i class="fas fa-user-plus"/></div> Register</li>
                <li className="charityInstance-Box" onClick={this.props.subPageContribute}><div className="fontIcon"><i class="fas fa-hand-holding-water"/></div> Contribute</li>          

            </ul>
        
               
            <ul className="charity-menu align-items-center" style={{alignItems:'center'}}>
                <li className="charityInstance-Box" onClick={this.props.subPageOverview}><div className="fontIcon"><i class="fas fa-globe-americas"></i></div> Overview</li>
                <li className="charityInstance-Box" onClick={this.props.subPageProfile}><div className="fontIcon"><i class="fas fa-id-card"/></div> Profile</li>
                <li className="charityInstance-Box" onClick={this.props.subPageAdmin}><div className="fontIcon"><i class="fas fa-user-astronaut"/></div> Admin</li>
            </ul>
            </div>
       }
    /*End of Page Render*/
    return (
        
        <div style={{width: '100%',textAlign:'center'}}>
            <ul className="charity-navbar align-items-center" style={{alignItems:'center'}} title={this.state.title}>
                <li className="nav-item" onClick={this.factoryPage}> {title} </li>
            </ul>

            {body}

        </div>
		);
	}
}