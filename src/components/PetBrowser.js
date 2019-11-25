import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {
  render() {
    return (
      <div className="ui cards">
        {/* receives the petsData from App and maps through the array to render
        each pets */}
        {this.props.petsData.map( pet => {
          return (
            <Pet key={pet.id} pet={pet} onAdoptPet={this.props.onAdoptPet}/>
            // gives a unique key prop
          )
        })
        }
      </div>
      )

  }
}

export default PetBrowser
