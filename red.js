let arr = [
];

let dataInForm = null;


//  function for alerting user whether there information is added, deleted, filtered
function showAlert(message, color){
    let alertDiv = document.querySelector(".alert");
    let div = document.createElement('div');
    div.classList = alert alert-${color};
    div.textContent = message;
    alertDiv.append(div);
    setTimeout(()=>div.remove(), 1000);
}



// function for adding data in the form
let submit = document.querySelector("#submit");
submit.addEventListener('click', addData);
function addData(e){
    e.preventDefault();
    let obj = {};
    let firstName = document.querySelector("#firstname").value;
    let lastName = document.querySelector("#lastname").value;
    let email = document.querySelector("#email").value;
    let profession = document.querySelector("#profession").value;
    let tableBody = document.querySelector('.tableBody');
    let tr = document.createElement("tr");
    obj.firstName = firstName;
    obj.lastName = lastName;
    obj.email = email;
    obj.profession = profession;
    if(firstName == "" || lastName == "" || profession == ""){
        return;
    }
    if(dataInForm === null){
        arr.push(obj);
        let srNo = arr.length;
        tr.innerHTML = `
                <th>${srNo}</th>
                <td>${firstName}</td>
                <td>${lastName}</td>
                <td>${email}</td>
                <td>${profession}</td>
                <td>
                    <button type="button" class="btn btn-light edit">Edit</button>
                    <button type="button" class="btn btn-light delete">Delete</button>
                </td>`;
        tableBody.append(tr);
        showAlert("Row added successfully", "success");
        dataInForm = null;
        clearFields();
    }else{


        // when editing it will change info also in array
        for(let i = 0; i < arr.length; i++){
            if((arr[i].firstName ===  dataInForm.children[1].textContent) && (arr[i].lastName ===  dataInForm.children[2].textContent) && (arr[i].email ===  dataInForm.children[3].textContent) && (arr[i].profession ===  dataInForm.children[4].textContent)){
                arr[i].firstName = firstName;
                arr[i].lastName = lastName;
                arr[i].email = email;
                arr[i].profession = profession;
            }
        }
        // when editing changing the value in web page from the form
        dataInForm.children[1].textContent = firstName;
        dataInForm.children[2].textContent = lastName;
        dataInForm.children[3].textContent = email;
        dataInForm.children[4].textContent = profession;

        showAlert("Selected row is edited", "success");
        dataInForm = null;
        clearFields();
    }
    
    
}




// function for deleting the rows
let table = document.querySelector(".table");
table.addEventListener("click", deleteRow);
function deleteRow(e){
    let tableBody = document.querySelector(".tableBody");
    let target = e.target;
    if(target.classList[2] !== "delete"){
        return;
    }
    let selectedRow = target.parentElement.parentElement;
    selectedRow.remove();

    // deleting row from an array
    for(let i = 0; i < arr.length; i++){
        if((arr[i].firstName ===  selectedRow.children[1].textContent) && (arr[i].lastName ===  selectedRow.children[2].textContent) && (arr[i].email ===  selectedRow.children[3].textContent) && (arr[i].profession ===  selectedRow.children[4].textContent)){
                arr.splice(i, 1);
        }
        tableBody.innerHTML = "";
        let index = 0;
        arr.forEach(user =>{
            let tr = document.createElement("tr");
            let th = document.createElement("th");
            th.textContent = index+1;
            tr.append(th);
            for(let info of Object.values(user)){
                let td = document.createElement('td');
                td.textContent = info;
                tr.append(td);
            }
            let td = document.createElement("td");
            td.innerHTML = ` <button type="button" class="btn btn-light edit">Edit</button>
            <button type="button" class="btn btn-light delete">Delete</button>`;
            tr.append(td);
            tableBody.append(tr);
            index++;
        })
    }
    showAlert("Deleted one row", "success");
}



// function for editing the  rows
table.addEventListener("click", editRow);
function editRow(e){
    let target = e.target;
    if(target.classList[2] !== "edit"){
        return;
    }
    dataInForm = target.parentElement.parentElement;
    document.querySelector("#firstname").value = dataInForm.children[1].textContent;
    document.querySelector("#lastname").value = dataInForm.children[2].textContent;
    document.querySelector("#email").value = dataInForm.children[3].textContent;
    document.querySelector("#profession").value = dataInForm.children[4].textContent;
}



// function for clearing data in the form
function clearFields(){
    let formSelect = document.querySelector(".form-select");
    let professionValue = formSelect.children[0].textContent;
    document.querySelector("#firstname").value = "";
    document.querySelector("#lastname").value = "";
    document.querySelector("#email").value = "";
}



// function to filter the given array

let filterButton = document.querySelector(".filter");
filterButton.addEventListener("click", filterFunc);

function filterFunc(){
    let filterValue = document.querySelector(".filter-form").value;
    let newArr = arr.filter(user=>user.profession === filterValue);
    let tableBody = document.querySelector(".tableBody");
    tableBody.innerHTML = "";
    let index = 0;
    newArr.forEach(user=>{
        let tr = document.createElement("tr");
        let th = document.createElement("th");
        th.textContent = index+1;
        tr.append(th);
        for(let value of Object.values(user)){
            let td = document.createElement('td');
            td.textContent = value;
            tr.append(td)
        }
        let td = document.createElement("td");
        td.innerHTML = `<button type="button" class="btn btn-light edit">Edit</button>
        <button type="button" class="btn btn-light delete">Delete</button>`;
        tr.append(td);
        index++;
        tableBody.append(tr);
    });
}


// function for clear filter

let clearButton = document.querySelector(".clearFilter");
clearButton.addEventListener("click", clearFunc);
function clearFunc(){
    let index = 0;
    let tableBody = document.querySelector(".tableBody");
    tableBody.innerHTML = "";
    arr.forEach(user =>{
        let tr = document.createElement("tr");
        let th = document.createElement("th");
        th.textContent = index+1;
        tr.append(th);
        for(let value of Object.values(user)){
            let td = document.createElement('td');
            td.textContent = value;
            tr.append(td)
        }
        let td = document.createElement("td");
        td.innerHTML = `<button type="button" class="btn btn-light edit">Edit</button>
        <button type="button" class="btn btn-light delete">Delete</button>`;
        tr.append(td);
        index++;
        tableBody.append(tr);
    })
}
