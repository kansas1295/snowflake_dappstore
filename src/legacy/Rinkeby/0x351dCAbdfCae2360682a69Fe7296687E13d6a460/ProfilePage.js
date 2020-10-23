/* eslint-disable */

import React, { useState, useContext} from 'react';

import './style.css';
import { useGenericContract, useNamedContract, useAccountEffect} from '../../common/hooks';
import { useWeb3Context } from 'web3-react';
import Identicon from '../../../components/identicon';
import Hydrosmall from './Images/Hydrosmall.png';
import SnowflakeContext from '../../../contexts/snowflakeContext';
import { NavLink } from 'reactstrap';
import { NavLink as RouterNavLink} from 'react-router-dom';


import {
  fromWei,
  formatAmount,
} from '../../../services/format';
import numeral from 'numeral';

export default function ProfilePage({electionABI,electionAddress,ein,goToVoting,}) {

  
  const context = useWeb3Context();

  const clientRaindropContract = useNamedContract('clientRaindrop')
  const snowflakeContext = useContext(SnowflakeContext);
  const resolverContract = useGenericContract(electionAddress, electionABI);

  

  const {
    snowflakeBalance,
  } = snowflakeContext;


  const [userName, einUser]  = useState('')
  const [linkedAddress, EthUser]  = useState('  ')
  const [voter, voterRegistration]  = useState('')
  const [candidate, candidateRegistration]  = useState('')

  const snowflakeBalanceForNumeral = formatAmount(fromWei(snowflakeBalance.toString()));
  const numeralSnowflakeBalance = numeral(snowflakeBalanceForNumeral).format('0,0');
 
  useAccountEffect(() => {
    
    clientRaindropContract.methods.getDetails(ein).call().then(user => {einUser(user[1]), EthUser(user[0])});
    resolverContract.methods.aParticipant(ein).call().then(result =>{ result === true? voterRegistration(true):voterRegistration(false)});
    resolverContract.methods.aCandidate(ein).call().then(result =>{ result === true? candidateRegistration(true):candidateRegistration(false)})
    
  })

  return (
    
    <div className="verificationWrapper">

        <div className="profileWrapper">   
        <div className ="verifiedProfile" style ={{textAlign:"center"}}>

        <h2 className="profile-title">USER PROFILE</h2>
        <p className="userName mt-1" >"{userName}"</p>


        <div className="profileBox" >
        <Identicon seed={ein} size={250} />
        
        
          </div>
         
        <div className="profileInfo">
        <li className="profileNumber">Ethereum Identity No.: <NavLink className ="customNav" style={{color:"white"}} title="Manage Identity" tag={RouterNavLink} exact to="/identity"> {ein}</NavLink  ></li>
         

         
        {!voter && <li className="profileNumber">Registration Type: 
            <li style={{color:"white"}} title="Unregistered">Unregistered</li> 
         </li>}

         {voter && <li className="profileNumber">Registration Type: 
            {!candidate?<li style={{color:"white"}} onClick={goToVoting} title="Registered As Voter">Voter</li> : <li style={{color:"white"}} onClick={goToVoting} title="Registered As Candidate">candidate</li>}
         </li>}

        <li className="profileNumber"> Dapp-Store Balance: <li style={{color:"white"}} title="Hydro Balance"> {numeralSnowflakeBalance}<img src={Hydrosmall} className="hydroImage"/></li></li>
        <li className="profileNumber">Linked Address: <a href={"https://rinkeby.etherscan.io/address/"+ linkedAddress} target="blank" style={{color:"white"}} title={linkedAddress}> {linkedAddress.slice(0,5)+"..."}</a></li>

        </div>
  
       
    </div>

    </div>
      
    </div>
  );
}