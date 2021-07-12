require("aws-sdk");
exports.handler =  async function(event, context) {
            console.log(event);
            let body = JSON.parse(event.body || "{}");
            body.userId = Math.floor(Math.random() * 99999) + 1;
            delete body.password;
            return  {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    message: body
                })
            };

};