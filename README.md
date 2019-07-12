# vuex-loading-plugin

The plugin which including to your modules `loading logic`. When you will handle any actions you triggering `loading` mutation. When actions will be done `loading flag` came back to false

### Prerequisites

This library requires vue as a peer dependency.

## Installing

```shell
npm i @stfalcon/vuex-loading-plugin
```

## Usage

In `store.js` file

```
import loadingPlugin from "stfalcon-vuex-loading-plugin"

const store = new Vuex.Store({
  ...other store options,
  plugins: [loadingPlugin]
})
```

In `SomeComponent.vue` file

If you want to use local loading just import `isLoading` getter via `mapGetters`

```
computed: {
  ...mapGetters('yourModuleName', ['isLoading'])
}
```

or

```
computed: {
  ...mapGetters('yourModuleName', {
    someKey: 'isLoading'
  })
}
```

Also in this plugin include global loading watcher.
So, if your application has got a global loader and you wanna handling when all actions ( from your list ) completed watch to next the snippet:

In your VuexStore included independent `loading module` which have next getters:

getters: {
isLoading: { ... }, // monitors on everyone actions
isLoadingModules: state => modules => { ... } // monitors only those modules that you transferred to the getter
}

For example, you have tow modules: users and tasks. And we want to check when all actions from both modules completed then disable loader.

```
computed: {
  ...mapGetters('loading', ['isLoadingModules']),
  watchOnSelectedModules() {
    return this.isLoadingModules(['users', 'todos'])
  }
}
```
