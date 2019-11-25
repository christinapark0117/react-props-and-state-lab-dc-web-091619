import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: 'all'
        // filters holding the type because it has to communicate to the PetBrowser
      }
    }
  }

  onChangeType = (event) => {
    //arrow functions are important because they allow to use 'this' keyword
    //with every call back function, console.log and check to see if it works
    //this function needs to change this.state.filters.type
    //check to see what the event is by putting in a debugger
    // console.log('changing type...');

    this.setState({
      filters: {
        //...this.state.filters, type: event.target.value
        //can use the spread operator if there are multiple states
        //and if the state is disappearing every time one of the states get updated
        type: event.target.value
      }
    })
    //setState updates the state so whatever animal is selected by the filters
    //event.target.value will recognize the value of that filter and render the animal selected
    //check to see if the code works by opening ReactDevTool and changing the filter
    //and see if the default value all is changing to whatever value that is selected
  };

  onFindPetsClick = () => {
    //a fetch call to get pets
    // console.log('on find pets click...')

    let url = '/api/pets';

    // if (this.state.filters.type === 'all') {
    //   null
    // } else {
    //   url = `${url}?type=${this.state.filters.type}`
    // }

    this.state.filters.type === 'all' ? null : url = `${url}?type=${this.state.filters.type}`

    fetch(url)
      .then(response => response.json())
      .then(petsData => this.setState({
        pets: petsData //[...this.state.pets, ...petsData]
        //when adding to an array with something already in it use spread operator without removing what's in it
        //the reason why petsData is spread operator is because it is also returning an array
        //if it was one pet it would not be a spread operator
      }))
      //need to pass the fetch on to the child as props
      //in this case it will be the PetBrowser because that's where the array of pets will be rendered
  };

  onAdoptPet = (id) => {
    // console.log('on adopting pet...',id);
    //need to iterate through this.state.pets and find the specific pet
    //and change its isAdopted status to true, and update state
    //map over this.state.pets
    let updatedPets = this.state.pets.map( pet => {
      if (id === pet.id){
        return {...pet, isAdopted: true}
      } else {
        return pet
      }
    });
    //need to update pet's isAdopted
    this.setState({
      pets: updatedPets
    })
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
              {/*calling on the onChangeType call back function as a prop
              to update app's state.filters.type*/}
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet} petsData={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
