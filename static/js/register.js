var x = 1;
function closing_password(){
    cs = document.getElementById("closing-password");
    ps = document.getElementById("input-password");
    if (x == 1){
        cs.style.backgroundImage = "url('https://cdn0.iconfinder.com/data/icons/font-awesome-solid-vol-2/576/eye-512.png')";
        ps.type = "text";
        x = 0;
    }
    else{
        cs.style.backgroundImage = "url('https://cdn0.iconfinder.com/data/icons/font-awesome-solid-vol-2/640/eye-slash-256.png')";
        ps.type = "password";
        x = 1;
    }
}
y = 1
function closing_cfpassword(){
    cs = document.getElementById("closing-cfpassword");
    ps = document.getElementById("input-cfpassword");
    if (y == 1){
        cs.style.backgroundImage = "url('https://cdn0.iconfinder.com/data/icons/font-awesome-solid-vol-2/576/eye-512.png')";
        ps.type = "text";
        y = 0;
    }
    else{
        cs.style.backgroundImage = "url('https://cdn0.iconfinder.com/data/icons/font-awesome-solid-vol-2/640/eye-slash-256.png')";
        ps.type = "password";
        y = 1;
    }
}