import React from 'react'
import {Avatar, Card, Col, Divider, Icon, Row} from 'antd'

const {Meta} = Card

function UserProfile({history, user}) {
  return (
    <React.Fragment>
      <Row style={{marginTop: '70px'}}>
        <Col span={7} offset={8}>
          <Card
            style={{width: 500}}
            actions={[<Icon type="edit" onClick={() => history.push(`/profile/user/${user._id}`)} />]}
          >
            <Row type="flex" justify="center">
              <Meta avatar={<Avatar src={user.imageUrl} size={150} />} />
            </Row>
            <Divider />
            <div style={{marginTop: '30px'}}>
              <p>
                <strong>Name: </strong>
                {user.name}
              </p>
              <p>
                <strong>Last Name: </strong>
                {user.lastname}
              </p>
              <p>
                <strong>Email: </strong>
                {user.email}
              </p>
              <p>
                <strong>Nickname: </strong>
                {user.nickname}
              </p>
              <p>
                <strong>Web Site: </strong>
                {user.website}
              </p>
              <p>
                <strong>Phone Number: </strong>
                {user.phoneNumber}
              </p>
            </div>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default UserProfile
