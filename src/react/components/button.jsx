import React from 'react'
import PropTypes from 'prop-types'

export default class Button extends React.Component {
  render () {
    return (
      <button className={this.props.className} title={this.props.title} onClick={this.props.onClick} type='button' data-role={this.props.role}>
        {this.props.icon &&
          <i className='svg'>
            {this.props.icon}
          </i>}
        {this.props.text &&
          <span>{this.props.text}</span>}
      </button>
    )
  }
}

Button.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.string
}
