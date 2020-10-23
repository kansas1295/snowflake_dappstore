/* eslint-disable */

import React from 'react';
import './style.css';
import Web3 from 'web3';
import { useGenericContract, useNamedContract,useAccountEffect } from '../../common/hooks';
import TransactionButton from '../../common/TransactionButton';
import { useWeb3Context } from 'web3-react';
import {rinkeby1484_ABI, rinkeby1484_Address} from './config';



export default function Registration({ ein,electionABI, electionAddress,account}) {

  
  const context = useWeb3Context();

  const resolverContract = useGenericContract(electionAddress, electionABI);
  const snowFlake = useGenericContract(rinkeby1484_Address, rinkeby1484_ABI);
  const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));  


  return (
    <div>
      <div className="registrationWrapper"> <div className ="registerAsVoter" style ={{textAlign:"center"}}>
      <p>Disclaimer</p>
      <p>In order to vote or run as a candidate, you must first register as a participant. Once registered you will be able to cast your vote.
      </p>
      <div className="registrationImage"><img src={require('./Images/Votingregistration.png')} alt="snow" className="registrationImg"/></div>
      
      <TransactionButton
         readyText='Register As Participant' 
         method={() => snowFlake.methods.addResolver(electionAddress,true,web3.utils.toWei('5000000000000000000000'),'0x00')}           
          />
     
       
    </div>

<div className ="registerAsVoter" style ={{textAlign:"center"}}> 
<p>Disclaimer</p>
<p>Registered participants could run as a candidate if you think you are qualified to lead or take a position for an organization.
</p>
<div className="registrationImage"><img src={require('./Images/candidatesImage.png')} alt="snow" className="registrationImg"/></div>

<TransactionButton 
      readyText='Register As Candidate' 
      variant= "outlined" 
      color="primary" 
      className="registrationButton"   
      method={() => resolverContract.methods.becomeCandidate(ein)}/>
 
</div>
</div>
                 
   
    </div>
  );
}