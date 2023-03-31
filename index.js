let myBgColors = ["black","lime","yellogreen","#ffffff","#333"]

let pageEl = document.getElementById('containerBg');
let addBtn = document.getElementById("btnAdd")
let unOrderListEl = document.getElementById("listId");
let saveTodoBtn = document.getElementById("btnSave");
let mainHeadEl = document.getElementById("mainHead");
let inputHedEl = document.getElementById('inputId');
let headListEl = document.getElementById("headList");
/* Border Styles*/
let listItemsEl = document.getElementById("listItems");
let userInputTodo = document.getElementById("todoInput");
let mainContainerEl = document.getElementById("mainContainer");

let myCount = myBgColors.length;

let randomColorsM = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
}
let myColors = () => {
    return myBgColors[Math.ceil(Math.random()*myCount)]
}

getTodosListFromLocalStorage = () =>{
    let stringifyValue = localStorage.getItem("myTodo");
    let parsedTodoList = JSON.parse(stringifyValue);
    if(parsedTodoList === null){
        return [];
    }else{
        return parsedTodoList;
    }
}

let myTodosList = getTodosListFromLocalStorage()
let todosCount = myTodosList.length

saveTodoBtn.onclick = () => {
    localStorage.setItem("myTodo",JSON.stringify(myTodosList))
    /*Border Color */
    let newOne = randomColorsM();
    listItemsEl.style.borderColor = newOne;
    userInputTodo.style.borderColor = newOne;
    userInputTodo.style.color = newOne;
    mainContainerEl.style.borderColor = newOne;
}

addTodoList = () => {
    let userInputValue = userInputTodo.value;

    if (userInputValue === ""){
        alert("Please Enter Valid Text");
        return;
    }

    pageEl.style.backgroundImage = `radial-gradient(circle, ${randomColorsM()}, ${randomColorsM()})`
    listItemsEl.style.backgroundColor = 'transparent'
    mainHeadEl.style.color = (myColors());
    inputHedEl.style.color = (myColors());
    headListEl.style.color = (myColors());

    /*Border Colors */
    let newOne = randomColorsM();
    listItemsEl.style.borderColor = newOne;
    userInputTodo.style.borderColor = newOne;
    userInputTodo.style.color = newOne;
    mainContainerEl.style.borderColor = newOne;
    

    todosCount = todosCount + 1;
    let newTodo = {
        text:userInputValue,
        uniqueNo:todosCount,
        isChecked:false,
        isColor:randomColorsM()
    }

    myTodosList.push(newTodo);
    createAndAppendTodos(newTodo)
    userInputTodo.value = ''
}

addBtn.onclick = () => {
    addTodoList();
}

clickDeleteList = (todosId) =>{
    let todoEl = document.getElementById(todosId);
    unOrderListEl.removeChild(todoEl)

    let deleteElementIndex = myTodosList.findIndex((eachTodo) =>{
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todosId){
            return true;
        }else{
            return false;
        }
    });
    myTodosList.splice(deleteElementIndex,1);
    localStorage.removeItem("myTodo")
    
    /*Border Colors */
    let newOne = randomColorsM();
    listItemsEl.style.borderColor = newOne;
    userInputTodo.style.borderColor = newOne;
    userInputTodo.style.color = newOne;
    mainContainerEl.style.borderColor = newOne;
}

onTodoStatusChange = (checkboxId, labelId, todosId) => {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");

    let todoObjectIndex = myTodosList.findIndex((eachTodo) =>{
        let eachTodoId = "todo" + eachTodo.uniqueNo;

        if (eachTodoId === todosId){
            return true;
        }else{
            return false;
        }
    });
    let todoObject = myTodosList[todoObjectIndex];

    if(todoObject.isChecked === true){
        todoObject.isChecked = false;
    }else{
        todoObject.isChecked = true;
    }
}

function createAndAppendTodos(each){
    let isColors = each.isColor;
    let todosId = 'todo' + each.uniqueNo;
    let checkboxId = 'checkbox' + each.uniqueNo;
    let labelId = 'label' + each.uniqueNo;
    
    // Create a list Element and add Items in this list
    let listEl = document.createElement('li')
    listEl.classList.add('list-items')
    listEl.id = todosId;
    unOrderListEl.appendChild(listEl)

    // Create a checkBox
    let checkBoxEl = document.createElement("input")
    checkBoxEl.type = "checkBox";
    checkBoxEl.id = checkboxId;

    checkBoxEl.onclick = function() {
        onTodoStatusChange(checkboxId, labelId,todosId);
        let newOne = randomColorsM()
        delIcoEl.style.color = newOne;
        labelConEl.style.borderColor = newOne;
        labelConEl.style.color = newOne;
    };

    checkBoxEl.classList.add("check-input")
    listEl.appendChild(checkBoxEl)

    //Create label Container
    let labelConEl = document.createElement("div")
    labelConEl.classList.add("label-input")
    labelConEl.style.borderColor = isColors;
    labelConEl.style.color = isColors;
    listEl.appendChild(labelConEl)
    
    // Create a label of CheckBox
    let labelEl  = document.createElement('label');
    labelEl.setAttribute("for", checkboxId);
    labelEl.id = labelId
    labelEl.textContent = each.text;
    labelEl.classList.add("check-label")
    if (each.text === true){
        labelEl.classList.add("checked");
    }
    labelConEl.appendChild(labelEl)

    //Create Delete Icon Container
    let delCon = document.createElement("div")
    delCon.classList.add("delete-con")
    labelConEl.appendChild(delCon)

    let delIcoEl = document.createElement("i");
    delIcoEl.classList.add("delete-icon","far","fa-trash-alt")
    delIcoEl.style.color = isColors;
    
    delIcoEl.onclick = function () {
        clickDeleteList(todosId)
    };

    delCon.appendChild(delIcoEl)
}

for (let each of myTodosList){
    createAndAppendTodos(each)
} 
