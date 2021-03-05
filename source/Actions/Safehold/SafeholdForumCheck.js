const WebCheck = require("../../Utils/WebCheck/WebCheck.js");
const Comparison = require("../../Utils/Comparison/Comparison.js");
const http = require("http");
const fs = require("fs");

//Search through Safehold forum and find previews for the next book.
//WORK IN PROGRESS
//TODO: Figure out good html markers to determine what to parse through
//  Or figure out how to search through this for what I want
class SafeholdForumCheck{
    constructor(shouldResaveSafeholdForumCheck){
        this.ShouldResaveSafeholdForumCheck = shouldResaveSafeholdForumCheck;

        let sForumComparison = new Comparison(undefined, undefined,
             "Safehold Forums updated, check out the new post!", 
             "No Safehold Forum update. Check in tomorrow.");

        //Stored the html parse keys in files so I could get the exact characters
        let openingSplit = "" + fs.readFileSync("./source/Actions/Safehold/WeberForumStart.html");
        let endingSplit  = "" + fs.readFileSync("./source/Actions/Safehold/SafeholdForumSplitEnd.html");

        let sForumWebCheck = new WebCheck("Safehold Forum posts", "www.forums.davidweber.net",
            "/viewforum.php?f=7&sid=2837a66283b5cd0b647302433658baad",
            openingSplit,
            endingSplit,
            "./EnvironmentFiles/SafeHoldForumPosts.json", sForumComparison);
        
        let httpGetOptions = {
            host: sForumWebCheck.Host,
            path: sForumWebCheck.Path
        };

        let getCallback = function(response) {
            let str = "";
            
            //another chunk of data has been received, so append it to `str`
            response.on("data", function (chunk) {
                str += chunk;
            });
            
            //the whole response has been received, so we just print it out here
            response.on("end", function () {
                console.log("Received HTML for", sForumWebCheck.Name);
                let safeholdForumHtml = str;
                
                //Index for which table we want is the second one, so the third element in our beginning split here
                sForumWebCheck.ParseAndCheckText(shouldResaveSafeholdForumCheck, safeholdForumHtml, 2);
            });
        }

        http.request(httpGetOptions, getCallback).end();
    }
}

module.exports = SafeholdForumCheck;