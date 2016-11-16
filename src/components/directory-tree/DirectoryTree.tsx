import * as React from 'react'
import { SidebarPane } from '../common/SidebarPane'
import './DirectoryTree.scss'

export class DirectoryTree extends React.Component<{}, any> {
  render () {
    return (
      <SidebarPane title='File Explorer' icon='folder-close'>
        <div className='ss-directory-tree'>
          <h2>File Explorer</h2>
        </div>
      </SidebarPane>
    )
  }
}
