/* eslint-disable */

import React, { Component } from 'react';
import Web3 from 'web3';
import './style.css';
import clientRaindrop from '../../../services/contracts/clientRaindrop';
import FactoryAbi from './FactoryAbi';
import ElectionInstance from './ElectionInstance';
import NewElection from './NewElection';
import ElectionCards from './ElectionCards';
import JwPagination from 'jw-react-pagination';


const customStyles = {
    ul: {
        border:'rgb(10, 53, 88)',
        background:'rgb(10, 53, 88)',
        
    },
    li: {
        border:'rgb(10, 53, 88)',
        background:'rgb(10, 53, 88)'
       
    },
    a: {
        color: 'rgb(214, 217, 219)',
        background:'linear-gradient(to bottom,#083863,rgb(0, 0, 5))',
		
	},
	
};


export default class ElectionFactory extends Component {


	constructor(props) {
        super(props)
			this.state = {
            electionFactory:'',
            electionContracts:[],
            raindrop:'',
            loading:true,
            page:1,
            subPage:1,
            set:[],
            address:null,
            id:null,
            ein:null,
            pageOfItems:[],
            
            
        }
       this.onChangePage = this.onChangePage.bind(this);
	}


	componentDidMount(){
	  this._isMounted = true;
      this.loadBlockchain();
	}

    async loadBlockchain(){
        
    
        const ApiKey='ZPRBBU2E6Z4QMEXPI7BWMCMVK7I6XZ6ZXE';
        const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));  
        var version = web3.version.api;
        fetch('https://api-rinkeby.etherscan.io/api?module=contract&action=getsourcecode&address=0x351dCAbdfCae2360682a69Fe7296687E13d6a460&apikey='+ApiKey)
        .then(res =>res.json())
        .then((data)=>{
            console.log()
        })

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
        const electionFactory = new web3.eth.Contract(FactoryAbi,'0x313Dc90c151BBE031f77D561366904be35139277');
        if (this._isMounted){
            this.setState({electionFactory:electionFactory});
        }
       
        
        electionFactory.getPastEvents("newElectionCreated",{fromBlock: 0, toBlock:this.state.blockNumber})
        .then(events=>{
            var newest = events;
            var newsort= newest.concat().sort((a,b)=> b.blockNumber- a.blockNumber);
 
            if (this._isMounted){
            this.setState({electionContracts:newsort,loading:false},()=>console.log());}
            })
            .catch((err)=>console.error(err))


        electionFactory.events.newElectionCreated({fromBlock:'latest', toBlock:'latest'})
        .on('data',(log) =>setTimeout(()=> {  

        this.setState({electionContracts:[...this.state.electionContracts,log]},()=>console.log())    
        var newest = this.state.electionContracts;
        var newsort= newest.concat().sort((a,b)=> b.blockNumber- a.blockNumber);    
        this.setState({electionContracts:newsort});      
        },7000))

        }
    /*Pginate Election Cards in 6 items*/    
    onChangePage(pageOfItems) {
        this.setState({loading:false})
        this.setState({ pageOfItems,loading:true});
        setTimeout(()=>this.setState({loading:false}),1000)
	}
    

    /*NAVIGATE Factory Page*/
    factoryPage=()=>{
        this.setState({page:1,subPage:1},()=>console.log())
    }

    pollPage=()=>{
        this.setState({page:2,subPage:1},()=>console.log())
    }

    /*NAVIGATE Between Factory Page & Election Page*/
    electionList=()=>{
        this.setState({subPage:1},()=>console.log())
    }


    createElectionPage=()=>{
        this.setState({subPage:2},()=>console.log())
    }


    /*NAVIGATE Election Page*/
    subPageRegistration=()=>{
        this.setState({subPage:1},()=>console.log())
    }


    subPageVerification=()=>{
        this.setState({subPage:2},()=>console.log())
    }

    subPageVoting=()=>{
        this.setState({subPage:3},()=>console.log())
    }

    subPageProfile=()=>{
        this.setState({subPage:4},()=>console.log())
    }


    /*Sets the Election Contract according to what user selected*/
    setPage=(address,id,ein,subPage)=>{
    if(address !== null && id !== null & ein !== null){
    this.setState({address:address,id:id,ein:ein},()=>this.pollPage());
    }
    }


  render() {

    let custom = '';

    if (this.state.loading || this.state.page === 1 && this.state.subPage === 2 || this.state.page === 2){
        custom = 'hidden';
    }

    let navBar = <ul className="voting-navbar align-items-center" style={{alignItems:'center'}}>
                <li className="nav-item" onClick={this.electionList}>Election</li>
                <li className="nav-item ml-5" onClick={this.createElectionPage}>Create Election</li>
                </ul>
    if(this.state.page === 2){
        navBar = <ul className="voting-navbar align-items-center" style={{alignItems:'center'}}>
        <li className="nav-item" onClick={this.factoryPage}> Factory </li>
         <li className="nav-item ml-5" onClick={this.subPageRegistration}> Register </li>
         <li className="nav-item ml-5" onClick={this.subPageVerification}> Verify </li>
         <li className="nav-item ml-5" onClick={this.subPageVoting}> Vote </li>
         <li className="nav-item ml-5" onClick={this.subPageProfile}> Profile </li>
         </ul>
    }
    

    return (


            <div style={{width: '100%',textAlign:'center'}} >
                 
             
                 <div className="background">
                {navBar}
                
                {this.state.loading && <div style={{width: '100%',textAlign:'center'}} >
                <div className="spinner"/></div> } 


                {this.state.page === 1 && this.state.subPage === 1 && !this.state.loading &&<div className="rows">
                
                {this.state.pageOfItems.map((contracts,index)=>(
                    <div className="columns"onClick={()=>this.setPage(contracts.returnValues._deployedAddress, contracts.returnValues._id, this.props.ein, this.state.subPage)} key = {index} >
                   <ElectionCards key = {index} Address = {contracts.returnValues._deployedAddress} ID={contracts.returnValues._id} ein={this.props.ein} />
                      </div>))}</div>}

                {this.state.page === 1 && this.state.subPage === 2 && <NewElection/>}
                      
                {this.state.page === 2 &&<div><ElectionInstance  Address = {this.state.address} ID={this.state.id} ein={this.state.ein} subPage={this.state.subPage}/></div>}
               
                <div className={custom}>  <JwPagination items={this.state.electionContracts} onChangePage={this.onChangePage} maxPages={5} pageSize={4} styles={customStyles} /></div>
              

              
             </div>
            </div>
		);
	}
}