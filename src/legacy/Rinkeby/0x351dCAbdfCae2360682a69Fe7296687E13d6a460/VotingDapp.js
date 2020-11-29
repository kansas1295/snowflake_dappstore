/* eslint-disable */

import React, { useState,useEffect } from 'react';

import {Typography} from '@material-ui/core'
import ABI from './abi';
import './style.css';
import { useGenericContract, useNamedContract,useAccountEffect } from '../../common/hooks';
import TransactionButton from '../../common/TransactionButton';
import CustomButton from './customButton/CustomButton';
import { useWeb3Context } from 'web3-react';
import ChartPage from './ChartPage';
import VerificationPage from './VerificationPage';
import ProfilePage from './ProfilePage';
import ElectionFactory from './ElectionFactory';


// import ShowCampaignStats from './ShowCampaignStats';


let Vote = []
let m = '';



export default function VotingDapp({ ein,electionContract }) {

  
  const context = useWeb3Context();
  const [totalCandidates, getTotalCandidates] = useState([]);
  const [candidate, isCandidate]  = useState('')
  const [voter, isVoter]  = useState('');
  const [number, Votes]  = useState(['50']);


  const clientRaindropContract = useNamedContract('clientRaindrop')
  const operatorAddress = '0x7Df28F6007f09f30f0dF0457d54eF950baB0De5D';
  const resolverContract = useGenericContract(operatorAddress, ABI)

  const [page, setPage]  = useState(1)

  useAccountEffect(() => {
    resolverContract.methods.getMaxCandidates().call().then(Candidates => getTotalCandidates(Candidates));
    resolverContract.methods.aCandidate(ein).call().then(candidate => isCandidate(candidate));
    resolverContract.methods.aParticipant(ein).call().then(voter => isVoter(voter));
      
  })

   
  function goToRegistrationPage() {
   setPage(1)
  }


  function goToVotingPage() {
    setPage(2)  
  }

  function goToVerificationPage() {
    setPage(3)  
  
  }

  function goToProfilePage() {
    setPage(4)  
  }

  function goToFactory() {
    setPage(5)
   }


let becomeCandidate = <CustomButton 
readyText='Register As Candidate' 
variant= "outlined" 
color="primary" 
className="registrationButton"   
method={() => resolverContract.methods.becomeCandidate(ein)}/>
  let role = 'Role: Unregistered';
  if(candidate){
    role = "Role: Candidate";
  }
  else if(voter){
    role = "Role: Voter";
  }

  let body = "1"

  if(page === 5){
    body = <ElectionFactory/>
  }

   
  if(page === 4){
    body = <ProfilePage ein={ein} goToVoting={goToVotingPage}/>
  }

  
  if(page === 3){
    body = <VerificationPage/>
  }

  if(page === 2){


    body = <div>
   <ChartPage 
   beCandidate = {becomeCandidate}
   vote = {resolverContract.methods.vote}
   maxCandidates={totalCandidates[1]}/>
  </div>
    
    
  }


  if(page === 1){
    
    body = <div className="registrationWrapper"> <div className ="registerAsVoter" style ={{textAlign:"center"}}>
      <p>Disclaimer</p>
      <p>By getting this application on the dapp-store, you are automatically registered as a voter, & could participate in the voting process.
      </p>
      <div className="registrationImage"><img src={require('./Images/Votingregistration.png')} alt="snow" className="registrationImg"/></div>
      
      <button
      className="registrationButton"   
      onClick={goToVotingPage}>VOTE NOW</button>
     
       
    </div>

<div className ="registerAsVoter" style ={{textAlign:"center"}}> 
<p>Disclaimer</p>
<p>If you'd like to participate in voting your favourite candidate,
  you must first register as a voter.
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
    

  }

  return (
    <div className="background">
      
       <ul className="voting-navbar align-items-center" style={{alignItems:'center'}}>
       <li className="nav-item ml-5" onClick={goToRegistrationPage}>Register </li>
       <li className="nav-item ml-5" onClick={goToVerificationPage}>Verify</li>
       <li className="nav-item ml-5" onClick={goToVotingPage}>Vote </li>
       <li className="nav-item ml-5" onClick={goToProfilePage}>Profile </li>
       <li className="nav-item ml-5" onClick={goToFactory}>Factory </li>
    
      </ul>

      
      <Typography variant='h2' gutterBottom  color="textPrimary">
      
        {body}
          
      </Typography>
      

     
          

          
      
    </div>
  );
}