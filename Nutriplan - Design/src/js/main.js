/**
 * NutriPlan - Main Entry Point
 * 
 * This is the main entry point for the application.
 * Import your modules and initialize the app here.
 */
let navTap=document.querySelectorAll(".nav-link")
let nameNav=document.querySelectorAll(".nav-link span ")
let mealSections=document.querySelectorAll("#main-content section ")
const recipesGrid = document.getElementById("recipes-grid");
const mealDetails=document.querySelector("#meal-details")
const heroCard =document.querySelector("#Hero-Section")
const viewBtn=document.querySelector("#grid-view-btn")
const listBtn=document.querySelector("#list-view-btn")
const cardShow=document.querySelectorAll(".recipe-card")
const change=document.querySelectorAll('#change')
const extra=document.querySelectorAll('#extra')
const backBtn=document.querySelector("#back-to-meals-btn")
const searchInput=document.getElementById("search-input")
const productSearchInput=document.getElementById("product-search-input")
const barcodeSearch=document.getElementById("barcode-input")
const nutritionProduct=document.querySelectorAll('.nutri-score-filter')
let allMeal=[]






function getNav(e){
    const clickNav = e.target.closest('a')
    const clickli = e.target.closest('li')
    const clickData=clickli.dataset.target
    const clickId=clickData.split(" ")
    if(clickNav){
for(let i=0 ;i<navTap.length ;i++){
navTap[i].classList.remove("bg-emerald-50" , "text-emerald-700");
navTap[i].classList.add("text-gray-600" , "hover:bg-gray-50")
for(let i=0 ;i<nameNav.length ;i++){
nameNav[i].classList.remove("font-semibold")
nameNav[i].classList.add("font-medium")
if(clickNav===navTap[i]){
    navTap[i].classList.add("bg-emerald-50" , "text-emerald-700");
navTap[i].classList.remove("text-gray-600" , "hover:bg-gray-50")
nameNav[i].classList.add("font-semibold")
nameNav[i].classList.remove("font-medium")
}
}

for (let i = 0; i < mealSections.length; i++) {
    mealSections[i].style.display = "none";
}
clickId.forEach(id => {
    const targetEl = document.getElementById(id);
    if (targetEl) {
        targetEl.style.display = "block"; 
        
    }
});
}
    }

}



 callMeal()
async function callMeal(){
let response =await fetch("https://nutriplan-api.vercel.app/api/meals/search?q=chicken&page=1&limit=25")
let data =await response.json()
    allMeal=data.results
    displayMeal(allMeal)
    
}
getCategory()
async function getCategory(){
    let response =await fetch('https://nutriplan-api.vercel.app/api/meals/categories')
    let data =await response.json()
    allMeal=data.results
    displaycategory(allMeal)
}
async function FilterByCategory(categoryName){
    let response =await fetch(`https://nutriplan-api.vercel.app/api/meals/filter?category=${categoryName}&page=1&limit=25`)
    let data =await response.json()
    allMeal=data.results
    displayMeal(allMeal)
}
getMeal()
async function getMeal(){
    let response =await fetch('https://nutriplan-api.vercel.app/api/meals/areas')
    let data =await response.json()
    allMeal=data.results
    displayByMeal(allMeal)
}
async function FilterByMeal(mealName){
    console.log(mealName)
    let response =await fetch(`https://nutriplan-api.vercel.app/api/meals/filter?area=${mealName}&page=1&limit=25`)
    let data =await response.json()
    allMeal=data.results
    displayMeal(allMeal)
}

function displaycategory(allMeal){
    let cartona=''
    for(let i=0 ; i < 12 ; i++){
        cartona+=`
        <div
              class="category-card bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-3 border border-emerald-200 hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all group"
              data-category="${allMeal[i].name}"
            >
              <div class="flex items-center gap-2.5">
                <div
                  class="text-white w-9 h-9 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm"
                >
                  <i class="fa-solid fa-drumstick-bite"></i>
                </div>
                <div>
                  <h3 class="text-sm font-bold text-gray-900">${allMeal[i].name}</h3>
                </div>
              </div>
            </div>`
            
    }
    document.getElementById("categories-grid").innerHTML=cartona
}
function displayByMeal(allMeal){
 let cartona=`<button
              class="px-4 py-2 bg-emerald-600 text-white rounded-full font-medium text-sm whitespace-nowrap hover:bg-emerald-700 transition-all"
            >
              All Recipes
            </button>`
    for(let i=0 ; i < 12 ; i++){
        cartona+=`
        <button
        data-areas="${allMeal[i].name}"
              class="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all"
            >
             ${allMeal[i].name}
            </button>`
            
    }
    document.getElementById("areas-grid").innerHTML=cartona
}
function displayMeal(allMeal){
  let  cartona='';
  let searchValue=searchInput.value
     if(allMeal.length==0){
         document.getElementById("recipes-count").innerHTML= `Showing ${allMeal.length} recipes`;
      document.getElementById("recipes-grid").innerHTML=`<div class="flex flex-col items-center justify-center py-12 text-center">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <i class="text-2xl text-gray-400" data-fa-i2svg=""><svg class="svg-inline--fa fa-magnifying-glass" data-prefix="fas" data-icon="magnifying-glass" role="img" viewBox="0 0 512 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg></i>
            </div>
            <p class="text-gray-500 text-lg">No recipes found. Try a different search term.</p>
        </div>`
    }
  if(allMeal){
    for(let i=0 ; i < allMeal.length ; i++){
        if(allMeal[i].name.toLowerCase().includes(searchValue.toLowerCase())||
        allMeal[i].ingredients.join(" ").toLowerCase().includes(searchValue.toLowerCase())||
    allMeal[i].area.toLowerCase().includes(searchValue.toLowerCase())){
            document.getElementById("recipes-count").innerHTML= `Showing ${allMeal.length} recipes`;
cartona +=`<div
              class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              data-meal-id="${allMeal[i].id}"
            >
              <div class="relative  h-48 overflow-hidden">
                <img
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="${allMeal[i].thumbnail}"
                  alt="${allMeal[i].name}"
                  loading="lazy"
                />
                <div  class="absolute bottom-3 left-3 flex gap-2 ">
                  <span
                    class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
                  >
                    ${allMeal[i].category}
                  </span>
                  <span
                    class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white"
                  >
                    ${allMeal[i].area}
                  </span>
                </div>
              </div>
              <div class="p-4">
                <h3
                  class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
                >
                  ${allMeal[i].name}
                </h3>
                <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                  ${allMeal[i].instructions?allMeal[i].instructions[0]:'' }
                  
                </p>
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-gray-900">
                    <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                    ${allMeal[i].category}
                  </span>
                  <span class="font-semibold text-gray-500">
                    <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                    ${allMeal[i].area}
                  </span>
                </div>
              </div>
            </div>`
  
    }
document.getElementById("recipes-grid").innerHTML=cartona
    }}
    
}
function displayCard(selectedMeal){ 
    let carton="";
    let carton1="";
    console.log(selectedMeal)
    heroCard.innerHTML=`   
     <div class="relative h-80 md:h-96">
              <img
                src="${selectedMeal.thumbnail}"
                alt="Teriyaki Chicken Casserole"
                class="w-full h-full object-cover"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
              ></div>
              <div class="absolute bottom-0 left-0 right-0 p-8">
                <div class="flex items-center gap-3 mb-3">
                  <span
                    class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full"
                    >${selectedMeal.category}</span
                  >
                  <span
                    class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full"
                    >${selectedMeal.area}</span
                  >
                  <span
                    class="px-3 py-1 bg-purple-500 text-white text-sm font-semibold rounded-full"
                    >Casserole</span
                  >
                </div>
                <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
                  ${selectedMeal.name}
                </h1>
                <div class="flex items-center gap-6 text-white/90">
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-clock"></i>
                    <span>30 min</span>
                  </span>
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-utensils"></i>
                    <span id="hero-servings">4 servings</span>
                  </span>
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-fire"></i>
                    <span id="hero-calories">Calcing cal/serving</span>
                  </span>
                </div>
              </div>
            </div>
          `
          for(let i=0 ; i<selectedMeal.ingredients.length ;i++){
            document.getElementById("headMeal").innerHTML=`<i class="fa-solid fa-list-check text-emerald-600"></i>
                  Ingredients
                  <span class="text-sm font-normal text-gray-500 ml-auto"
                    >${selectedMeal.ingredients.length} items</span
                  >`
carton+=`
<div
                    class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
                    />
                    <span class="text-gray-700">
                      <span class="font-medium text-gray-900">${selectedMeal.ingredients[i].measure}</span> 
                      ${selectedMeal.ingredients[i].ingredient}
                    </span>
                  </div>
                  `
          }
for(let i=0 ; i<selectedMeal.instructions.length ;i++){
carton1 +=`<div
                    class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div
                      class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0"
                    >
                      ${i+1}
                    </div>
                    <p class="text-gray-700 leading-relaxed pt-2">
                      ${selectedMeal.instructions[i]}
                    </p>
                  </div>`
}
document.getElementById("Video").innerHTML=`
<h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-video text-red-500"></i>
                  Video Tutorial
                </h2>
                <div
                  class="relative aspect-video rounded-xl overflow-hidden bg-gray-100"
                >
                  <iframe
                    src="${selectedMeal.youtube.replace("watch?v=" ,'embed/')}"
                    class="absolute inset-0 w-full h-full"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  >
                  </iframe>
                </div>`

          document.getElementById("Instructions").innerHTML=carton1
          document.getElementById("Ingredients").innerHTML=carton
}
function showMealModal(meal){
    let modalContainer = document.getElementById("dynamic-product-modal");
    
    if (!modalContainer) {
        modalContainer = document.createElement("div");
        modalContainer.id = "dynamic-product-modal";
        modalContainer.className = "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4";
        
        modalContainer.innerHTML =
        `<div class="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
                <div class="flex items-center gap-4 mb-6">
                    <img id="modal-meal-img" src="${meal.thumbnail}" alt="${meal.name}" class="w-16 h-16 rounded-xl object-cover">
                    <div>
                        <h3 class="text-xl font-bold text-gray-900">Log This Meal</h3>
                        <p id="modal-meal-name" class="text-gray-500 text-sm">${meal.name}</p>
                    </div>
                </div>
                
                <div class="mb-6">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Number of Servings</label>
                    <div class="flex items-center gap-3">
                        <button id="decrease-servings" class="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                            <i class="text-gray-600" data-fa-i2svg=""><svg class="svg-inline--fa fa-minus" data-prefix="fas" data-icon="minus" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z"></path></svg></i>
                        </button>
                        <input type="number" id="meal-servings" value="1" min="0.5" max="10" step="0.5" class="w-20 text-center text-xl font-bold border-2 border-gray-200 rounded-lg py-2">
                        <button id="increase-servings" class="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                            <i class="text-gray-600" data-fa-i2svg=""><svg class="svg-inline--fa fa-plus" data-prefix="fas" data-icon="plus" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z"></path></svg></i>
                        </button>
                    </div>
                </div>
                
                
                <div class="bg-emerald-50 rounded-xl p-4 mb-6">
                    <p class="text-sm text-gray-600 mb-2">Estimated nutrition per serving:</p>
                    <div class="grid grid-cols-4 gap-2 text-center">
                        <div>
                            <p class="text-lg font-bold text-emerald-600" id="modal-calories">2152</p>
                            <p class="text-xs text-gray-500">Calories</p>
                        </div>
                        <div>
                            <p class="text-lg font-bold text-blue-600" id="modal-protein">111g</p>
                            <p class="text-xs text-gray-500">Protein</p>
                        </div>
                        <div>
                            <p class="text-lg font-bold text-amber-600" id="modal-carbs">201g</p>
                            <p class="text-xs text-gray-500">Carbs</p>
                        </div>
                        <div>
                            <p class="text-lg font-bold text-purple-600" id="modal-fat">132g</p>
                            <p class="text-xs text-gray-500">Fat</p>
                        </div>
                    </div>
                </div>
                
                
                <div class="flex gap-3">
                    <button id="cancel-log-meal" class="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all">
                        Cancel
                    </button>
                    <button id="confirm-log-meal" class="flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all">
                        <i class="mr-2" data-fa-i2svg=""><svg class="svg-inline--fa fa-clipboard-list" data-prefix="fas" data-icon="clipboard-list" role="img" viewBox="0 0 384 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M311.4 32l8.6 0c35.3 0 64 28.7 64 64l0 352c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32l8.6 0C83.6 12.9 104.3 0 128 0L256 0c23.7 0 44.4 12.9 55.4 32zM248 112c13.3 0 24-10.7 24-24s-10.7-24-24-24L136 64c-13.3 0-24 10.7-24 24s10.7 24 24 24l112 0zM128 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm32 0c0 13.3 10.7 24 24 24l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-112 0c-13.3 0-24 10.7-24 24zm0 128c0 13.3 10.7 24 24 24l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-112 0c-13.3 0-24 10.7-24 24zM96 416a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"></path></svg></i>
                        Log Meal
                    </button>
                </div>
            </div>`;
        document.body.appendChild(modalContainer);

        
       
        document.getElementById("cancel-log-meal").addEventListener("click", () => {
            modalContainer.classList.add("hidden");
         Swal.fire({
  title: 'Error!',
  text: 'Cancel This Meal',
  icon: 'error',
  confirmButtonText: 'Cool'
})
        });
        document.getElementById("confirm-log-meal").addEventListener("click", () => {
            modalContainer.classList.add("hidden");
              Swal.fire({
  title: "Log Meal Successfully!",
  icon: "success",
  draggable: true
});
            
const logMealBtn = document.getElementById("confirm-log-meal"); 

if (logMealBtn) {
    logMealBtn.addEventListener("click", function() {
        
        const name = document.getElementById("modal-meal-name")?.innerText || currentMealData?.strMeal || "Meal";
        const calories = parseFloat(document.getElementById("modal-calories")?.innerText) || 0;
        const protein = parseFloat(document.getElementById("modal-protein")?.innerText) || 0;
        const carbs = parseFloat(document.getElementById("modal-carbs")?.innerText) || 0;
        const fat = parseFloat(document.getElementById("modal-fat")?.innerText) || 0;
const imgElement = document.getElementById("modal-meal-img") || document.querySelector(".modal-meal-image");
        const image = imgElement ? (imgElement.src || imgElement.getAttribute("src")) : "";
        
        const loggedMealItem = {
            name: name,
            brand: "Recipe",
            type: "Meal",
            image: image,
            calories: calories,
            protein: protein,
            carbs: carbs,
            fat: fat,
            date: new Date().toISOString().split('T')[0],
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        
        let dailyLog = JSON.parse(localStorage.getItem("nutriPlanDailyLog")) || [];
        dailyLog.push(loggedMealItem);
        localStorage.setItem("nutriPlanDailyLog", JSON.stringify(dailyLog));

        
        updateDailyLogUI();
        
       
      
    });
}
            
        });
    }
setupServingsButtons(meal)

    modalContainer.classList.remove("hidden");
}
function MealNutrition(Meal){
let result
    
    const totals = Meal.data?.totals || Meal.totals || {};
    
    const caloriesElModal = document.getElementById('modal-calories');
    if (caloriesElModal) caloriesElModal.innerText = `${totals.calories || 0}`;

    const proteinElModal = document.getElementById('modal-protein');
    if (proteinElModal) proteinElModal.innerText = `${totals.protein || 0}g`;

    const carbsElModal = document.getElementById('modal-carbs');
    if (carbsElModal) carbsElModal.innerText = `${totals.carbs || 0}g`;

    const fatElModal = document.getElementById('modal-fat');
    if (fatElModal) fatElModal.innerText = `${totals.fat || 0}g`;
    const servingsEl = document.getElementById("hero-servings");
    if (servingsEl) servingsEl.textContent = `${Meal.data.servings || 4} servings`;

    
    const caloriesEl = document.getElementById("hero-calories");
    if (caloriesEl) {
       
        let cal = Meal.data.totals?.calories || Meal.data.calories || 485;
 result=(cal/Meal.data.servings)
        caloriesEl.textContent = `${result} cal/serving`;
    }
    document.getElementById("Nutrition").innerHTML=`<div class="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-chart-pie text-emerald-600"></i>
                  Nutrition Facts
                </h2>
                <div id="nutrition-facts-container">
                  <p class="text-sm text-gray-500 mb-4">Per serving</p>

                  <div
                    class="text-center py-4 mb-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl"
                  >
                    <p class="text-sm text-gray-600">Calories per serving</p>
                    <p class="text-4xl font-bold text-emerald-600">${ result || 0}</p>
                    <p class="text-xs text-gray-500 mt-1">Total: ${Meal.data.totals?.calories || 0} cal</p>
                  </div>

                  <div class="space-y-4">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <span class="text-gray-700">Protein</span>
                      </div>
                      <span class="font-bold text-gray-900">${Meal.data.perServing.protein || 0}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-emerald-500 h-2 rounded-full"
                        style="width: ${Math.min(Meal.data.perServing.protein || 0, 100)}%"
                      ></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span class="text-gray-700">Carbs</span>
                      </div>
                      <span class="font-bold text-gray-900">${Meal.data.perServing.carbs || 0}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-blue-500 h-2 rounded-full"
                        style="width: ${Math.min(Meal.data.perServing.carbs || 0, 100)}%"
                      ></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span class="text-gray-700">Fat</span>
                      </div>
                      <span class="font-bold text-gray-900">${Meal.data.perServing.fat || 0}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-purple-500 h-2 rounded-full"
                        style="width: ${Math.min(Meal.data.perServing.fat || 0, 100)}%"
                      ></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span class="text-gray-700">Fiber</span>
                      </div>
                      <span class="font-bold text-gray-900">${Meal.data.perServing.fiber || 0}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-orange-500 h-2 rounded-full"
                        style="width: ${Math.min(Meal.data.perServing.fiber || 0, 100)}%"
                      ></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-pink-500"></div>
                        <span class="text-gray-700">Sugar</span>
                      </div>
                      <span class="font-bold text-gray-900">${Meal.data.perServing.sugar || 0}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-pink-500 h-2 rounded-full"
                        style="width: ${Math.min(Meal.data.perServing.sugar || 0, 100)}%"
                      ></div>
                    </div>
                    <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-red-500"></div>
                        <span class="text-gray-700">Saturated Fat</span>
                    </div>
                    <span class="font-bold text-gray-900">${Meal.data.perServing.saturated_fat || 0}g</span>
                </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-red-500 h-2 rounded-full" style="width: ${Math.min(Meal.data.perServing.saturated_fat || 0, 100)}%"></div>
                </div>
                  </div>

                <div class="mt-6 pt-6 border-t border-gray-100">
                <h3 class="text-sm font-semibold text-gray-900 mb-3">Other</h3>
                <div class="grid grid-cols-2 gap-3 text-sm">
                    <div class="flex justify-between">
                        <span class="text-gray-600">Cholesterol</span>
                        <span class="font-medium">${Meal.data.perServing.cholesterol}mg</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Sodium</span>
                        <span class="font-medium">${Meal.data.perServing.sodium}mg</span>
                    </div>
                </div>
            </div>
                </div>
              </div>`
}


let currentServings = 1;
let currentMealData = null;


function setupServingsButtons(mealData) {
    currentMealData = mealData;
    const servingsInput = document.getElementById('meal-servings');
    const decreaseBtn = document.getElementById('decrease-servings');
    const increaseBtn = document.getElementById('increase-servings');

    if (servingsInput) {
        currentServings = parseFloat(servingsInput.value) || 1;
    }

   
    decreaseBtn.onclick = function() {
        if (currentServings > 0.5) {
            currentServings -= 0.5; 
            updateModalValues();
        }
    };

    increaseBtn.onclick = function() {
        currentServings += 0.5; 
        updateModalValues();
    };
}


function updateModalValues() {
    const servingsInput = document.getElementById('meal-servings');
    if (servingsInput) {
        servingsInput.value = currentServings;
    }

    if (!currentMealData) return;
}
    
  async function getMealNutrition(meal) {
    try {
        
        const response = await fetch(
            'https://nutriplan-api.vercel.app/api/nutrition/analyze',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'jwjPBHQW9nWqfbGtQ9MHDRkWbbKkjmpjjRQJDmJG'
                },
                body: JSON.stringify({
                    recipeName: meal.name,
    ingredients: meal.ingredients.map(item => item.ingredient)
                })
            }
        );

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
const data = await response.json();
        console.log(response.status);
        console.log(data)
        
        MealNutrition(data)
        return data;

    } catch (error) {
        console.error(error);
    }

}

// =============================Product================================
let allProduct=[]
async function searchProducts(searchValue) {
    console.log(searchValue)
        const response = await fetch(`https://nutriplan-api.vercel.app/api/products/search?q=${searchValue}`);
        const data = await response.json();
        allProduct=data.results
        renderProducts(allProduct);
        
    
}
async function searchBarcodeProducts(searchLookValue) {
        const response = await fetch(`https://nutriplan-api.vercel.app/api/products/barcode/${searchLookValue}`);
        const data = await response.json();
        allProduct=data.result
        console.log(allProduct);
        renderProductsByBarcode(allProduct);
        showProductModal(allProduct)
        
    
}
getCategoryProduct()
let allCategoryProduct=[]
async function getCategoryProduct(){
    let response =await fetch('https://nutriplan-api.vercel.app/api/products/categories')
    let data =await response.json()
    allCategoryProduct=data.results
   displaycategoryProducts(allCategoryProduct)
}
async function FilterByCategoryProduuct(productName){
    const productGrid=document.getElementById("products-grid")
    productGrid.innerHTML=`<div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>`
    let response =await fetch(`https://nutriplan-api.vercel.app/api/products/category/${productName}`)
    let data =await response.json()
    allProduct=data.result
    renderProducts(allProduct)
}
function renderProducts(allProduct){
     let  cartona='';
      if(allProduct==undefined || allProduct.length==0){
        document.getElementById("products-count").innerHTML=`No products found`
      document.getElementById("products-grid").innerHTML=`<div class="flex flex-col items-center justify-center py-12 text-center">
    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
    </div>
    <p class="text-gray-500 text-lg">No recipes found</p>
    <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
</div>`
    }
     if(allProduct){
        for(let i=0 ;i<allProduct.length;i++){
            document.getElementById("products-count").innerHTML=`Found ${allProduct.length} products for "${allProduct[i].name}"`
cartona+=`<div
                class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                data-barcode="${allProduct[i].barcode}"
              >
                <div
                  class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
                >
                  <img
                    class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    src="${allProduct[i].image}"
                    alt="${allProduct[i].name}"
                    loading="lazy"
                  />

                  <!-- Nutri-Score Badge -->
                  <div
                    class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase"
                  >
                    Nutri-Score ${allProduct[i].nutritionGrade}
                  </div>

                  <!-- NOVA Badge -->
                  <div
                    class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                    title="NOVA 2"
                  >
                    ${allProduct[i].novaGroup? allProduct[i].novaGroup:'0'}
                  </div>
                </div>

                <div class="p-4">
                  <p
                    class="text-xs text-emerald-600 font-semibold mb-1 truncate"
                  >
                    ${allProduct[i].brand}
                  </p>
                  <h3
                    class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
                  >
                    ${allProduct[i].name}
                  </h3>

                  <div
                    class="flex items-center gap-3 text-xs text-gray-500 mb-3"
                  >
                    <span
                      ><i class="fa-solid fa-weight-scale mr-1"></i>250g</span
                    >
                    <span
                      ><i class="fa-solid fa-fire mr-1"></i>${(allProduct[i].nutrients.calories).toFixed(0)} kcal/100g</span
                    >
                  </div>

                  <!-- Mini Nutrition -->
                  <div class="grid grid-cols-4 gap-1 text-center">
                    <div class="bg-emerald-50 rounded p-1.5">
                      <p class="text-xs font-bold text-emerald-700">${(allProduct[i].nutrients.protein).toFixed(1)}g</p>
                      <p class="text-[10px] text-gray-500">Protein</p>
                    </div>
                    <div class="bg-blue-50 rounded p-1.5">
                      <p class="text-xs font-bold text-blue-700">${(allProduct[i].nutrients.carbs).toFixed(1)}g</p>
                      <p class="text-[10px] text-gray-500">Carbs</p>
                    </div>
                    <div class="bg-purple-50 rounded p-1.5">
                      <p class="text-xs font-bold text-purple-700">${(allProduct[i].nutrients.fat).toFixed(1)}g</p>
                      <p class="text-[10px] text-gray-500">Fat</p>
                    </div>
                    <div class="bg-orange-50 rounded p-1.5">
                      <p class="text-xs font-bold text-orange-700">${(allProduct[i].nutrients.sugar).toFixed(1)}g</p>
                      <p class="text-[10px] text-gray-500">Sugar</p>
                    </div>
                  </div>
                </div>
              </div>`
     
     document.getElementById("products-grid").innerHTML=cartona
     }}
}
function renderProductsByBarcode(allProduct){
     
document.getElementById("products-grid").innerHTML=`<div
                class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                data-barcode="${allProduct.barcode}"
              >
                <div
                  class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
                >
                  <img
                    class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    src="${allProduct.image}"
                    alt="${allProduct.name}"
                    loading="lazy"
                  />

                  <!-- Nutri-Score Badge -->
                  <div
                    class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase"
                  >
                    Nutri-Score A
                  </div>

                  <!-- NOVA Badge -->
                  <div
                    class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                    title="NOVA 2"
                  >
                    ${allProduct.novaGroup? allProduct.novaGroup:'0'}
                  </div>
                </div>

                <div class="p-4">
                  <p
                    class="text-xs text-emerald-600 font-semibold mb-1 truncate"
                  >
                    ${allProduct.brand}
                  </p>
                  <h3
                    class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
                  >
                    ${allProduct.name}
                  </h3>

                  <div
                    class="flex items-center gap-3 text-xs text-gray-500 mb-3"
                  >
                    <span
                      ><i class="fa-solid fa-weight-scale mr-1"></i>250g</span
                    >
                    <span
                      ><i class="fa-solid fa-fire mr-1"></i>${allProduct.nutrients.calories} kcal/100g</span
                    >
                  </div>

                  <!-- Mini Nutrition -->
                  <div class="grid grid-cols-4 gap-1 text-center">
                    <div class="bg-emerald-50 rounded p-1.5">
                      <p class="text-xs font-bold text-emerald-700">${allProduct.nutrients.protein}g</p>
                      <p class="text-[10px] text-gray-500">Protein</p>
                    </div>
                    <div class="bg-blue-50 rounded p-1.5">
                      <p class="text-xs font-bold text-blue-700">${allProduct.nutrients.carbs}g</p>
                      <p class="text-[10px] text-gray-500">Carbs</p>
                    </div>
                    <div class="bg-purple-50 rounded p-1.5">
                      <p class="text-xs font-bold text-purple-700">${allProduct.nutrients.fat}g</p>
                      <p class="text-[10px] text-gray-500">Fat</p>
                    </div>
                    <div class="bg-orange-50 rounded p-1.5">
                      <p class="text-xs font-bold text-orange-700">${allProduct.nutrients.sugar}g</p>
                      <p class="text-[10px] text-gray-500">Sugar</p>
                    </div>
                  </div>
                </div>
              </div>`
     
     
}
function filterByNutriScore(score){
    if (score === "all" || score === "All" || score === "ALL") {
        renderProducts(allProduct); // لو ضغط All بنعرض كل المنتجات الأصلية
        return;
    }

    // تصفية المنتجات بناءً على الـ nutrition_grade اللي اتاكدتِ منها
    const filtered = allProduct.filter(product => {
        const productScore = (product.nutritionGrade || "").toLowerCase();
        
        return productScore === score.toLowerCase();
    });


console.log(filtered)
    renderProducts(filtered); // بنبعت المصفوفة المفلترة لدالة العرض
}
function showProductModal(product) {
    let modalContainer = document.getElementById("dynamic-product-modal");
    
    if (!modalContainer) {
        modalContainer = document.createElement("div");
        modalContainer.id = "dynamic-product-modal";
        modalContainer.className = "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4";
        
        modalContainer.innerHTML = `
            <div class="bg-white rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                
        <div class="p-6">
            <!-- Header -->
            <div class="flex items-start gap-6 mb-6">
                <div class="w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                    
                        <img src="${product.image}">
                    
                </div>
                <div class="flex-1">
                    <p class="text-sm text-emerald-600 font-semibold mb-1">${product.name}</p>
                    <h2 class="text-2xl font-bold text-gray-900 mb-2">${product.brand}</h2>
                    <p class="text-sm text-gray-500 mb-3">400 g e</p>
                    
                    <div class="flex items-center gap-3">
                        
                            <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg" style="background-color: #99920">
                                <span class="w-8 h-8 rounded flex items-center justify-center text-white font-bold" style="background-color: #999">
                                    ${product.nutritionGrade}
                                </span>
                                <div>
                                    <p class="text-xs font-bold" style="color: #999">Nutri-Score</p>
                                    <p class="text-[10px] text-gray-600">${product.nutritionGrade}</p>
                                </div>
                            </div>
                        
                        
                        
                            <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg" style="background-color: #ee810020">
                                <span class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style="background-color: #ee8100">
                                    ${product.novaGroup}
                                </span>
                                <div>
                                    <p class="text-xs font-bold" style="color: #ee8100">NOVA</p>
                                    <p class="text-[10px] text-gray-600">Processed</p>
                                </div>
                            </div>
                        
                    </div>
                </div>
                <button  id='close-modal-btn' class="close-product-modal text-gray-400 hover:text-gray-600">
                    <i class="text-2xl" data-fa-i2svg=""><svg class="svg-inline--fa fa-xmark" data-prefix="fas" data-icon="xmark" role="img" viewBox="0 0 384 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"></path></svg></i>
                </button>
            </div>
            
            <!-- Nutrition Facts -->
            <div class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 mb-6 border border-emerald-200">
                <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <i class="text-emerald-600" data-fa-i2svg=""><svg class="svg-inline--fa fa-chart-pie" data-prefix="fas" data-icon="chart-pie" role="img" viewBox="0 0 576 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M512.4 240l-176 0c-17.7 0-32-14.3-32-32l0-176c0-17.7 14.4-32.2 31.9-29.9 107 14.2 191.8 99 206 206 2.3 17.5-12.2 31.9-29.9 31.9zM222.6 37.2c18.1-3.8 33.8 11 33.8 29.5l0 197.3c0 5.6 2 11 5.5 15.3L394 438.7c11.7 14.1 9.2 35.4-6.9 44.1-34.1 18.6-73.2 29.2-114.7 29.2-132.5 0-240-107.5-240-240 0-115.5 81.5-211.9 190.2-234.8zM477.8 288l64 0c18.5 0 33.3 15.7 29.5 33.8-10.2 48.4-35 91.4-69.6 124.2-12.3 11.7-31.6 9.2-42.4-3.9L374.9 340.4c-17.3-20.9-2.4-52.4 24.6-52.4l78.2 0z"></path></svg></i>
                    Nutrition Facts <span class="text-sm font-normal text-gray-500">(per 100g)</span>
                </h3>
                
                <div class="text-center mb-4 pb-4 border-b border-emerald-200">
                    <p class="text-4xl font-bold text-gray-900">${product.nutrients.calories}</p>
                    <p class="text-sm text-gray-500">Calories</p>
                </div>
                
                <div class="grid grid-cols-4 gap-4">
                    <div class="text-center">
                        <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div class="bg-emerald-500 h-2 rounded-full" style="width: 12.6%"></div>
                        </div>
                        <p class="text-lg font-bold text-emerald-600">${product.nutrients.protein}g</p>
                        <p class="text-xs text-gray-500">Protein</p>
                    </div>
                    <div class="text-center">
                        <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div class="bg-blue-500 h-2 rounded-full" style="width: 57.49999999999999%"></div>
                        </div>
                        <p class="text-lg font-bold text-blue-600">${product.nutrients.carbs}g</p>
                        <p class="text-xs text-gray-500">Carbs</p>
                    </div>
                    <div class="text-center">
                        <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div class="bg-purple-500 h-2 rounded-full" style="width: 47.53846153846153%"></div>
                        </div>
                        <p class="text-lg font-bold text-purple-600">${product.nutrients.fat}g</p>
                        <p class="text-xs text-gray-500">Fat</p>
                    </div>
                    <div class="text-center">
                        <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div class="bg-orange-500 h-2 rounded-full" style="width: 100%"></div>
                        </div>
                        <p class="text-lg font-bold text-orange-600">${product.nutrients.sugar}g</p>
                        <p class="text-xs text-gray-500">Sugar</p>
                    </div>
                </div>
                
                <div class="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-emerald-200">
                    <div class="text-center">
                        <p class="text-sm font-semibold text-gray-900">${product.nutrients.fat?product.nutrients.fat:'0' }g</p>
                        <p class="text-xs text-gray-500">Saturated Fat</p>
                    </div>
                    <div class="text-center">
                        <p class="text-sm font-semibold text-gray-900">${product.nutrients.fiber?product.nutrients.fiber:'0' }g</p>
                        <p class="text-xs text-gray-500">Fiber</p>
                    </div>
                    <div class="text-center">
                        <p class="text-sm font-semibold text-gray-900">${product.nutrients.salt?product.nutrients.salt:'0' }g</p>
                        <p class="text-xs text-gray-500">Salt</p>
                    </div>
                </div>
            </div>
            
            <!-- Additional Info -->
            
                <div class="bg-gray-50 rounded-xl p-5 mb-6">
                    <h3 class="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <i class="text-gray-600" data-fa-i2svg=""><svg class="svg-inline--fa fa-list" data-prefix="fas" data-icon="list" role="img" viewBox="0 0 512 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M40 48C26.7 48 16 58.7 16 72l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24L40 48zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM16 232l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0z"></path></svg></i>
                        Ingredients
                    </h3>
                    <p class="text-sm text-gray-600 leading-relaxed">sugar, palm oil</p>
                </div>
            
            
            
                <div class="bg-red-50 rounded-xl p-5 mb-6 border border-red-200">
                    <h3 class="font-bold text-red-700 mb-2 flex items-center gap-2">
                        <i data-fa-i2svg=""><svg class="svg-inline--fa fa-triangle-exclamation" data-prefix="fas" data-icon="triangle-exclamation" role="img" viewBox="0 0 512 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M256 0c14.7 0 28.2 8.1 35.2 21l216 400c6.7 12.4 6.4 27.4-.8 39.5S486.1 480 472 480L40 480c-14.1 0-27.2-7.4-34.4-19.5s-7.5-27.1-.8-39.5l216-400c7-12.9 20.5-21 35.2-21zm0 352a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm0-192c-18.2 0-32.7 15.5-31.4 33.7l7.4 104c.9 12.5 11.4 22.3 23.9 22.3 12.6 0 23-9.7 23.9-22.3l7.4-104c1.3-18.2-13.1-33.7-31.4-33.7z"></path></svg></i>
                        Allergens
                    </h3>
                    <p class="text-sm text-red-600">milk, nuts, soybeans</p>
                </div>
            
            
            <!-- Actions -->
            <div class="flex gap-3">
                <button id='runProduct' class="add-product-to-log flex-1 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all" data-barcode="3017620422003">
                    <i class="mr-2" data-fa-i2svg=""><svg class="svg-inline--fa fa-plus" data-prefix="fas" data-icon="plus" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z"></path></svg></i>Log This Food
                </button>
                <button id="closemodal" class="close-product-modal flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all">
                    Close
                </button>
            </div>
        </div>
    
            </div>
        `;
        document.body.appendChild(modalContainer);

        
        document.getElementById("close-modal-btn").addEventListener("click", () => {
            modalContainer.classList.add("hidden");
        });
        document.getElementById("closemodal").addEventListener("click", () => {
            modalContainer.classList.add("hidden");
                 Swal.fire({
  title: 'Error!',
  text: 'Cancel This Product',
  icon: 'error',
  confirmButtonText: 'Cool'
})
        });
        document.getElementById("runProduct").addEventListener("click", () => {
            modalContainer.classList.add("hidden");
            logProductToDailyIntake(product)
                      Swal.fire({
  title: "Log Product Successfully!",
  icon: "success",
  draggable: true
});
        });
    }


    modalContainer.classList.remove("hidden");
}

function displaycategoryProducts(allProduct){
    let cartona=''
    for(let i=0 ; i < 12 ; i++){
        cartona+=`
        <button id='${allProduct[i].id}'
                class="product-category-btn px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium whitespace-nowrap hover:bg-emerald-200 transition-all"
              >
                <i class="fa-solid fa-cookie mr-1.5"></i>${allProduct[i].name}
              </button>`
            
    }
    document.getElementById("product-categories").innerHTML=cartona
}



// =============================Food Log================================





function logProductToDailyIntake(product){

    let dailyLog = JSON.parse(localStorage.getItem("nutriPlanDailyLog")) || [];

 
    const loggedItem = {
        id: String(Date.now()),
        name:  product.name || "Unknown Product",
        brand:  product.brand || "",
        calories: product.nutrients?.calories || 0,
        protein: product.nutrients?.protein || 0,
        carbs: product.nutrients?.carbs ||  0,
        fat: product.nutrients?.fat || 0,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toISOString().split('T')[0] 
    };

    
    dailyLog.push(loggedItem);

   
    localStorage.setItem("nutriPlanDailyLog", JSON.stringify(dailyLog));
console.log(dailyLog)
    
    updateDailyLogUI()
}
let dailyLog =[]
function deleteLoggedItem(i){
    console.log(i)
     dailyLog = JSON.parse(localStorage.getItem("nutriPlanDailyLog")) || [];

    
   dailyLog.splice(i ,1)



    
    localStorage.setItem("nutriPlanDailyLog", JSON.stringify(dailyLog));
    updateDailyLogUI();
}
window.deleteLoggedItem = deleteLoggedItem;
function updateDailyLogUI() {
    
    const dailyLog = JSON.parse(localStorage.getItem("nutriPlanDailyLog")) || [];
    
  
    const todayStr = new Date().toISOString().split('T')[0];
    
    
    const todaysItems = dailyLog.filter(item => item.date === todayStr);

    
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    todaysItems.forEach(item => {
        totalCalories += Number(item.calories) || 0;
        totalProtein += Number(item.protein) || 0;
        totalCarbs += Number(item.carbs) || 0;
        totalFat += Number(item.fat) || 0;
    });

    const itemsCountElement = document.getElementById("logged-items-count");
    if (itemsCountElement) itemsCountElement.textContent = `(${todaysItems.length})`;
// --- 1. Calories ---
document.getElementById("calories-val").textContent = `${Math.round(totalCalories)}/ 2000 kcal`;
let calPercent = Math.min((totalCalories / 2000) * 100, 100); 
document.getElementById("calories-progress").style.width = `${calPercent}%`;

// --- 2. Protein ---
document.getElementById("protein-val").textContent = `${Math.round(totalProtein)}/ 50 g`;
let proteinPercent = Math.min((totalProtein / 50) * 100, 100); 
document.getElementById("protein-progress").style.width = `${proteinPercent}%`;

// --- 3. Carbs ---
document.getElementById("carbs-val").textContent = `${Math.round(totalCarbs)}/ 250 g`;
let carbsPercent = Math.min((totalCarbs / 250) * 100, 100); 
document.getElementById("carbs-progress").style.width = `${carbsPercent}%`;

// --- 4. Fat ---
document.getElementById("fat-val").textContent = `${Math.round(totalFat)} / 65 g`;
let fatPercent = Math.min((totalFat / 65) * 100, 100); 
document.getElementById("fat-progress").style.width = `${fatPercent}%`;
    
    const container = document.getElementById("logged-items-list");
    if (container) {
        container.innerHTML = ""; 

        if (todaysItems.length === 0) {
            document.getElementById("LoggedItems").innerHTML=`<h4 class="text-sm font-semibold text-gray-700">
                  Logged Items (0)
                </h4>
                <button
                  id="clear-foodlog"
                  class="text-red-500 hover:text-red-600 text-sm font-medium"
                  style="display: none"
                >
                  <i class="fa-solid fa-trash mr-1"></i>Clear All
                </button>`
            container.innerHTML = `<div class="text-center py-12">
                    <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="text-3xl text-gray-300" data-fa-i2svg=""><svg class="svg-inline--fa fa-utensils" data-prefix="fas" data-icon="utensils" role="img" viewBox="0 0 512 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M63.9 14.4C63.1 6.2 56.2 0 48 0s-15.1 6.2-16 14.3L17.9 149.7c-1.3 6-1.9 12.1-1.9 18.2 0 45.9 35.1 83.6 80 87.7L96 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-224.4c44.9-4.1 80-41.8 80-87.7 0-6.1-.6-12.2-1.9-18.2L223.9 14.3C223.1 6.2 216.2 0 208 0s-15.1 6.2-15.9 14.4L178.5 149.9c-.6 5.7-5.4 10.1-11.1 10.1-5.8 0-10.6-4.4-11.2-10.2L143.9 14.6C143.2 6.3 136.3 0 128 0s-15.2 6.3-15.9 14.6L99.8 149.8c-.5 5.8-5.4 10.2-11.2 10.2-5.8 0-10.6-4.4-11.1-10.1L63.9 14.4zM448 0C432 0 320 32 320 176l0 112c0 35.3 28.7 64 64 64l32 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-448c0-17.7-14.3-32-32-32z"></path></svg></i>
                    </div>
                    <p class="text-gray-500 font-medium mb-2">No food logged today</p>
                    <p class="text-gray-400 text-sm mb-4">Start tracking your nutrition by logging meals or scanning products</p>
                    <div class="flex justify-center gap-3">
                        <a href="#meals" class="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all">
                            <i data-fa-i2svg=""><svg class="svg-inline--fa fa-plus" data-prefix="fas" data-icon="plus" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z"></path></svg></i>
                            Browse Recipes
                        </a>
                        <a href="/products" class="nav-link inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
                            <i data-fa-i2svg=""><svg class="svg-inline--fa fa-barcode" data-prefix="fas" data-icon="barcode" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M32 32C14.3 32 0 46.3 0 64L0 448c0 17.7 14.3 32 32 32s32-14.3 32-32L64 64c0-17.7-14.3-32-32-32zm88 0c-13.3 0-24 10.7-24 24l0 400c0 13.3 10.7 24 24 24s24-10.7 24-24l0-400c0-13.3-10.7-24-24-24zm72 32l0 384c0 17.7 14.3 32 32 32s32-14.3 32-32l0-384c0-17.7-14.3-32-32-32s-32 14.3-32 32zm208-8l0 400c0 13.3 10.7 24 24 24s24-10.7 24-24l0-400c0-13.3-10.7-24-24-24s-24 10.7-24 24zm-96 0l0 400c0 13.3 10.7 24 24 24s24-10.7 24-24l0-400c0-13.3-10.7-24-24-24s-24 10.7-24 24z"></path></svg></i>
                            Scan Product
                        </a>
                    </div>
                </div>`;
            return;
        }

        todaysItems.forEach((item, i) => {
            document.getElementById("LoggedItems").innerHTML=`<h4 class="text-sm font-semibold text-gray-700">
                  Logged Items (${i+1})
                </h4>
                <button
                  id="clear-foodlog"
                  class="text-red-500 hover:text-red-600 text-sm font-medium"
                  style="display: block"
                >
                  <i class="fa-solid fa-trash mr-1"></i>Clear All
                </button>`
            container.innerHTML += `
                <div class="flex items-center justify-between bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all">
                        <div class="flex items-center gap-4">
                            <div class="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                            ${
        item.image && item.image !== "" 
        ? `<img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">`
        : `   <i class="text-blue-600 text-xl" data-fa-i2svg=""><svg class="svg-inline--fa fa-box" data-prefix="fas" data-icon="box" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M369.4 128l-34.3-48-222.1 0-34.3 48 290.7 0zM0 148.5c0-13.3 4.2-26.3 11.9-37.2L60.9 42.8C72.9 26 92.3 16 112.9 16l222.1 0c20.7 0 40.1 10 52.1 26.8l48.9 68.5c7.8 10.9 11.9 23.9 11.9 37.2L448 416c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 148.5z"></path></svg></i>
                               `
    }
                                  </div>
                            <div>
                                <p class="font-semibold text-gray-900">${item.name}</p>
                                <p class="text-sm text-gray-500">
                                    ${item.brand}
                                    <span class="mx-1">•</span>
                                    <span class="text-blue-600">Product</span>
                                </p>
                                <p class="text-xs text-gray-400 mt-1">${item.time}</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="text-right">
                                <p class="text-lg font-bold text-emerald-600">${Math.round(item.calories)}</p>
                                <p class="text-xs text-gray-500">kcal</p>
                            </div>
                            <div class="hidden md:flex gap-2 text-xs text-gray-500">
                                <span class="px-2 py-1 bg-blue-50 rounded">${Math.round(item.protein)}g P</span>
                                <span class="px-2 py-1 bg-amber-50 rounded">${Math.round(item.carbs)}g C</span>
                                <span class="px-2 py-1 bg-purple-50 rounded">${Math.round(item.fat)}g F</span>
                            </div>
                            <button onclick="deleteLoggedItem(${i})" class="remove-foodlog-item text-gray-400 hover:text-red-500 transition-all p-2" data-index="0">
                                <i data-fa-i2svg=""><svg class="svg-inline--fa fa-trash-can" data-prefix="fas" data-icon="trash-can" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M136.7 5.9C141.1-7.2 153.3-16 167.1-16l113.9 0c13.8 0 26 8.8 30.4 21.9L320 32 416 32c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 8.7-26.1zM32 144l384 0 0 304c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-304zm88 64c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24zm104 0c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24zm104 0c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24z"></path></svg></i>
                            </button>
                        </div>
                    </div>
            `;
        });
    }
    updateWeeklyOverview()
}
function updateWeeklyOverview() {
    const dailyLog = JSON.parse(localStorage.getItem("nutriPlanDailyLog")) || [];
    const chartContainer = document.getElementById("weekly-chart"); 
    
    if (!chartContainer) return;

    
    const daysList = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateString = d.toISOString().split('T')[0]; 
        const dayName = d.toLocaleDateString('en-US', { weekday: 'short' }); 
        const dayNum = d.getDate(); 
        
        daysList.push({ dateString, dayName, dayNum });
    }

   
    const dayDataMap = {};
    dailyLog.forEach(item => {
        if (!dayDataMap[item.date]) {
            dayDataMap[item.date] = { calories: 0, count: 0 };
        }
        dayDataMap[item.date].calories += Number(item.calories) || 0;
        dayDataMap[item.date].count += 1;
    });

    
    let totalCaloriesAllDays = 0;
    let totalItemsWeek = dailyLog.length;
    let daysOnGoalCount = 0;

    daysList.forEach(day => {
        const data = dayDataMap[day.dateString] || { calories: 0, count: 0 };
        totalCaloriesAllDays += data.calories;
        
        if (data.calories > 0 && data.calories <= 2000) {
            daysOnGoalCount++;
        }
    });

    const weeklyAverage = Math.round(totalCaloriesAllDays / 7);

    
    let daysHtml = daysList.map(day => {
        const data = dayDataMap[day.dateString] || { calories: 0, count: 0 };
        const isToday = day.dateString === new Date().toISOString().split('T')[0];
       
        const bgClass = data.calories > 0 ? 'bg-indigo-50/50 border-indigo-200' : 'bg-transparent';
        
        return `
            <div class="flex-1 text-center p-2 rounded-xl border border-gray-100 ${bgClass}">
                <div class="text-xs text-gray-400 font-medium">${day.dayName}</div>
                <div class="text-sm font-bold text-gray-700 mb-2">${day.dayNum}</div>
                <div class="text-sm font-semibold text-gray-800">${Math.round(data.calories)}</div>
                <div class="text-[10px] text-gray-400">kcal</div>
                <div class="text-[10px] text-gray-500 mt-1">${data.count > 0 ? `${data.count} items` : ''}</div>
            </div>
        `;
    }).join('');

    
    chartContainer.innerHTML = `
        <div class="w-full">
            <!-- صف الأيام الـ 7 -->
            <div class="flex justify-between gap-2 mb-6">
                ${daysHtml}
            </div>
            
          `;
          const avgEl = document.getElementById("weekly-avg-val");
    const itemsEl = document.getElementById("weekly-items-val");
    const goalEl = document.getElementById("weekly-goal-val");

    if (avgEl) avgEl.innerHTML = `
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                                <i class="text-emerald-600 text-xl" data-fa-i2svg=""><svg class="svg-inline--fa fa-chart-line" data-prefix="fas" data-icon="chart-line" role="img" viewBox="0 0 512 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64L0 400c0 44.2 35.8 80 80 80l400 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 416c-8.8 0-16-7.2-16-16L64 64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7 262.6 153.4c-12.5-12.5-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l73.4-73.4 57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z"></path></svg></i>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500">Weekly Average</p>
                                <p class="text-xl font-bold text-gray-900">${weeklyAverage} kcal</p>
                            </div>
                        </div>
                    `;
    if (itemsEl) itemsEl.innerHTML = `<div class="flex items-center gap-3">
                            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <i class="text-blue-600 text-xl" data-fa-i2svg=""><svg class="svg-inline--fa fa-utensils" data-prefix="fas" data-icon="utensils" role="img" viewBox="0 0 512 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M63.9 14.4C63.1 6.2 56.2 0 48 0s-15.1 6.2-16 14.3L17.9 149.7c-1.3 6-1.9 12.1-1.9 18.2 0 45.9 35.1 83.6 80 87.7L96 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-224.4c44.9-4.1 80-41.8 80-87.7 0-6.1-.6-12.2-1.9-18.2L223.9 14.3C223.1 6.2 216.2 0 208 0s-15.1 6.2-15.9 14.4L178.5 149.9c-.6 5.7-5.4 10.1-11.1 10.1-5.8 0-10.6-4.4-11.2-10.2L143.9 14.6C143.2 6.3 136.3 0 128 0s-15.2 6.3-15.9 14.6L99.8 149.8c-.5 5.8-5.4 10.2-11.2 10.2-5.8 0-10.6-4.4-11.1-10.1L63.9 14.4zM448 0C432 0 320 32 320 176l0 112c0 35.3 28.7 64 64 64l32 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-448c0-17.7-14.3-32-32-32z"></path></svg></i>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500">Total Items This Week</p>
                                <p class="text-xl font-bold text-gray-900"> ${totalItemsWeek} items</p>
                            </div>
                        </div>`;
    if (goalEl) goalEl.innerHTML = `<div class="flex items-center gap-3">
                            <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                <i class="text-purple-600 text-xl" data-fa-i2svg=""><svg class="svg-inline--fa fa-bullseye" data-prefix="fas" data-icon="bullseye" role="img" viewBox="0 0 512 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M448 256a192 192 0 1 0 -384 0 192 192 0 1 0 384 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm256 80a80 80 0 1 0 0-160 80 80 0 1 0 0 160zm0-224a144 144 0 1 1 0 288 144 144 0 1 1 0-288zM224 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"></path></svg></i>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500">Days On Goal</p>
                                <p class="text-xl font-bold text-gray-900">${daysOnGoalCount} / 7</p>
                            </div>
                        </div>`;
}
function displayCurrentDate() {
    const dateElement = document.getElementById("foodlog-date");
    if (!dateElement) return;

    const today = new Date();
    
   
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);

    dateElement.textContent = formattedDate;
}


document.addEventListener("DOMContentLoaded", () => {
    displayCurrentDate();
     updateWeeklyOverview()
     updateDailyLogUI()
});





















document.getElementById("search-product-btn").addEventListener("click",function(){
let searchValue=productSearchInput.value
searchProducts(searchValue)


})
document.getElementById("lookup-barcode-btn").addEventListener("click",function(){
let searchLookValue=barcodeSearch.value
searchBarcodeProducts(searchLookValue)

})
for(let i=0 ;i<navTap.length ;i++){
navTap[i].addEventListener("click",(e)=>getNav(e))
navTap[0].click()
}

document.getElementById("categories-grid").addEventListener("click", function(e) {
    const card = e.target.closest(".category-card");
    if (card) {
        const categoryName = card.dataset.category;
        FilterByCategory(categoryName);
        console.log(categoryName)
    }
});
document.getElementById("product-categories").addEventListener("click", function(e) {
    const card = e.target.closest(".product-category-btn");
    if (card) {
        const productName = card.getAttribute("id")
        FilterByCategoryProduuct(productName)
        console.log(productName)
    }
});

document.getElementById("areas-grid").addEventListener("click", function(e) {
    const card = e.target.closest("button"); 
    
    if (card) {
        const allButtons = document.querySelectorAll("#areas-grid button");
        allButtons.forEach(btn => {
            btn.classList.remove("bg-emerald-600", "text-white", "hover:bg-emerald-700");
            btn.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
        });

        card.classList.remove("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
        card.classList.add("bg-emerald-600", "text-white", "hover:bg-emerald-700");

        const areaName = card.dataset.areas;
        FilterByMeal(areaName);
        console.log(areaName);
    }
});
let selectedMeal;
 if (recipesGrid) {
    recipesGrid.addEventListener("click", function(e) {
        const mealCard = e.target.closest('.recipe-card');
        if (mealCard){
            for (let i = 0; i < mealSections.length; i++) {
    mealSections[i].style.display = "none";
}
           mealDetails.style.display = "block";
          const mealId = mealCard.dataset.mealId;


 selectedMeal = allMeal.find(meal => meal.id == mealId || meal.idMeal == mealId);

if (selectedMeal) {
    console.log(selectedMeal);
    displayCard(selectedMeal);
    getMealNutrition(selectedMeal);
} else {
    
    fetch(`https://nutriplan-api.vercel.app/api/meals/search?q=chicken&page=1&limit=25`) 
       .then(res => res.json())
        .then(data => {
            const allMealsData = data.results || data;
            selectedMeal = allMealsData.find(meal => meal.id == mealId || meal.idMeal == mealId);
            if (selectedMeal) {
                console.log(selectedMeal);
                displayCard(selectedMeal);
                getMealNutrition(selectedMeal);
            }
        })
        .catch(err => console.error("Error fetching meals:", err));
}
        }})}

backBtn.addEventListener("click",function(){
            navTap[0].click()
        })
for(let i=0 ; i<cardShow.length ;i++){
  
viewBtn.addEventListener("click",function(){
            viewBtn.classList.add('bg-white' , 'rounded-md' , 'shadow-sm')
            listBtn.classList.remove('bg-white' , 'rounded-md' , 'shadow-sm')
            recipesGrid.classList.add("grid-cols-4" , "gap-5")
            recipesGrid.classList.remove("grid-cols-2" , "gap-4")
            cardShow[i].classList.remove("flex" ,"flex-row" ,"h-40")
            extra.children.classList.remove("hidden")
            change.children.classList.add('h-48')
            change.children.classList.remove('w-48' ,' h-full')
        })
listBtn.addEventListener("click",function(){
            viewBtn.classList.remove('bg-white' , 'rounded-md' , 'shadow-sm')
            listBtn.classList.add('bg-white' , 'rounded-md' , 'shadow-sm')
            recipesGrid.classList.remove("grid-cols-4" , "gap-5")  
            recipesGrid.classList.add("grid-cols-2" , "gap-4")
            cardShow[i].classList.add("flex" ,"flex-row" ,"h-40")
            extra.children.classList.add("hidden")
            change.children.classList.remove('h-48')
            change.children.classList.add('w-48' ,' h-full')
        })
}

for(let i=0;i<nutritionProduct.length;i++){
nutritionProduct[i].addEventListener("click",function(){
   let score = nutritionProduct[i].dataset.grade;
     filterByNutriScore(score);
})
}
document.addEventListener("click",function(e){
    if(e.target.closest("#clear-foodlog")){
        dailyLog=[]
         localStorage.setItem("nutriPlanDailyLog", JSON.stringify(dailyLog));
         updateDailyLogUI();
    }
        
    })

document.getElementById("log-meal-btn").addEventListener('click',function(){
    showMealModal(selectedMeal)
})
