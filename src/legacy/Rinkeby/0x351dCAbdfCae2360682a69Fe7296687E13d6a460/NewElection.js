/* eslint-disable */

import React, { useState} from 'react';
import './style.css';
import { useGenericContract} from '../../common/hooks';
import { useWeb3Context } from 'web3-react';
import FactoryAbi from './FactoryAbi';
import VoteButton from './customButton/VoteButton';


export default function NewElection({}) {

  const context = useWeb3Context();

  const resolverContract = useGenericContract('0x313Dc90c151BBE031f77D561366904be35139277',FactoryAbi);

  const [title, electionTitle]  = useState('');
  const [description, electionDescription]  = useState('  ');
  const [deadline, electionDeadline]  = useState('  ');
  const dateTime = Date.now();
  const timestamp = Math.floor(dateTime / 1000);
  
  return (
    
    <div className="verificationWrapper">

    <div className="profileWrapper">   
    <div className ="verifiedProfile" style ={{textAlign:"center"}}>

    <h2 className="profile-title">Create New Election</h2>
    <div className="form-group row">
						<div className="group mb-3 mt-3">
							<div className="input-group-prepend">
								<span className="input-group-texts">Title</span>
							  <input className="verify" type="text" min="0"  autoComplete="off"  onChange={e => electionTitle(e.target.value)}/>
              </div>
                <label className="newElectionLabel mt-2">Title of the new election.</label>
					</div>
                    <div className="group mb-3">
							<div className="input-group-prepend">
								<span className="input-group-texts">Description</span>
							  <input className="verify" type="text" min="0"  autoComplete="off"  onChange={e => electionDescription(e.target.value)}/>
              </div>
                <label className="newElectionLabel mt-2">Description of the new election.</label>
					</div>
             
                <div className="group">
					<div className="input-group-prepend">
                    <span className="input-group-texts">Days</span>
                    <select className="verify" onChange={e => electionDeadline(e.target.value)}>
                    <option value={1} className="votingOptions"> 1 Day</option>
                    <option value={3} className="votingOptions"> 3 Days</option>
                    <option value={7} className="votingOptions"> 7 Days</option>
                    <option value={15} className="votingOptions"> 15 Days</option>
                    <option value={30} className="votingOptions"> 30 Days</option>
                    </select>
                    </div>
                    <label className="newElectionLabel mt-2">Number of days the election will run.</label>
                  </div>

                  <div style={{display:'inline-block',textAlign:'center',width: '100%'}} className="divButtons">        
                
                <VoteButton readyText='Create Election' 
                style={{display:'inline-block',textAlign:'center'}} 
                className="voteButton" 
                method={()=>resolverContract.methods.createNewElection(parseInt(timestamp),title,description,parseInt(deadline))}/>
                 
                </div>
                   
   </div>
</div>

</div>
  
</div>
  );
}