/* eslint-disable */

import React, { Component } from 'react';


class Deadline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            days:0,
            hours:0,
            minutes:0,
            seconds:0,
            dateNow:0,
        }
        this._isMounted = false;
    }


    componentDidMount(){
        this._isMounted = true;
        if(this._isMounted){
            setInterval(()=>this.getTimeUntil(this.props.deadline),1000)
        }
    }
    
    /*Gets the deadline props from Contribute Component & Converts the timestamp*/
    async getTimeUntil(deadline){
        if (this._isMounted){

        const dateTime = Date.now();
        const dateNow = Math.floor(dateTime / 1000);
        const time = await Date.parse(deadline) - Date.parse(new Date());
        const seconds = await Math.floor((time/1000) %60);
        const minutes = await Math.floor((time/1000/60) %60);
        const hours = await Math.floor(time/(1000*60*60) %24);
        const days = await Math.floor(time/(1000*60*60*24));
        this.setState({days,hours,minutes,seconds,dateNow});
        }
    }
    
    componentWillUnmount(){
        this._isMounted = false;
    }
    
    render() {

    /*Render According to the Status of charity*/
    if (this.props.charityStatus === 1){
        return(           
            <div>Status: Awaiting Approval </div>);
    }
    
    else if (this.props.charityStatus === 3){
        return(           
            <div className>Status: Disabled</div>);
    }

    else { 
        if (isNaN(this.state.seconds))    
            return(           
                <div>Loading...</div>);

        if (this.props.unixTime < this.state.dateNow)
            return(           
                <div>Charity is closed</div>);                                    
        else
            return (
                <div>Time Left: {this.state.days} Days {this.state.hours} hrs {this.state.minutes} min. {this.state.seconds} sec.</div>);
    }
    /*End of dynamic rendering according to the Status of charity*/
    }
}
export default Deadline;