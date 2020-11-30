/* eslint-disable */

import React, { useState} from 'react';
import { useGenericContract} from '../../../common/hooks';
import { useWeb3Context } from 'web3-react';
import CharityFactoryABI from '../ABI/CharityFactoryABI';
import CreateCharityButton from '../Buttons/CreateCharityButton';
import logo from '../logo.png'

export default function CreateCharity({account}) {

  const context = useWeb3Context();

  const resolverContract = useGenericContract('0x0d96af51ec52e74056ce68ac820a4e3896068381',CharityFactoryABI);

  const [title, charityTitle]  = useState('');
  const [description, charityDescription]  = useState('');
  const [amount, charityAmount]  = useState('');
  const [deadline, charityDeadline]  = useState(1);


  let alert;
	if (title.length === 0 || description.length === 0 || amount.length === 0 || deadline.length === 0) {
		alert = <label className="newCharityLabel mt-2">One or more fields is wrong or missing!</label>
	}
  
  return (
    
    <div className="profileWrapper"  style ={{textAlign:"center"}}>  

    <div className ="charityProfile" style ={{textAlign:"center"}}>
    <img src={logo} className="charityLogo mb-2 mr-1"  border={1} alt="Charity logo" width={230}/>

    <h2 className="profile-title">Create New Charity</h2>
    <div className="form-group row">

				<div className="group mb-3 mt-3">
					<div className="input-group-prepend">
						<span className="input-group-charity">Title</span>
							<input className="verify" type="text" min="0"  autoComplete="off"  onChange={e => charityTitle(e.target.value)}/>
                    </div>
                <label className="newCharityLabel mt-2">Title of the new charity.</label>
				</div>
                
        <div className="group mb-3">
					<div className="input-group-prepend">
							<span className="input-group-charity">Description</span>
							  <input className="verify" type="text" min="0"  autoComplete="off"  onChange={e => charityDescription(e.target.value)}/>
                    </div>
                <label className="newCharityLabel mt-2">Description of the new charity.</label>
				</div>
                

        <div className="group mb-3">
					<div className="input-group-prepend">
							<span className="input-group-charity">Amount</span>
							  <input className="verify" type="number" min="0"  autoComplete="off"  onChange={e =>charityAmount(e.target.value)}/>
                    </div>
                <label className="newCharityLabel mt-2">Amount of hydro to raise</label>
				</div>

             
        <div className="group">
					<div className="input-group-prepend">   
                    <span className="input-group-charity">Days</span>
                    <select className="verify" onChange={e => charityDeadline(e.target.value)}>
                    <option value={1} className="votingOptions"> 1 Day</option>
                    <option value={3} className="votingOptions"> 3 Days</option>
                    <option value={7} className="votingOptions"> 7 Days</option>
                    <option value={15} className="votingOptions"> 15 Days</option>
                    <option value={30} className="votingOptions"> 30 Days</option>
                    </select>
                    </div>
                    <label className="newCharityLabel mt-2">Number of days the charity will run.</label>
                  </div>
                
        <div style={{display:'inline-block',textAlign:'center',width: '100%'}} className="divButtons"  >        
          <CreateCharityButton readyText='Create Election' 
              style={{display:'inline-block',textAlign:'center'}} 
              className="voteButton" 
              method={()=>resolverContract.methods.createNewCharity(title,description,parseInt(deadline),parseInt(amount),account)}
          />             
        </div>

        <div style={{display:'inline-block',textAlign:'center',width: '100%'}}>    
          {alert}
        </div>
                   
   </div>
</div>
</div>
  

  );
}