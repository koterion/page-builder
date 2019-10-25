import React from 'react'
import Button from '../components/button'

export default class Menu extends React.Component {
  render () {
    return (
      <div className='pgBld-menu'>
        <Button
          className='pgBld-menu-item-add'
          title='Add row'
          icon='playlist_add'
          text='Add Block'
          onClick={this.props.addRow}
        />
      </div>
    )
  }
}
