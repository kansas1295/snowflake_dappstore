import React, { Component } from 'react';
import Web3 from 'web3';
import './Charity-style.css';
import CharityFactoryABI from './ABI/CharityFactoryABI';
import CharityInstance from './CharityInstance';
import CharityCards from './SubPageCharityFactory/CharityCards';
import CreateCharity from './SubPageCharityFactory/CreateCharity';

import JwPagination from 'jw-react-pagination';

/*Style of Pagination*/
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
/*End of style of Pagination*/

export default class CharityFactory extends Component {


	constructor(props) {
        super(props)
			this.state = {
            charityFactory:[],
            charityAddress:[],
            latestCharity:[],
            account:[],
            loading:true,
            page:1,
            subPage:1,
            address:null,
            blockNumber:'',
            ein:null,
            pageOfItems:[],    
        }
       this.onChangePage = this.onChangePage.bind(this);
	}


	componentDidMount(){
	  this._isMounted = true;
      this.loadBlockchain();
    }
    
    /*Load Charity Factory Contract*/
    async loadBlockchain(){
        this.setState({loading:true})
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
        this.setState({blockNumber:blockNumber});
        }
        if (this._isMounted){
        this.setState({account: accounts[0]}); 
        }
        
        const charityFactory = new web3.eth.Contract(CharityFactoryABI,'0x0d96af51ec52e74056ce68ac820a4e3896068381');
        if (this._isMounted){
            this.setState({charityFactory:charityFactory});
        }

        const charityAddress = await charityFactory.methods.returnAllCharities().call()
        if (this._isMounted){
           this.setState({charityAddress:charityAddress},()=>console.log())
           this.setState({latestCharity:this.state.charityAddress.slice().reverse()})
        }

        charityFactory.events.newCharityCreated({fromBlock:'latest', toBlock:'latest'})
        .on('data',async(log) => {  
        const incomingCharityAddress = await charityFactory.methods.returnAllCharities().call()
        
               this.setState({charityAddress:incomingCharityAddress},()=>console.log())
               this.setState({latestCharity:this.state.charityAddress.slice().reverse()})
        })
        this.setState({loading:false})
        }
        /*END OF LOADING CHARITY FACTORY CONTRACT*/

    
    /*PAGINATION*/
    onChangePage(pageOfItems) {
        this.setState({loading:false})
        this.setState({ pageOfItems,loading:true});
        setTimeout(()=>this.setState({loading:false}),700)
	}
    

    /*NAVIGATE FACTORY PAGE*/
    factoryPage=()=>{
        this.loadBlockchain()
        this.setState({page:1,subPage:1},()=>console.log())
    }

    createCharityPage=()=>{
        this.setState({page:1,subPage:2},()=>console.log())
    }

    charityInstancePage=()=>{
        this.setState({page:2,subPage:1},()=>console.log())
    }
    /*END OF NAVIGATE FACTORY PAGE*/
    

    /*NAVIGATE CHARITY PAGE*/
    subPageMenu=()=>{
        this.setState({subPage:1},()=>console.log())
    }


    subPageRegistration=()=>{
        this.setState({subPage:2},()=>console.log())
    }

    subPageContribute=()=>{
        this.setState({subPage:3},()=>console.log())
    }

    subPageProfile=()=>{
        this.setState({subPage:4},()=>console.log())
    }

    subPageAdmin=()=>{
        this.setState({subPage:5},()=>console.log())
    }

    subPageOverview=()=>{
        this.setState({subPage:6},()=>console.log())
    }
    /*END OF NAVIGATE CHARITY PAGE*/

    /*Sets the charity contract addres to load*/
    setPage=(contractAddress,ein)=>{
    if(contractAddress !== null && ein !== null){
    this.setState({address:contractAddress,ein:ein},()=>this.charityInstancePage());
    }
    }


  render() {
    /*Hides pagination when the page is not charity page*/
    let custom = '';
    if (this.state.loading || this.state.page === 1 && this.state.subPage === 2 || this.state.page === 2){
        custom = 'hidden';
    }
    
    return (

            <div style={{width: '100%',textAlign:'center'}} >    
            <div className="Charity-background">
       
            {this.state.page === 1 && <ul className="charityFactory-navbar align-items-center" style={{alignItems:'center'}}>
            <li className="nav-item" onClick={()=>this.factoryPage()}> Charities </li>
            <li className="nav-item ml-5" onClick={()=>this.createCharityPage()}> Create Charity</li>
            </ul>}

            {this.state.loading && <div style={{width: '100%',textAlign:'center'}} >
                <div className="spinner"/></div> } 

            {this.state.page === 1 && this.state.subPage === 1 && !this.state.loading && <div className="rows">
                 {this.state.pageOfItems.map((contract,index)=>(
                    <div className="columns"onClick={()=>this.setPage(contract,this.state.subPage)} key = {index}>
                        <CharityCards key = {index} charityAddress = {contract} />
                    </div>))}
                    </div>}

            {this.state.page === 1 && this.state.subPage === 2 && !this.state.loading && <CreateCharity account={this.state.account}/>}
        
            {this.state.page === 2 &&<CharityInstance 
                ein = {this.props.ein}
                goToFactory = {this.factoryPage}
                subPageMenu = {this.subPageMenu}
                subPageContribute = {this.subPageContribute}
                subPageRegistration = {this.subPageRegistration}
                subPageProfile = {this.subPageProfile}
                subPageAdmin = {this.subPageAdmin}
                subPageOverview = {this.subPageOverview}
                subPage = {this.state.subPage}
                Address = {this.state.address}
                account={this.state.account}/>
               }

            <div className={custom}>  <JwPagination items={this.state.latestCharity} onChangePage={this.onChangePage} maxPages={5} pageSize={4} styles={customStyles} /></div>
      
             </div>
            </div>
		);
	}
}