import memo from 'lodash.memoize';
import { PUSH_TURN, REMOVE_TURN } from './store-constants';
import handleDispatch from './handle-dispatch';
import { loadingModuleRegistrator, parseAction } from './utils';
import loadingCore from './modules/loading';
import rootLoading from './modules/root-loading';

export default (options) => (store) => {
  const patchedStore = handleDispatch(store);
  const checkInBlacklist = memo(options.blacklistFilter);

  const namespacedModules = Object.keys(patchedStore._modulesNamespaceMap);
  const registerLoadingModule = loadingModuleRegistrator(patchedStore, loadingCore);

  registerLoadingModule('' /* root */, rootLoading);
  namespacedModules.forEach(registerLoadingModule);

  store.subscribeAction({
    before: action => {
      if (checkInBlacklist(action.type)) {
        return;
      }

      const { actionName, moduleName } = parseAction(action.type);
      const pathToMutation = !moduleName.length ? PUSH_TURN : `${moduleName}/${PUSH_TURN}`;

      store.commit(pathToMutation, actionName);
    },
    after: action => {
      if (checkInBlacklist(action.type)) {
        return;
      }

      const { actionName, moduleName } = parseAction(action.type);
      const pathToMutation = !moduleName.length ? REMOVE_TURN : `${moduleName}/${REMOVE_TURN}`

      store.commit(pathToMutation, actionName);
    }
  });
};
