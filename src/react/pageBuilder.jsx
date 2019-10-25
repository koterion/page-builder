import React from 'react'
import Body from './containers/body'
import Menu from './containers/menu'
import Editor from './containers/editor'

class PageBuilder extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      rows: 1
    }
  }

  addRow () {
    this.setState({
      rows: this.state.rows + 1
    })
  }

  render () {
    return (
      <div className='pgBld'>
        <Body rows={this.state.rows} />
        <Menu addRow={this.addRow.bind(this)} />
        <Editor />
      </div>
    )
  }
}

export default PageBuilder
