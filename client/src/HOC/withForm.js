import React from 'react'

function FormHoc(WrappedComponent) {
  return class Form extends React.Component {
    state = {}

    onChange = event => {
      event.preventDefault()
      this.setState({
        fields: {
          [event.target.name]: event.target.value
        }
      })
    }

    render() {
      return <WrappedComponent onChange={this.onChange} state={this.state} />
    }
  }
}

export default FormHoc
