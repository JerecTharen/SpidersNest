const Comparison = require('../Comparison/Comparison.js');
const MatchFinder = require("../../Models/MatchFinder/MatchFinder.js");
const fs = require("fs");

class WebCheck{
    constructor(
        name,
        host,
        path,
        splitBegin,
        splitEnd,
        jsonSavLocation,
        comparison = undefined,
        matchFinder = undefined
    ){
        //Properties that need to be assigned
        this.Name = name;
        this.Host = host;
        this.Path = path;
        this.SplitBegin = splitBegin;
        this.SplitEnd = splitEnd;
        this.JSONSaveLocation = jsonSavLocation;
        //Assign values for related object
        this.Comparison = new Comparison();
        this.Comparison = comparison !== undefined ? comparison: this.Comparison;
        this.MatchFinder = matchFinder;
        this.AllHTML = "";
        this.JSONText = "";
    }

    ParseAndCheckText(shouldSave, allHtml, beginIndex = 1, endIndex = 0){
        //Get text to compare against
        this.AllHTML = allHtml;
        let splitBegin = "";
        let splitText = "";
        if(this.MatchFinder === undefined){
            splitBegin = this.AllHTML.split(this.SplitBegin);
            if(shouldSave)
                console.log('begin', splitBegin.length);
            splitText = splitBegin[beginIndex].split(this.SplitEnd)[endIndex];
        }
        
        if(shouldSave){
            console.log("Creating new parsed text.");
            //Set up JSON object to save
            this.Comparison.Name = this.Name;
            this.Comparison.Text = splitText;
            this.JSONText = this.Comparison.ConvertToJson();
            
            //Save JSON file
            fs.writeFileSync(this.JSONSaveLocation, this.JSONText);
            console.log("---------------------------------------------");
        }
        else{
            if(this.MatchFinder !== undefined){//find matcher
                let isMatchFound = this.AllHTML.includes(this.MatchFinder.Matcher);
                console.log(isMatchFound ? this.MatchFinder.UpdateExistsText: this.MatchFinder.NoUpdateText);
                console.log("---------------------------------------------");
            }
            else{//Do comparison
                this.JSONText = fs.readFileSync(this.JSONSaveLocation);
                let parsedText = JSON.parse(this.JSONText);
                this.Comparison = new Comparison(parsedText.Name, parsedText.Text, parsedText.UpdateExistsText, parsedText.NoUpdateText);
                this.Comparison.GetUpdate(splitText);
            }
        }
    }

    GetRequestOptions(){
        return {
            host: this.Host,
            path: this.Path
        };
    }
}

module.exports = WebCheck;