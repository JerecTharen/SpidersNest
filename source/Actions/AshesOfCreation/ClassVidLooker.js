const MatchFinder = require("../../Models/MatchFinder/MatchFinder.js");
const WebCheck = require("../../Utils/WebCheck/WebCheck.js");
const https = require("https");

//Search the Ashes of creation youtube page for video titles that I'm interested in
class ClassVidLooker{
    constructor(){
        const host = "www.youtube.com";
        const path = "/c/AshesofCreation/videos";
        const summonerCheckName = "Ashes Of Creation Summoner Vid Looker";
        const bardCheckName = "Ashes of Creation Bard Vid Looker";
        let vidLookerSummonerWebCheck = new WebCheck(
            summonerCheckName,
            host,
            path,
            undefined,
            undefined,
            undefined,
            undefined,
            new MatchFinder(summonerCheckName, "Preview of the Summoner", "No Summoner video",
                "Summoner video, check it out now!")
        );
        let vidLookerBardWebCheck= new WebCheck(
            bardCheckName,
            host,
            path,
            undefined,
            undefined,
            undefined,
            undefined,
            new MatchFinder(bardCheckName, "Preview of the Bard", "No Bard Video", "Bard video, check it out now!")
        );

        let httpGetOptions = {
            host: host,
            path: path
        };

        let getCallback = function(response) {
            let str = "";
            
            //another chunk of data has been received, so append it to `str`
            response.on("data", function (chunk) {
                str += chunk;
            });
            
            //the whole response has been received, so we just print it out here
            response.on("end", function () {
                console.log(`Received HTML for ${vidLookerSummonerWebCheck.Name} and ${vidLookerBardWebCheck.Name}`);
                let vidLookerHtml = str;
                vidLookerSummonerWebCheck.ParseAndCheckText(false, vidLookerHtml);
                vidLookerBardWebCheck.ParseAndCheckText(false, vidLookerHtml);
            });
        }

        https.request(httpGetOptions, getCallback).end();
    }
}

module.exports = ClassVidLooker;
