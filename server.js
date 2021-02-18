
/*
=====================
Imported Node Modules
=====================
*/
const fs = require("fs");
const http = require("http");
const https = require("https");
const EventEmitter = require('events');
const getEmitter = new EventEmitter();

/*
======================
Imported Local Modules
======================
*/
const OwlHouse = require("./source/Actions/OwlHouse/OwlHouse.js");
const SandersonProgress = require("./source/Actions/Sanderson/SandersonProgress.js");
const ClassVidLooker = require("./source/Actions/AshesOfCreation/ClassVidLooker.js");
const SafeholdForumCheck = require("./source/Actions/Safehold/SafeholdForumCheck.js");

/*
===========================
Parse Commandline Arguments
===========================
*/
//Flags and booleans to keep track of
const owlHouseFlag = "-oh";
const sandersonProgressFlag = "-sp";
const safeholdForumFlag = "-sf";
let shouldResaveOwlHouseJson = false;
let shouldResaveSandersonProgress = false;
let shouldResaveSafeholdForumCheck = false;
let helpNotCalled = true;

const helpFlag = "-h";
const helpFlag2 = "-help";

function giveHelp(){
    console.log("Flags that can be added: ");
    console.log(`To resave olw house json use: <${owlHouseFlag}>`);
    console.log(`To resave Sanderson progress bar, use: <${sandersonProgressFlag}>`);
    console.log(`To resave Safehold Forum check, use: <${safeholdForumFlag}>`);
    console.log(`To see this help use: <${helpFlag}> or <${helpFlag2}>`);
}

//parse arguments
function CheckArgvForFlags(){
    for(let i = 0; i < process.argv.length; i++){
        switch(process.argv[i].toLowerCase()){
            case helpFlag:
                giveHelp();
                helpNotCalled = false;
                break;
            case helpFlag2:
                giveHelp();
                helpNotCalled = false;
                break;
            case owlHouseFlag:
                shouldResaveOwlHouseJson = true;
                break;
            case sandersonProgressFlag:
                shouldResaveSandersonProgress = true;
                break;
            case safeholdForumFlag:
                shouldResaveSafeholdForumCheck = true;
                break;
        }
    }
}
CheckArgvForFlags();

/*
============================================================================================
Http post code - this is just example code if I need to make some http post requests
============================================================================================
*/
//NOTE: All Get request example code can be found in the constrctor for OwlHouse.js
let httpPostOptions = {
    host: "www.",
    path: "/",
    //since we are listening on a custom port, we need to specify it by hand - optional
    // port: "",
    //This is what changes the request to a POST request
    method: "POST"
  };

  
let postCallback = function(response) {
    let str;
    response.on("data", function (chunk) {
        str += chunk;
    });

    response.on("end", function () {
        console.log(str);
    });
}
let getEndCallback = function(){
    
}
  
//let postReq = http.request(httpPostOptions, callback);
//This is the data we are posting, it needs to be a string or a buffer

/*
===============================
Start running code and requests
===============================
*/
console.log('start');

if(helpNotCalled){//Don't do stuff if asking for help
    //Send Owl House Get Request
    new OwlHouse(shouldResaveOwlHouseJson);
    //Send Sanderson Progress Bar Get Request
    new SandersonProgress(shouldResaveSandersonProgress);
    //Look for new videos for interesting Ashes of Creation classes
    new ClassVidLooker();
    //Check for Safehold forum updates -CURRENTLY BROKEN
    //TODO: Build something that will search all the forum post titles since small updates in the html are triggering
    //  the update alert prematurely
    //new SafeholdForumCheck(shouldResaveSafeholdForumCheck);
}


//Code to send post request if needed
// postReq.write("hello world!");
// postReq.end();

console.log("end");//Not actually the end since some event listeners are still going
console.log("---------------------------------------------");