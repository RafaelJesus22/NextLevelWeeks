const populateUfs = () => {
    const ufSelect = document.querySelector("select[name=uf]");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json())
    .then( states => {

        for (state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

    })
}

populateUfs()

const getCities = (event) => {
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const ufValue = event.target.value
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a cidade</option>";
    citySelect.disabled = true;

    fetch(url)
    .then( res => res.json())
    .then( cities => {
        
        for (const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false;
    })
} 

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

//itens de coleta

const itensToColect = document.querySelectorAll(".items-grid li")

for (let item of itensToColect) {
    item.addEventListener("click", handleSelectedItem)
}

let selectedItems = []
const collectItems =  document.querySelector("input[name=items]") 

function handleSelectedItem (event) {
 
    //Item que disparou o evento
    const itemLi = event.target

    //alerna a classe do item 
    itemLi.classList.toggle("selected")

    // identificador do item selecionado
    const itemID = itemLi.dataset.id

    //pega os itens selecionados
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemID
        return itemFound
    })

    if (alreadySelected >= 0) {
        // tira o item da seleção
        filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemID
            return itemIsDifferent
        })

        selectedItems = filteredItems; 
    } else {
        // adiciona o item a seleção
        selectedItems.push(itemID)
    }


    collectItems.value = selectedItems
}
