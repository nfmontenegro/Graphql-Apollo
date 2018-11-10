import React from 'react'
import {compose} from 'recompose'
import {Route, withRouter} from 'react-router-dom'

import Publications from '../components/Publications/Publications'
import Publication from '../components/Publications/Publication'

function PublicationContainer(props) {
  return (
    <React.Fragment>
      <Route
        exact
        path="/publications"
        render={() => <Publications {...props} />}
      />
      <Route
        path="/publications/:id"
        render={router => (
          <Publication {...props} params={router.match.params.id} />
        )}
      />
    </React.Fragment>
  )
}

export default compose(withRouter)(PublicationContainer)
