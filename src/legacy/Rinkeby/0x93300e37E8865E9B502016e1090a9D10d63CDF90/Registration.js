/* eslint-disable */

import React from 'react';
import './style.css';
import Web3 from 'web3';
import { useGenericContract, useNamedContract,useAccountEffect } from '../../common/hooks';
import TransactionButton from '../../common/TransactionButton';
import { useWeb3Context } from 'web3-react';
import {snowflake_Abi, snowflake_Address} from './ABI/snowflakeABI';

import candidatesImage from './Images/candidatesImage.png'
import Votingregistration from './Images/Votingregistration.png'




export default function Registration({ ein,electionABI, electionAddress,account}) {

  
  const context = useWeb3Context();

  const resolverContract = useGenericContract(electionAddress, electionABI);
  const snowFlake = useGenericContract(snowflake_Address, snowflake_Abi);
  const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));  


  return (
    <div>
      <div className="registrationWrapper"> <div className ="registerAsVoter" style ={{textAlign:"center"}}>
      <p>Disclaimer</p>
      <p>To participate in this election, you must first register as a participant & pay a fee of 100 Hydro tokens. Once registered, you will be able to cast your vote.
      </p>
      <div className="registrationImage"><img src={Votingregistration} alt="snow" className="registrationImg"/></div> 
      
      <TransactionButton
         readyText='Register As Participant' 
         method={() => snowFlake.methods.addResolver(electionAddress,true,web3.utils.toWei('100000000000000000000'),'0x00')}           
          />
     
       
    </div>

<div className ="registerAsVoter" style ={{textAlign:"center"}}> 
<p>Disclaimer</p>
<p>Registered participants could run as a candidate & must pay 1000 Hydro tokens if you think you are qualified to lead or take a position for an organization.
</p>
<div className="registrationImage"><img src={candidatesImage} alt="snow" className="registrationImg"/></div> 

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