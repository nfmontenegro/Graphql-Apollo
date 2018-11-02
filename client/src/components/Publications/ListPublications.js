import React, {Suspense} from 'react'
import {compose} from 'recompose'
import {Avatar, Layout, List, Spin, Button, Row, Col} from 'antd'
import {Query, Mutation} from 'react-apollo'

import {LIST_PUBLICATIONS, REMOVE_PUBLICATION} from '../../queries'
import withUser from '../../HOC/withUser'
import DeleteMutation from '../Form/DeleteMutation'

const {Content} = Layout

function ListPublication({user}) {
  return (
    <Query query={LIST_PUBLICATIONS}>
      {({error, data}) => {
        if (error) return error
        return (
          <Suspense fallback={<Spin />}>
            <Content style={{padding: '50px 300px 50px 300px'}}>
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
                          src={
                            !publication.imageUrl
                              ? 'https://image.shutterstock.com/image-illustration/404-funny-cats-design-260nw-757415008.jpg'
                              : publication.imageUrl
                          }
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
                      <div>{publication.description}</div>
                      <div>{publication.content}</div>
                      <React.Fragment>
                        {user && (
                          <Row
                            type="flex"
                            justify="start"
                            style={{marginTop: '25px'}}
                          >
                            <Col span={6}>
                              <Button type="primary">Update</Button>
                            </Col>
                            <Col span={5}>
                              <Mutation
                                mutation={REMOVE_PUBLICATION}
                                refetchQueries={() => [
                                  {
                                    query: LIST_PUBLICATIONS
                                  }
                                ]}
                              >
                                {deletePublication => (
                                  <DeleteMutation
                                    _id={publication._id}
                                    mutation={deletePublication}
                                  />
                                )}
                              </Mutation>
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
