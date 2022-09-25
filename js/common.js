
//
const displayOrNone=(id,display)=>{
    let element=document.getElementById(id)
    if(display===true){
        element.classList.remove('hidden')
    }
    else{
        element.classList.add('hidden')
    }
}



 