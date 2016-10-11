
declare module 'react-hot-loader' {
  import React from 'react'
  export const AppContainer: React.ComponentClass<any>
}

declare interface NodeModule {
  hot: {
    accept(): void
    accept(mod: string, callback: Function): void
    dispose(callback: (data: any) => void): void
  }
}
