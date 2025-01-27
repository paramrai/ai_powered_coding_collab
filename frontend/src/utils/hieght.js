export const updateHeight = (div) => {
  if (div.current) {
    div.current.style.height = `${window.innerHeight}px`;
  }
};
