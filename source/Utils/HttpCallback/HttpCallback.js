class HttpCallback{
    constructor(name, callback){
        this.Name = name;
        this.Callback = callback;
    }

    //Function to be passed in http requests
    GetHttpCallback(response){
        let str = "";
        console.log('test');
        console.log('test name', this.Name);
        console.log('callback', this.Callback);
        //another chunk of data has been received, so append it to `str`
        response.on("data", function (chunk) {
            str += chunk;
        });
        
        //the whole response has been received, so invoke the callback and pass back the data
        response.on("end", function () {
            Callback(str);
        });
    }
}

module.exports = HttpCallback;