import * as React from 'react'
import { CollapsibleTitle } from '../common/CollapsibleTitle'

@CollapsibleTitle({ title: 'Participants', icon: 'user' })
export class UserList extends React.Component<{}, void> {
  render () {
    return (
      <div className='ss-user-list'>
        <h2>User List</h2>
      </div>
    )
  }
}
