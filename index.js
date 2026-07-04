import menuArray from '/data.js'
const menuItemsDiv = document.getElementById('menu-items')
const orderDetailsDiv = document.getElementById('order-details')
let burgerCount = 0
let pizzaCount = 0
let beerCount = 0
let totalAmount = 0
console.log(burgerCount)

const paymentModal = document.getElementById('payment-modal')
const paymentForm = document.getElementById('payment-form')




paymentForm.addEventListener('submit', (e) => {
        e.preventDefault()
        paymentModal.style.display = 'none'
        const formData = new FormData(paymentForm)
        const name = formData.get('name')
        const thankYouMsg = `<p id="thank-you-msg" class="thank-you-msg">Thanks, ${name}!, Your order is on its way!</p>`
        orderDetailsDiv.innerHTML = thankYouMsg
    })

//checking which button was clicked on the menu items
menuItemsDiv.addEventListener("click", (e) => {
    if(Number(e.target.dataset.id) === 0){
        pizzaCount++
        renderOrderSummary(pizzaCount, Number(e.target.dataset.id))
    }
    if(Number(e.target.dataset.id) === 1){
        burgerCount++
        renderOrderSummary(burgerCount, Number(e.target.dataset.id))
    }
    if(Number(e.target.dataset.id) === 2){
        beerCount++
        renderOrderSummary(beerCount, Number(e.target.dataset.id))
    }
})

//Render menu items
function renderMenu(){
    let menuString = menuArray.map( menuItem => {
        const { name, ingredients, id, price, emoji} = menuItem
        return `<div class="menu-item">
                    <p class="menu-item-icon">${emoji}</p>
                    <div class="menu-item-details">
                        <h2 class="menu-item-name">${name}</h2>
                        <p class="menu-item-description">${ingredients.join(",")}</p>
                        <p class="price">$${price}</p>
                    </div>
                    <button class="add-btn" data-id="${id}"><i class="fa-solid fa-plus"></i></button> 
                </div>`
    }).join('')

    return menuString
}

//Render order summary section
function renderOrderSummary(itemCount, idVal){
        console.log('clicked')
        let { name, ingredients, id, price, emoji} = menuArray[idVal]
        
        
        totalAmount += price
        price = price * itemCount
        
        let orderSummary = document.getElementById("order-summary")
        let orderString = ''


        //checking if any item is on the order summary yet
        if(orderSummary === null){
            orderString = ` <p class="order-title" id="order-title">Your Order</p>
                <div class="order-summary" id="order-summary">
                    <div class="order-item" id="order-item-${name}">
                        <p class="order-name">${name}</p>
                        <button class="remove-btn" id="remove-btn" data-id="${id}"">remove</button>
                        <p class="sub-total">$${price}</p>
                    </div>
                </div>
                
                <div class="total-section" id="total-section">
                    <p class="total-title">Total price: </p>
                    <p class="total-value">$${totalAmount}</p>
                </div>

                <button class="complete-btn" id="complete-btn">Complete Order</button>`
            orderDetailsDiv.innerHTML = orderString
            }
        else{
            const orderSummary = document.getElementById("order-summary")
            let itemFound = false

            //adding a new item if items already exists
            for (let i=0; i<orderSummary.children.length; i++){
                if(orderSummary.children[i].id === `order-item-${name}`){
                    orderSummary.children[i].innerHTML = `<p class="order-name">${name}</p>
                        <button class="remove-btn" id="remove-btn" data-id="${id}">remove</button>
                        <p class="sub-total">$${price}</p>`

                    itemFound = true
                    break
                }

            }

            //updating an already exiting item if it exists on the current order summary
            if(!itemFound){
                    const orderItem = document.createElement('div')
                    orderItem.id = `order-item-${name}`
                    orderItem.classList.add('order-item')
                    orderItem.innerHTML = `<p class="order-name">${name}</p>
                    <button class="remove-btn" id="remove-btn" data-id="${id}">remove</button>
                    <p class="sub-total">$${price}</p>`
                    orderSummary.appendChild(orderItem)
                }
            const totalSection = document.getElementById('total-section')
            totalSection.innerHTML = `<p class="total-title">Total price: </p>
                <p class="total-value">$${totalAmount}</p>`
            }
        

}

menuItemsDiv.innerHTML = renderMenu()

//remove button code
orderDetailsDiv.addEventListener('click', (e) => {
if(Number(e.target.dataset.id) === 0){
    removeBtnLogic(pizzaCount, Number(e.target.dataset.id))
    pizzaCount = 0
}
if(Number(e.target.dataset.id) === 1){
    removeBtnLogic(burgerCount, Number(e.target.dataset.id))
    burgerCount = 0
}
if(Number(e.target.dataset.id) === 2){
    removeBtnLogic(beerCount, Number(e.target.dataset.id))
    beerCount = 0
}
})


function removeBtnLogic(itemCount, idVal){
    console.log('hello')
    let{name, ingredients, price, emoji, id} = menuArray[idVal]
    price = price * itemCount
    totalAmount -= price


    //remove the item
    const orderItem = document.getElementById(`order-item-${name}`)
    const orderSummary = document.getElementById('order-summary')
    orderSummary.removeChild(orderItem)

    //update the total
    const totalSection = document.getElementById('total-section')
    totalSection.innerHTML = `<p class="total-title">Total price: </p>
                <p class="total-value">$${totalAmount}</p>`


    const orderTitle = document.getElementById('order-title')
    const completeBtn = document.getElementById('complete-btn')
    //remove order summary if no items exist on it
    if(orderSummary.children.length === 0){
        orderDetailsDiv.removeChild(orderSummary)
        orderDetailsDiv.removeChild(totalSection)
        orderDetailsDiv.removeChild(orderTitle)
        orderDetailsDiv.removeChild(completeBtn)
    }
  

    
    
}