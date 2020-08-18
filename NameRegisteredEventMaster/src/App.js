
import React, { Component } from 'react';
import './App.css';
// import in3-Module
import In3Client from 'in3'


class App extends Component {
  constructor() {
    super()

    // use the In3Client configured without proof
    this.in3 = new In3Client({
      proof: 'none',
      signatureCount: 1,
      requestCount: 2,
      chainId: 'mainnet' //connection with the mainnet, incube
    })
    //Address ENS in mainnet
    this.ADDRESS = "0xf0ad5cad05e10572efceb849f6ff0c68f9700455"
    //ABI ENS in mainnet for obtain instance for the contract.
    this.contrato = this.in3.eth.contractAt([{ "constant": true, "inputs": [{ "name": "interfaceID", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "pure", "type": "function" }, { "constant": false, "inputs": [], "name": "withdraw", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_prices", "type": "address" }], "name": "setPriceOracle", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "renounceOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_minCommitmentAge", "type": "uint256" }, { "name": "_maxCommitmentAge", "type": "uint256" }], "name": "setCommitmentAges", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "bytes32" }], "name": "commitments", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "name", "type": "string" }, { "name": "duration", "type": "uint256" }], "name": "rentPrice", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "name", "type": "string" }, { "name": "owner", "type": "address" }, { "name": "duration", "type": "uint256" }, { "name": "secret", "type": "bytes32" }], "name": "register", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "MIN_REGISTRATION_DURATION", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "minCommitmentAge", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "isOwner", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "name", "type": "string" }], "name": "valid", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "name", "type": "string" }, { "name": "duration", "type": "uint256" }], "name": "renew", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [{ "name": "name", "type": "string" }], "name": "available", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "maxCommitmentAge", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "commitment", "type": "bytes32" }], "name": "commit", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "name", "type": "string" }, { "name": "owner", "type": "address" }, { "name": "secret", "type": "bytes32" }], "name": "makeCommitment", "outputs": [{ "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "pure", "type": "function" }, { "inputs": [{ "name": "_base", "type": "address" }, { "name": "_prices", "type": "address" }, { "name": "_minCommitmentAge", "type": "uint256" }, { "name": "_maxCommitmentAge", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "name", "type": "string" }, { "indexed": true, "name": "label", "type": "bytes32" }, { "indexed": true, "name": "owner", "type": "address" }, { "indexed": false, "name": "cost", "type": "uint256" }, { "indexed": false, "name": "expires", "type": "uint256" }], "name": "NameRegistered", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "name", "type": "string" }, { "indexed": true, "name": "label", "type": "bytes32" }, { "indexed": false, "name": "cost", "type": "uint256" }, { "indexed": false, "name": "expires", "type": "uint256" }], "name": "NameRenewed", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "oracle", "type": "address" }], "name": "NewPriceOracle", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "previousOwner", "type": "address" }, { "indexed": true, "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }], this.ADDRESS)

    this.state = {
      nameRegisteredResult: [], //array nameRegistered last 1 or 2 days
      filterDay: 0,
    };

    this.changeDate = this.changeDate.bind(this);


  }
  //Event for select 1 or 2 days in the past
  changeDate(event) {
    this.setState({ filterDay: event.target.value });
  }

  //This function obtain the actual block and after this obtain Logs for the NameRegistered Event in ENS 
  showNameRegisteredEvents = async () => {
    let actualBlock;
    let nameresult = [];
    const AVERAGEBYDAY = 6433; //Average to block by day

    //Get the current block number.
    await this.in3.eth.getBlockByNumber('latest', false).then(value => {
      actualBlock = value.number;
    });
    //This function in in3 is similar to getPastEvent in web3 and with this obtain information about the event in a range.
    await this.contrato.events.NameRegistered.getLogs({ fromBlock: actualBlock - (AVERAGEBYDAY * this.state.filterDay), toBlock: "latest" }).then(events => {
      nameresult = events;  //store log event in local variable
    });
    //Update State variable
    this.setState({ nameRegisteredResult: nameresult });
  }

  //In this function using information from Logns and create UI React in a select option and table
  render() {
    return (
      <div className="App">
        <h1>This programming task display the last name registered in the ENS</h1>
        <div className="box">
          <select onChange={this.changeDate}>
            <option value="0" defaultValue>Select days ago</option>
            <option value="1">Last Day ago</option>
            <option value="2">Last 2 days ago</option>
          </select>
        </div>
        <div className="AppStart">
          <button className="button" onClick={this.showNameRegisteredEvents}>Display Names Registered Events</button>
        </div>

        <br></br>
        <br></br>
        <table id="ENS-Names" className="center">
          <thead>
            <tr>
              <th>Name ENS</th>
              <th scope="col">Label</th>
              <th scope="col">Owner</th>
            </tr>
          </thead>
          <tbody>{this.state.nameRegisteredResult.map((event, i) =>
            <tr key={i}>
              <td className="bolding">{event.name}</td>
              <td>{event.label}</td>
              <td>{event.owner}</td>
            </tr>
          )}</tbody>
        </table>
      </div>

    );
  }
}


export default App;
