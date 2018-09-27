import * as React from 'react'
import { Switch, Route } from 'react-router-dom'
import Lounge from './lounge'

export default class Main extends React.Component {
  public render() {
    return (
      <main>
        <Switch>
          <Route path="/lounge" component={Lounge} />
        </Switch>
      </main>
    )
  }
}
