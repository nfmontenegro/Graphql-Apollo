import React, {useState} from 'react'
import {compose} from 'recompose'
import {withRouter} from 'react-router-dom'
import {Avatar, Layout, List, Row, Col, Button} from 'antd'
import {Query, Mutation} from 'react-apollo'

import {LIST_PUBLICATIONS, REMOVE_PUBLICATION} from '../../queries'
import withUser from '../../HOC/withUser'
import DeleteMutation from '../Form/DeleteMutation'

import {
  AlertMessage,
  ContentCardPublications,
  CenterContent
} from '../../styled/'

const {Content} = Layout

function onLoadMore(fetchMore, listPublications, setLoadMore) {
  return fetchMore({
    variables: {
      offset: listPublications.length
    },

    updateQuery: (prev, {fetchMoreResult}) => {
      if (!fetchMoreResult) return prev
      if (fetchMoreResult.listPublications.length === 0) setLoadMore(false)
      return {
        prev,
        ...{
          listPublications: [
            ...prev.listPublications,
            ...fetchMoreResult.listPublications
          ]
        }
      }
    }
  })
}

function renderFetchmore(fetchMore, {listPublications}, setLoadMore) {
  return (
    <CenterContent>
      <Button
        onClick={() => onLoadMore(fetchMore, listPublications, setLoadMore)}
      >
        Fetch More
      </Button>
    </CenterContent>
  )
}

function ListPublication({user, history}) {
  const [loadMore, setLoadMore] = useState(true)

  return (
    <Query query={LIST_PUBLICATIONS} variables={{limit: 5, offset: 0}}>
      {({data, loading, fetchMore}) => {
        if (loading) return null
        return (
          <ContentCardPublications>
            <Content>
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
                            <Col span={3}>
                              <Button
                                type="primary"
                                onClick={() =>
                                  history.push(
                                    `/publications/${publication._id}`
                                  )
                                }
                              >
                                Update
                              </Button>
                            </Col>
                            <Col span={5}>
                              <Mutation
                                mutation={REMOVE_PUBLICATION}
                                refetchQueries={() => [
                                  {
                                    query: LIST_PUBLICATIONS,
                                    variables: {
                                      limit: 5,
                                      offset: 0
                                    }
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
              {loadMore && renderFetchmore(fetchMore, data, setLoadMore)}
              {!loadMore && <AlertMessage>No more publications..</AlertMessage>}
            </Content>
          </ContentCardPublications>
        )
      }}
    </Query>
  )
}

export default compose(
  withRouter,
  withUser
)(ListPublication)
