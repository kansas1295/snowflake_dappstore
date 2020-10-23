/* eslint-disable */

import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import Web3 from 'web3';
import './style.css';
import VoteButton from './customButton/VoteButton';
import clientRaindrop from '../../../services/contracts/clientRaindrop';
import CustomButton from './customButton/CustomButton';
import ChartDeadline from './ChartDeadline';

export default class ChartPage extends Component {


	constructor(props) {
		super(props)
			this.state = {
            votingContract:[],
            raindrop:'',
            maxCandidates:[],
            votes:[],
            userName:[],
            account:[],
            blockNumber:'',
            candidate:'',
            pollTitle:'',
            maxNumber:'',
            loading:true,
            unixTime:'',
            deadline:''
            
        }
        //Binds Option when selecting a candidate to vote
        this.handleChangeCandidate = this.handleChangeCandidate.bind(this)
	}


	componentDidMount(){
	  this._isMounted = true;
      if(this.props.electionABI !== null & this.props.electionAddress!== null){
          this.loadBlockchain();
            }
      }
    
    //Connecting & getting Data from the blockchain.
    async loadBlockchain(){
       
        let ethereum= window.ethereum;
        let web3=window.web3;
    
         if(typeof ethereum !=='undefined'){
         await ethereum.enable();
         web3 = new Web3(ethereum);       
        }
     
         else if (typeof web3 !== 'undefined'){
         console.log('Web3 Detected!')
         window.web3 = new Web3(web3.currentProvider);
         }
         
         else{console.log('No Web3 Detected')
        window.web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));  
         }
        const network = await web3.eth.net.getNetworkType();
        const accounts = await web3.eth.getAccounts();
        const blockNumber = await web3.eth.getBlockNumber();
        
        if (this._isMounted){
        this.setState({blockNumber:blockNumber - 1});
        }
        if (this._isMounted){
        this.setState({account: accounts[0]}); 
        }
        const raindrop = new web3.eth.Contract(clientRaindrop.abi,clientRaindrop.address);
        if (this._isMounted){
            this.setState({raindrop:raindrop});
        }
        const votingContract = new web3.eth.Contract(this.props.electionABI,this.props.electionAddress);
        if (this._isMounted){
            this.setState({votingContract:votingContract});
        }


        const pollTitle = await votingContract.methods.snowflakeName().call();    
        this.setState({pollTitle:pollTitle})

        const deadline = await votingContract.methods.getDeadline().call()
            if (this._isMounted){
                this.setState({unixTime:deadline.slice(0,10),
                    deadline:new Date(parseInt(deadline.slice(0,10),10)*1000)});
            }

        const maxCandidates = await votingContract.methods.getMaxCandidates().call();    
        this.setState({maxCandidates:maxCandidates[0],maxNumber:maxCandidates[1]})

        
        for(var m=0; m<this.state.maxCandidates.length; m++){
            const voteCount = await votingContract.methods.candidates(this.state.maxCandidates[m]).call();
            const userName = await raindrop.methods.getDetails(this.state.maxCandidates[m]).call();        
            this.setState({votes:[...this.state.votes,voteCount]});
            this.setState({userName:[...this.state.userName,userName[1]]});
           
        }
        //listens to incoming votes in real time.
        votingContract.events.voted({toBlock:'latest'})
        .on('data',async(log) => {  
   
        const getIndex = (element) => element == parseInt(log.returnValues._candidate);
        let index = this.state.maxCandidates.findIndex(getIndex);
        let votes =  [...this.state.votes]
        let count= this.state.votes[index];
            count = parseInt(count)+1;
            votes[index] = await votingContract.methods.candidates(parseInt(log.returnValues._candidate)).call();
            this.setState({votes})
            
        })

        //listens to added candidates in real time.
        votingContract.events.becameCandidate({toBlock:'latest'})
        .on('data',async(event) => { 
            const newCandidate = await raindrop.methods.getDetails(parseInt(event.returnValues._candidateEIN)).call();
            this.setState({maxCandidates:[...this.state.maxCandidates,event.returnValues._candidateEIN],
                userName:[...this.state.userName,newCandidate[1]],
                votes:[...this.state.votes,0]           
            })
        
        })
        this.setState({loading:false,
            candidate:this.state.maxCandidates[0]},()=>console.log())
        }

    //Sets the value of candidates according to what the user has selected.
    handleChangeCandidate (event){
        let candidates = event.target.value;
        this.setState({candidate:candidates});      
      }

      
   async web3NewData(){
        this.setState({votes:[]});
        for(var m=0; m<this.state.maxCandidates.length; m++){
            const voteCount = await this.state.votingContract.methods.candidates(this.state.maxCandidates[m]).call();
            this.setState({votes:[...this.state.votes,voteCount]});
            }
    }


  render() {
    let barThickness = 300;
    let barfontsize = 17;

    if(this.state.maxCandidates.length === 4){
        barThickness = 150;
    }
    else if(this.state.maxCandidates.length === 5){
        barThickness = 190;
        barfontsize = 16;
    }
    else if(this.state.maxCandidates.length <= 6){
        barThickness = 170;
        barfontsize = 14;
    }
    
    //Bar Char Data & Styling
    if(!this.state.loading)
    this.BarData = (canvas) => {
        const ctx = canvas.getContext("2d")
        const gradient = ctx.createLinearGradient(800,200,500,800,200);
        gradient.addColorStop(0, 'rgb(210, 230, 240)');
        gradient.addColorStop(1, 'rgb(86, 152, 206)');
     
        return {
    
         labels: this.state.maxCandidates.map((ein,index)=>["EIN:"+ein+' - '+this.state.userName[index]]),
          datasets: [{
            label:'VOTES',
            fontColor:'white',
            backgroundColor: [gradient,gradient,gradient,gradient,gradient],
            borderColor: 'white',
            borderWidth: .8,
            backgroundColor: [gradient,gradient,gradient,gradient,gradient],
            hoverBorderColor: 'rgb(245, 191, 76)',
            hoverBorderWidth:2,
            weight:5,
            maxBarThickness: 230,
            borderAlign:'center',
            data:this.state.votes.map(votes=>votes),
            }],					
            }	
         
        }

    return (

            <div style={{width: '100%',textAlign:'center'}} >

                {this.state.loading &&<div className="spinner"/>} 
                {!this.state.loading && <div className="dashboard-bar">
                <p className="pollInfo ml-2" >Candidates: {this.state.maxCandidates.length}/{this.state.maxNumber}</p> 
                <CustomButton readyText='Register As Candidate' 
                    variant= "outlined" 
                    color="primary" 
                    className="registrationButton"   
                    method={() => this.state.votingContract.methods.becomeCandidate(this.props.ein)}/>

              <br/>
                <ChartDeadline deadline={this.state.deadline} unixTime={this.state.unixTime}/>

             

              <Bar className ="bars"
                options={{
                responsive:true,
                maintainAspectRatio:false,
                title:{
                display: true,
                position:"top",
                text: this.state.pollTitle,
                fontSize: 18,
                lineHeight:5.5,
                padding:1,
                fontColor:'white',                   
                },   
                legend: {
                    display: false,
                    labels: {
                        fontColor: 'rgb(245, 191, 76)'
                     }
                    }, 
                scales: {
                  yAxes: [{ticks: {beginAtZero:true,fontSize:17,fontColor:'white',fontStyle: '600',precision:0 }}],
                  xAxes: [{ticks: {beginAtZero:true,fontSize:barfontsize,fontColor:'rgb(241, 189, 77)', fontStyle: '600' },barPercentage:1,display: true}]
                },
                elements:{
                rectangle:{borderSkipped:'bottom',}
                }  
                }} data={this.BarData} />
              </div> }
              
			<div>
				</div>

                <div style={{display:'inline-block',textAlign:'center',width: '100%'}} className="divButtons">        
                
                {!this.state.loading &&<select className="selectOptions" onChange={this.handleChangeCandidate}>
                {this.state.maxCandidates.map((candidate,index)=><option key={index} 
                    value={candidate} 
                    className="votingOptions">{'EIN: ' + candidate}
                    </option>)}
                </select>}
                
                <VoteButton readyText='VOTE NOW' 
                style={{display:'inline-block',textAlign:'center'}} 
                className="voteButton" 
                method={()=>this.state.votingContract.methods.vote(this.state.candidate)}/>
               
                </div>
            </div>
		);
	}
}