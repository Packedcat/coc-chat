import * as React from 'react'
import Header from './header'
import Main from './main'

export default class App extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <Header />
        <Main />
      </React.Fragment>
    )
  }
}
