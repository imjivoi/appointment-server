import agenda from "../../agenda";
import { sendAppointmentReminder } from "#models/mails";

export type JobType = "appointment-reminder";
type JobData = {
  date: string | Date;
  arguments: Record<string, unknown>;
};

export async function create(type: JobType, data: JobData) {
  const job = await agenda
    .create(type, data.arguments)
    .schedule(data.date)
    .save();

  return job.toJson();
}

export async function cancel(jobId: string) {
  await agenda.cancel({ _id: jobId });
}

export async function reschedule(jobId: string, date: string | Date) {
  const job = await agenda.jobs({ _id: jobId });
  if (job.length === 0) {
    throw new Error(`Job with id ${jobId} not found`);
  }
  const updatedJob = await job[0].schedule(date).save();
  return updatedJob.toJson();
}

export async function getJob(jobId: string) {
  const job = await agenda.jobs({ _id: jobId });
  if (job.length === 0) {
    throw new Error(`Job with id ${jobId} not found`);
  }

  return job[0].toJson();
}

export function defineJobs() {
  agenda.define("appointment-reminder", async (job) => {
    sendAppointmentReminder(job.attrs.data)
  });
}