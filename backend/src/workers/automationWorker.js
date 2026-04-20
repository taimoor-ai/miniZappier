const { Worker } = require("bullmq");
const IORedis = require("ioredis");
const actions = require("../actions");

const connection = new IORedis({
  host: "127.0.0.1",
  port: 6379,
  maxRetriesPerRequest: null,
});
new Worker(
  "automationQueue",
  async (job) => {
    const { automation, payload } = job.data;

    for (const action of automation.actions) {
      const handler = actions[action.type];

      await handler(
        {
          ...automation,
          action,
        },
        payload
      );
    }
  },
  { connection }
);