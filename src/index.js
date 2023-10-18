console.log('%c HI', 'color: firebrick')

//Since the script is called before the body, we'll need to use document.addEventListener('DOMContentLoaded')

document.addEventListener('DOMContentLoaded', () => {

    // TODO[x]: Challenge 1 
    /*

    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    Add JavaScript that:
        1. on page load, fetches the images using the url above ⬆️
        2. parses the response as JSON
        3. adds image elements to the DOM for each 🤔 image in the array
    */

    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const container = document.querySelector('#dog-image-container')
    async function renderDogImgs(){
        return fetch(imgUrl)
        .then(res => res.json())
        .then(data => {
            data.message.forEach(element => {
                console.log(element)
                const newImg = document.createElement('img')
                newImg.setAttribute('src', element)
                container.appendChild(newImg)
            });
        })
        .catch(err => console.log(err))
    }
    renderDogImgs()

    //TODO: Challenge 2
    /*
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    After the first challenge is completed, add JavaScript that:
        1. on page load, fetches all the dog breeds using the url above ⬆️
        2. adds the breeds to the page in the <ul> provided in index.html
    */

    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const ulContainer = document.querySelector('#dog-breeds')
    
    async function renderBreeds() {
        return fetch(breedUrl)
        .then(res => res.json())
        .then(data => {
            document.querySelector('#dog-breeds').innerHTML = ""
            console.log(data)
            for(let breed in data.message){
                // console.log(`${breed}: ${data.message[breed]}`)
                const newLi = document.createElement('li')
                newLi.innerHTML = `${breed}: ${data.message[breed]}`
                ulContainer.appendChild(newLi)
            }
        })
        .catch(err => {console.log(err)})
    }

    renderBreeds()


    //TODO: Challenge 3
    /*
    Once all of the breeds are rendered in the <ul>, add JavaScript so 
    that, when the user clicks on any one of the <li>s, the font color 
    of that <li> changes. This can be a color of your choosing.
    */

    //By calling renderBreeds() and having it return the fetch func, we chained a .then()
    //that grabs all rendered Li's within the asynchronous call
    async function coloredLis() {
        const rerender = renderBreeds()
        .then((data) => {
            const allBreeds = document.querySelectorAll('li')
            // console.log("ALL BREEDS: ", allBreeds)
            allBreeds.forEach(breed => {
                breed.addEventListener('click', () => {
                    console.log(breed)
                    breed.style.color = 'blue'
                })
            })
        })
        return rerender
    }
 
    coloredLis()

    //TODO[x]: Challenge 4

    /* 
    Once we are able to load all of the dog breeds onto the page, add 
    JavaScript so that the user can filter breeds that start with a particular 
    letter using a dropdownLinks to an external site..

    For example, if the user selects 'a' in the dropdown, only show the breeds 
    with names that start with the letter a. For simplicity, the dropdown only 
    includes the letters a-d. However, we can imagine expanding this to include 
    the entire alphabet.
    */

    function filterBreed(){
        const filtering = coloredLis()
        .then(data => {
            const allBreeds = document.querySelectorAll('li')
            let filteredBreedos = Array.from(allBreeds).filter(breed => {
                const firstChar = breed.innerText[0]
                const selectedDropdown = document.querySelector("#breed-dropdown").selectedOptions[0].value
                return firstChar === selectedDropdown
            })
            
            //render the breeds 
            console.log(filteredBreedos)
            const container = document.querySelector('#dog-breeds')
            container.innerHTML = ""
            filteredBreedos.forEach(breed => {
                const newBreed = document.createElement('li')
                newBreed.innerHTML = breed.innerHTML
                container.appendChild(newBreed)
            })
        })

        return filtering

    }

    const dropdownSelector = document.querySelector('#breed-dropdown')
    dropdownSelector.addEventListener('change', filterBreed)

})





