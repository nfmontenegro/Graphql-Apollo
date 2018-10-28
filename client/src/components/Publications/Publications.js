import React from 'react'

import CreatePublication from './CreatePublication'

class Publications extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CreatePublication {...this.props} />
      </React.Fragment>
    )
  }
}

export default Publications
