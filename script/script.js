var now = setInterval(() => {
    document.getElementById("day").innerHTML = new Date().toDateString('en-GB') + " - " + getHour();
}, 1000);

var getHour = () => {
    var time = new Date().toLocaleTimeString();
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var seconds = Number(time.match(/-?\d+\.\d{6}/g));
    var AMPM = time.match(/\s(.*)$/)[1];
    if (AMPM == "PM" && hours < 12) hours = hours + 12;
    if (AMPM == "AM" && hours == 12) hours = hours - 12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    var sSeconds = seconds.toString();
    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;
    if (seconds < 10) sHours = "0" + sSeconds;
    return sHours + ":" + sMinutes + ":" + ((new Date().getSeconds()) < 10 ? "0" : "") + new Date().getSeconds();
}

btn = document.getElementById("btn-operator");
btn.addEventListener("click", () => {
    let str = btn.innerHTML.toString();
    if(str.substr(str.length - 1) == "t"){
        btn.classList.remove("btn-success");
        btn.className += " btn-danger";
        btn.innerHTML = '<i class="far fa-stop-circle"></i> Stop';
    }else if(str.substr(str.length - 1) == "p"){
        btn.classList.remove("btn-danger");
        btn.classList += " btn-primary";
        btn.innerHTML = '<i class="fas fa-trash"></i> Clear';
    }else if(str.substr(str.length -1) == "r"){
        btn.classList.remove("btn-primary");
        btn.classList += " btn-success";
        btn.innerHTML = '<i class="far fa-play-circle"></i> Start';
    }
});