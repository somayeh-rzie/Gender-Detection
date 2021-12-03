var url = new URL('https://api.genderize.io/');

//event listener for submit button; sends an http GET request
//and recieves a JSON response

function search(){

  // localStorage.clear();

  var uname = document.getElementById("name").value;

  url.searchParams.set("name", uname);

  //create http connection

  var req = new XMLHttpRequest();
  req.overrideMimeType("application/json");

  //sends http GET request
  req.open('GET', url, true);

  //asynchronous
  req.onload  = function() {

    var response = JSON.parse(req.responseText);

    //check local storage
    if(localStorage.getItem(uname)){
      document.getElementById("g").textContent = localStorage.getItem(uname);
    }else{
      document.getElementById("g").textContent = "no data saved before";
    }


    //check response is empty or not
    if(response.gender && response.probability){
      document.getElementById("gender").textContent = response.gender;
      document.getElementById("percent").textContent = response.probability;
    }else{
      document.getElementById("gender").textContent = "Sorry! We Couldn't Predict Your Gender";
      document.getElementById("percent").textContent = "";
    }
  };

  req.send(null);
}




//Save button event listener

function savedata(){

  var uname = document.getElementById("name").value;

  if(document.getElementById("male").checked == true) {   

    localStorage.setItem(uname, "male");   

  } else {  

    localStorage.setItem(uname, "female");
  }
  alert("gender saved");
}



//Clears the saved information from local storage for a specific name

function cleardata(){

  var uname = document.getElementById("name").value;

  localStorage.removeItem(uname);

  alert("gender cleared");

}