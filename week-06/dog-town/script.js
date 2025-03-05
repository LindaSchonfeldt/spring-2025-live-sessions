const DOGS = [
  {
    name: 'Alfons',
    img: 'assets/dog1.jpg',
    fur: 'brown',
    puppy: false
  },
  {
    name: 'Bingo',
    img: 'assets/dog2.jpg',
    fur: 'brown',
    puppy: false,
  },
  {
    name: 'Cecilia',
    img: 'assets/dog3.jpg',
    fur: 'mixed',
    puppy: true,
  },
  {
    name: 'Doggo',
    img: 'assets/dog4.jpg',
    fur: 'black',
    puppy: true,
  },
  {
    name: 'Eddie',
    img: 'assets/dog5.jpg',
    fur: 'grey',
    puppy: true,
  },
  {
    name: 'Flora',
    img: 'assets/dog6.jpg',
    fur: 'mixed',
    puppy: true,
  },
  {
    name: 'Gullan',
    img: 'assets/dog7.jpg',
    fur: 'black',
    puppy: false,
  }
]

const container = document.getElementById('container')
const btn = document.getElementById('btn')

const loadDogs = (dogsArray) => {
  container.innerHTML = '' //resets the container before we load the dogs

  dogsArray.forEach(dog => {
    container.innerHTML += `<div class="card">
      <p>${dog.name}</p>
      <img src=${dog.img} alt=${dog.name} />
      <p>${dog.fur}</p>
      <p>${dog.puppy ? '🐶' : ''}</p>
    </div>`
  })
}

const filterDogs = () => {
  const filteredArray = DOGS.filter(dog => dog.fur === 'black')
  console.log('These are my black dogs:', filteredArray)
  loadDogs(filteredArray)
}

loadDogs(DOGS)

btn.addEventListener('click', filterDogs)