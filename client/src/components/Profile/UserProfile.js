import React from 'react'
import {Card, Col, Icon, Avatar, Row} from 'antd'

const {Meta} = Card

function UserProfile({history, user}) {
  return (
    <React.Fragment>
      <Row style={{marginTop: '70px'}}>
        <Col span={7} offset={8}>
          <Card
            style={{width: 500}}
            actions={[
              <Icon
                type="edit"
                onClick={() => history.push(`/profile/user/${user._id}`)}
              />
            ]}
          >
            <Meta
              avatar={<Avatar src={user.imageUrl} />}
              title={`${user.name} ${user.lastname}`}
            />
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
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default UserProfile
