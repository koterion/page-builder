import React from 'react'
import Row from '../components/row'

export default class Body extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      editing: false
    }
  }

  edit () {
    this.setState({
      editing: true
    })
  }

  render () {
    const rows = []

    for (let i = 0; i < this.props.rows; i++) {
      rows.push(<Row key={i} edit={this.edit.bind(this)} />)
    }

    let className = 'pgBld-body'

    if (this.state.editing) {
      className += ' editing'
    }

    return (
      <div className={className}>
        {rows.length > 0 &&
          rows}
      </div>
    )
  }
}
