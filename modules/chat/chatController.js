const data = require('./plainFlow')
const mapper = require('./textMapper.json')
const messages = require('./messages.json')

module.exports = (app, chatS) => {

    app.get("/", function(req, res) {
        res.send("It works!");
    });

    app.post("/chat", (req, res) => {
        var sch = new chatS()
        sch.sessionId = req.body.sessionId;

        sch.save().then((data) => {
            console.log(data);
            res.status(200).json({
                code: 'success'
            });
        }).catch(err => {
            res.status(400).json({
                code: 'failure'
            })
        })
    })

    app.get("/text/:data", function(req, res) {
        var value = req.params.data
        if (value.includes('*')) {
            splitData = value.split('_')
            var sampleData = {}
            splitData.forEach(func => {
                    var val = func.split('*')
                    sampleData[val[0]] = val[1]
                })
                // flow = re.split('_')
            res.send(sampleData);
        } else {
            if (value.includes('&')) {
                splitData = data[value.replace('&', '')]
                res.send(splitData)

            } else {
                var state = mapper[value].split('@')
                if (state.length > 1) {
                    res.send({
                        [state[0]]: state[1].split(',')
                    });
                } else {
                    res.send({
                        [value]: mapper[value]
                    });
                }
            }
        }

    });

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
}

function customFilter(object, value) {
    console.log(value);

    if (object.hasOwnProperty(value) && object[value] == 1)
        return object;

    for (var i = 0; i < Object.keys(object).length; i++) {
        if (typeof object[Object.keys(object)[i]] == "object") {
            var filter = customFilter(object[Object.keys(object)[i]], value);
            if (filter != null)
                return filter;
        }
    }
    return null;
}