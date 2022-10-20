
function buildSetter<T, K extends keyof T>(
  context: T,
  setter:  React.Dispatch<React.SetStateAction<T>>,
  attr: K
){
  return (arg: T[K]) => {
    if (typeof arg === 'function') {
      setter((prevState) => {
        return {
          ...prevState,
          attr: arg(prevState[attr]),
        };
      });
    } else {
      setter((prevState) => {
        return {
          ...prevState,
          attr: arg,
        };
      });
    }
  }
};

export { buildSetter };