import merge from 'lodash.merge';

import { cutAction } from "./utils";
import turnsModule from "./modules/turns";
import loadingModule from "./modules/loading";

const includeLoadingToAllModules = store => {
  const namespacedModules = Object.keys(store._modulesNamespaceMap);
  store.registerModule("loading", merge(turnsModule, loadingModule));

  namespacedModules.forEach(moduleName => {
    const modules = moduleName.split("/").slice(0, -1);

    store.registerModule([...modules, "loading"], {
      ...loadingModule,
      getters: {
        isLoading: () => store.state[modules[0]].loading.isLoading
      }
    });
  });
};

export default store => {
  includeLoadingToAllModules(store);

  store.subscribeAction({
    before: action => {
      const moduleName = cutAction(action.type);
      const isRoot = !moduleName.length;

      store.commit(`${isRoot ? 'loading' : moduleName}/SET_LOADING`, true);
      store.commit(`loading/PUSH_TURN`, moduleName);
    },
    after: action => {
      const moduleName = cutAction(action.type);
      const isRoot = !moduleName.length;

      store.commit(`loading/REMOVE_TURN`, moduleName);
      store.commit(`${isRoot ? 'loading' : moduleName}/SET_LOADING`, false);
    }
  });
};
