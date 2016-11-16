import * as React from 'react'
import { SidebarPane } from '../common/SidebarPane'

export class UserList extends React.Component<{}, any> {
  render () {
    return (
      <SidebarPane title='Participants' icon='user'>
        <div className='ss-user-list'>
          <h2>User List</h2>
        </div>
      </SidebarPane>
    )
  }
}
