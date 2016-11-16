import { Store } from './Store'
import { EditorStore } from './EditorStore'
import { ApplicationConfig,
  ApplicationConfigStore } from './ApplicationConfigStore'

export function createStore(id: string, overrides?: ApplicationConfig): Store {
  const store = new Store(id)

  store.editors = new EditorStore(store)
  store.config = new ApplicationConfigStore(store, overrides)

  if (module.hot) {
    module.hot.dispose((data) => {
      window.store = store.serialize()
    })
  }

  return store
}
