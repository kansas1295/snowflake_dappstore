import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


import ABI from './abi';
import './fonts.css'
import { useGenericContract,useAccountEffect } from '../../common/hooks'
import { useWeb3Context } from 'web3-react'


export default function ShowCampaignStats ({ ein, campaignId, option }) {

  const operatorAddress = '0xa2fa614F99c64765D8fb8D93670e422A862C10FE'

  const resolverContract = useGenericContract(operatorAddress, ABI)


  //logged user data
  const [totalVotes, setTotalVotes] = useState('000')
  const [totalRewards, setTotalRewards] = useState('000000')

  //current campaign data
  const [option1Text, setOption1Text] = useState('Fetching data...')
  const [option2Text, setOption2Text] = useState('Fetching data...')
  const [tipForParticipation, setTipForParticipation] = useState(0)
  const [title, setTitle] = useState('Fetching data...')
  const [status, setStatus] = useState(0);

  const [option1Percent,setOption1Percent] = useState(0)
  const [option2Percent,setOption2Percent] = useState(0)
  const [option1Votes,setOption1Votes] = useState(0)
  const [option2Votes,setOption2Votes] = useState(0)
  const [totalCampaignVotes,setTotalCampaignVotes] = useState(0)
  //


  const [isLastCampaign,setIsLastCampaign] = useState(false);

  useAccountEffect(() => {
    debugger;
    refreshData();
    getStats();



  })

  function refreshData() {
    debugger;
    resolverContract.methods.getOwner(ein).call()
      .then(owner => {
        setTotalVotes(owner.numPlayedGames)
        setTotalRewards(owner.earnedHydro)
        resolverContract.methods.campaigns(campaignId).call()
          .then(camp =>{
            setOption1Text(camp.option1Description)
            setOption2Text(camp.option2Description)
            setTipForParticipation(camp.tipForParticipation)
            setTitle(camp.title)
            setStatus(camp.status)
            //resolverContract.methods.isLastCampaign(camp.id).call()
            //	.then(result => {
            //		setIsLastCampaign(result);
            //		if(result){
            //			getStats();
            //			setShowMode(1);
            //		}
            //	});
          });
      });
  }

  function getStats() {
    resolverContract.methods.getStats().call()
      .then(stats => {
        setOption1Votes(stats.option1Votes)
        setOption2Votes(stats.option2Votes)
        setTotalCampaignVotes(stats.totalVotes)
        if(stats.totalVotes === 0){
          setOption1Percent(0)
          setOption2Percent(0)
        }else{
          setOption1Percent(Math.round((stats.option1Votes * 100) / stats.totalVotes))
          setOption2Percent(Math.round((stats.option2Votes * 100) / stats.totalVotes))
        }
      });
  }






  function closeStatsNextQuestion(){

  }

  return (
    <div>
      <div align="center" class="scorebar">

          Played {totalVotes} Times - {totalRewards} HYDRO earned

      </div>
      <div align="center" class="example">
          #{campaignId} {title}

        <div class="example">
			  You prefer...
			</div>

      </div>
      <Grid
        container
        spacing="8"
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item>


          <Button
            class={option === 1 ? 'eightbit-btn eightbit-btn' : 'eightbit-btn eightbit-btn--discarted'}>

            <div class="vt323">{option1Text}</div>
            <div class="vt323">{option1Percent}% ({option1Votes} votes)</div>
          </Button>

        </Grid>
        <Grid>
          <div class="example">
            Or
          </div>
        </Grid>
        <Grid item>


          <Button class={option === 2 ? 'eightbit-btn eightbit-btn' : 'eightbit-btn eightbit-btn--discarted'}>
            <div class="vt323">{option2Text}</div>
            <div class="vt323">{option2Percent}% ({option2Votes} votes)</div>
          </Button>

        </Grid>
        <p>&nbsp;</p>
      </Grid>
      <div>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >

          <>

  {!isLastCampaign ? (
  <>
  {tipForParticipation > 0 && (
						<div class="example">
							You won {tipForParticipation} HYDRO!!
						</div>
						)}
  <Button onClick={() => closeStatsNextQuestion()} class="eightbit-btn eightbit-btn--reset">&gt;</Button>
					</>
				) : (

  <div class="example">
					You've reached last question! Come later, or create your own!
					</div>
				)}
			  </>
        </Grid>
      </div>
    </div>


  );
}







