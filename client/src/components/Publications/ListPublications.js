import React from 'react'
import {List, Avatar, Spin, Layout} from 'antd'
import {Query} from 'react-apollo'

import {LIST_PUBLICATIONS} from '../../queries'

const {Content} = Layout

function ListPublication() {
  return (
    <Query query={LIST_PUBLICATIONS}>
      {({loading, error, data}) => {
        if (loading) return <Spin />
        if (error) return error
        return (
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
                        src={publication.user.imageUrl}
                      />
                    }
                  >
                    <p>
                      Posted By:{' '}
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
                  </List.Item>
                )
              }}
            />
          </Content>
        )
      }}
    </Query>
  )
}

export default ListPublication
