import * as React from 'react'
import { Link } from 'react-router-dom'

export default class Header extends React.Component {
  public render() {
    return (
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/lounge">Lounge</Link>
            </li>
          </ul>
        </nav>
      </header>
    )
  }
}
