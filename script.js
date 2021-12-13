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
  message = document.getElementById("message");
  gender = document.getElementById("gender");
  percent = document.getElementById("percent");
  count = document.getElementById("count");


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
      document.getElementById("saved-answer").textContent = "you saved " + localStorage.getItem(uname) + " for " + uname;
    }


    //check response is empty or not
    if(response.gender && response.probability){
      gender.textContent = response.gender;
      percent.textContent = (response.probability*100) + "%";
      count.textContent = response.count + " people";
      if(response.count>=100 && response.probability>=0.7){
        message.textContent = "Prediction Is Reliable";
      }else{
        message.textContent = "Not A Reliable Prediction:["
      }
    }else{
      gender.textContent = "None";
      percent.textContent = "None";
      count.textContent = "None";
      message.textContent = "Sorry! There's No Prediction";
    }
  };

  //network error handling
  try{
    req.send(null);
  } catch(exception){
    if(exception.name == 'NetworkError'){
      alert('We Recognized A Network Error!');
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