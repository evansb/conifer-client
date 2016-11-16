import * as React from 'react'
import { computed } from 'mobx'
import { observer } from 'mobx-react'
import DevTools from 'mobx-react-devtools'
import { Store } from '../store/Store'
import { Navbar } from '../components/navbar/Navbar'
import { DirectoryTree } from '../components/directory-tree/DirectoryTree'
import { UserList } from '../components/user-list/UserList'
import { LayoutManager } from '../components/layout-manager/LayoutManager'
import './App.scss'

export interface AppProps {
  store: Store
}

@observer
export class App extends React.Component<AppProps, void> {

  @computed get leftStyle () {
    return { width: this.props.store.config.current.layout.left.width }
  }

  @computed get mainStyle () {
    return {
      left: this.isSidebarToggled
        ? this.props.store.config.current.layout.left.width
        : 0
    }
  }

  @computed get isSidebarToggled () {
    return this.props.store.config.current.layout.left.active
  }

  get sidebar() {
    return (
      <div className='ss-left-container' style={this.leftStyle}>
        <DirectoryTree
          root={this.props.store.files.root}
          store={this.props.store.files}/>
        <UserList />
      </div>
    )
  }

  render()  {
    const devToolsPosition = {
      bottom: 0,
      right: 20
    }
    return (
      <div className='ss-app'>
        <div className='row'>
          { this.isSidebarToggled && this.sidebar }
          <div className='ss-main-container' style={this.mainStyle}>
            <Navbar store={this.props.store} />
            <LayoutManager store={this.props.store.layout} />
          </div>
        </div>
        { __DEV__ && <DevTools position={devToolsPosition} /> }
      </div>
    )
  }
}
