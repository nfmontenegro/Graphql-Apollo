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
          <Content style={{padding: '50px 250px 50px 250px'}}>
            <List
              itemLayout="vertical"
              size="large"
              bordered
              dataSource={data.listPublications}
              renderItem={publication => {
                return (
                  <List.Item
                    key={publication._id}
                    extra={
                      <img
                        width={400}
                        height={200}
                        alt="logo"
                        src={publication.user.imageUrl}
                      />
                    }
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={publication.user.imageUrl} />}
                      title={publication.title}
                      description={publication.description}
                    />
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
