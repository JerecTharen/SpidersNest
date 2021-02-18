const WebCheck = require("../../Utils/WebCheck/WebCheck.js");
const Comparison = require("../../Utils/Comparison/Comparison.js");
const https = require("https");

class SandersonProgress{
    constructor(shouldResaveSandersonProgress){
        this.ShouldResaveSandersonProgress = shouldResaveSandersonProgress;

        let sProgressComparison = new Comparison(undefined, undefined,
             "Sanderson Project progression was updated, check out the new project!", 
             "No sanderson project update today, check in tomorrow.");
        
        let sProgressWebCheck = new WebCheck("Sanderson Progress Bar", "www.brandonsanderson.com", "/",
            "<h3 style=\"color: #ced0d6;text-align: left\" class=\"vc_custom_heading\" >PROGRESS BARS</h3><div class=\"vc_progress_bar wpb_content_element pb-style-two transparent-bg dt-style\" >",
            "</span></div></div></div></div></div></div><!-- Row Backgrounds -->",
            "./EnvironmentFiles/SandersonProgress.json", sProgressComparison);
        
        let httpGetOptions = {
            host: sProgressWebCheck.Host,
            path: sProgressWebCheck.Path
        };

        let getCallback = function(response) {
            let str = "";
            
            //another chunk of data has been received, so append it to `str`
            response.on("data", function (chunk) {
                str += chunk;
            });
            
            //the whole response has been received, so we just print it out here
            response.on("end", function () {
                console.log("Received HTML for", sProgressWebCheck.Name);
                let sandersonProgressHtml = str;
                
                sProgressWebCheck.ParseAndCheckText(shouldResaveSandersonProgress, sandersonProgressHtml);
            });
        }

        https.request(httpGetOptions, getCallback).end();
    }
}

module.exports = SandersonProgress;