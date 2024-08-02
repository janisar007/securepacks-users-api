
import AWS from "aws-sdk";
// import bodyParser from 'body-parser'
import dotenv from "dotenv"

dotenv.config()
export const test = (req, res) => {
  res.json({
    message: "Api route is working!",
  });
};

AWS.config.update({
    accessKeyId: process.env.awsaccessKeyId,
    secretAccessKey: process.env.awssecretAccessKey,
    region: 'us-east-1'
});

const s3 = new AWS.S3();
const bucketName = 'securepacksbetacustomers';
const objectKey = 'data.json';

// app.use(bodyParser.json());

export const getSecurepacksUsersController = async (req, res, next) => {

    // const { start, limit } = req.query;
 
    const params = {
        Bucket: bucketName,
        Key: objectKey,
      };

  try {

    const data = await s3.getObject(params).promise();
    const response = JSON.parse(data.Body.toString());

    // const keys = Object.keys(response);
    // const subset = keys.slice(start, start + limit).map(key => response[key]);
    

    // console.log(subset)

    

    // res.status(200).json(subset);
    res.status(200).json(response);

  } catch (error) {
    // next(error);
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get users",
      error: error,
    });
  }
};