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

  handleClick = () => {
    this.props.store.editors.createEditor(Math.random().toString())
  }

  render()  {
    const editors = this.props.store.editors.all.map((e, idx) =>
      <li key={idx}>{e}</li>
    )
    return (
      <div className='content'>
        <ul>{editors}</ul>
        <button className='button' onClick={this.handleClick}>
          Add Stuff
        </button>
        { __DEV__ && <DevTools /> }
      </div>
    )
  }
}
