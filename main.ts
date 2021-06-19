import * as dotenv from "dotenv";
import * as AWS from "aws-sdk";

dotenv.config();

const iotData = new AWS.IotData({
  region: process.env.AWS_REGION,
  endpoint: process.env.MQTT_ENDPOINT,
});

async function publishToAwsMqtt() {
  try {
    const topic = 'companyId/device/deviceId/topic'

    const payload = {
      messageId: "b44d531d-9923-4347-800c-33f45c871d24",
      message: "Hello World!",
    };

    const params = {
      topic: topic,
      payload: JSON.stringify(payload),
      qos: 0,
    };

    return iotData
      .publish(params, function (error, data) {
        if (error) {
          throw error;
        } else {
          console.log("SUCCESS: Message published.");
        }
      })
      .promise();
  } catch (error) {
    console.error(error);
  }
}

publishToAwsMqtt();
