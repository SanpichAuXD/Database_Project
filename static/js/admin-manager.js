function addac(x){
    var box = document.getElementsByClassName("box");
    var ac = document.getElementsByClassName("active");
    if(ac.length > 0){;
        ac[0].classList.remove('active');
    }
    box[x].classList.add('active');
}
function removeac(){
    var ac = document.getElementsByClassName("active");
    for (var i = 0; i < ac.length; i++) {
        ac[i].classList.remove('active');
    } 
}