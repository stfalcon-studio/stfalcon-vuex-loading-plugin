export function cutAction(actionType) {
  const separator = "/";
  let moduleName = "";
  let idx = 0;

  for (let i = actionType.length - 1; i > 0; i--) {
    const char = actionType[i];

    if (char === separator) {
      idx = i;
      break;
    }
  }
  moduleName = actionType.slice(0, idx);

  return moduleName;
}
