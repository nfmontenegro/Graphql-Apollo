import React from 'react'
import {Button, Form, Icon, Input, message, Upload} from 'antd'
import AWS from 'aws-sdk'

const FormItem = Form.Item

class EditUserForm extends React.Component {
  state = {
    _id: this.props.user._id,
    name: this.props.user.name,
    lastname: this.props.user.lastname,
    nickname: this.props.user.nickname || '',
    website: this.props.user.website || '',
    phoneNumber: this.props.user.phoneNumber || '',
    imageUrl: this.props.user.imageUrl,
    file: this.props.user.file
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onChangeFile = event => {
    this.setState({
      [event.target.name]: event.target.files[0]
    })
  }

  uploadImage = async (s3, options) => {
    console.log('Uploading image...')
    return new Promise((resolve, reject) => {
      s3.putObject(options, (err, data) => {
        if (err) return reject(err)

        return resolve(data)
      })
    })
  }

  onSubmit = async (event, updateUser) => {
    try {
      event.preventDefault()
      this.setState({loading: true})

      AWS.config.region = 'us-east-1'
      AWS.config.update({
        accessKeyId: 'AKIAIPUHWX7DROFAACPQ',
        secretAccessKey: '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'
      })

      const s3 = new AWS.S3({signatureVersion: 'v4'})
      const options = {
        Body: this.state.file,
        Bucket: 'findpet',
        Key: `${new Date().getTime()}_${this.state._id}`,
        ContentType: this.state.file.type
      }

      await this.uploadImage(s3, options)

      this.setState(
        {
          file: options.Key,
          imageUrl: `https://findpet.s3.amazonaws.com/${options.Key}`
        },
        async () => {
          await updateUser({
            variables: this.state
          })

          console.log('Success uploaded!..')
          message
            .success('User updated!')
            .then(() => this.props.history.push('/profile'))
        }
      )
    } catch (err) {
      console.log('Error:', err)
      return null
    }
  }

  render() {
    const props = {
      beforeUpload: file => {
        this.setState({file})
        return false
      },
      onRemove: () => {
        this.setState(prevState => ({
          ...prevState,
          file: ''
        }))
      }
    }

    return (
      <Form onSubmit={event => this.onSubmit(event, this.props.updateUser)}>
        <FormItem>
          <Input
            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />}
            type="text"
            value={this.state.name}
            name="name"
            onChange={this.onChange}
          />
        </FormItem>
        <FormItem>
          <Input
            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />}
            type="text"
            value={this.state.lastname}
            name="lastname"
            onChange={this.onChange}
          />
        </FormItem>
        <FormItem>
          <Input
            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />}
            type="text"
            value={this.state.nickname}
            name="nickname"
            onChange={this.onChange}
          />
        </FormItem>
        <FormItem>
          <Input
            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />}
            type="text"
            value={this.state.website}
            name="website"
            onChange={this.onChange}
          />
        </FormItem>
        <FormItem>
          <Input
            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />}
            type="text"
            value={this.state.phoneNumber}
            name="phoneNumber"
            onChange={this.onChange}
          />
        </FormItem>
        <FormItem>
          <Upload name="avatar" listType="picture" {...props}>
            <Button>
              <Icon type="upload" /> Click to upload
            </Button>
          </Upload>
        </FormItem>

        <FormItem>
          <Button
            style={{width: '100%'}}
            loading={this.state.loading}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Update
          </Button>
        </FormItem>
      </Form>
    )
  }
}

export default EditUserForm
