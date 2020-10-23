/* eslint-disable */

import React, { useState} from 'react';

import './style.css';
import { useGenericContract, useNamedContract} from '../../common/hooks';
import Typewriter from './Typewriter';
import { useWeb3Context } from 'web3-react';

let loadingVoter = false;
let loadingCandidate = false;


export default function VerificationPage({electionABI,electionAddress}) {

  const context = useWeb3Context();

  const clientRaindropContract = useNamedContract('clientRaindrop')
  const resolverContract = useGenericContract(electionAddress,electionABI);


  const [lookupEinVoter, setLookupEinVoter]  = useState('')
  const [voterResult, einVoterResult]  = useState('  ')
  const [fontColor, colorResult]  = useState('')

  const [lookupEinCandidate, setLookupEinCandidate]  = useState('')
  const [candidateResult, einCandidateResult]  = useState('  ')
  const [fontColor2, colorResult2]  = useState('')
  const[ABI,abi] = useState([]);


  function checkVoter () {
    loadingVoter = true;
    resolverContract.methods.aParticipant(lookupEinVoter).call()
    .then(result =>{
      colorResult(result)
        result === false?
          einVoterResult(["EIN-", lookupEinVoter, " is not a registered voter."]) : 
          einVoterResult(["EIN-", lookupEinVoter, " is a registered voter."])});
      
           setTimeout(()=>{loadingVoter = false}, 3000);
  }

  function checkCandidate () {  
    loadingCandidate = true;
    resolverContract.methods.aCandidate(lookupEinCandidate).call()
    .then(result =>{
      colorResult2(result)
        result === false?
          einCandidateResult(["EIN-", lookupEinCandidate, " is not a registered candidate."]) : 
          einCandidateResult(["EIN-", lookupEinCandidate, " is a registered candidate."])});
      
          setTimeout(()=>{loadingCandidate = false}, 3000);
  }


  let voterButton = "registrationButtonDisabled";
  let candidateButton = "registrationButtonDisabled";
  let disabledVoter = true;
  let disabledCandidate = true;

  if(lookupEinVoter !== '' && !loadingVoter){
    voterButton = "registrationButton";
    disabledVoter= false;
  }

  if(lookupEinCandidate !== '' && !loadingCandidate){
    candidateButton = "registrationButton";
    disabledCandidate = false;
  }
 
  return (
    
    <div className="verificationWrapper">

        <div className="registrationWrapper"> 
        <div className ="verifyAsVoter" style ={{textAlign:"center"}}>

        <h2 className="verification-title">Voter Verification</h2>

        <div className="verifyBox" >
          <Typewriter inputStrings={voterResult} fontColor={fontColor}/>
          </div>

        <div className="form-group row">
			
						<div className="group mb-3">
							<div className="input-group-prepend">
								<span className="input-group-texts">EIN</span>
						    <input className="verify" type="number" min="0"  autoComplete="off" onChange={e => setLookupEinVoter(e.target.value)}/>
              </div>
                <label className="verifyLabel mt-2">Verify if an EIN is a registered voter.</label>
					</div>
				</div>
      
      <button
      className={voterButton}   
      onClick={checkVoter} disabled={disabledVoter}>Verify Voter</button>
     
       
    </div>

    <div className ="verifyAsVoter" style ={{textAlign:"center"}}>

        <h2 className="verification-title">Candidate Verification</h2>
        <div className="verifyBox" ><Typewriter inputStrings={candidateResult} fontColor={fontColor2}/></div>

        <div className="form-group row">
						<div className="group mb-3">
							<div className="input-group-prepend">
								<span className="input-group-texts">EIN</span>
							  <input className="verify" type="number" min="0"  autoComplete="off" onChange={e => setLookupEinCandidate(e.target.value)}/>
              </div>
                <label className="verifyLabel mt-2">Verify if an EIN is a registered candidate.</label>
					</div>
				</div>
      
      <button className={candidateButton}   
      onClick={checkCandidate} 
      disabled={disabledCandidate}> Verify Candidate
      </button>
     
       
    </div>

    </div>
      
    </div>
  );
}