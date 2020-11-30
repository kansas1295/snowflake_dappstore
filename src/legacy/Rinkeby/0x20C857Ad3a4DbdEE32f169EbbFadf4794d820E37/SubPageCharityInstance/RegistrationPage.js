/* eslint-disable */

import React, { useState}  from 'react';
import Web3 from 'web3';
import CharityContractABI from '../ABI/CharityContractABI';
import { useGenericContract,useAccountEffect } from '../../../common/hooks';
import ContributeButton from '../Buttons/ContributeButton';
import { useWeb3Context } from 'web3-react';
import {snowflake_ABI, snowflake_Address} from '../ABI/SnowflakeABI';
import numeral from 'numeral';
import hydro from '../Images/hydro.png';
import logo from '../logo.png';
import {
  fromWei,
  formatAmount,
} from '../../../../services/format';


export default function RegistrationPage({ ein,Address,subPageMenu}) {

  const context = useWeb3Context();

  /*Sets the Charity Contract Data*/
  const resolverContract = useGenericContract(Address, CharityContractABI);
  const snowFlake = useGenericContract(snowflake_Address, snowflake_ABI);
  const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));  
  const [title, charityTitle]  = useState('');
  const [goal, charityGoal]  = useState('');
  const [balance, charityBalance]  = useState('');
  const [time, timeRemaining]  = useState('');
  const [description, charityDescription]  = useState('');
  const [status,contractStatus] = useState('');

  const [isRegistered, Registered]  = useState('');

  const goalFormat = formatAmount(fromWei(goal.toString()));
  const balanceFormat = formatAmount(fromWei(balance.toString()));
  const numeralGoal = numeral(goalFormat).format('0,0');
  const numeralBalance = numeral(balanceFormat).format('0,0');
  /*END*/

  
  /*Gets the Charity Contract Data*/
  useAccountEffect(() => {
    resolverContract.methods.title().call().then(result =>{charityTitle(result)}); 
    resolverContract.methods.charityGoal().call().then(result =>{charityGoal(result)});   
    resolverContract.methods.checkRemainingTime().call().then(result =>{timeRemaining(result)}); 
    resolverContract.methods.description().call().then(result =>{charityDescription(result)});
    resolverContract.methods.currentBalance().call().then(result =>{charityBalance(result)}); 
    resolverContract.methods.checkState().call().then(result =>{contractStatus(result)});
    resolverContract.methods.aParticipant(ein).call().then(result =>{ result === true? Registered(true):Registered(false)}); 
  });
  /*END*/
  

  /*Set the display of "Charity Status" dynamically*/
  let charityState = '';
  if(parseInt(status) === 1){
    charityState = 'Awaiting Approval';
  }

  else if(parseInt(status) === 2){
    charityState = 'Disabled';
  }

  else{
    charityState = 'Approved';
  }
  /*End*/

  return (
    
    <div style ={{textAlign:"center"}}> 
      <div className="registrationWrapper-charity"> 
        <div className ="registerAsContributor-card" style ={{textAlign:"center"}}>
          <div className="registrationImage"><img src={logo} alt="Logo" className="charityLogo mb-2" width={230}/></div>

            <p className="mt-2">Charity Title: {title}</p>
            <div>Charity Status: <p className={charityState} style={{display:'inline-block'}}>{charityState}</p></div>
            <p>Charity Goal: {numeralGoal} <img src={hydro} className="hydro-logo mb-1"  border={1} alt="Hydro logo" width={20}/></p>
            <p>Funded: {numeralBalance} <img src={hydro} className="hydro-logo mb-1"  border={1} alt="Hydro logo" width={20}/></p>
            <p>Description: {description}</p>  
          </div>
   
        <div className ="registerAsContributor-card2" style ={{textAlign:"center"}}>
          <div className="registrationImage"><div className="registerIcon" ><i class="fas fa-user-plus"/></div></div>
            
            <p className="mt-2">By registering in this charity, you will be able to contribute & give donations in form of Hydro Tokens to "{title}" until the goal is reached or the deadline has ended.</p>
      
            {!isRegistered && <div className="mt-5"><ContributeButton
            readyText='Register As Contributor' 
            method={() => snowFlake.methods.addResolver(Address,true,web3.utils.toWei('5000000000000000000000'),'0x00')}           
            /></div>}

            {isRegistered && <div className="registeredEIN">You are already registered</div>}
        </div>

      </div>
      
    <button readyText='Go Back'className="txButton" onClick={subPageMenu}> Go Back </button>

  </div>
  );
}