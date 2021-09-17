function showSettings(elm) {
    openModal();
    elm.blur();
}

// Modal code

var modal = document.getElementById("settingsModal");

const audioSettings = document.getElementById('audio-settings');
const videoSettings = document.getElementById('video-settings');
const generalSettings = document.getElementById('general-settings');

function openModal() {
    audioSettings.style.display = 'block';
    videoSettings.style.display = 'none';
    generalSettings.style.display = 'none';
    modal.style.display = 'flex';
}

// Get the <span> element that closes the modal
var span = document.getElementById("modalclose");

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function showAudio(elm) {
    videoSettings.style.display = 'none';
    generalSettings.style.display = 'none';
    audioSettings.style.display = 'block';
    elm.parentElement.querySelector('.active').classList.remove('active');
    elm.classList.add('active');
}

function showVideo(elm) {
    audioSettings.style.display = 'none';
    generalSettings.style.display = 'none';
    videoSettings.style.display = 'block';
    elm.parentElement.querySelector('.active').classList.remove('active');
    elm.classList.add('active');
}

function showGeneral(elm) {
    audioSettings.style.display = 'none';
    videoSettings.style.display = 'none';
    generalSettings.style.display = 'block';
    elm.parentElement.querySelector('.active').classList.remove('active');
    elm.classList.add('active');
}