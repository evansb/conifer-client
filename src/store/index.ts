import { Store, IStoreState } from './Store'
import { EditorStore } from './EditorStore'
import { FileStore } from './FileStore'
import { LayoutStore } from './LayoutStore'
import { ApplicationConfigStore } from './ApplicationConfigStore'

export function createStore(id: string, initialData?: IStoreState): Store {
  const store = new Store(id)

  store.editors = new EditorStore(store)

  const initialConfig = initialData ? (initialData.config || {}) : undefined
  store.config = new ApplicationConfigStore(store, initialConfig)

  const fileData = initialData ? (initialData.files || {}) : undefined
  store.files = new FileStore(store, fileData)

  store.layout = new LayoutStore(store)

  if (module.hot) {
    module.hot.dispose((data) => {
      window.store = store.serialize()
    })
  }

  return store
}
