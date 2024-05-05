const dataLinksArea = document.querySelector("#dataLinksArea");
const webLinksArea = document.querySelector("#webLinksArea");
const ownWrapper = document.querySelector("#ownWrapper");
const ownLinksArea = document.querySelector("#ownLinksArea");
const addLinkForm = document.querySelector("#addLinkForm");
const toolDataArea = document.querySelector("#toolDataArea");

// Load everything on load
window.onload = () => {
  linksLoad();
  localLoad();
  themeLoad();
  ownLinksLoad();
};

// Load theme
function themeLoad() {
  if (ownTheme == "") {
    document.body.classList.add("light-theme");
  } else {
    document.body.setAttribute("class", "");
    document.body.classList.add(ownTheme);
  }
  const themeBtn = document.querySelector("#themeBtn");
  if (ownTheme == "dark-theme") {
    themeBtn.innerHTML = `<img src="icons/icon-light.png">`;
  } else {
    themeBtn.innerHTML = `<img src="icons/icon-dark.png">`;
  }
}
// Change theme
function changeTheme() {
  if (ownTheme == "dark-theme") {
    ownTheme = "light-theme";
  } else {
    ownTheme = "dark-theme";
  }
  localSave();
  themeLoad();
}

// Load standard links
function linksLoad() {
  // First sort alphabetically
  allLinks.sort(function (a, b) {
    if (a.linkTxt.toUpperCase() < b.linkTxt.toUpperCase()) {
      return -1;
    }
    if (a.linkTxt.toUpperCase() > b.linkTxt.toUpperCase()) {
      return 1;
    }
    return 0;
  });
  // To DOM
  for (let i = 0; i < allLinks.length; i++) {
    webLinksArea.innerHTML += `<div class="menu"><a href="${allLinks[i].url}" ${allLinks[i].target}>
    <img src="icons/icon-${allLinks[i].icon}.png" class="icon"> ${allLinks[i].linkTxt}</a></div>`;
  }
}
// Load own links
function ownLinksLoad() {
  ownLinksArea.innerHTML = ``;
  if (ownLinks != "") {
    ownWrapper.classList.remove("noDis");
    for (let i = 0; i < ownLinks.length; i++) {
      ownLinksArea.innerHTML += `<div class="menu"><a href="${
        ownLinks[i].url
      }" target="_blank" class="own"><img src="icons/icon-user.png" class="icon"> ${
        ownLinks[i].linkTxt
      }</a><button onclick="selectDelete(${[i]})" id="delBtn${[
        i,
      ]}" class="deleteButton noDis">Delete</button></div>`;
    }
  } else {
    ownWrapper.classList.add("noDis");
  }
}

// Check, if entered values are valid
function checkOwnLink() {
  const url = document.querySelector("#url");
  const linkTxt = document.querySelector("#linkTxt");
  const httpCheck = /^(https?:\/\/)/i;
  if (httpCheck.test(url.value)) {
    addOwnLink(url.value, linkTxt.value);
  } else {
    let urlNew = `http://${url.value}`;
    addOwnLink(urlNew, linkTxt.value);
  }
}

//After regex finally add link
function addOwnLink(url, linkTxt) {
  ownLinks.push({ url: url, linkTxt: linkTxt });
  localSave();
  ownLinksLoad();
  document.querySelector("#url").value = "";
  document.querySelector("#linkTxt").value = "";
  return alert("Link added successfully");
}

//Show/hide add link form
function toggleAddLinkForm() {
  addLinkForm.classList.toggle("noDis");
  addLinkFormDOM();
}

//Add Link Form to DOM
function addLinkFormDOM() {
  addLinkForm.innerHTML = `<button id="closeaddLink" onclick="toggleAddLinkForm()">X</button>
  <form onsubmit="checkOwnLink(); return false">
  <label for="url"
    >
    <p>
      <input type="text" id="url" name="url" placeholder="URL" 
      pattern="^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$" 
      required />
    </p>
  </label>
  <label for="linkTxt"
    ><p>
      <input
        type="text"
        placeholder="Text:"
        id="linkTxt"
        name="linkTxt"
        required
      />
    </p>
  </label>
  <p><input type="submit" id="save" value="Save" /></p></form>`;
}

//Save links and theme to local storage
function localSave() {
  let ownLinksJ = JSON.stringify(ownLinks);
  let ownThemeJ = JSON.stringify(ownTheme);
  localStorage.setItem("ownLinks", ownLinksJ);
  localStorage.setItem("ownTheme", ownThemeJ);
}
//Load links and theme from local storage
function localLoad() {
  let ownLinksJ = localStorage.getItem("ownLinks");
  let ownThemeJ = localStorage.getItem("ownTheme");
  if (ownLinksJ) {
    ownLinks = JSON.parse(ownLinksJ);
  }
  if (ownThemeJ) {
    ownTheme = JSON.parse(ownThemeJ);
  }
}

//Selected Links to delete
let selectedDelete = [];

//Edit own links
function toggleEdit() {
  const delBtns = document.querySelectorAll(".deleteButton");
  const editBtn = document.querySelector("#edit");

  if (editBtn.classList.contains("active")) {
    editBtn.innerHTML = "Edit custom Links";
    editBtn.classList.remove("active");
    deleteLocal();
    localSave();
    ownLinksLoad();
  } else {
    editBtn.innerHTML = "Save";
    editBtn.classList.add("active");
    delBtns.forEach((e) => e.classList.remove("noDis"));
  }
}

//Select Links to delete on save
function selectDelete(i) {
  let selectedBtn = document.querySelector("#delBtn" + i);
  let selectedLink = ownLinks[i].linkTxt;

  if (selectedBtn.classList.contains("selected")) {
    selectedBtn.innerHTML = "Delete";
    selectedBtn.classList.remove("selected");
    selectedDelete.splice(selectedDelete.indexOf(selectedLink), 1);
  } else {
    selectedBtn.innerHTML = "Keep";
    selectedBtn.classList.add("selected");
    selectedDelete.push(selectedLink);
  }
}

//Delete own local links
function deleteLocal() {
  for (let i = 0; i < selectedDelete.length; i++) {
    console.log(selectedDelete[i]);
    for (let j = 0; j < ownLinks.length; j++) {
      if (ownLinks[j].linkTxt === selectedDelete[i]) {
        console.log(ownLinks[j]);
        ownLinks.splice(j, 1);
      }
    }
  }
  selectedDelete = [];
}

//Show/Hide ToolDataArea
function toggleToolData() {
  toolDataArea.classList.toggle("noDis");
  document.querySelector("#toolDataDrop").classList.toggle("active");
  toolDataDOM();
  toolDataDrop();
}

//toolDataArea elements to DOM
function toolDataDOM() {
  toolDataArea.innerHTML = `<select id="toolID" onchange="showToolData()"></select>
  <span>Chamber Type: <span id="kitName"></span></span>
  <span>Material: <span id="kitType" onclick="checkCopy(this)"></span></span>
  <span>Contract: <span id="kitContract" onclick="checkCopy(this)"></span></span>
  <span>Connection Point: <span id="targetContract" onclick="checkCopy(this)"></span></span>
  <span>Checklist: <span id="echeckLinks"></span></span>`;
}

//Fill toolDataDropdown
function toolDataDrop() {
  const toolID = document.querySelector("#toolID");
  toolID.innerHTML = `<option>Select tool</option>`;
  for (let i = 0; i < toolData.length; i++) {
    toolID.innerHTML += `
    <option>${toolData[i].toolID}</option>
    `;
  }
}
//Show chosen Tool Data
function showToolData() {
  let obj = toolData.find(
    (tool) => tool.toolID === document.querySelector("#toolID").value
  );
  document.querySelector("#kitType").innerHTML = `<b>${obj.kitNumber}</b>`;
  document.querySelector(
    "#kitContract"
  ).innerHTML = `<b>${obj.kitContract}</b>`;
  document.querySelector("#kitName").innerHTML = `<b>${obj.kitName}</b>`;
  document.querySelector(
    "#targetContract"
  ).innerHTML = `<b>${obj.targetContract}</b>`;
  document.querySelector("#echeckLinks").innerHTML = ``;

  obj.eCheckNEW !== ""
    ? (document.querySelector(
        "#echeckLinks"
      ).innerHTML += `<a href="${obj.eCheckNEW}" target="_blank"> New </a>`)
    : {};
  obj.hasOwnProperty("eCheckList")
    ? (document.querySelector(
        "#echeckLinks"
      ).innerHTML += `<a href="${obj.eCheckList}" target="_blank"> Old list </a>`)
    : {};
  obj.hasOwnProperty("eCheckEM")
    ? (document.querySelector(
        "#echeckLinks"
      ).innerHTML += `<a href="${obj.eCheckEM}" target="_blank"> Recycling </a>`)
    : {};
}
// Copy on Click
function checkCopy(copied) {
  navigator.clipboard.writeText(copied.textContent);
  showToolTip(copied, "Copied");
}

// local document = no clipboard read access
/* function checkCopy(copied) {
  navigator.clipboard.readText().then(txt => {
    if(txt === copied.textContent) {
      showToolTip(copied, "Bereits kopiert");
    }
    else {
      navigator.clipboard.writeText(copied.textContent);
      showToolTip(copied, "Kopiert");
    }
  })
} */

// Copy Tooltip
function showToolTip(copied, tttxt) {
  if (document.getElementById("toolTip")) {
    return;
  } else {
    const toolTip = document.createElement("span");
    toolTip.textContent = tttxt;
    toolTip.setAttribute("id", "toolTip");
    copied.after(toolTip);
    setTimeout(function () {
      toolTip.remove();
    }, 600);
  }
}
