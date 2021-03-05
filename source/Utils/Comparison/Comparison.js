class Comparison{
    constructor(name, text, updateExistsText, noUpdateText){
        //Assign properties that are passed in
        this.Name = name;
        this.Text = text;
        this.NoUpdateText = noUpdateText;
        this.UpdateExistsText = updateExistsText;
    }

    //Compares texts and logs result
    GetUpdate(currentText){
        let notUpdated = this.Text === currentText;
        console.log(notUpdated ? this.NoUpdateText : this.UpdateExistsText);
        //Make it easier to read in between updates
        console.log("---------------------------------------------");
        return notUpdated;
    }

    //Converts this object to Json for saving
    ConvertToJson(){
        return JSON.stringify({
            Name : this.Name,
            Text : this.Text,
            UpdateExistsText : this.UpdateExistsText,
            NoUpdateText : this.NoUpdateText
        });
    }

    //Recreates a comparison from a json string
    static GetComparisonFromJson(jsonText){
        let jsonObj = JSON.parse(jsonText);
        let name = jsonObj.Name;
        let text = jsonObj.Text;
        return new Comparison(name, text);
    }
}

module.exports = Comparison;