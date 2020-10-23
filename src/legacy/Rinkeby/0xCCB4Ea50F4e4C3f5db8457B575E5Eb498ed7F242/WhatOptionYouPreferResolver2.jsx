import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import ABI from './abi';
import './fonts.css';
import { useGenericContract, useAccountEffect } from '../../common/hooks';
import TransactionButton from '../../common/TransactionButton';

// import ShowCampaignStats from './ShowCampaignStats';


export default function WhatOptionYouPreferView2({ ein }) {
  const operatorAddress = '0xCCB4Ea50F4e4C3f5db8457B575E5Eb498ed7F242';

  const resolverContract = useGenericContract(operatorAddress, ABI);


  // logged user data
  const [totalUserVotes, setTotalUserVotes] = useState('000');
  const [totalUserRewards, setTotalUserRewards] = useState('0000000000');

  // current campaign data
  const [currentCampaign, setCurrentCampaign] = useState(0);
  const [option1Text, setOption1Text] = useState('Fetching data...');
  const [option2Text, setOption2Text] = useState('Fetching data...');
  const [tipForParticipation, setTipForParticipation] = useState(0);
  const [availableHydroForCampaign, setAvailableHydroForCampaign] = useState(0);
  const [title, setTitle] = useState('Fetching data...');
  const [status, setStatus] = useState(0);

  const [option1Percent, setOption1Percent] = useState(0);
  const [option2Percent, setOption2Percent] = useState(0);
  const [option1Votes, setOption1Votes] = useState(0);
  const [option2Votes, setOption2Votes] = useState(0);

  //
  const [showMode, setShowMode] = useState(0); // 0 is show question, 1 is show response
  const [option, setOption] = useState(1);

  const [isLastCampaign, setIsLastCampaign] = useState(false);

  function refreshData() {
    resolverContract.methods.getOwner(ein).call()
      .then((owner) => {
        setTotalUserVotes((`000${owner.numPlayedGames}`).slice(-3));
        setTotalUserRewards((`0000000000${owner.earnedHydro}`).slice(-10));
        
        if (showMode === 0) {
          setCurrentCampaign(owner.currentCampaign);
          // show question and submit button or no more questions 
          resolverContract.methods.totalCampaigns().call()
            .then((tc) => {
              if (tc === 0) {
                setIsLastCampaign(true);
                //setShowMode(1);
              } else {
                resolverContract.methods.campaigns(owner.currentCampaign).call()
                  .then((camp) => {
                    setOption1Text(camp.option1Description);
                    setOption2Text(camp.option2Description);
                    setTipForParticipation(camp.tipForParticipation);
                    setAvailableHydroForCampaign(camp.pendingBudget);
                    setTitle(camp.title);
                    setStatus(camp.status);
                    resolverContract.methods.UserHasVoted(ein, owner.currentCampaign).call()
                      .then((result) => {
                        if (result) {
                          // user has voted last campaign, show stats
                          setIsLastCampaign(result);
                          resolverContract.methods.getCampaignStats(currentCampaign).call()
                            .then((stats) => {
                              const sumVotes = stats.option1Votes + stats.option2Votes;
                              setOption1Votes(stats.option1Votes);
                              setOption2Votes(stats.option2Votes);
                              if (sumVotes === 0) {
                                setOption1Percent(0);
                                setOption2Percent(0);
                              } else {
                                setOption1Percent(Math.round((stats.option1Votes * 100) / sumVotes));
                                setOption2Percent(Math.round((stats.option2Votes * 100) / sumVotes));
                              }
                            });
                          setShowMode(1);
                        }
                      });
                    // resolverContract.methods.isLastCampaign(camp.id).call()
                    //  .then((result) => {
                    //    setIsLastCampaign(result);
                    //    if (result) {
                    //      getStats();
                    //      setShowMode(1);
                    //    }
                    //  });
                    debugger;
                  });
              }
            });
        } else if (showMode === 1) {
          // after tx, show stats
          // update is last campaign
          // show stats and last or next
          resolverContract.methods.getCampaignStats(currentCampaign).call()
            .then((stats) => {
              const sumVotes = stats.option1Votes + stats.option2Votes;
              setOption1Votes(stats.option1Votes);
              setOption2Votes(stats.option2Votes);
              if (sumVotes === 0) {
                setOption1Percent(0);
                setOption2Percent(0);
              } else {
                setOption1Percent(Math.round((stats.option1Votes * 100) / sumVotes));
                setOption2Percent(Math.round((stats.option2Votes * 100) / sumVotes));
              }
              resolverContract.methods.UserHasVoted(ein, owner.currentCampaign).call()
                .then((result) => {
                  if (result) {
                    // show stats, and also last campaign info
                    setIsLastCampaign(result);
                  }
                });
            });
        }
      });
  }


  useAccountEffect(() => {
    debugger;
    refreshData();
    // getActiveCampaigns();
  });

  /**
  * This should show a modal dialog while sending txn to blockchain.
  * After TxDone, should show stats for current campaign:
  * - %option1 (nºvotes option1)
  * - %option2 (nºvotes option2)
  * - total votes
  * - hydro earned (if any)
  */
  function handleOption1Click() {
    setOption(1);
  }

  function handleOption2Click() {
    setOption(2);
  }

  // called after submit a response
  // for results of currentCampaign, change mode to show
  function showResults() {
    // refreshData();
    // getStats();
    resolverContract.methods.getCampaignStats(currentCampaign).call()
      .then((stats) => {
        const sumVotes = stats.option1Votes + stats.option2Votes;
        setOption1Votes(stats.option1Votes);
        setOption2Votes(stats.option2Votes);
        if (sumVotes === 0) {
          setOption1Percent(0);
          setOption2Percent(0);
        } else {
          setOption1Percent(Math.round((stats.option1Votes * 100) / sumVotes));
          setOption2Percent(Math.round((stats.option2Votes * 100) / sumVotes));
        }
      });
    //setShowMode(1);
  }

  return (
    <div>
      <div align="center" className="scorebar">
        {`Played ${totalUserVotes} Times - ${totalUserRewards} HYDRO earned`}
      </div>
      <div align="center" className="example">
        {`#${currentCampaign} ${title}`}

        {showMode === 0 && (
        <div className="example">
          {'What option do you prefer...?'}
          <br />
        </div>
        )}
        {showMode === 1 && (
        <div className="example">
          {'You prefer...'}
        </div>
        )}
      </div>
      <Grid
        container
        spacing="8"
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item>
          {showMode === 0 && (
          <Button
            onClick={handleOption1Click}
            class={option === 1 ? 'eightbit-btn eightbit-btn' : 'eightbit-btn eightbit-btn--discarted'}
          >
            <div className="vt323">{option1Text}</div>
          </Button>
          )}
          {showMode === 1 && (
          <Button
            class={option === 1 ? 'eightbit-btn eightbit-btn' : 'eightbit-btn eightbit-btn--discarted'}
          >

            <div className="vt323">{option1Text}</div>
            <div className="vt323">
              {`${option1Percent} % (${option1Votes} votes)`}
            </div>
          </Button>
          )}
        </Grid>
        <Grid>
          <div className="example">
            Or
          </div>
        </Grid>
        <Grid item>
          {showMode === 0 && (
          <Button
            onClick={handleOption2Click}
            class={option === 2 ? 'eightbit-btn eightbit-btn' : 'eightbit-btn eightbit-btn--discarted'}
          >
            <div className="vt323">
              {' '}
              {option2Text}
            </div>
          </Button>
          )}
          {showMode === 1 && (
          <Button
            class={option === 2 ? 'eightbit-btn eightbit-btn' : 'eightbit-btn eightbit-btn--discarted'}
          >
            <div className="vt323">{option2Text}</div>
            <div className="vt323">
              {`${option2Percent} % (${option2Votes} votes)`}
            </div>
          </Button>
          )}
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
          {showMode === 0 && (
          <>
            {tipForParticipation > 0 && (
            <div className="example">
              {`Play for win ${tipForParticipation} HYDRO!!`}
            </div>
            )}
            <TransactionButton
              class="scorebar"
              readyText="Submit ..."
              method={() => resolverContract.methods.voteCampaign(ein, currentCampaign, option)}
              onConfirmation={() => setShowMode(1)}
            />
          </>
          )}

          {showMode === 1 && (
          <>
            {!isLastCampaign && (
              <>
                {tipForParticipation > 0 && (
                <div className="example">
                  {`You won ${tipForParticipation} HYDRO!!`}
                </div>
                )}
                <Button onClick={() => setShowMode(0)} class="eightbit-btn eightbit-btn--reset">&gt;</Button>
              </>
            )}
            {isLastCampaign && (

              <div className="example">
                {'You\'ve reached last question! Come later, or create your own!'}
              </div>
            )}
          </>
          )}
          {/* }
          <Button class="eightbit-btn eightbit-btn--reset">&lt;</Button>
          <Typography
            class="example"
            variant="h5"
            color="textPrimary"
            gutterBottom
          >
            #{currentCampaign}
          </Typography>
          <Button class="eightbit-btn eightbit-btn--reset">&gt;</Button>
          */}
        </Grid>
      </div>
    </div>
  );
}
