import React from 'react'
import RowMenu from './row/menu'

export default class Row extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      changing: false
    }
  }

  changing () {
    this.setState({
      changing: true
    })
    this.props.edit()
  }

  render () {
    let className = 'pgBld-row'

    if (this.state.changing) {
      className += ' changing'
    }
    return (
      <div className={className}>
        <RowMenu change={this.changing.bind(this)} />
      </div>
    )
  }
}
