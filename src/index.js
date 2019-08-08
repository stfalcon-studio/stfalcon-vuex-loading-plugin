import { PUSH_TURN, REMOVE_TURN } from './store-constants';
import handleDispatch from './handle-dispatch';
import { loadingModuleRegistrator, parseAction } from './utils';
import loadingCore from './modules/loading';
import rootLoading from './modules/root-loading';

export default (store) => {
  const patchedStore = handleDispatch(store);

  const namespacedModules = Object.keys(patchedStore._modulesNamespaceMap);
  const registerLoadingModule = loadingModuleRegistrator(patchedStore, loadingCore);

  registerLoadingModule('' /* root */, rootLoading);
  namespacedModules.forEach(registerLoadingModule);

  store.subscribeAction({
    before: action => {
      const { actionName, moduleName } = parseAction(action.type);
      const pathToMutation = !moduleName.length ? PUSH_TURN : `${moduleName}/${PUSH_TURN}`;

      store.commit(pathToMutation, actionName);
    },
    after: action => {
      const { actionName, moduleName } = parseAction(action.type);
      const pathToMutation = !moduleName.length ? REMOVE_TURN : `${moduleName}/${REMOVE_TURN}`

      store.commit(pathToMutation, actionName);
    }
  });
};
