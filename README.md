# vuex-loading-plugin

The plugin which including to your modules `loading logic`. When you will handle any actions you triggering `loading` mutation. When actions will be done `loading flag` came back to false

### Prerequisites

This library requires vue as a peer dependency.

## Installing

```shell
npm i stfalcon-vuex-loading-plugin
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
