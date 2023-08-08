document.addEventListener("DOMContentLoaded" , ()=>{

const show_btn = document.querySelector("#show-content-btn .elementor-button-link");
const content_wrapper = document.querySelector("#hide-content");
let state = false;
show_btn.addEventListener("click" , (e)=>{
    e.preventDefault();
    state = !state;
    if(state){
        document.querySelector("#show-content-btn .elementor-button-link .elementor-button-text").innerHTML = "بستن";
        content_wrapper.style.display = "block";
    }
    else{
        document.querySelector("#show-content-btn .elementor-button-link .elementor-button-text").innerHTML = "مشاهده";
        content_wrapper.style.display = "none";
    }
})
})