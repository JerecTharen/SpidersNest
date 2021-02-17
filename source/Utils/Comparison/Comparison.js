class Comparison{
    constructor(name, text, updateExistsText, noUpdateText){
        //Assign properties that are passed in
        this.Name = name;
        this.Text = text;
        this.NoUpdateText = noUpdateText;
        this.UpdateExistsText = updateExistsText;
    }

    GetUpdate(currentText){
        let notUpdated = this.Text === currentText;
        console.log(notUpdated ? this.NoUpdateText : this.UpdateExistsText);
        return notUpdated;
    }

    ConvertToJson(){
        return JSON.stringify({
            Name : this.Name,
            Text : this.Text,
            UpdateExistsText : this.UpdateExistsText,
            NoUpdateText : this.NoUpdateText
        });
    }

    static GetComparisonFromJson(jsonText){
        let jsonObj = JSON.parse(jsonText);
        let name = jsonObj.Name;
        let text = jsonObj.Text;
        return new Comparison(name, text);
    }
}

module.exports = Comparison;