import React from 'react'
import withForm from '../HOC/withForm'

class RegisterForm2 extends React.Component {
  render() {
    console.log('This.props', this.props)
    return (
      <div>
        <input type="email" name="email" onChange={this.props.onChange} />
      </div>
    )
  }
}

const EnhancedComponent = withForm(RegisterForm2)

export default EnhancedComponent
