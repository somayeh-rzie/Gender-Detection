//the website url that gets information for names
var url = new URL('https://api.genderize.io/');



//event listener for submit button; sends an http GET request
//and recieves a JSON response

function submitfunc(){

  //prevent from submitting a form(prevents the default action of submit button)

  document.getElementById("submit").addEventListener("click", function(event){
    event.preventDefault()
  });


  var uname = document.getElementById("name").value;

  url.searchParams.set("name", uname);

  //create http connection
  var req = new XMLHttpRequest();
  req.overrideMimeType("application/json");

  //send http GET request
  req.open('GET', url, true);

  //asynchronous
  req.onload  = function() {

    var response = JSON.parse(req.responseText);

    //check local storage
    if(localStorage.getItem(uname)){
      document.getElementById("saved-data").textContent = "Saved Answer";
      document.getElementById("g").textContent = localStorage.getItem(uname);
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

  //network error handling
  try{
    req.send(null);
  } catch(exception){
    if(exception.name == 'NetworkError'){
      alert('We recognized a network error!');
   }
  }
}




//Save button event listener

function savefunc(){

  var uname = document.getElementById("name").value;

  //checks which radio button is selected

  if(document.getElementById("male").checked == true) {   

    localStorage.setItem(uname, "male");   

  } else {  

    localStorage.setItem(uname, "female");
  }
  // alert("gender successfully saved");
}



//Clears the saved information from local storage for a specific name

function clearfunc(){

  var uname = document.getElementById("name").value;

  localStorage.removeItem(uname);

  // alert("gender successfully cleared");

}