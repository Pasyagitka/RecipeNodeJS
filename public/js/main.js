document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('.client-messages-close-button').addEventListener('click', messageContainerClose);
    document.querySelector('.client-messages-open-button').addEventListener('click', messageContainerShow);

    document.querySelector('.list-view-button').addEventListener('click', switchToRowView);
    document.querySelector('.grid-view-button').addEventListener('click', switchToDefaultView);
});

function messageContainerShow() {
    document.querySelector('.client-messages-container').classList.add('client-messages-container-wide');
}
function messageContainerClose() {
    document.querySelector('.client-messages-container').classList.remove('client-messages-container-wide');
}

function switchToRowView() {
    document.querySelectorAll('.recipe-item-wrapper').forEach((item) => {
        item.classList.add('recipe-item-wrapper-row');
        item.classList.remove('recipe-item-wrapper-default');
    })
    document.querySelector('.list-view-button-wrapper').style.backgroundColor = '#1f1c2e';
    document.querySelector('.list-view-button-wrapper > button').classList.add('inverted-colors');
    document.querySelector('.grid-view-button-wrapper').style.backgroundColor = 'transparent';
    document.querySelector('.grid-view-button-wrapper > button').classList.remove('inverted-colors');
}
function switchToDefaultView() {
    document.querySelectorAll('.recipe-item-wrapper').forEach((item) => {
        item.classList.add('recipe-item-wrapper-default');
        item.classList.remove('recipe-item-wrapper-row');
    })
    document.querySelector('.list-view-button-wrapper').style.backgroundColor = 'transparent';
    document.querySelector('.list-view-button-wrapper > button').classList.remove('inverted-colors');
    document.querySelector('.grid-view-button-wrapper').style.backgroundColor = '#1f1c2e';
    document.querySelector('.grid-view-button-wrapper > button').classList.add('inverted-colors');
}

window.addEventListener("resize", function() {
    if (this.window.innerWidth > 880 ) {
        document.querySelector('.client-messages-container').classList.remove('client-messages-container-wide');
    }
});