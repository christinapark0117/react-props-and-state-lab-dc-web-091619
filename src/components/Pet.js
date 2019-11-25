import React from 'react'

class Pet extends React.Component {
  render() {
    const {id, type, gender, name, age, weight, isAdopted} = this.props.pet;
    //instead of doing this.props.pet.name, this.props.pet.weight etc
    //we can destructure it by pulling out what we need
    return (
      <div className="card">
        <div className="content">
          <a className="header">
            {gender === 'female' ? '♀' : '♂'}
            {/* you can only use ternary in JSX*/}
            {name}
          </a>
          <div className="meta">
            <span className="date">{type}</span>
          </div>
          <div className="description">
            <p>Age: {age}</p>
            <p>Weight: {weight}</p>
          </div>
        </div>
        <div className="extra content">
          { isAdopted ? (
            <button className="ui disabled button">Already adopted</button>
          ) : ( <button className="ui primary button" onClick={() => this.props.onAdoptPet(id)}>Adopt pet</button>
          )}
        </div>
      </div>
    )
  }
}

export default Pet
