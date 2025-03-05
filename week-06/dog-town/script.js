const DOGS = [
  {
    name: "Alfons",
    img: "assets/dog1.jpg",
    fur: "brown",
    puppy: false
  },
  {
    name: "Bingo",
    img: "assets/dog2.jpg",
    fur: "brown",
    puppy: false
  },
  {
    name: "Cecilia",
    img: "assets/dog3.jpg",
    fur: "mixed",
    puppy: true
  },
  {
    name: "Doggo",
    img: "assets/dog4.jpg",
    fur: "black",
    puppy: true
  },
  {
    name: "Eddie",
    img: "assets/dog5.jpg",
    fur: "grey",
    puppy: true
  },
  {
    name: "Flora",
    img: "assets/dog6.jpg",
    fur: "mixed",
    puppy: true
  },
  {
    name: "Gullan",
    img: "assets/dog7.jpg",
    fur: "black",
    puppy: false
  }
]

const container = document.getElementById("container")
const blackBtn = document.getElementById("black-btn")
const brownBtn = document.getElementById("brown-btn")
const filterDropdown = document.getElementById("filter-dropdown")

const loadDogs = (dogsArray) => {
  container.innerHTML = "" // Resets the container before we load the dogs

  dogsArray.forEach((dog) => {
    container.innerHTML += `<div class="card">
      <p>${dog.name}</p>
      <img src=${dog.img} alt=${dog.name} />
      <p>${dog.fur}</p>
      <p>${dog.puppy ? "puppy" : "adult"}</p>
    </div>`
  })
}

const filterDogs = (value) => {
  // The filter argument is the value of the dropdown
  // We filter the DOGS array by the fur property
  const filterValue = filterDropdown.value

  if (filterValue === "all") {
    loadDogs(DOGS)
  } else {
    const filteredArray = DOGS.filter(
      (dog) => dog.fur.toLowerCase() === filterValue.toLowerCase()
    )
    loadDogs(filteredArray)
  }
}

loadDogs(DOGS)

// EVENT LISTENERS

// Tell the buttons to wait for a click event by adding a callback function () =>
// The callback function is the filterDogs function with the filter argument
// The filter argument is the color we want to filter by
// brownBtn.addEventListener("click", () => filterDogs("brown"))
// blackBtn.addEventListener("click", () => filterDogs("black"))

filterDropdown.addEventListener("change", filterDogs)
