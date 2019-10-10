let flow = require('./flow.json')
let messageLinker = require('./messageFlow.json')

module.exports = (app, chatFlowDb, chatMessagesDb) => {

    // app.get('/', function(req, res) {
    //     res.render('index1')
    // });

    app.post('/chatDB/', (req, res) => {
        var cFlow = new chatFlowDb();
        var cMessages = new chatMessagesDb();

        cFlow.contentCode = req.body.contentCode;
        cFlow.flow = req.body.flow;

        cMessages.contentCode = req.body.contentCode;
        cMessages.input = req.body.input;
        cMessages.message = req.body.message;
        cMessages.shortMessage = req.body.shortMessage;

        cFlow.save().then((data) => {
            res.status(200).json({
                code: 'success',
                data: data
            });
        }).catch(err => {
            res.status(400).json({
                code: 'failure'
            })
        })

        cMessages.save().then((data) => {
            res.status(200).json({
                code: 'success',
                data: data
            });
        }).catch(err => {
            res.status(400).json({
                code: 'failure'
            })
        })
        res.render('index1')
    });

    // app.get('/index', function(req, res) {
    //     res.render('index1')
    // });

    app.get('/chat/:data', (req, res) => {
        console.log(req.params);
        var value = req.params.data
        if (value.includes('*')) {
            var data = value.split('*')
            var splitData = flow[data[0]].replace('{{data}}', data[1])
            res.send({ status: 2, data: splitData })
        } else {
            if (value === 'init') {
                chatFlowDb.findOne({ contentCode: 'ABB' }).then((data) => {
                        var d = data.flow
                        chatMessagesDb.find({ contentCode: { $in: d } }).then((d) => {
                            res.send({ status: 1, data: data, data1: d })
                        })
                    })
                    // flow['A00'].forEach(element => {
                    //     splitData.push(messageLinker[element])
                    // });
                    // res.send({status:1,data:splitData})
            } else {
                chatFlowDb.findOne({ contentCode: value }).then((data) => {
                    var d = data.flow
                    chatMessagesDb.find({ contentCode: { $in: d } }).then((d) => {
                        res.send({ status: 1, data: data, data1: d })
                    })
                })
            }
        }
    });
}