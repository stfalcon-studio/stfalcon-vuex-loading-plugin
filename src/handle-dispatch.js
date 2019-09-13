export default function handleDispatch(store) {
  const originalDispatch = store.dispatch;

  store.dispatch = function (type, payload) {
    const action = { type, payload }

    return originalDispatch.apply(store, [ type, payload ])
      .then((result) => Promise.resolve(result))
      .catch((error) => {
        try {
          this._actionSubscribers
            .filter(sub => sub.after)
            .forEach(sub => sub.after(action, this.state))
        } catch (e) {
          if (process.env.NODE_ENV !== 'production') {
            console.warn(`[vuex] error in after action subscribers: `)
            console.error(e)
          }
        }

        return Promise.reject(error);
      });
  }

  return store
}
