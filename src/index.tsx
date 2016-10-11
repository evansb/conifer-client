/// <reference path='../typings/index.d.ts' />
import 'react-hot-loader/patch'
import { observable, asReference } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'
import { AppContainer } from 'react-hot-loader'
import { render } from 'react-dom'
import { createStore } from './store'
import { App } from './components/App'

export function create(container: HTMLElement) {
  const storeID = window.location.host + '/' + window.location.pathname
  const initialStore = createStore(storeID)
  const storeInstance = observable(asReference(initialStore))

  const wrap = (App) =>
    observer(() => {
      const store = (storeInstance as any).get();
      return (
        <AppContainer>
          <App store={store} />
        </AppContainer>
       )
    })

  if (module.hot) {
    module.hot.accept('./store', () => {
      const createNextStore = require('./store').createStore;
      const nextStore = createNextStore(storeID)
      nextStore.deserialize(window.store);
      (storeInstance as any).set(nextStore)
    })

    module.hot.accept('./components/App', () => {
      const NextApp = require('./components/App').App
      render(React.createElement(wrap(NextApp)), container)
    })
  }

  render(React.createElement(wrap(App)), container)
}
