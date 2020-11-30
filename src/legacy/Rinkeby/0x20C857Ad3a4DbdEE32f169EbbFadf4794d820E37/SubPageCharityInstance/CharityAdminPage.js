/* eslint-disable */

import React, { useState }  from 'react';
import CharityContractABI from '../ABI/CharityContractABI';
import { useGenericContract,useAccountEffect } from '../../../common/hooks';
import ContributeButton from '../Buttons/ContributeButton';
import { useWeb3Context } from 'web3-react';
import CharityFactoryABI from '../ABI/CharityFactoryABI';
import {
  fromWei,
  formatAmount,
} from '../../../../services/format';
import numeral from 'numeral';
import hydro from '../Images/hydro.png';
import logo from '../logo.png';


export default function CharityAdminPage({account, Address,subPageMenu}) {

  
  const context = useWeb3Context();

  const resolverContract = useGenericContract(Address, CharityContractABI);
  const charityFactory = useGenericContract('0x0d96af51ec52e74056ce68ac820a4e3896068381', CharityFactoryABI);

  /*Sets the data from charity*/
  const [title, charityTitle]  = useState('');
  const [goal, charityGoal]  = useState('');
  const [balance, charityBalance]  = useState('');
  const [description, charityDescription]  = useState('');
  const [admin,overLord] = useState('');
  const [status,contractStatus] = useState('');
  const [ethAddress,newAdmin] = useState('');
  /*END*/


  /*Convert numerical format from wei to numeral*/
  const goalFormat = formatAmount(fromWei(goal.toString()));
  const balanceFormat = formatAmount(fromWei(balance.toString()));
  const numeralGoal = numeral(goalFormat).format('0,0');
  const numeralBalance = numeral(balanceFormat).format('0,0');
  /*END*/


  /*Gets the Charity Data for Administrator*/
  useAccountEffect(() => {
    resolverContract.methods.title().call().then(result =>{charityTitle(result)}); 
    resolverContract.methods.charityGoal().call().then(result =>{charityGoal(result)});   
    resolverContract.methods.description().call().then(result =>{charityDescription(result)});
    resolverContract.methods.currentBalance().call().then(result =>{charityBalance(result)}); 
    resolverContract.methods.overlord().call().then(result =>{overLord(result)});
    resolverContract.methods.checkState().call().then(result =>{contractStatus(result)});  
  });
  /*END*/
  
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

  return (
    <div style ={{textAlign:"center"}}>
      
      <div className="registrationWrapper-charity"> 
      <div className ="registerAsContributor-card" style ={{textAlign:"center"}}>
      
      <div className="registrationImage"><img src={logo} alt="Logo" className="charityLogo mb-2" width={230}/></div>
      <p className="mt-2">Charity Title: {title}</p>
      <div>Charity Status: <p className={charityState} style={{display:'inline-block'}}>{charityState}</p></div>
      <p>Charity Goal: {numeralGoal} <img src={hydro} className="hydro-logo mb-1"  border={1} alt="Hydro logo" width={20}/></p>
      <p>Funded: {numeralBalance} <img src={hydro} className=" hydro-logo mb-1"  border={1} alt="Hydro logo" width={20}/></p>
      <p>Description: {description}</p>
      
    </div>
    <div className ="registerAsContributor-card" style ={{textAlign:"center"}}>
      <div className="registrationImage"><div className="registerIcon" ><i class="fas fa-user-astronaut"/></div></div>
      <p className="mt-2">The administrator is entrusted by the community with the power to Approve & Disable charity contracts, therefore making him/her responsible in maintaining the Charity-Dapp.</p>
      
      <span className="input-group-charity">Charity Admin: {admin.slice(0,30) + '...'}</span>
     
        {account === admin && <div className="form-group row">
        <div className="group mt-2">
            <div className="input-group-prepend">
                <span className="input-group-charity">ETH Address</span>
            <input className="verify" type="text" min="0"  autoComplete="off"  onChange={e => newAdmin(e.target.value)}/>
            </div>
        </div>
        </div>}

      {account === admin && <div className="mt-4">  <ContributeButton
      readyText='Transfer Rights' 
      method={() => charityFactory.methods.transferOverlordAuthority(ethAddress)}/>
      <label className="newCharityLabel mt-2" style={{fontSize: '12px'}}>Tranfer your admin rights to another Ethereum address.</label>
      </div>}

      {account === admin && <div className="mt-3"><ContributeButton
      readyText='Approve Charity' 
      method={() => resolverContract.methods.approveCharity()}/>
      <label className="newCharityLabel mt-2" style={{fontSize: '12px'}}>Approve charity in order for this charity to start receiving funds.</label>
      </div>}

      {account === admin?<div className="mt-3"> <ContributeButton
      readyText='Disable Charity' 
      method={() => resolverContract.methods.disableCharity()}/>
      <label className="newCharityLabel mt-2" style={{fontSize: '12px'}}>Disable charity in order for this charity to stop receiving funds.</label>
      </div>
      :
      <div className="mt-4">
           <button className="txButton"> You are not the administrator </button> 
      </div>}
       
      </div>

    </div>
    <button readyText='Go Back'className="txButton" onClick={subPageMenu}> Go Back </button>
    </div>
  );
}