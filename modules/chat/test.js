app.get("/newFlow/:data", function(req, res) {
    var value = req.params.data
    if (value.includes('_')) {
        splitData = value.split('_')
        var sampleData = {}
        splitData.forEach(func => {
            var val = func.split('*')
            sampleData[val[0]] = val[1]
        })
        res.send(sampleData)
    } else {
        var splitData = {
            data: messages[value],
            options: customFilter(data, value.trim())
        }
        res.send(splitData)
    }
});

function customFilter(object, value) {
    console.log(value);

    if (object.hasOwnProperty(value) && object[value] == 1)
        return object;

    for (var i = 0; i < Object.keys(object).length; i++) {
        if (typeof object[Object.keys(object)[i]] == "object") {
            var filter = customFilter(object[Object.keys(object)[i]], value);
            if (filter != null)
                return o;
        }
    }
    return null;
}