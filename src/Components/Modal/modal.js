function mouseLeave(input){
    document.getElementById("modal-card").removeChild(input)
}

function mouseOver(input){

    const container = document.getElementById("modal-card")

    container.childNodes[0] !== undefined && mouseLeave(container.childNodes[0])

    const card = input.cloneNode(true);
    const key = card.getAttribute("key");

    card.removeAttribute("onmouseover");

    const cardParams = document.getElementById(card.id).getBoundingClientRect();

    const coordinates = {
        x: cardParams.left+(cardParams.width-345)/2,
        y: event.pageY - cardParams.height/2
    }

    let modal_card = document.createElement("div");
    modal_card.setAttribute("onmouseleave", "mouseLeave(this)");
    modal_card.setAttribute("id", `modal_${key}`);
    modal_card.classList.add("modal-card");
    modal_card.style.left = `${coordinates.x}px`;
    modal_card.style.top = `${coordinates.y}px`;
    
    let control = document.createElement("div");
    control.classList.add("control-modal-card");

    let title = document.createElement("h2");
    title.classList.add("modal-card-title");
    title.innerHTML = card.getAttribute("name");

    let button_wrapper = document.createElement("div");
    button_wrapper.classList.add("button-wrapper");

    let btn_play = document.createElement("button");
    btn_play.setAttribute("onclick", `onPlay(${key})`);
    btn_play.classList.add("control-play");
    btn_play.innerHTML = "<i class='fas fa-play'></i>";

    let btn_myList = document.createElement("button");
    btn_myList.innerHTML = "<i class='fas fa-plus'></i>";

    let btn_like = document.createElement("button");
    btn_like.innerHTML = "<i class='far fa-thumbs-up'></i>";

    let btn_deslike = document.createElement("button");
    btn_deslike.innerHTML = "<i class='far fa-thumbs-down'></i>";

    let btn_moreInfo = document.createElement("button");
    btn_moreInfo.setAttribute("onclick", `onInfo(${key})`);
    btn_moreInfo.classList.add("control-moreInfo");
    btn_moreInfo.innerHTML = "<i class='fas fa-chevron-down'></i>";
    
    modal_card.appendChild(card);
    modal_card.appendChild(control);
    control.appendChild(title);
    control.appendChild(button_wrapper);
    button_wrapper.appendChild(btn_play);
    button_wrapper.appendChild(btn_myList);
    button_wrapper.appendChild(btn_like);
    button_wrapper.appendChild(btn_deslike);
    button_wrapper.appendChild(btn_moreInfo);

    document.getElementById('modal-card').appendChild(modal_card)
}

function onPlay(input){ }
function onInfo(input){ }