/* eslint-disable */
import React, { Component } from 'react';
import Web3 from 'web3';
import '../Charity-style.css';
import CharityContractABI from '../ABI/CharityContractABI';
import {hydroToken_ABI,hydroToken_Address} from '../ABI/HydroTokenMainnet';
import hydro from '../Images/hydro.png';
import ContributeButton from '../Buttons/ContributeButton';
import Deadline from '../Useable/Deadline';
import {Doughnut} from 'react-chartjs-2';


//Numerical Setting
let numeral = require('numeral');

/*Setting for Dougnut Chart Percentage*/
var originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
  Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
    draw: function() {
      originalDoughnutDraw.apply(this, arguments);
      var chart = this.chart;
      var width = chart.chart.width,
          height = chart.chart.height,
          ctx = chart.chart.ctx;

      var fontSize = 0.9
        ctx.font = fontSize + "em sans-serif";
        ctx.textBaseline = "middle";

	    var percentage = 0;
      var total = parseInt(chart.config.data.datasets[0].data[0])+parseInt(chart.config.data.datasets[0].data[1])
	      percentage = numeral(chart.config.data.datasets[0].data[0] *100/total).format('0.00')
	    var text = percentage+'%',
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2.3;
      var fund =  "Funded",
		      textZ = height / 1.9;
		
      ctx.fillText(text, textX, textY);
      ctx.fillText(fund, textX, textZ);
  }
});

/*End of Doughtnut Chart Percentage*/


export default class ContributePage extends Component {


	constructor(props) {
		super(props)
			this.state = {
            charityContract:[],
            accounts:[],
            blockNumber:0,

            title:null,
            description:null,
            charityGoal:null,
            remainingAmount:0,
            deadline:null,
            blockNumber:'',  
            charityStatus:'',
            contractOwner:'',
            contributionAmount:0,
            currentBalance:0,
            charityExpired:true,
           
            charityOwnerOpen:false,
            descriptionOpen:false,
            contributeOpen:false,
            isRegistered:false,
            hydroBalance:0,
        }
       
	}


	componentDidMount(){
	  this._isMounted = true;
    this.loadBlockchain();
	}

    /*Loads & Sets the Charity Contract Data*/
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
            window.web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));  
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

            const charityContract = new web3.eth.Contract(CharityContractABI,this.props.Address);
            if (this._isMounted){
                this.setState({charityContract:charityContract},()=>console.log());
            }
            const hydroToken = new web3.eth.Contract(hydroToken_ABI,hydroToken_Address);
            const hydroBalance = await hydroToken.methods.balanceOf(this.props.Address).call()
            if (this._isMounted){
                this.setState({hydroBalance:web3.utils.fromWei(hydroBalance)},()=>console.log());
            }
            const title = await charityContract.methods.title().call()
            if (this._isMounted){
                this.setState({title:title});
            }

            const charityGoal = await charityContract.methods.charityGoal().call()
            if (this._isMounted){
                this.setState({charityGoal:web3.utils.fromWei(charityGoal)},()=>console.log());
            }

            const currentBalance = await charityContract.methods.currentBalance().call()
            if (this._isMounted){
                this.setState({currentBalance:web3.utils.fromWei(currentBalance)},()=>console.log());
            }

            const charityDescription = await charityContract.methods.snowflakeDescription().call()
            if (this._isMounted){
                this.setState({charityDescription:charityDescription},()=>console.log());
            }
            const charityStatus = await charityContract.methods.checkState().call()
            const charityExpired = await charityContract.methods.checkIfCharityExpired().call()
            const charityDeadline = await charityContract.methods.raiseBy().call()
            
            if (this._isMounted){
              this.setState({unixTime:charityDeadline.slice(0,10),
                deadline:new Date(parseInt(charityDeadline,10)*1000),
                charityExpired: charityExpired,
                charityStatus:parseInt(charityStatus)
                },()=>console.log('expired?',this.state.charityExpired));
            }

            const contractOwner = await charityContract.methods.charityOwnerAddress().call()
            if (this._isMounted){
              this.setState({contractOwner:contractOwner},()=>console.log());
            }

            const isRegistered = await charityContract.methods.aParticipant(parseInt(this.props.ein)).call()
            if (this._isMounted){
              this.setState({isRegistered:isRegistered},()=>console.log());
            }
 
            const remainingAmount = await charityContract.methods.checkRemainingAmount().call()
            if (this._isMounted){

                this.setState({remainingAmount:web3.utils.fromWei(remainingAmount)},()=>console.log());
                
            }
            
            
            charityContract.events.fundingReceived({toBlock:'latest'})
            .on('data',async(log) => {  
       
            const newRemainingAmount = await charityContract.methods.checkRemainingAmount().call()
            const updatedBalance = await charityContract.methods.currentBalance().call()
            const newHydroBalance = await hydroToken.methods.balanceOf(this.props.Address).call()
     
            if (this._isMounted){
                this.setState({currentBalance:web3.utils.fromWei(updatedBalance),
                              hydroBalance:web3.utils.fromWei(newHydroBalance),
                              remainingAmount:web3.utils.fromWei(newRemainingAmount)},()=>console.log());
             }
                
          })

          charityContract.events.creatorPaid({toBlock:'latest'})
            .on('data',async(log) => {  
            const widthrawBalance = await hydroToken.methods.balanceOf(this.props.Address).call()
            if (this._isMounted){
                this.setState({hydroBalance:web3.utils.fromWei(widthrawBalance)},()=>console.log());
             }
                
          })
    }
    /*End of Loading & Setting the Charity Contract Data*/

    //Toggles the display of Owner Button
    toggleOwnerHandler = ()=>{
        if(!this.state.charityOwnerOpen){
            this.setState({descriptionOpen:false, contributeOpen:false}); 
        }
        this.setState((prevState)=>{ return {charityOwnerOpen: !prevState.charityOwnerOpen};
                
        },()=>console.log());   
    };

    //Toggles the display of Description Button
    toggleDescriptionHandler = ()=>{
        if(!this.state.descriptionOpen){
            this.setState({contributeOpen:false, charityOwnerOpen:false}); 
        }
        this.setState((prevState)=>{ return {descriptionOpen: !prevState.descriptionOpen};
        
        },()=>console.log());   
    };

    //Toggles the display of Contribute Button
    toggleContributeHandler = ()=>{
        if(!this.state.contributeOpen){
            this.setState({descriptionOpen:false, charityOwnerOpen:false}); 
         }
        this.setState((prevState)=>{ return {contributeOpen: !prevState.contributeOpen,descriptionOpen: false};
       },()=>console.log());   
    };

    //Sets the contribution amount on user input
    contributionChange = (event)=>{
      let amount = event.target.value;
      this.setState({contributionAmount:amount},()=>console.log())
   };
 

  render() {    

    let owner = false;
    let chartData = [this.state.currentBalance,(this.state.charityGoal - this.state.currentBalance)];
    if(this.state.contractOwner === this.props.account){
      owner = true;
    }

    if(parseInt(this.state.currentBalance) > parseInt(this.state.charityGoal)){
      chartData = [this.state.currentBalance,0];
    }

   

    /*Renders the Doughnut Chart Settings*/
    this.genderChart = (canvas) => {
        const ctx = canvas.getContext("2d")
        const gradient = ctx.createLinearGradient(100,150,140,50,100);
        gradient.addColorStop(1, 'white');
        gradient.addColorStop(0, 'black');

        const gradient2 = ctx.createLinearGradient(100,150,130,50,200);
        gradient2.addColorStop(1, 'rgb(209, 235, 238)');
        gradient2.addColorStop(0, 'rgb(16, 197, 221)');

        const gradient3 = ctx.createLinearGradient(100,150,100,50,100);
        gradient3.addColorStop(1, 'purple');
        gradient3.addColorStop(0, 'aqua'); 

        
        return {
          labels: ['Hydro Funded','Hydro to Fill'],
          datasets: [{
            label:'Hydro',
            fontColor:'black',
            backgroundColor: [gradient3,gradient],
            borderColor: 'black',
            borderWidth: .9,
            hoverBackgroundColor: [gradient3,gradient2],
            hoverBorderColor: 'red',
            hoverBorderWidth:2,
            weight:5,
            borderAlign:'center',
            data: chartData,
            }],					
           }	
          
          
      }
    /*End of renders the Doughnut Chart Settings*/


    /*Sets the Display & ClassName of Buttton & Drawers Dynamically*/
    let drawerOwnerClasses = "donationOwner";
    let drawerOwnerOpen = "ownerButton";
    let arrowOwner = <p>Owner</p>
   
    let drawerDescriptionClasses = "donationDescription";
    let drawerDescriptionOpen = "descriptionButton";
    let arrowDescription = <p>Description</p>

    let drawerContributeClasses = "donationContribute";
    let drawerContributeOpen = "contributeButton";
    let arrowContribute = <p>Contribute</p>

    let drawerGoBack = "backButton";

    if(this.state.charityOwnerOpen){
      drawerOwnerClasses = "donationOwner Open"; 
      drawerOwnerOpen = "ownerButton Open"; 
      arrowOwner = <i class="fas fa-times-circle"></i>
      drawerDescriptionOpen = "descriptionButtonMargined";
      drawerContributeOpen = "contributeButtonMargined";
      drawerGoBack= "backButtonMargined-1";
      }

    if(this.state.descriptionOpen){
      drawerDescriptionClasses = "donationDescription Open"; 
      drawerDescriptionOpen = "descriptionButton Open"; 
      arrowDescription = <i class="fas fa-times-circle"></i>
      drawerContributeOpen = "contributeButtonMargined";
      drawerGoBack= "backButtonMargined-1";
      }
    
    if(this.state.contributeOpen && !this.state.descriptionOpen){
      drawerContributeClasses = "donationContribute Open"; 
      drawerContributeOpen = "contributeButton Open"; 
      arrowContribute = <i class="fas fa-times-circle"></i>
      drawerGoBack= "backButtonMargined-2";
      }
    /* End of Setting the Display & ClassName of Buttons & Drawers*/

    return (
        
      <div style={{width: '100%',textAlign:'center'}}>

        <div className={drawerOwnerClasses}>
          <p>Contract Owner</p> 
          <p title = {this.state.contractOwner} className="mb-0" style={{fontSize: '14px'}}>Owner Address: {this.state.contractOwner.slice(0,5)+'...'}</p>
          <p title =  {numeral(this.state.hydroBalance).format('0,00') + ' Hydro'} 
            className="mb-0" style={{fontSize: '14px'}}>
            Charity Balance: {numeral(this.state.hydroBalance).format('0,00')} <img src={hydro} className="mb-1 mr-2"  border={1} alt="Hydro logo" width={15}/>
          </p>
          
          <div className="mt-4">
          {owner && this.state.hydroBalance > 0?<ContributeButton readyText='Withdraw Balance' 
            style={{display:'inline-block',textAlign:'center'}} 
            className="txButton mt-2" 
            method={()=>this.state.charityContract.methods.withdrawContributions(this.props.account)}/> : <button className="txDisabled"> Withdraw Balance </button>}    
          </div>
          </div>

          <div className={drawerOwnerOpen} onClick={this.toggleOwnerHandler}>
          {arrowOwner}
        </div>
            
        <div className={drawerDescriptionClasses}>
          <p>Description</p> 
          {this.state.charityDescription}
        </div>
        <div className={drawerDescriptionOpen} onClick={this.toggleDescriptionHandler}>
         {arrowDescription}
        </div>

        {!this.state.charityExpired  && <div className={drawerContributeClasses}>
          <p>Contribute</p> 
          
          {this.state.isRegistered ? <div className="form-group row">
			    <div className="group mb-3">
				    <div className="input-group-prepend">
				      <span className="input-group-withdraw" width={5}><img src={hydro} className="hydro-logo"  alt="Hydro logo" width={20}/></span>
				      <input className="contributeInput" type="number" min="0"  autoComplete="off" onChange={this.contributionChange}/>
            </div>
              <label className="contributeLabel mt-2">How much do you want to contribute?</label>
			    </div>
		    </div> : <p>You are not registered to this charity.</p> }
      
          {this.state.isRegistered ? <ContributeButton readyText='Contribute' 
            style={{display:'inline-block',textAlign:'center'}} 
            className="voteButton" 
            method={()=>this.state.charityContract.methods.contribute(this.state.contributionAmount)}
            /> : <button className="txButton" onClick = {this.props.subPageRegistration}> Go To Registration Page</button> }
          </div>}

          {this.state.charityExpired && <div className={drawerContributeClasses}>
          <p>Contribute</p> 
          
          {this.state.isRegistered ? <div className="form-group row">
			    <div className="group mb-3">
				    <div className="input-group-prepend">
				      <span className="input-group-withdraw" width={5}><img src={hydro} className="hydro-logo"  alt="Hydro logo" width={20}/></span>
				      <input className="contributeInput" type="number" min="0"  autoComplete="off" onChange={this.contributionChange}/>
            </div>
              <label className="contributeLabel mt-2">How much do you want to contribute?</label>
			    </div>
          </div> : <p>This Charity is close & You are not registered.</p>}

          <button className="txDisabled"> Contribute </button> 
          </div>}
          
      <div className={drawerContributeOpen} onClick={this.toggleContributeHandler}>
         {arrowContribute}
      </div>
      <div className={drawerGoBack} onClick={this.props.subPageMenu}>
      <p>Go Back</p>
      </div>

            <div className="doughtnutWrapper" style={{width: '100%',textAlign:'center'}}>
             <Doughnut data={this.genderChart} 
    						options={{
                  responsive:true,
							  maintainAspectRatio:false,
							  cutoutPercentage: 62, 
        					title:{
       						display: true,
        					position:"bottom",
       						text: '',
        					fontSize: 1,
        					lineHeight:-2.5,
        					padding:1.6,
							    fontColor:'white',   
							    }, 
							  legend: {
							  	display:false,
								  labels: {
									fontColor: 'white',
									fontSize:11	
								},
							  tooltips: {
           				enabled: true
        					},
							  }
    					}}/> 
                        </div>
      <div className = "donationFunded"> <img src={hydro} className="mb-1 mr-2"  border={1} alt="Hydro logo" width={20}/>
      Funded: {numeral(this.state.currentBalance).format('0,00')}/{numeral(this.state.charityGoal).format('0,00')}
      </div>

      <div className = "donationFunded"><Deadline deadline={this.state.deadline} unixTime={this.state.unixTime} charityStatus={this.state.charityStatus}/>
      </div>

        </div>
		);
	}
}