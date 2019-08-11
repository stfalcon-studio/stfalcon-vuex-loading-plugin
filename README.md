# vuex-loading-plugin

The plugin which including to your modules `loading logic`. When you will handle any actions you triggering `loading` mutation. When actions will be done `loading flag` came back to false. Basically, this plugin indicates async actions for you.
_Note_: This plugin also make a patch of dispatch method of the vuex, since in original implementation if action fails, then `after` subscribtion is not called. The patch fixed this thing.

### Prerequisites

This library requires vue and vuex as a peer dependency.

## Installing

```shell
npm i @stfalcon/vuex-loading-plugin
```

## Usage

### In `store.js` file

```js
import loadingPlugin from "@stfalcon/vuex-loading-plugin"

const store = new Vuex.Store({
  ...other store options,
  plugins: [loadingPlugin(options)]
})
```
`options` contains:
 - `options.blacklistFilter`: Function(<String>) - receives an action type as argument and allows to blacklist any of action by a rule.

### In `SomeComponent.vue` file

You can handle async actions of any namespaced module:
```js
computed: {
  ...mapGetters('yourModuleName', ['isLoading'])
}
```

If you want to listen to all async actions of all modules, then you should use global getter:
```js
computed: {
  ...mapGetters(['isLoading']),
}
```
This getter is just an alias for listening `loading` getters of all modules simultaniously.
