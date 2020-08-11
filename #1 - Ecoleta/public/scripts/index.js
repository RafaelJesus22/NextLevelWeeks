const searchButton = document.querySelector("#page-home  main a")
const modal = document.querySelector("#modal")
const closeModalButton = document.querySelector("#modal .header a")

searchButton.addEventListener('click', () => {
    modal.classList.remove("hide")
})

closeModalButton.addEventListener('click', () => {
    modal.classList.add("hide")
})
