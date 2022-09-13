app.get('/api/getJson', async (req, res) => {
    let myChan = await fetch('https://chaturbate.com/affiliates/api/onlinerooms/?format=json&wm=1oPNc');
    let bookmarksImgs = await updateChannelMetadata();
    myChan = await myChan.json();
    let onlineOnes = await filterByReference(bookmarksImgs, myChan);
    // let addedImgSrc = await addImgSrc(onlineOnes, myChan);
    // console.log(addedImgSrc);
    res.json(onlineOnes);
})

app.post('/api/addChannel', (req, res) => {
    console.log(`request body is ${JSON.stringify(req.body)}`);
    let chanName = req.body.name;
    let chanUrl = req.body.url;
    let chanDesc = req.body.description;
    let newChannel = {
        name: chanName,
        url: chanUrl,
        description: chanDesc
    }
    appendChannels(newChannel);
    res.send(`you added the following channel: ${JSON.stringify(req.body)}`);
});

//app.js below here

let tableId = 'channelList';

function getChannelStatus(){
  console.log('initiating channel status retrieval process');
}

function refreshButtonClick(){
  alert('You clicked refresh');
}

function getTableId(tableId){
  return document.getElementById(id);
}

function displayTableId(){
console.log(getTableId(tableId));
}

function createTableRow(status, imgSrc, name, url, description) {
  var table = document.getElementById(tableId);
  var row = table.insertRow(1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  cell1.innerHTML = status;
  cell2.innerHTML = `<img src=${imgSrc}></img>`;
  cell3.innerHTML = name;
  cell4.innerHTML = `<a href=${url}>${url}</a>`;
  cell5.innerHTML = description;
}

let form = document.getElementById('addChanForm');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    let chanName = document.getElementById('chanName').value;
    let chanUrl = document.getElementById('chanUrl').value;
    let chanDesc = document.getElementById('chanDesc').value;
    console.log(`you tried to add a channel ${chanName}, ${chanUrl}, ${chanDesc}`);
    addAChannel(chanName, chanUrl, chanDesc);
});

function makePostRequest(newChannel){
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(newChannel);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://localhost:3001/api/addChannel", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function addAChannel(name, url, description) {
  let newChannel = {
    name: name,
    url: url,
    description: description
  }
  makePostRequest(newChannel);
}
/*
let status = `online`;
let name = display_name;
let url = `https://XXXXXXXXX.com/${display_name}/`;
let description = `gender: ${gender}, age: ${age}, users: ${num_users}`;
image_url_small = image_url_360x270;


*/
async function fetchJson(){
  let response = await fetch('http://localhost:3001/api/getJson');
  return response;
}

async function fetchChannels(){
  let response = await fetchJson();
  let data = await response.json();
  
  let sortedData = data.sort((a, b) => {
    let aName = a.name.toLowerCase();
    let bName = b.name.toLowerCase();
    if(aName < bName){
      return 1;
    }
    if(aName > bName){
      return -1;
    }
    return 0;
  });

  for (let i = 0; i < sortedData.length; i++){
    createTableRow('online', sortedData[i].imgSrc, sortedData[i].name, sortedData[i].url, sortedData[i].description);
  }
  console.log(data);
}





