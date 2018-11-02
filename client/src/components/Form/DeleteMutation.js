import React, {useState} from 'react'
import {Button, Modal, message} from 'antd'

function DeleteMutation({_id, mutation}) {
  const [visible, setVisible] = useState(false)

  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const clickMutation = async () => {
    await mutation({variables: {_id}})
    message.success('Successful removed')
    return null
  }

  return (
    <React.Fragment>
      <Button type="danger" onClick={() => showModal()}>
        Delete
      </Button>
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={() => clickMutation()}
        onCancel={() => handleCancel()}
      >
        <p>Are you sure want delete?</p>
      </Modal>
    </React.Fragment>
  )
}

export default DeleteMutation
