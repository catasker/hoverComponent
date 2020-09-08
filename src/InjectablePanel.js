//create hoverable div

var vehicleRecordsIcon;
var vehicleRecordsIconDiv;

vehicleRecordsDiv = document.createElement("div");

vehicleRecordsIcon = document.getElementsByClassName("img-responsive");

vehicleRecordsIconDiv = document.getElementsByClassName("widget-button clearfix dtm-auto-ipacket-button-applied");
vehicleRecordsIconDiv[0].appendChild(vehicleRecordsDiv);

var vehicleRecordsDivStyle = {
    'boxShadow': '0.3em 0.3em 1em rgba(0,0,0,0.3)',
    'backgroundColor': 'white',
    'width': '320px',
    'transform': 'translateY(-115%)',
    'right': '-120px',
    'position': 'absolute',
    "z-index": 111111
}

Object.assign(vehicleRecordsDiv.style, vehicleRecordsDivStyle);


vehicleRecordsDiv.style.backgroundColor = "white";

vehicleRecordsIcon[1].addEventListener('mouseover', showDiv);
vehicleRecordsIcon[1].addEventListener('mouseout', hideDiv);

vehicleRecordsDiv.addEventListener('mouseover', showDiv);
vehicleRecordsDiv.addEventListener('mouseout', hideDiv);



function showDiv() {
    vehicleRecordsDiv.style.display = "block";
}

function hideDiv() {
    vehicleRecordsDiv.style.display = "none";
}

//acquire data from API

const request = new XMLHttpRequest();

request.open("GET", "https://exp-djapi.autoipacket.com/v1/packets/interview-test-data/55SWF4JB4HU198271", false);
request.onload = () => {
    records = JSON.parse(request.response)
};
request.send();

let modules = records.modules
let vehicles = records.vehicle
let vdpBase = records.vdp_base

//create header and title

var header = document.createElement("div");

headerStyle = {
    'backgroundColor': "#2a2a2a",
    'padding': '5px'
}

Object.assign(header.style, headerStyle)


var logo = document.createElement("img");

logo.style.height = "45px";
logo.style.padding = "5px";
logo.style.float = "float";

logo.src = "//static1.squarespace.com/static/5e721cf6441ac148ab3d3c44/t/5e79f85176cf4140aa1bdbff/1598363801203/?format=1500w"

header.appendChild(logo);

var title = document.createElement("h4");

title.style.paddingLeft = "5px"


if (vehicles.stock_type === "po") {
    title.innerHTML = "Pre-Owned" + " " + vehicles.year + " " + vehicles.make + " " + vehicles.model
}
else {
    title.innerHTML = vehicles.year + " " + vehicles.make + " " + vehicles.model
}

vehicleRecordsDiv.appendChild(header);
vehicleRecordsDiv.appendChild(title);


//create module divs

var moduleDiv = document.createElement('div');
var moduleHolder = document.createElement('div');





modules.map((module) => {
    var moduleDiv = document.createElement('div');

    const moduleIcon = document.createElement('img');
    const moduleLabel = document.createElement('p');
    const moduleArrowIcon = document.createElement("img");
    moduleArrowIcon.src = 'https://www.pinpng.com/pngs/m/61-613815_page-right-arrow-png-icon-free-download-right.png'
    arrowIconStyle = {
        "height": "25px",
        "paddingRight": "5px",
    }
    Object.assign(moduleArrowIcon.style, arrowIconStyle);

    moduleDivStyle = {
        'borderTop': '1px solid grey',
        'borderBottom': '0.5px solid grey',
        'display': 'flex',
        'justifyContent': 'space-between',
        'alignItems': 'center',
        'cursor': 'pointer',
    }

    Object.assign(moduleDiv.style, moduleDivStyle)

    moduleLabelStyle = {
        'textAlign': 'left',
        'width': '150px',
        'fontWeight': 'bold',
        'fontSize': "16px"
    }

    Object.assign(moduleLabel.style, moduleLabelStyle)

    moduleIconStyle = {
        "height": "60px"
    }

    Object.assign(moduleIcon.style, moduleIconStyle)

    if (module.vdp_location === 'CARFAX') {
        var vdpLocation = 'Carfax'
    } else {
        var vdpLocation = module.vdp_location
    }

    moduleDiv.onclick = function () {
        window.location.href = vdpBase.slice(0, 8) + "www." +
            vdpBase.slice(8) + "#" + vdpLocation
    }

    moduleIcon.src = module.icon
    moduleLabel.innerHTML = module.label
    moduleDiv.appendChild(moduleIcon)
    moduleDiv.appendChild(moduleLabel)
    moduleDiv.appendChild(moduleArrowIcon)
    moduleHolder.appendChild(moduleDiv)
    vehicleRecordsDiv.appendChild(moduleHolder)
});




const buttonDiv = document.createElement('div');

const viewDocumentsButton = document.createElement('button');
viewDocumentsButton.innerHTML = "VIEW DOCUMENTS";

const buttonNote = document.createElement("p");
buttonNote.innerHTML = "Click to view all available documents.";

buttonStyle = {
    'backgroundColor': '#4CAF50',
    'border': 'none',
    'color': 'white',
    'padding': '10px 35px',
    'textAlign': 'center',
    'textDecoration': 'none',
    'display': 'inlineBlock',
    'fontSize': '16px',
}

Object.assign(viewDocumentsButton.style, buttonStyle)

buttonNoteStyle = {
    "fontSize": "12px",
    "marginTop": "5px"
}

Object.assign(buttonNote.style, buttonNoteStyle)


buttonDivStyle = {
    'paddingTop': "20px",
    'textAlign': 'center',
    'paddingBottom': "0px"
}

Object.assign(buttonDiv.style, buttonDivStyle)


buttonDiv.appendChild(viewDocumentsButton);
buttonDiv.appendChild(buttonNote);

vehicleRecordsDiv.appendChild(buttonDiv);

viewDocumentsButton.onclick = function () {
    window.location.href = vdpBase.slice(0, 8) + "www." +
        vdpBase.slice(8)
}