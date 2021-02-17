const WebCheck = require("../../Utils/WebCheck/WebCheck.js");
const Comparison = require("../../Utils/Comparison/Comparison.js");
const http = require("http");

class OwlHouse{
    constructor(shouldResaveOwlHouseJson){
        this.ShouldResaveOwlHouseJson = shouldResaveOwlHouseJson;

        let owlHouseComparison = new Comparison(
            //These two properties are set inside WebCheck
            undefined,
            undefined,
            "Owl House Season 2 update - PLEASE DOUBLE CHECK THEN RESAVE JSON WITH \"-oh\"",
            "No Owl House Season 2 Update"
        );
        let OwlHouseWebCheck = new WebCheck(
            "Owl House",
            "www.theowlhouse.fandom.com",
            "/wiki/Season_2",
            "</aside>",
            "<span class=\"mw-headline\" id=\"References\">References</span>",
            "./EnvironmentFiles/OwlHouse.json",
            owlHouseComparison
        );

        let getCallback = function(response) {
            let str = "";
            
            //another chunk of data has been received, so append it to `str`
            response.on("data", function (chunk) {
                str += chunk;
            });
            
            //the whole response has been received, so we just print it out here
            response.on("end", function () {
                console.log("Received HTML for", OwlHouseWebCheck.Name);
                let owlHouseHtml = str;
                
                OwlHouseWebCheck.ParseAndCheckText(shouldResaveOwlHouseJson, owlHouseHtml);
            });
        }

        http.request(OwlHouseWebCheck.GetRequestOptions(), getCallback).end();
    }
}

module.exports = OwlHouse;