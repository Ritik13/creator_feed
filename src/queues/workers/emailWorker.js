import { Worker } from 'bullmq';
import redisClient from '../../config/redisClient.js';

console.info("Worker file .......")

const emailWorker = new Worker(
    'email-queue',
    async (job) => {
        if (job.data.to === 'fail@example.com') {
            throw new Error('Simulated email failure');
        }
        console.log(` Sending email to: ${job.data.to}`);
        console.log(` Subject: ${job.data.subject}`);
        console.log(`✉️ Message: ${job.data.body}`);
        await new Promise((res) => setTimeout(res, 5000));
        console.log(` Email sent to ${job.data.to}`);
    },
    {connection : redisClient}
)


emailWorker.on('failed', (job, err) => {
    console.error(`Email job ${job.id} failed: ${err.message}`);
});

emailWorker.on('completed', (job) => {
    console.log(` Job completed: ${job.id}`);
  });
