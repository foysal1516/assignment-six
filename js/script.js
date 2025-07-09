
// activate button
const activeBtns = () => {
    const btns = document.getElementsByClassName("category-btn");
    for (const btn of btns) {
        btn.classList.remove('active')
    }
}
// shortin pet card
document.getElementById("sort-pet-card").addEventListener("click", function () {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
        .then(res => res.json())
        .then(data => {
            console.log(data.pets)
            const sortPets = data.pets.sort(function (a, b) {
                return b.price - a.price;
            })
            displayAllPets(sortPets)
        })
})




//fetch and load the categories data

const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(err => console.log(err))
}

// fetch and load all pet's


const loadAllPets = async () => {
    try {
        const res = await fetch("https://openapi.programming-hero.com/api/peddy/pets");
        const data = await res.json();
        displayAllPets(data.pets);
    } catch (err) {
        console.log(err)
    }
}

// fetch pet details data
const loadPetDetails = (id) => {
    document.getElementById('detailsModal').click();
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
        .then(res => res.json())
        .then(data => showPetDetails(data.petData))
}

// fetch pet according to categories

const loadCategoryPets = (name, id) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${name}`)
        .then(res => res.json())
        .then(data => {
            // setTimeout(() => {
            //     const cardContainer = document.getElementById('card-container')
            //     cardContainer.innerHTML = 'loading'
            // }, 2000)
            displayAllPets(data.data)
            activeBtns();
            const btn = document.getElementById(id);
            btn.classList.add('active')


        })
}


// display an show the categories data
const displayCategories = categories => {
    const categoriesContainer = document.getElementById('categories-container')
    categories.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div id="${item.id}" class="flex py-3 px-8 border rounded-3xl space-x-3 cursor-pointer category-btn" onclick="loadCategoryPets('${item.category}',${item.id})">
        <img class="w-7" src="${item.category_icon}"/>
        <button class="font-bold">${item.category}</button>
        </div>
        `
        categoriesContainer.appendChild(div)
    })
}

// display all pets

const displayAllPets = pets => {
    console.log(pets.length)
    const cardContainer = document.getElementById('card-container')
    const petsContainer = document.getElementById("pets-container");
    cardContainer.innerHTML = "";
    if (pets.length === 0) {
        petsContainer.classList.remove('flex')
        cardContainer.classList.remove('grid')
        cardContainer.innerHTML = `
        <div class="min-h-30 flex justify-center">
            <img class="w-[40%]" src="images/error.webp"/>
        </div>
        `
        // return;S
    }
    else {
        petsContainer.classList.add('flex')
        cardContainer.classList.add("grid")
    }
    pets.forEach(pet => {
        const div = document.createElement("div");
        div.classList.add('card', 'p-2', 'shadow-md')
        div.innerHTML = `
        <figure class="h-[150px] object-cover">
    <img class="w-full h-full rounded-b-[10px]"
      src="${pet.image}"
      alt="Shoes" />
  </figure>
  <div class="space-y-1 mt-3">
    <h3 class="text-xl font-bold">${pet.pet_name}</h3>
    <div class="flex items-center gap-1">
        <img class="w-3" src="https://img.icons8.com/?size=48&id=ks8n9dBGaAaw&format=png"/><span class="text-xs text-gray-700">${pet.breed}</span>
    </div>
    <div class="flex items-center gap-1">
        <img class="w-3" src="https://img.icons8.com/?size=48&id=84997&format=png"/><span class="text-xs text-gray-700">Birth: ${pet.date_of_birth ? pet.date_of_birth : "Not Found"}</span>
    </div>
    <div class="flex items-center gap-1">
        <img class="w-3" src="https://img.icons8.com/?size=48&id=6vWA99ikHpCe&format=png"/><span class="text-xs text-gray-700">gender: ${pet.gender ? pet.gender : "Not Found"}</span>
    </div>
    <div class="flex items-center gap-1 mb-4">
        <img class="w-3" src="https://img.icons8.com/?size=48&id=85782&format=png"/><span class="text-xs text-gray-700">Price: ${pet.price}$</span>
    </div>
    <hr class="text-gray-400" />
    <div class="flex justify-between mt-4">
        <button onclick="likedPet('${pet.image}')" class="btn"><img class="w-5" src="https://img.icons8.com/?size=100&id=24816&format=png"/></button>
        <button id="customModal" onclick="countDown(event)" class="btn text-[#0E7A81] font-bold">Adopt</button>
        <button onclick="loadPetDetails(${pet.petId})" class="btn text-[#0E7A81] font-bold"">Details</button>
    </div>
  </div>
        `
        cardContainer.appendChild(div);
    })
}


const likedPet = img => {
    const likeContainer = document.getElementById("like-container")
    const div = document.createElement("div");
    div.classList.add('h-[150px]', 'w-[150px]', 'rounded-md')
    div.innerHTML = `
    <img src="${img}" class="rounded-md w-full h-full"/>
    `
    likeContainer.appendChild(div)
}

const countDown = (event) => {
    document.getElementById("show_modal_content").click()
    let count = 3;
    const countId = setInterval(() => {

        document.getElementById("valueId").innerText = count;
        count--
        if (count === 0) {
            clearInterval(countId)
            document.getElementById("modal_close").click();
            event.target.setAttribute("disabled", true)
        }
    }, 1000)



}



const showPetDetails = (data) => {
    console.log(data)
    const cardContainer = document.getElementById("details-card-container")
    cardContainer.innerHTML = ` 
    <img class="w-full h-72" src="${data.image}"/>
<h2 class="text-2xl font-bold my-2">${data.pet_name}</h2>
<div class="flex gap-10">
    <div class="space-y-1">
        <div class="flex items-center gap-1">
                <img class="w-3" src="https://img.icons8.com/?size=48&id=ks8n9dBGaAaw&format=png"/><span class="text-xs text-gray-700">${data.breed}</span>
        </div>
        <div class="flex items-center gap-1">
            <img class="w-3" src="https://img.icons8.com/?size=48&id=6vWA99ikHpCe&format=png"/><span class="text-xs text-gray-700">gender: ${data.gender ? data.gender : "Not Found"}</span>
        </div>
        <div class="flex items-center gap-1">
            <img class="w-3" src="https://img.icons8.com/?size=48&id=6vWA99ikHpCe&format=png"/><span class="text-xs text-gray-700">gender: ${data.vaccinated_status ? data.vaccinated_status : "Not Found"}</span>
        </div>
        
    </div>
    <div class="space-y-1">
        <div class="flex items-center gap-1">
            <img class="w-3" src="https://img.icons8.com/?size=48&id=84997&format=png"/><span class="text-xs text-gray-700">Birth: ${data.date_of_birth ? data.date_of_birth : "Not Found"}</span>
        </div>
        <div class="flex items-center gap-1 mb-4">
        <img class="w-3" src="https://img.icons8.com/?size=48&id=85782&format=png"/><span class="text-xs text-gray-700">Price: ${data.price}$</span>
        </div>
    </div>
</div>
<hr class="border border-gray-400 my-4">
<h3 class="text-xl font-bold">Details information</h3>
<p>${data.pet_details}</p>
    `
}



loadCategories()
loadAllPets()