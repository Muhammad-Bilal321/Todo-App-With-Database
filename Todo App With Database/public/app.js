 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
 import { getDatabase,ref,set,push,onValue,remove, } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
   apiKey: "AIzaSyCUIJKuxB-Hbl0CjCFDBoYHJvHGtw6aeRs",
   authDomain: "to-do-app-e8b57.firebaseapp.com",
   databaseURL: "https://to-do-app-e8b57-default-rtdb.firebaseio.com",
   projectId: "to-do-app-e8b57",
   storageBucket: "to-do-app-e8b57.appspot.com",
   messagingSenderId: "625737368292",
   appId: "1:625737368292:web:cc1de42e810ef18081e2f1",
   measurementId: "G-JVBTZ2WMQJ"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);

const database = getDatabase()

var input = document.getElementById("input");
var list = document.getElementById("list");
 
window.addTask = function() {
    var inpVal = input.value;
    var idRef = ref(database, "todos/");
    var id = push(idRef).key;
    
    var obj = {
      todos: inpVal,
      id: id
    };
  
    var reference = ref(database, `todos/${id}`);
    set(reference, obj);
  };
  
  // Delete task from the database
  window.deleteBtn = function(id) {
    var del = ref(database, `todos/${id}`);
    remove(del)
console.log("Task Is Deleted")
  };
  
  // Edit task in the database
window.editBtn = function(id) {
    var newTask = prompt("Enter New Task");
    var reference = ref(database, `todos/${id}`);
    set(reference, { todos: newTask, id: id });
    console.log("Task Is Updated")
  };
  
  // Get and display tasks from the database
  function getTodos() {
    var reference = ref(database, "todos/");
  
    onValue(reference, function(dt) {
      var dataObj = dt.val();
      var dataList = Object.values(dataObj);
      arrTask(dataList);
    });
  }
  
  function arrTask(arrVal) {
    list.innerHTML = "";
    for (let i = 0; i < arrVal.length; i++) {
      list.innerHTML += `
          <li>${arrVal[i].todos}<button onclick="deleteBtn('${arrVal[i].id}')" class="btn btn-danger m-2">Delete</button><button onclick="editBtn('${arrVal[i].id}')" class="btn btn-warning mx-1">Edit</button></li>
          `;
    }
  }
  
  getTodos();

































