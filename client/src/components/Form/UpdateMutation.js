import React, {useState} from 'react'
import {Button, Form, Icon, Input, message, Upload, Spin} from 'antd'
import {deleteImage, uploadImage} from '../../services/aws'

const FormItem = Form.Item

function UpdateMutation({data, mutation, router}) {
  const [loading, setLoading] = useState(false)
  const [form, setValues] = useState({...data})
  const fields = Object.keys(data).map(field => field)

  const onChange = event => {
    setValues({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const onSubmit = async event => {
    event.preventDefault()
    setLoading(true)

    let paramsUploadImage
    if (form.inputFile) {
      if (form.file) {
        //transform to service
        const paramsDeleteImage = {
          Bucket: process.env.REACT_APP_AWS_BUCKET,
          Delete: {
            Objects: [
              {
                Key: form.file
              }
            ]
          }
        }

        await deleteImage(paramsDeleteImage)

        paramsUploadImage = {
          Body: form.inputFile,
          Bucket: process.env.REACT_APP_AWS_BUCKET,
          Key: `${new Date().getTime()}_${form._id}`,
          ContentType: form.inputFile.type
        }

        setValues({
          ...form,
          imageUrl: `https://${
            process.env.REACT_APP_AWS_BUCKET
          }.s3.amazonaws.com/${paramsUploadImage.Key}`
        })

        await uploadImage(paramsUploadImage)
      }
    }

    setValues({
      file: paramsUploadImage ? paramsUploadImage.Key : ''
    })

    console.log('Form:', form)
    await mutation({
      variables: form
    })

    message
      .success('Successful update!')
      .then(() => router.push('/profile'))
      .catch(err => console.log(err))
  }

  const beforeUpload = inputFile => {
    setValues({
      ...form,
      inputFile
    })
    return false
  }

  const onRemove = () => {
    setValues({
      ...form,
      inputFile: ''
    })
  }

  return (
    <Form onSubmit={event => onSubmit(event, mutation)}>
      {fields
        .filter(data => data !== 'file' && data !== '_id')
        .map((field, index) => (
          <FormItem key={index}>
            {field.includes('image') ? (
              <Upload
                name="inputFile"
                listType="picture"
                beforeUpload={beforeUpload}
                onRemove={onRemove}
              >
                <Button>
                  <Icon type="upload" /> Click to upload
                </Button>
              </Upload>
            ) : (
              <Input
                type="text"
                value={form[field]}
                name={field}
                onChange={onChange}
              />
            )}
          </FormItem>
        ))}
      <FormItem>
        <Button
          style={{width: '100%'}}
          disabled={loading}
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          {loading ? <Spin /> : 'Update'}
        </Button>
      </FormItem>
    </Form>
  )
}

export default UpdateMutation
