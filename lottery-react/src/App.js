import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

//not working with the library but the file that we made
import web3 from './web3';

//get access to our lottery contract on the blockchain
import lottery from './lottery'; 

class App extends Component{
    //constructor(props) {
    //    super(props); 

    //    this.state = {manager :''}; 
    //}
    //replaced by (means the same thing)
    state = {
        manager: '',
        players: [], 
        balance: '',
        value: ''
    }; 

    async componentDidMount() {
        const manager = await lottery.methods.manager().call(); 
        const players = await lottery.methods.getPlayers().call(); 
        const balance = await web3.eth.getBalance(lottery.options.address); 

        ///this.setState({manager:manager}); 
        //we should set our manager with something to start
        this.setState({manager, players, balance}); //use 2015 syntax 
    }
     render() {

      console.log(web3.version); //prints out our current verison of web3
      
      web3.eth.getAccounts() // returns a promise (cant use async/await with a render method of a react component)
      .then(console.log); // chain on the promise with then

      return (
          <div>
            <h2>Lottery Contract</h2>
            <p> This contract is managed by {this.state.manager}.  
                There are currently {this.state.players.length} people entered,
                competing to win {web3.utils.fromWei(this.state.balance,'ether')} ether!
            </p>
            <hr />
            <form>
                <h4> Want to try your luck? </h4>
                <div>
                    <label> Amount of ether to enter</label>
                    <input
                        value={this.state.value}
                        onChange={event => this.setState({ value: event.target.value})}
                    />
                </div>
                <button> Enter </button>
            </form >
          </div>
      );
    }
}

export default App;
