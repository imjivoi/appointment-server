import { defineNitroPlugin } from "nitropack/dist/runtime/plugin";
import agenda from "../agenda";
import { defineJobs } from "../models/jobs";

export default defineNitroPlugin(async () => {
  await agenda.start();
  defineJobs();
});
