import React from 'react'
import Button from '../button'

export default class RowMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      menu: false
    }
  }

  toggleMenu () {
    this.setState({
      menu: true
    })
  }

  render () {
    return (
      <div className='pgBld-row-menu'>
        <div className='pgBld-row-menu-block'>
          <Button
            className='pgBld-row-menu-edit'
            title='Edit row style'
            role='editRow'
            icon='edit'
            text='Edit'
          />
          <Button
            className='pgBld-row-menu-column'
            title='Add column'
            role='addCol'
            icon='playlist_add'
            text='Add column'
          />
          <Button
            className='pgBld-row-menu-delete'
            title='Remove this row'
            role='delRow'
            icon='delete_forever'
            text='Remove'
          />
        </div>
        <Button
          className='pgBld-row-menu-settings'
          title='Settings for row'
          role='settingRow'
          icon='settings_applications'
          text='Settings'
          onClick={this.props.change}
        />
      </div>
    )
  }
}
