
function addac(x){
    var box = document.getElementsByClassName("box");
    var ac = document.getElementsByClassName("active");
    for (var i = 0; i < box.length; i++) {
        if(ac.length > 0){
            ac[i].classList.remove('active')
        }
        box[x].classList.add('active')
    }
}
function removeac(){
    var ac = document.getElementsByClassName("active");
    for (var i = 0; i < ac.length; i++) {
        ac[i].classList.remove('active')
    } 
}