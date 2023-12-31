//Use timeOutToDelete as a global
let timeoutToDelete;

function drawContainer(containerSize, childSize, numberOfChildren) {
  //A little bit of validation
  try {
    containerSize = parseInt(containerSize);
    numberOfChildren = parseInt(numberOfChildren);
    childSize = parseInt(childSize);
    if (isNaN(containerSize) || isNaN(numberOfChildren) || isNaN(childSize)) {
      throw new Error('Do submit only numbers');
    }
    if (containerSize === 0 || numberOfChildren === 0 || childSize === 0) {
      throw new Error('Do submit only numbers');
    }
  } catch (E) {
    alert(E);
    return;
  }

  //Checking how many childs will fit.
  const childsThatFitSide = Math.floor(containerSize / childSize);
  console.log(childsThatFitSide);
  const maxFit = childsThatFitSide * childsThatFitSide;

  if (maxFit < numberOfChildren) {
    alert(`${numberOfChildren} childs cant fit. Rendering only: ${maxFit}`);
    render(containerSize, maxFit, childSize);
    return;
  } else {
    render(containerSize, numberOfChildren, childSize);
    return;
  }
}

function render(containerSize, numberOfChildren, childSize) {
  const parent = document.querySelector('#mainSquare');

  //Cleaning before executing, necessary in the future.
  parent.innerHTML = '';

  parent.style.display = 'flex';
  parent.style.flexWrap = 'wrap';
  parent.style.width = `${containerSize}px`;
  parent.style.height = `${containerSize}px`;
  parent.style.padding = '0';

  for (i = 0; i < numberOfChildren; i++) {
    const child = document.createElement('div');
    child.style.width = `${childSize}px`;
    child.style.height = `${childSize}px`;
    child.style.backgroundColor = 'red';
    child.style.margin = '0';
    child.style.backgroundColor = getRandomColor();
    child.style.transition = 'all 1s';
    child.setAttribute('data', i);

    //Using a global timeout to later clear it when 2 seconds arent reached
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
  //Math.random() * 256 will get 0 to 255
  return `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
    Math.random() * 256
  )},${Math.floor(Math.random() * 256)})`;
}

drawContainer(200, 50, 17);

//Code by Roberto Camacho
