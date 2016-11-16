import * as React from 'react'
import { computed } from 'mobx'
import { observer } from 'mobx-react'
import DevTools from 'mobx-react-devtools'
import { Store } from '../store/Store'
import { Navbar } from '../components/navbar/Navbar'
import { DirectoryTree } from '../components/directory-tree/DirectoryTree'
import { UserList } from '../components/user-list/UserList'
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
    return { left: this.props.store.config.current.layout.left.width }
  }

  render()  {
    return (
      <div className='ss-app'>
        <Navbar store={this.props.store}/>
        <div className='row'>
          <div className='ss-left-container' style={this.leftStyle}>
             <DirectoryTree />
             <UserList />
             <div className='ss-resizer'></div>
          </div>
          <div className='ss-main-container' style={this.mainStyle}>
            <h2>Main Content</h2>
          </div>
        </div>
        { __DEV__ && <DevTools /> }
      </div>
    )
  }
}
