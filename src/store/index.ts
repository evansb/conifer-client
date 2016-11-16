import { Store } from './Store'
import { EditorStore } from './EditorStore'

export function createStore(id: string): Store {
  const store = new Store(id)

  store.editors = new EditorStore(store)

  if (module.hot) {
    module.hot.dispose((data) => {
      window.store = store.serialize()
    })
  }

  return store
}
