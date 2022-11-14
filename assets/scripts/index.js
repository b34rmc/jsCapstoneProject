async function load() {
  const response = await fetch(
    "https://devpipeline-mock-api.herokuapp.com/api/auth/login",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "matthewcaldwell2033@gmail.com",
        password: "registered",
      }),
    }
  );
  //variables to access the users first names after awaiting the response____________________
  const content = await response.json();
  let users = content.users;
  console.log(users);

  //what to do when the randomized button is clicked_______________
  let button = document.getElementById("test");
  button.addEventListener("click", () => {
    randomShuffle();
    while (studentNames.length == 0) {
      createStudentList();
      selectedStudents.splice(0, selectedStudents.length);
    }
  });
  //empty arrays for storing names__________________________________
  let studentNames = [];
  let selectedStudents = [];

  // Function to loop through the data and grab the first names and store them in student Names
  function createStudentList() {
    for (let i = 0; i < users.length; i++) {
      let firstNames = users[i].first_name;
      studentNames.push(firstNames);
    }
  }
  createStudentList();

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  // Function to show name shuffle_________________________
  async function randomShuffle() {
    let sleepTime = 80;
    let times = 15;
    for (let i = 0; i < times; i++) {
      let randName = Math.floor(Math.random() * studentNames.length);
      let div = document.getElementById("result");
      div.innerHTML = studentNames[randName];
      sleepTime = sleepTime * 1.1;
      await sleep(sleepTime);
    }
    randomNamePicker();
  }

  // Function to randomize the name thats picked_________________________

  function randomNamePicker() {
    let result = Math.floor(Math.random() * studentNames.length);
    let div = document.getElementById("result");
    div.innerHTML = studentNames[result];
    let selectedName = studentNames.splice(result, 1);
    selectedName;
    selectedStudents.push(selectedName[0]);
    console.log("Students Names: ", studentNames);
    console.log("Selected Students: ", selectedStudents);
  }

  // Render Students to the DOM____________________________________
  function renderStudents(users) {
    let renderLocation = document.getElementById("allStudents");
    for (var i = 0; i < users.length; i++) {
      let user = users[i];
      let studentContainer = document.createElement("div");
      let p = document.createElement("p");
      let defaultValue = 1;
      let name = document.createTextNode(`${user}: ${defaultValue}`);
      let btnContainer = document.createElement("div");
      let add = document.createElement("button");
      let subtract = document.createElement("button");

      p.appendChild(name);
      add.innerText = "+";
      subtract.innerText = "-";
      btnContainer.replaceChildren(subtract, add);

      add.style.color = "#22C55E";
      add.style.backgroundColor = "white";
      add.style.borderStyle = "none";
      add.style.borderRadius = "4px";
      add.style.marginLeft = ".1rem";
      add.style.fontSize = "18px";

      subtract.style.color = "#DC2626";
      subtract.style.backgroundColor = "white";
      subtract.style.borderStyle = "none";
      subtract.style.borderRadius = "4px";
      subtract.style.marginRight = ".1rem";
      subtract.style.fontSize = "18px";
      subtract.style.padding = "0px 8px 2px 8px";

      subtract.addEventListener("click", function () {
        if (defaultValue >= 1) {
          let findIndex = studentNames.indexOf(user);
          studentNames.splice(findIndex, 1);
          console.log(studentNames);
          defaultValue--;
          p.innerText = user + ": " + defaultValue;
        }
      });

      add.addEventListener("click", function () {
        studentNames.push(user);
        console.log(studentNames);
        defaultValue++;
        p.innerText = user + ": " + defaultValue;
      });

      studentContainer.appendChild(p);
      studentContainer.appendChild(btnContainer);
      renderLocation.appendChild(studentContainer);
    }
  }
  renderStudents(studentNames);

  console.log("Students Names: ", studentNames);
  console.log("Selected Names: ", selectedStudents);
}
load();
