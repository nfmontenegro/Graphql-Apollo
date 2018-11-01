import React, {Suspense} from 'react'
import {compose} from 'recompose'
import {Avatar, Layout, List, Spin, Button, Row, Col} from 'antd'
import {Query} from 'react-apollo'

import {LIST_PUBLICATIONS} from '../../queries'
import withUser from '../../HOC/withUser'

const {Content} = Layout

function ListPublication({user}) {
  return (
    <Query query={LIST_PUBLICATIONS}>
      {({error, data}) => {
        if (error) return error
        return (
          <Suspense fallback={<Spin />}>
            <Content style={{padding: '50px 350px 50px 350px'}}>
              <List
                itemLayout="vertical"
                size="large"
                dataSource={data.listPublications}
                renderItem={publication => {
                  return (
                    <List.Item
                      key={publication._id}
                      extra={
                        <img
                          width={250}
                          height={200}
                          alt="logo"
                          src={publication.imageUrl}
                        />
                      }
                    >
                      <p>
                        By:{' '}
                        <Avatar
                          size={30}
                          shape="circle"
                          style={{marginRight: '5px'}}
                          src={publication.user.imageUrl}
                        />
                        {publication.user.nickname} {publication.formatDate}
                      </p>
                      <List.Item.Meta title={publication.title} />
                      {publication.description}
                      {publication.content}
                      <React.Fragment>
                        {user && (
                          <Row
                            type="flex"
                            justify="start"
                            style={{marginTop: '25px'}}
                          >
                            <Col span={5}>
                              <Button type="primary">Update</Button>
                            </Col>
                            <Col span={4}>
                              <Button type="danger">Delete</Button>
                            </Col>
                          </Row>
                        )}
                      </React.Fragment>
                    </List.Item>
                  )
                }}
              />
            </Content>
          </Suspense>
        )
      }}
    </Query>
  )
}

export default compose(withUser)(ListPublication)
