import React, { Component } from 'react'
import { connect } from 'react-redux'

import Location from './Location'

const mapStateToProps = state => ({
  locations: state.Locations
})

const mapDispatchToProps = dispatch => ({

})

class Pane extends Component {
  render() {
    return (
      <div>
        {
          // this.props.locations.map(location =>
          //   <Location {...location} key={location.id} />
          // )
        }

        <Location {...this.props.locations[0]} />
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pane)
