import * as React from 'react'
import autobind from 'autobind-decorator'

/**
 * components may accept arbitrary props,
 * including primitive values, React elements, or functions.
 */
export interface Props {
  name: string
  title: React.ReactNode
}
export interface State {
  time: Date
  value: string
}

export default class Lounge extends React.Component<Props, State> {
  // assign the initial state
  constructor(props: Props) {
    super(props)
    this.state = { time: new Date(), value: '' }
  }
  @autobind
  handleClick() {
    this.setState({ time: new Date() })
  }
  @autobind
  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ value: event.target.value })
    // event.target.checked
    // event.target.type === 'checkbox'
  }
  handleSubmit(event: React.FormEvent<HTMLInputElement>) {
    event.preventDefault()
  }
  public render() {
    return (
      <div>
        <input value={this.state.value} onChange={this.handleChange} />
        <p onClick={this.handleClick}>{this.state.time.toString()}</p>
        <input type="submit" value="Submit" />
        {/* <p contentEditable={true}>contentEditable</p> */}
        {this.props.title}
        {this.props.children}
      </div>
    )
  }
  /**
   * instantiate the network request
   * set up subscriptions
   */
  componentDidMount() {}
  // unsubscribe
  componentWillUnmount() {}
  // not called for the initial render
  // componentDidUpdate(prevProps, prevState, snapshot) {}
  // shouldComponentUpdate(nextProps, nextState) {}

  /**
   * if the callback function will pass as a prop to lower components,
   * the calback should binding in the constructor
   */
  // render() {
  //   return <button onClick={e => this.handleClick(e)}>Click me</button>
  // }
}
