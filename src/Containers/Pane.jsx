import React, { Component } from 'react'
import { connect } from 'react-redux'

import Location from './Location'

const mapStateToProps = state => ({
  locations: state.Locations
})

const mapDispatchToProps = dispatch => ({

})

class Pane extends Component {
  state = {
    activeLocationId: 1,
  }

  render() {
    return (
      <div>
        {
          this.props.locations.map(location =>
            <div key={location.id}>
              {
                this.state.activeLocationId === location.id && <Location {...location} />
              }
              <button className={`location-button ${this.state.activeLocationId === location.id ? 'location-button--is-active' : ''}`}
                      style={{ left: 200 * (location.id - 1) }}
                      onClick={() => {
                        this.setState({
                          activeLocationId: location.id,
                        })
                      }}
              >{location.title}</button>
            </div>
          )
        }
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pane)
