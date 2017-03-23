var button = document.getElementById('submit');
var fieldShow = document.getElementById('playground');
var tag = document.getElementById('select');
var creatClass = document.getElementById('creatClass');
var containTag = document.getElementById('text');
var listTag = creatListOption(tag);
var nameAttr = 'value';
creatValue(tag.children, listTag, nameAttr);

button.onclick = function(e) {
    e.preventDefault();
    creatClass = creatClass.value;
    containTag = containTag.value;
    tag = tag.value;
    creatNewElement(tag, creatClass, containTag);
}

function creatListOption(listOption) {
    var arrOption = [];
    for (var i = 0; i < listOption.length; i++) {
        arrOption[i] = listOption[i].textContent;
    }
    return arrOption;
}

function creatValue(listElements, listValue, attr) {
    for (var i = 0; i < listElements.length; i++) {
        listElements[i].setAttribute(attr, listValue[i])
    }
}

function creatNewElement(t, cC, cT) {
    var newElement = document.createElement(t);
    if (cC) {
        newElement.className = cC;
    }
    if (cT) {
        newElement.innerHTML = cT;
    }
    addElement(newElement);
}

function addElement(newTag) {
    fieldShow.appendChild(newTag);
}