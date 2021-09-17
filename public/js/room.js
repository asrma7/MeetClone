const userContainer = document.getElementById("user-container");
const gallery = document.getElementById("gallery");
let sidebarEnabled = false;
let isPresenting = false;

function recalculateLayout() {
    const aspectRatio = 1.5;
    const screenWidth = gallery.getBoundingClientRect().width;
    const screenHeight = gallery.getBoundingClientRect().height;
    const videoCount = document.getElementsByClassName("user-box").length;

    // or use this nice lib: https://github.com/fzembow/rect-scaler
    function calculateLayout(
        containerWidth,
        containerHeight,
        videoCount,
        aspectRatio
    ) {
        let bestLayout = {
            area: 0,
            cols: 0,
            rows: 0,
            width: 0,
            height: 0
        };

        // brute-force search layout where video occupy the largest area of the container
        for (let cols = 1; cols <= videoCount; cols++) {
            const rows = Math.ceil(videoCount / cols);
            const hScale = containerWidth / (cols * aspectRatio);
            const vScale = containerHeight / rows;
            let width;
            let height;
            if (hScale <= vScale) {
                width = Math.floor(containerWidth / cols);
                height = Math.floor(width / aspectRatio);
            } else {
                height = Math.floor(containerHeight / rows);
                width = Math.floor(height * aspectRatio);
            }
            const area = width * height;
            if (area > bestLayout.area) {
                bestLayout = {
                    area,
                    width,
                    height,
                    rows,
                    cols
                };
            }
        }
        return bestLayout;
    }

    const { width, height, cols } = calculateLayout(
        screenWidth,
        screenHeight,
        videoCount,
        aspectRatio
    );

    userContainer.style.setProperty("--width", width + "px");
    userContainer.style.setProperty("--height", height + "px");
    userContainer.style.setProperty("--cols", cols + "");
}

const debouncedRecalculateLayout = _.debounce(recalculateLayout, 50);
window.addEventListener("resize", debouncedRecalculateLayout);
debouncedRecalculateLayout();

function copyJoinInfo(elm) {
    navigator.clipboard.writeText(`http://localhost:3000/${RoomID}`);
    elm.blur();
}

function toggleMute(elm) {
    elm.classList.toggle('off');
    elm.querySelector('span').innerText = elm.querySelector('span').innerText === 'mic_off' ? 'mic' : 'mic_off';
    elm.blur();
}

function toggleVideoCam(elm) {
    elm.classList.toggle('off');
    elm.querySelector('span').innerText = elm.querySelector('span').innerText === 'videocam_off' ? 'videocam' : 'videocam_off';
    elm.blur();
}

function togglePresentMenu(elm) {
    const presentMenu = document.getElementById('present-menu');
    presentMenu.classList.toggle('active');
    if (isPresenting) {
        presentMenu.querySelector('.stop-options').style.display = 'block';
        presentMenu.querySelector('.present-options').style.display = 'none';
    } else {
        presentMenu.querySelector('.present-options').style.display = 'block';
        presentMenu.querySelector('.stop-options').style.display = 'none';
    }
    if (typeof elm !== 'undefined') {
        elm.blur();
    }
}

function togglePresentScreen(opt) {
    if (opt !== '') {
        document.getElementById('present-btn').classList.add('on');
        isPresenting = true;
    } else {
        document.getElementById('present-btn').classList.remove('on');
        isPresenting = false;
    }
    togglePresentMenu();
}

function toggleFullScreen(elm) {
    if (document.fullscreenElement != null) {
        document.exitFullscreen()
    }
    else {
        document.documentElement.requestFullscreen()
    }
    elm.blur();
}

document.onfullscreenchange = () => {
    document.getElementById('fullscreen').querySelector('span').innerText = document.fullscreenElement === null ? 'fullscreen' : 'fullscreen_exit'
}

function endCall(elm) {
    window.location.href = '/';
    elm.blur();
}

function showInfo(elm) {
    document.getElementById('participants').style.display = 'none';
    document.getElementById('chat').style.display = 'none';
    document.getElementById('meeting-info').style.display = 'block';
    processSidebar(elm);
    elm.blur();
}

function showParticipants(elm) {
    document.getElementById('meeting-info').style.display = 'none';
    document.getElementById('chat').style.display = 'none';
    document.getElementById('participants').style.display = 'block';
    processSidebar(elm);
    elm.blur();
}

function showChat(elm) {
    document.getElementById('meeting-info').style.display = 'none';
    document.getElementById('participants').style.display = 'none';
    document.getElementById('chat').style.display = 'block';
    processSidebar(elm);
    elm.blur();
}

function processSidebar(elm) {
    if (elm.classList.contains('active')) {
        closeSidebar();
        elm.classList.remove('active');
        elm.querySelector('span').classList.remove('material-icons-extended');
    }
    else {
        if (!sidebarEnabled) {
            openSidebar();
        }
        else {
            document.querySelector('.material-icons-extended').parentElement.classList.remove('active');
            document.querySelector('.material-icons-extended').classList.remove('material-icons-extended');
        }
        elm.classList.add('active');
        elm.querySelector('span').classList.add('material-icons-extended');
    }
}


const sidebar = document.getElementById('sidebar');

function openSidebar() {
    sidebar.classList.add('sidebar-open')
    sidebarEnabled = true;
    gallery.classList.add('gallery-shrink')
    setTimeout(recalculateLayout, 250)
}

function closeSidebar() {
    sidebar.classList.remove('sidebar-open')
    sidebarEnabled = false;
    gallery.classList.remove('gallery-shrink')
    setTimeout(recalculateLayout, 250)
}