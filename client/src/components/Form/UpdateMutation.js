import React, {useState} from 'react'
import {Button, Form, Icon, Input, message, Upload, Spin} from 'antd'
import {deleteImage, uploadImage} from '../../services/aws'

const FormItem = Form.Item

function UpdateMutation({data, mutation, router}) {
  const [loading, setLoading] = useState(false)
  const [form, setValues] = useState(data)
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
    if (form.file) {
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
    }

    if (form.inputFile) {
      paramsUploadImage = {
        Body: form.inputFile,
        Bucket: process.env.REACT_APP_AWS_BUCKET,
        Key: `${new Date().getTime()}_${form._id}`,
        ContentType: form.inputFile.type
      }

      await uploadImage(paramsUploadImage)
    }

    await mutation({
      variables: {
        ...form,
        file: paramsUploadImage ? paramsUploadImage.Key : data.file,
        imageUrl: paramsUploadImage
          ? `https://${process.env.REACT_APP_AWS_BUCKET}.s3.amazonaws.com/${
              paramsUploadImage.Key
            }`
          : data.imageUrl
      }
    })

    message
      .success('Successful update!')
      .then(() => {
        if (router) router.push('/profile')
        setLoading(false)
      })
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
    <Form onSubmit={onSubmit}>
      {fields
        .filter(
          data =>
            data !== 'file' &&
            data !== '_id' &&
            data !== 'userId' &&
            data !== '__typename'
        )
        .map((field, index) => (
          <FormItem
            key={index}
            label={field.charAt(0).toUpperCase() + field.slice(1)}
          >
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
