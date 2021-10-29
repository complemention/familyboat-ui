window.addEventListener('load', () => {
  const containerBnt = document.querySelector('#container');
  const containerForm = document.querySelectorAll('form')[0];
  const itemBnt = document.querySelector('#item');
  const itemForm = document.querySelectorAll('form')[1];
  const clearBnt = document.querySelector('button');

  const flexContainer = document.querySelector('#flex-container');

  containerBnt.addEventListener('click', (event) => {
    event.preventDefault();

    const formdata = new FormData(containerForm);

    for(var pair of formdata.entries()) {
      flexContainer.style[pair[0]] = pair[1];
    }
  });

  itemBnt.addEventListener('click', (event) => {
    event.preventDefault();

    const formdata = new FormData(itemForm);

    const newFlexItem = document.createElement('div');

    for(var pair of formdata.entries()) {
      if (pair[0] == 'content') {
        newFlexItem.innerHTML = pair[1] || 'hello, world';
      } else if (pair[0] == 'flex-grow' || 'flex-shrink'){
        newFlexItem.style[pair[0]] = pair[1] || 0;
      } else {
        newFlexItem.style[pair[0]] = pair[1] || 'auto';
      }
    }

    flexContainer.appendChild(newFlexItem);
  });

  clearBnt.addEventListener('click', (event) => {
    event.preventDefault();
    flexContainer.innerHTML = '';
  });
});