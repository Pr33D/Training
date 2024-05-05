let images = ['pic1.jpg','pic2.jpg','pic3.jpg','pic4.jpg','pic5.jpg','pic6.jpg','pic7.jpg'];
window.onload = localCall();

const main = document.getElementById("main");
const greatView = document.getElementById("greatView");
const greatPic = document.getElementById("greatPic");

function showpics() {
    let container = document.getElementById("piccontainer");
    container.innerHTML="";

    for (let x = 0; x < images.length; x++) {
        container.innerHTML += `<div class="thumbnail"><img src="pics/${images[x]}" class="thumb" onclick="resize(${x})"></div>`;
    }
    localSave();
}

function resize(picIndex) {
localCall();
    main.classList.add("invi");
    document.body.classList.add("bgblk");
    greatView.classList.remove("invi");
    greatView.classList.add("bild");

    picId = picIndex + 1;
    openPic(picId);
}

function openPic(picId) {
    greatPic.innerHTML = `<img src="pics/pic${picId}.jpg">`;

    document.getElementById("btns").innerHTML = `<button id="last" onclick="lastPic(${picId})"><</button>
    <button id="next" onclick="nextPic(${picId})">></button>
    <button id="close" onclick="closePic()">X</button>`;
}

function closePic() {
    greatView.classList.remove("bild");
    greatView.classList.add("invi");
    document.body.classList.remove("bgblk");
    main.classList.remove("invi");
    greatPic.innerHTML = ``;
}

 function nextPic(picId) {
    if (picId >= images.length) {
        picId = 1;
    } else {
        picId += 1;
    }
    openPic(picId);
 }

function lastPic(picId) {
    if (picId <= 1) {
        picId = images.length;
    } else {
        picId -= 1;
    } 
    openPic(picId);
}

function localSave() {
let imagessaved = JSON.stringify(images);
localStorage.setItem("pictures", imagessaved);
}

function localCall() {
    let imagessaved = localStorage.getItem("pictures");
    if(imagessaved) {
        images = JSON.parse(imagessaved)
    }
    showpics();
}