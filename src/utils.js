import merge from 'lodash.merge';

export function loadingModuleRegistrator(store, loadingCoreModule) {
  return (namespacedModule, addition = {}) => {
    const modules = namespacedModule.split('/').slice(0, -1);
    const pathToRegister = [...modules, 'loading'];
    return store.registerModule(pathToRegister, merge({}, loadingCoreModule, addition));
  }
}

export function parseAction(actionType) {
    // TODO: we assume that action name doesn't contain `/` sign. Also here can be more optimal solution
    const [actionName, ...pathToAction] = actionType.split('/').reverse();
    const moduleName = pathToAction.reverse().join('/');
    return { actionName, moduleName };
}