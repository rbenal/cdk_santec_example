require("aws-sdk");
exports.handler =  async function(event, context) {

            return  {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    message: "user retrieved"
                })
            };

};