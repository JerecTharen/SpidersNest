//Model for storing information to search for on html pages
class MatchFinder{
    constructor(name, matcher, noUpdateText, updateExistsText){
        this.Name = name;
        this.Matcher = matcher;
        this.NoUpdateText = noUpdateText;
        this.UpdateExistsText = updateExistsText;
    }
}

module.exports = MatchFinder;