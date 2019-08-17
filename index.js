let tableEl = document.getElementById("container-table");

createHTML = (tableEl, row = 10, column = 15) => {

    getInputHTML = (letter, index) => {
        return `<input class='input-el' readonly id="${letter}${index}" />`;
    }
    for (var i = 0; i < row; i++) {
        var rowEL = tableEl.insertRow(-1);
        for (var j = 0; j < column; j++) {
            var letter = String.fromCharCode(65 + j);
            rowEL.insertCell(-1).innerHTML = getInputHTML(letter, i);
        }
    }
}

applyListeners = (tableEl) => {
    let localValues = {};
    let selectedCell;
    restore = (e) => {
        e.target.value = localValues[e.target.id] || '';
    }

    save = (e) => {
        localValues[e.target.id] = e.target.value || '';
    }

    tableEl.ondblclick = (e) => {
        e.target.removeAttribute('readonly');
        selectedCell = e
    }

    tableEl.onkeyup = function (e) {
        switch (e.code) {
            case 'Escape':
                restore(e);
                e.target.setAttribute('readonly', true);
                break;
            case "Tab":
            case "Enter":
                save(selectedCell);
                e.target.setAttribute('readonly', true);
                break;
        }
    };
    let INPUTS = tableEl.querySelectorAll("input");
    INPUTS.forEach((elm) => {
        elm.onfocus = (e) => {
            restore(e);
        };
        elm.onblur = (e) => {
            save(e)
            e.target.setAttribute('readonly', true);
        };
    });
}


createHTML(tableEl);
applyListeners(tableEl);