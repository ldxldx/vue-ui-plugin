const getZIndex = ()=>{
  const body = document.body;
  let zIndex, maxZIndex = 10;
  for (let i = 0; i < body.children.length; i++) {
    zIndex = Number(window.getComputedStyle(body.children[i], null).zIndex);
    if (zIndex === zIndex && zIndex > maxZIndex) {
      maxZIndex = zIndex;
    }
  }
  return maxZIndex;
}
export default getZIndex;
