//Use timeOutToDelete as a global
let timeoutToDelete;

function drawContainer(containerSize, childSize, numberOfChildren) {
  try {
    containerSize = parseInt(containerSize);
    numberOfChildren = parseInt(numberOfChildren);
    childSize = parseInt(childSize);
    if (isNaN(containerSize) || isNaN(numberOfChildren) || isNaN(childSize)) {
      throw new Error();
    }
  } catch (_) {
    alert('Do submit only numbers');
    return;
  }
  const childsThatFitSide = Math.floor(containerSize / childSize);
  console.log(childsThatFitSide);
  const maxFit = childsThatFitSide * childsThatFitSide;
  if (containerSize === 0 || numberOfChildren === 0 || childSize === 0) {
    alert('One submitted value is 0');
    return;
  } else if (maxFit < numberOfChildren) {
    alert(`${numberOfChildren} childs cant fit. Rendering only: ${maxFit}`);
    render(containerSize, maxFit, childSize);
    return;
  } else {
    render(containerSize, numberOfChildren, childSize);
    return;
  }
}

function render(containerSize, numberOfChildren, childSize) {
  const body = document.querySelector('body');
  const parent = document.createElement('div');
  parent.style.display = 'flex';
  parent.style.flexWrap = 'wrap';
  parent.style.width = `${containerSize}px`;
  parent.style.height = `${containerSize}px`;
  parent.style.padding = '0';
  body.append(parent);

  for (i = 0; i < numberOfChildren; i++) {
    const child = document.createElement('div');
    child.style.width = `${childSize}px`;
    child.style.height = `${childSize}px`;
    child.style.backgroundColor = 'red';
    child.style.margin = '0';
    child.style.backgroundColor = getRandomColor();
    child.style.transition = 'all 1s';
    child.setAttribute('data', i);

    child.addEventListener('mouseover', (event) => {
      event.target.style.backgroundColor = getRandomColor();
      timeoutToDelete = setTimeout(() => {
        event.target.parentNode.removeChild(child);
      }, 2000);
    });
    child.addEventListener('mouseout', (event) => {
      if (timeoutToDelete) {
        clearTimeout(timeoutToDelete);
      }
    });
    parent.append(child);
  }
}

function getRandomColor() {
  return `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
    Math.random() * 256
  )},${Math.floor(Math.random() * 256)})`;
}
drawContainer('300', 150, 4);
