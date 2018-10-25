import AWS from 'aws-sdk'

AWS.config.region = process.env.REACT_APP_AWS_REGION
AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_ACCESS_KEY_ID
})

async function uploadImage(options) {
  console.log('Uploading image...')
  const s3 = new AWS.S3({signatureVersion: 'v4'})

  return new Promise((resolve, reject) => {
    s3.putObject(options, (err, data) => {
      if (err) return reject(err)

      console.log('Image uploaded...')
      return resolve(data)
    })
  })
}

async function deleteImage(options) {
  console.log('Find image...')
  const s3 = new AWS.S3({signatureVersion: 'v4'})

  return new Promise((resolve, reject) => {
    s3.deleteObjects(options, (err, data) => {
      if (err) return reject(err)

      console.log('Image deleted...')
      resolve(data)
    })
  })
}

export {uploadImage, deleteImage}
