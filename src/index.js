const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

let breedsList;

document.addEventListener('DOMContentLoaded', function() {
    fetchImages()
    fetchBreeds()
    const dropDown = document.getElementById('breed-dropdown')
    dropDown.addEventListener('change', handleDropdown)
})

function fetchImages() {
    fetch(imgUrl)
        .then(resp => resp.json())
        .then(res => displayImages(res["message"]))
}

function displayImages(images) {
    const imgContainer = document.getElementById('dog-image-container')

    images.forEach (image => {
        imageTag = document.createElement('img')
        imageTag.src = image
        imageTag.style.width = "200px"
        imgContainer.appendChild(imageTag)
    })
}

function fetchBreeds() {
    fetch(breedUrl)
        .then(resp => resp.json())
        .then(res => displayBreeds(res["message"]))
}

function displayBreeds(breeds) {
    const breedContainer = document.getElementById('dog-breeds')
    breedsList = Object.keys(breeds)
    for (breed of breedsList) {
        breedItem = document.createElement('li')
        breedItem.innerText = breed
        breedItem.addEventListener('click', changeBreedTextColor)
        breedContainer.appendChild(breedItem)
    }
}

function changeBreedTextColor(e) {
    e.target.style.color = "green"
}

function handleDropdown(e) {
    letter = e.target.value
    filteredBreeds = breedsList.filter(breed => { return breed.startsWith(letter) })
    const breedContainer = document.getElementById('dog-breeds')
    breedContainer.innerHTML = ''
    for (breed of filteredBreeds) {
        breedItem = document.createElement('li')
        breedItem.innerText = breed
        breedItem.addEventListener('click', changeBreedTextColor)
        breedContainer.appendChild(breedItem)
    }
}

