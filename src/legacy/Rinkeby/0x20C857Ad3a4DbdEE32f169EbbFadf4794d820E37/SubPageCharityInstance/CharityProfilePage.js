/* eslint-disable */

import React, { useState, useContext} from 'react';

import { useGenericContract, useAccountEffect} from '../../../common/hooks';
import { useWeb3Context } from 'web3-react';
import Identicon from '../../../../components/identicon';
import hydro from '../Images/hydro.png';
import SnowflakeContext from '../../../../contexts/snowflakeContext';
import { NavLink } from 'reactstrap';
import { NavLink as RouterNavLink} from 'react-router-dom';
import CharityContractABI from '../ABI/CharityContractABI';
import {raindrop_address,raindrop_abi} from '../ABI/ClientRaindropABI';

import {
  fromWei,
  formatAmount,
} from '../../../../services/format';
import numeral from 'numeral';


export default function CharityProfilePage({Address,ein,subPageMenu,subPageRegistration,subPageContribute}) {
 
  const context = useWeb3Context();

  const snowflakeContext = useContext(SnowflakeContext);
  const resolverContract = useGenericContract(Address, CharityContractABI);
  const raindropContract = useGenericContract(raindrop_address, raindrop_abi);

  const {
    snowflakeBalance,
  } = snowflakeContext;

  
  /* Sets the data from client Raindrop & charity contract */
  const [userName, einUser]  = useState('')
  const [linkedAddress, EthUser]  = useState('  ')
  const [contributor, registeredContributor]  = useState('')
  const [contributions, totalContributions]  = useState('')
  
  
  const snowflakeBalanceForNumeral = formatAmount(fromWei(snowflakeBalance.toString()));
  const numeralSnowflakeBalance = numeral(snowflakeBalanceForNumeral).format('0,0');
  const numeralContributions = numeral(contributions).format('0,0');
  /*END*/
 
  /*Get user data from client Raindrop Contract & Charity Contract*/
  useAccountEffect(() => {
    
    raindropContract.methods.getDetails(ein).call().then(user => {einUser(user[1]), EthUser(user[0])});
    resolverContract.methods.aParticipant(ein).call().then(result =>{ result === true? registeredContributor(true):registeredContributor(false)});
    resolverContract.methods.contributions(ein).call().then(result =>{ totalContributions(formatAmount(fromWei(result).toString()))})
    
  })
   /*END*/

  return (
    
        <div style ={{textAlign:"center"}}>   
    
        <div className="profileWrapper">   
        <div className ="charityProfile" style ={{textAlign:"center"}}>

        <h2 className="profile-title">USER PROFILE</h2>
        <p className="userName" >"{userName}"</p>


        <div className="profileBox" >
        <Identicon seed={ein} size={250}/>
        </div>
         
        <div className="profileInfo">
        <li className="profileNumber">Ethereum Identity No.: <NavLink className ="customNav" style={{color:"white"}} title="Manage Identity" tag={RouterNavLink} exact to="/identity"> {ein}</NavLink  ></li>
           
        <li className="profileNumber">Contributor: 
        {contributor? <li style={{color:"white"}} title="Unregistered" onClick={subPageContribute}>Registered</li> : <li style={{color:"white"}} title="Unregistered" onClick={subPageRegistration}>Unregistered</li>} 
        </li>
        <li className="profileNumber"> Total Contributions: <li style={{color:"white"}} title="Total Hydro Contribution"> {numeralContributions}<img src={hydro} className="hydroImage"/></li></li>
        <li className="profileNumber"> Dapp-Store Balance: <li style={{color:"white"}} title="Hydro Balance"> {numeralSnowflakeBalance}<img src={hydro} className="hydroImage"/></li></li>
        <li className="profileNumber">Linked Address: <a href={"https://etherscan.io/address/"+ linkedAddress} target="blank" style={{color:"white"}} title={linkedAddress}> {linkedAddress.slice(0,5)+"..."}</a></li>

        </div>
     
    </div>
    </div>
    <button readyText='Go Back'className="txButton" onClick={subPageMenu} width={500}> Go Back </button>
    </div>

  );
}