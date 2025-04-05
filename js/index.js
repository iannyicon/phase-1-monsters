let page = 1;
const monstersPerPage = 50;
const baseUrl = 'http://localhost:3000/monsters';

document.addEventListener('DOMContentLoaded', () => {
  loadMonsters();
  createMonsterForm();
  document.getElementById('load-more').addEventListener('click', () => {
    page++;
    loadMonsters();
  });
});

// Load 50 monsters for current page
function loadMonsters() {
  fetch(`${baseUrl}?_limit=${monstersPerPage}&_page=${page}`)
    .then(res => res.json())
    .then(monsters => {
      monsters.forEach(displayMonster);
    });
}

// Render a single monster to the DOM
function displayMonster(monster) {
  const container = document.getElementById('monster-container');
  const monsterDiv = document.createElement('div');
  monsterDiv.classList.add('monster');
  monsterDiv.innerHTML = `
    <h2>${monster.name}</h2>
    <h4>Age: ${monster.age}</h4>
    <p>${monster.description}</p>
  `;
  container.appendChild(monsterDiv);
}

// Create the monster creation form
function createMonsterForm() {
  const formContainer = document.getElementById('create-monster');
  const form = document.createElement('form');

  form.innerHTML = `
    <input type="text" id="name" placeholder="Name" required />
    <input type="number" id="age" placeholder="Age" required />
    <input type="text" id="description" placeholder="Description" required />
    <button type="submit">Create Monster</button>
  `;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const newMonster = {
      name: form.querySelector('#name').value,
      age: parseFloat(form.querySelector('#age').value),
      description: form.querySelector('#description').value
    };

    fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMonster)
    })
    .then(res => res.json())
    .then(monster => {
      // Add the new monster to the TOP of the container
      const container = document.getElementById('monster-container');
      const monsterDiv = document.createElement('div');
      monsterDiv.innerHTML = `
        <h2>${monster.name}</h2>
        <h4>Age: ${monster.age}</h4>
        <p>${monster.description}</p>
      `;
      container.prepend(monsterDiv);

      form.reset();
    });
  });

  formContainer.appendChild(form);
}
