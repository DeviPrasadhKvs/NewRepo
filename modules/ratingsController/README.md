Building a RESTful API in Node and Express
Using the new ExpressRouter to build an API

Read the API

Requirements
Node and npm
Installation
Clone the repo: git clone https://github.com/Gwaizhai/ratingsMicroservice
Install dependencies: npm install
Start the server: node index.js
Testing the API
Test your API using Postman


API base URL - http://localhost:3011/en/review

Add review {
    end point - /
    type - post
    req type - body
    data - {
        "reviewer_id" : "759",
        "profile_id":"153",
        "review_star" : "1",
        "review_comment" : "Heheh",
        "review_status" : "One"
    }
    
}

Delete review {
    end point - /:id
    type - post
    req type - params    
}

Get single review {
    end point - /:profile_id
    type - post
    req type - params    
}

Get multiple review {
    end point - /?profile_id=12,123
    type - post
    req type - query    
}


------------ Add Review ------------

Endpoint : /

Method : ADD

Req Type = PARAMS

Request = {
    profile_id : Number,
    review_created_on : String,
    reviewer_id : String,
    review_comment : String,
    review_star : Number
}

Response : 
 {
	"reviewer_id" : "729",
	"profile_id":"486",
	"review_star" : "3",
	"review_comment" : "psuedo",
	"review_status" : "Six"
 }


------------ Delete review ------------

Endpoint: /:id

Method : DELETE

Req Type = PARAMS

req = {id : String
}

response : 

{
    "success": 200,
    "message": "Successful.",
    "data": {
        "n": 1,
        "opTime": {
            "ts": "6713892112603021331",
            "t": 4
        },
        "electionId": "7fffffff0000000000000004",
        "ok": 1,
        "operationTime": "6713892112603021331",
        "$clusterTime": {
            "clusterTime": "6713892112603021331",
            "signature": {
                "hash": "kZTJsp9Ik8+4mfVDu/iCppbIRVM=",
                "keyId": "6683765047325360130"
            }
        },
        "deletedCount": 1
    }
}

------------ GET ------------

Endpoint : /:lang/review/:profile_id

Method : GET

Req Type = PARAMS

req = { 
    profile_id : String
}

response : 

{
    "success": 200,
    "message": "Successful.",
    "data": [
        {
            "_id": "5d2c829ec80dc93a2c627b08",
            "reviews": [
                {
                    "_id": "5d2c829ec80dc93a2c627b09",
                    "review_created_on": "1563198110265",
                    "reviewer_id": "645",
                    "review_comment": "Qwerty",
                    "review_star": 2
                },
                {
                    "_id": "5d2c82b7c80dc93a2c627b0a",
                    "review_created_on": "1563198135812",
                    "reviewer_id": "664",
                    "review_comment": "Qwerty123",
                    "review_star": 4
                }
            ],
            "profile_id": "351",
            "average_rating": 4.5,
            "__v": 0
        }
    ]
}


------------ GET ALL ------------

Endpoint : /:lang/review?profile_id

Method : GET

Req Type = PARAMS

req = { 
    profile_id : String
}

response : 

{
    "success": 200,
    "message": "Successful.",
    "data": [
        {
            "_id": "5d2c823ec80dc93a2c627b04",
            "reviews": [
                {
                    "_id": "5d2c823ec80dc93a2c627b05",
                    "review_created_on": "1563198014945",
                    "reviewer_id": "759",
                    "review_comment": "Heheh",
                    "review_star": 1
                },
                {
                    "_id": "5d2c826dc80dc93a2c627b06",
                    "review_created_on": "1563198061016",
                    "reviewer_id": "759",
                    "review_comment": "Huhuh",
                    "review_star": 4
                },
                {
                    "_id": "5d2c8285c80dc93a2c627b07",
                    "review_created_on": "1563198085324",
                    "reviewer_id": "852",
                    "review_comment": "Hahah",
                    "review_star": 5
                }
            ],
            "profile_id": "153",
            "average_rating": 3.1666666666666665,
            "__v": 0
        },
        {
            "_id": "5d2c829ec80dc93a2c627b08",
            "reviews": [
                {
                    "_id": "5d2c829ec80dc93a2c627b09",
                    "review_created_on": "1563198110265",
                    "reviewer_id": "645",
                    "review_comment": "Qwerty",
                    "review_star": 2
                },
                {
                    "_id": "5d2c82b7c80dc93a2c627b0a",
                    "review_created_on": "1563198135812",
                    "reviewer_id": "664",
                    "review_comment": "Qwerty123",
                    "review_star": 4
                }
            ],
            "profile_id": "351",
            "average_rating": 4.5,
            "__v": 0
        }
    ]
}