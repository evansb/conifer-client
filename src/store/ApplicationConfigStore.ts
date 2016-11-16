import { observable, toJS, extendObservable } from 'mobx'
import { AbstractStore } from './AbstractStore'

const defaultConfig = require('./DefaultConfig.json')

export interface ApplicationConfig {
  name: string,
  version: string,
  layout: {
    left: {
      active: boolean,
      width: number
    }
  }
}

export class ApplicationConfigStore extends AbstractStore<ApplicationConfig> {
  name = 'config'

  @observable private config: ApplicationConfig = defaultConfig

  constructor (parent: AbstractStore<any>, overrides?: ApplicationConfig) {
    super(parent)
    if (overrides) {
      extendObservable(this.config, overrides)
    }
  }

  get current(): ApplicationConfig {
    return this.config
  }

  deserialize(config: ApplicationConfig) {
    extendObservable(this.config, config)
  }

  serialize(): ApplicationConfig {
    return toJS(this.config)
  }
}

declare module './Store' {
  export interface Store {
    config: ApplicationConfigStore
  }

  export interface IStoreState {
    config: ApplicationConfig
  }
}
