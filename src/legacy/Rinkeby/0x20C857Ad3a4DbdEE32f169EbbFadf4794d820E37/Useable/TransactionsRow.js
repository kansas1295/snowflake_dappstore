/* eslint-disable */

import React, { useState, useContext} from 'react';

import { useGenericContract,useAccountEffect} from '../../../common/hooks';
import { useWeb3Context } from 'web3-react';
import Identicon from '../../../../components/identicon';
import hydro from '../Images/hydro.png';
import SnowflakeContext from '../../../../contexts/snowflakeContext';
import {raindrop_address,raindrop_abi} from '../ABI/ClientRaindropABI';
import IdentityRegistryABI from '../ABI/IdentityRegistryABI';
import numeral from 'numeral';


export default function TransactionRow({ein,transactions,count}) {

  
  const context = useWeb3Context();

  const clientRaindropContract = useGenericContract(raindrop_address, raindrop_abi)
  const identityRegistryContract = useGenericContract('0xE65fB5C8AEb0305D3A1dB0BE2297f3E00B26E8c5',IdentityRegistryABI)
  const snowflakeContext = useContext(SnowflakeContext);
  

  const {
  } = snowflakeContext;


  const [userName, einUser]  = useState('')
  const [EIN, identityRegistered]  = useState('')

  const numeralAmount= numeral(transactions.returnValues.amount).format('0,0');
 
  /*Gets the TRANSACTION props from OverviewPage 
  & gets EIN from from Identity Registry Contract 
  & UserName form Client Raindrop Contract*/
  useAccountEffect(() => {

   identityRegistryContract.methods.getEIN(transactions.returnValues.contributor).call()
   .then(result => {
    clientRaindropContract.methods.getDetails(result).call()
    .then(user => {einUser(user[1])});
      identityRegistered(result)});
 
  })
  /*END*/

  return (
    
    <React.Fragment>  
      <tr className="cursor-pointer mt-2">  
				<td ><Identicon seed={EIN} size={27} className="list-img ml-2 mt-5 mb-5"/></td>   
        <td>{userName.slice(0,20)} ({EIN}) </td>     
      	<td><img src={hydro} className="hydro-logo mb-1 mr-1" border={1} alt="Hydro logo" width={20}/>{numeralAmount} </td>
        <td title={transactions.transactionHash}><a href={'https://etherscan.io/tx/'+ transactions.transactionHash} target='blank'>{transactions.transactionHash.slice(15) + '...'}</a></td>
        <td title={transactions.blockNumber}><a href={'https://etherscan.io/block/'+ transactions.blockNumber} target='blank'>{transactions.blockNumber}</a></td>
			</tr>               
     
    </React.Fragment>

  );
}