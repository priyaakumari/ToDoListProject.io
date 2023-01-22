const taskInput=document.getElementById('taskInput');
const addTaskbtn=document.getElementById('addTaskbtn');
const listItems=document.getElementById('listItems');
const count=document.getElementById('cnt');
const deleteAllTaskBtn=document.getElementById('deleteAllTaskBtn');

// to show the task which are present in the localstorage
showTask();

//add task button fuctionality
addTaskbtn.addEventListener('click',function (){
    var addTaskInputVal=taskInput.value;
    console.log(addTaskInputVal);
    if(addTaskInputVal.trim()==0){
        alert("Cannot add empty Task");
    }
    if(addTaskInputVal.trim()!=0){
        let webTask=localStorage.getItem("localTask");
        if(webTask==null){
            taskObj=[];
        }
        else{
           taskObj=JSON.parse(webTask);
        }
        

        taskObj.push({'task_name':addTaskInputVal,'completionStatus':false});
        localStorage.setItem("localTask",JSON.stringify(taskObj));
         taskInput.value='';
    }
    showTask();
});

// shows all the task present in the list
// showtask
function showTask(){
    
    let webtask = localStorage.getItem("localTask");
    cntTasks();
    if(webtask == null){
        taskObj = [];
    }
    else{
        taskObj = JSON.parse(webtask);
    }
   listItems.innerHTML='';
    let addedtasklist = document.getElementById("addedtasklist");
    taskObj.forEach((item, idx) => {
        const li=document.createElement('li');
        if(item.completeStatus==true){
            taskCompleteValue = `<td class="completed">${item.task_name}</td>`;
        }else{
            taskCompleteValue = `<td>${item.task_name}</td>`;
        }
        

            li.innerHTML=`
            <label style="text-weight:bold; font-size:30px; color:black;">${idx+1}</label>
                <input type="checkbox" id="${idx}" ${item.completionStatus? 'checked':''} class="custom-checkbox" onclick="completeTask(${idx})"/>
                
                <label for="${idx}" style="text-weight:bold; font-size:30px; color:black; list-style-type:none">${item.task_name}</label>
                &emsp; &emsp;
        <button type='button' onclick="editTask(${idx})" style="background-color:red; color:white; padding:3px;border-raidus:2px;border:none; right:0%">Edit  </button>&nbsp
        <button type='button' onclick="deleteTask(${idx})" style="background-color:black; color:white; padding:3px; border-raidus:2px;border:none">Delete  </button>
            `;
            listItems.append(li);
});
         
}

// count total tasks
function cntTasks(){
    if(localStorage.localTask) {
    var totCnt = JSON.parse(localStorage.localTask).length
}
else {
    var totCnt = 0;
}

    count.innerText=totCnt;
}

// delete all button deletes all the task in the list 
// deleteall
const deleteAllTaskbtn = document.getElementById('deleteAllTaskbtn');
// console.log(deleteAllTaskbtn);
deleteAllTaskbtn.addEventListener("click", function(){
    //console.log("delete clicked");
    let saveTaskbtn = document.getElementById("saveTaskbtn");
    let addTaskbtn = document.getElementById("addTaskbtn");
    let webtask = localStorage.getItem("localTask");
    let taskObj1 = JSON.parse(webtask);
    if(webtask == null){
        taskObj1 = [];
    }
    else{
        taskObj1 = JSON.parse(webtask);
        taskObj1 = [];
    }
     saveTaskbtn.style.display="none";
     addTaskbtn.style.display="inline";
    localStorage.setItem("localTask", JSON.stringify(taskObj1));
    listItems.innerHTML="";
    
    showTask();

})

// we can edit the existing task present in the list
//editTask
function editTask(index){
    //console.log(index);
    let saveTaskbtn=document.getElementById('saveTaskbtn');
    const saveindex=document.getElementById('saveindex');
    saveindex.value=index;
    addTaskbtn.style.display="none";
    saveTaskbtn.style.display="inline";
    let webTask=localStorage.getItem("localTask");
    let taskObjInp=JSON.parse(webTask);
    taskInput.value=taskObjInp[index]["task_name"];
  
    
    
}

// after editing the existing task we can save that task using save task button
//saveTask
let saveTaskbtn=document.getElementById('saveTaskbtn');
saveTaskbtn.addEventListener('click',function(){
    let addTaskbtn=document.getElementById('addTaskbtn');
    let webTask=localStorage.getItem("localTask");
    let taskObj=JSON.parse(webTask);
    let saveindex=document.getElementById('saveindex').value;
    console.log(saveindex);
    for(keys in taskObj[saveindex]){
        console.log(taskObj[saveindex]);
        if(keys=='task_name'){
            taskObj[saveindex].task_name=taskInput.value;
        }
    }
    saveTaskbtn.style.display="none";
    addTaskbtn.style.display="inline";
    localStorage.setItem("localTask", JSON.stringify(taskObj));
    taskInput.value='';
    showTask();
    
});

// delete btn can delete the particular task present in the list
//deleteItem
function deleteTask(index){
    let webTask=localStorage.getItem('localTask');
    let taskObj=JSON.parse(webTask);
    taskObj.splice(index,1);
    localStorage.setItem('localTask',JSON.stringify(taskObj));
    showTask();
}

// toggle task from checked to unchecked and vice-versa 
//complete task
function completeTask(idx){
    let webTask=localStorage.getItem('localTask');
    let taskObj=JSON.parse(webTask);
    // console.log(idx);
    // console.log(taskObj[idx]);
    // console.log(taskObj[idx].completionStatus);
    taskObj[idx].completionStatus=!taskObj[idx].completionStatus;
    localStorage.setItem('localTask',JSON.stringify(taskObj));
    showTask();
}



// functions
// addtask()
// deleteTask()
// deleteAllTask()
// showTask()
// EditTask()
// saveTask()

