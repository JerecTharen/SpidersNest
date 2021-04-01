const WebCheck = require("../../Utils/WebCheck/WebCheck.js");
const Comparison = require("../../Utils/Comparison/Comparison.js");
const http = require("http");

//Search the Owl house season 2 wiki page for an update compared with what I have saved
class OwlHouse{
    constructor(shouldResaveDragonPrinceJson){
        this.ShouldResaveDragonPrinceJson = shouldResaveDragonPrinceJson;

        let dragonPrinceComparison = new Comparison(
            //These two properties are set inside WebCheck
            undefined,
            undefined,
            "Dragon Prince Season 4 update - PLEASE DOUBLE CHECK THEN RESAVE JSON WITH \"-dp\"",
            "No Dragon Prince Season 4 Update"
        );
        let dragonPrinceWebCheck = new WebCheck(
            "Dragon Prince",
            "www.dragonprince.fandom.com",
            "/wiki/Episode_Guide",
            '<span class="mw-headline" id="Book_Four:_Earth">',
            '<span class="mw-headline" id="Book_Five:_.3F.3F.3F">',
            "./EnvironmentFiles/DragonPrince.json",
            dragonPrinceComparison
        );

        let getCallback = function(response) {
            let str = "";
            
            //another chunk of data has been received, so append it to `str`
            response.on("data", function (chunk) {
                str += chunk;
            });
            
            //the whole response has been received, so we just print it out here
            response.on("end", function () {
                console.log("Received HTML for", dragonPrinceWebCheck.Name);
                let dragonPrinceHtml = str;
                
                dragonPrinceWebCheck.ParseAndCheckText(shouldResaveDragonPrinceJson, dragonPrinceHtml);
            });
        }

        http.request(dragonPrinceWebCheck.GetRequestOptions(), getCallback).end();
    }
}

module.exports = OwlHouse;