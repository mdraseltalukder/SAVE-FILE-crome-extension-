const input = document.querySelector(".input");
const saveBtn = document.querySelector(".btn1");
const saveTabBtn = document.querySelector(".btn2");
const deleteBtn = document.querySelector(".btn3");
const list = document.querySelector(".list");
let allLink = [];

// save
saveBtn.addEventListener("click", () => {
  const inputValue = input.value;
  allLink.push(inputValue);
  localStorage.setItem("link", JSON.stringify(allLink));
  input.value = "";
  renderArr(allLink);
});
function renderArr(arr) {
  list.innerHTML = "";
  arr.forEach((item) => {
    list.innerHTML += `
   <li><a href="">${item}</a></li>
  `;
  });
}
const getLocalList = JSON.parse(localStorage.getItem("link"));
console.log(getLocalList);
if (getLocalList) {
  allLink = getLocalList;
  renderArr(allLink);
}

// delete
deleteBtn.addEventListener("click", () => {
  list.innerHTML = "";
  localStorage.clear();
  allLink = [];
});
// savetab
saveTabBtn.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // since only one tab should be active and in the current window at once
    // the return variable should only have one entry
    var activeTab = tabs[0].url;
    allLink.push(activeTab);
    localStorage.setItem("link", JSON.stringify(allLink));
    renderArr(allLink);
  });
});
