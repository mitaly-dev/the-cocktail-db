const getCocktailData=async (value)=>{
   let res=await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`)
   let data=await res.json()
   displayCocktail(data.drinks)
}
getCocktailData('')

const displayCocktail=async (data)=>{
    displayOrNone('progress',false)
    if(data==null){
        displayOrNone('errmsg',false)
        displayOrNone('not-found',true)
        return;
    }
displayOrNone('all-drinks',true)
let cockContainer=document.getElementById('all-drinks')
cockContainer.textContent=''
data.forEach(food=>{
let {strDrinkThumb,strDrink,idDrink}=food
let div=document.createElement('div')
div.classList.add('text-center')
div.innerHTML=`
        <div>
            <img class="h-[250px] w-full" src="${strDrinkThumb}" alt="">
        </div>
        <div class="flex justify-between bg-slate-50 py-3 px-3">
        <h3 class="text-slate-600">${strDrink.length>15?strDrink.slice(0,15)+'...':strDrink}</h3>
        <label onclick="details(${idDrink})" class="cursor-pointer text-slate-600 hover:text-orange-300" for="my-modal-3" class="btn modal-button">Details</label>
        </div>
`
cockContainer.appendChild(div)
})
}

const details=async(code)=>{
    let res=await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${code}`)
    let data=await res.json()
    data=data.drinks[0]
    let {strDrinkThumb,strDrink,dateModified,strInstructions,strIngredient1,strIngredient2,strIngredient3,strIngredient4,strIngredient5,strIngredient6,strIngredient7,strMeasure1,strMeasure2,strMeasure3,strMeasure4,strMeasure5,strMeasure6,strMeasure7,strMeasure8}=data
    let modal=document.getElementById('modal-body')
    document.getElementById('title-modal').innerText=`${strDrink}`
    modal.innerHTML=
    `
    <figure><img src="${strDrinkThumb}" alt="Movie" width=50%></figure>
    <ul class="py-3">
    <span class="font-semibold">Ingredient : </span>
    <li>${strIngredient1?`1. ${strIngredient1} - ${strMeasure1}`:'N/A'}</li>
    <li>${strIngredient2?`2. ${strIngredient2} - ${strMeasure2}`:'N/A'}</li>
    <li>${strIngredient3?`3. ${strIngredient3} - ${strMeasure3}`:'N/A'}</li>
    </ul>
    <p><span class="font-semibold">Instructions : </span>${strInstructions}</p>
    `
}

//search
document.getElementById('search-btn').addEventListener('click',function(){
    displayOrNone('progress',true)
    let valueElement=document.getElementById('search-field')
    let value=valueElement.value;
    valueElement.value=''
    displayOrNone('all-drinks',false)
    if(value==''){
        displayOrNone('not-found',false)
        displayOrNone('errmsg',true)
        displayOrNone('progress',false)
    }
    else{
        displayOrNone('errmsg',false)
        displayOrNone('not-found',false)
        getCocktailData(value)
    }
   
})
