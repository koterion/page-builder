import React from 'react'
import Button from '../button'

export default class RowSettings extends React.Component {
  render () {
    return (
      <div className='pgBld-row-menu'>
        <Button
          className='pgBld-row-menu-settings'
          title='Settings for row'
          role='settingRow'
          icon='settings_applications'
          text='Settings'
        />
      </div>
    )
  }
}
