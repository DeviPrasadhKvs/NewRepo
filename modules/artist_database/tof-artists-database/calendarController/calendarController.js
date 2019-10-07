var validator = require('validator');
module.exports = (app, artistData) =>{


app.get('/calendar', (req, res)=>{

    id = req.query.id
  if(!(validator.isAlphanumeric(id))){
      res.status(500).json({
        code: 'validation error'
    })
  }else{
        console.log(id);
        artistData.find({_id:id}).then((data, err)=>{
            if(err){
                console.log(err)
            }else{
                console.log(data[0].events);
                console.log(data.length);
                res.render('calendar', {events: data[0].events, id : id});
            }
        // res.render('calendar')
        })
    }


})
app.post('/calendar', (req, res)=>{
    //console.log(req.body);
    console.log('hiii inside post request');
        var existsEvent = true;
          id = req.body.id
          console.log(id);
          if(!(validator.isAlphanumeric(id))){
            //console.log('here')
            res.status(500).json({
              code: 'validation error'
          })
        }
          artistData.find({_id:id}).then((data)=>{
                events = data[0].events
                events.forEach(event => {
                    if(req.body.from >= event.from && req.body.from <= event.to){
                      existsEvent = false;
                      console.log('event exixts: '+existsEvent);
                    }
                })
        // res.render('calendar')
        })
          if(existsEvent && validator.isAlpha(req.body.locationName) && validator.isISO8601(req.body.from) && validator.isISO8601(req.body.to)){
            var   start  = req.body.from +" "+req.body.startTime;
            var   end = req.body.to +" "+req.body.endTime;
            var startTimeStamp = new Date(start)
            var   endTimeStamp = new Date(end)

                var event = {
                    name : req.body.locationName,
                    location : req.body.location,
                    from : req.body.from,
                    to : req.body.to,
                    startTime: req.body.startTime,
                    endTime: req.body.endTime,
                    startTimeMS: startTimeStamp.getTime(),
                    endTimeMS: endTimeStamp.getTime()

                }
                artistData.findOneAndUpdate({ _id: id }, { $push : {events: event}
                }).
                exec().then((data) => {
            console.log(data);
                    res.send("Schedule added");
                }).catch(error=>{
                    console.log(error);
                    res.status(500).json({
                        code : 'failure'
                    })
                })
            }else{
                    if(!existsEvent){
                        res.status(500).json({
                            code: 'Schedule overlaping with existing schedule'
                        })
                    }else{
                        res.status(500).json({
                            code: 'validation error'
                        })
                    }
            }
        // id = res.locals.profileID;
    })

}
