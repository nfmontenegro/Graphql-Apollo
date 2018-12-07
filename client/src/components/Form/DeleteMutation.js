import React, {useState} from 'react'
import {Button, Modal, message} from 'antd'

function DeleteMutation({_id, mutation}) {
  const [visible, setVisible] = useState(false)

  const onSubmit = async () => {
    await mutation({variables: {_id}})
    message.success('Successful removed')
    setVisible(false)
    return null
  }

  return (
    <React.Fragment>
      <Button type="danger" onClick={() => setVisible(true)}>
        Delete
      </Button>
      <Modal
        title="Delete Item"
        visible={visible}
        onOk={() => onSubmit()}
        onCancel={() => setVisible(false)}
      >
        <p>Are sure you want delete this item?</p>
      </Modal>
    </React.Fragment>
  )
}

export default DeleteMutation
