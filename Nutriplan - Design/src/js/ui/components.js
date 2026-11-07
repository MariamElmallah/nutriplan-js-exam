// =========== Loading Spinner Design ============
/*
<div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>
*/

// =========== Empty State Design ============
/*
<div class="flex flex-col items-center justify-center py-12 text-center">
    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
    </div>
    <p class="text-gray-500 text-lg">No recipes found</p>
    <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
</div>
*/
/*
<div class="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm mb-3 border border-gray-100">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-bold">
                            <i class="fa-solid fa-box"></i>
                        </div>
                        <div>
                            <h4 class="font-bold text-gray-800">${item.name}</h4>
                            <p class="text-xs text-gray-500">${item.brand} • Product • ${item.time}</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-4">
                        <div class="text-right">
                            <span class="font-bold text-emerald-600">${Math.round(item.calories)}</span>
                            <span class="text-xs text-gray-500 block">kcal</span>
                        </div>
                        <div class="text-xs text-gray-500 hidden sm:block">
                            <span>${Math.round(item.protein)}g P</span> • 
                            <span>${Math.round(item.carbs)}g C</span> • 
                            <span>${Math.round(item.fat)}g F</span>
                        </div>
                        <button onclick="deleteLoggedItem(${index})" class="text-gray-400 hover:text-red-500 transition-colors p-2">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>*/

/*
                  <!-- المربعات الثلاثة اللي تحت في الصورة -->
            <div class="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                <div class="bg-gray-50 p-3 rounded-xl text-center">
                    <span class="text-xs text-gray-400 block">Weekly Average</span>
                    <span class="text-base font-bold text-gray-800">${weeklyAverage} kcal</span>
                </div>
                <div class="bg-gray-50 p-3 rounded-xl text-center">
                    <span class="text-xs text-gray-400 block">Total Items This Week</span>
                    <span class="text-base font-bold text-gray-800">${totalItemsWeek} items</span>
                </div>
                <div class="bg-gray-50 p-3 rounded-xl text-center">
                    <span class="text-xs text-gray-400 block">Days On Goal</span>
                    <span class="text-base font-bold text-gray-800">${daysOnGoalCount}/7</span>
                </div>
            </div>
        </div>
        
        ${totalItemsWeek}*/
     /*  function displaycategory(allMeal){
    let cartona=''
    
    for(let i=0 ; i < 12 ; i++){
        const style = getMealStyle(allMeal.strCategory);
        cartona+=`
        <div
              class="category-card bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-3 border border-emerald-200 hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all group"
              data-category="${allMeal[i].name}"
            >
              <div class="flex items-center gap-2.5">
                <div
                  class="text-white w-9 h-9 bg-gradient-to-br from-emerald-400 ${style.bg} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm"
                >
                  <i class="fa-solid ${style.icon}"></i>
                </div>
                <div>
                  <h3 class="text-sm font-bold text-gray-900">${allMeal[i].name}</h3>
                </div>
              </div>
            </div>`
            
    }
    document.getElementById("categories-grid").innerHTML=cartona
}*/
    

 const mealId = mealCard.dataset.mealId; 
     selectedMeal = allMeal.find(meal => meal.id == mealId);
    console.log(selectedMeal);
    if (selectedMeal) {
        console.log(selectedMeal);
    };
            displayCard(selectedMeal)
            getMealNutrition(selectedMeal)