import * as React from 'react'
import { observer } from 'mobx-react'
import DevTools from 'mobx-react-devtools'
import { Store } from '../store/Store'
import './App.scss'

export interface AppProps {
  store: Store
}

@observer
export class App extends React.Component<AppProps, void> {

  render()  {
    return (
      <div className='columns'>
        <div className='column is-1'>
        </div>
        <div className='column'>
          Content
        </div>
        { __DEV__ && <DevTools /> }
      </div>
    )
  }
}
