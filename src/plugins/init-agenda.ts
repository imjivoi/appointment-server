import { defineNitroPlugin } from "nitropack/dist/runtime/plugin";
import agenda from "../agenda";

export default defineNitroPlugin(async () => {
  await agenda.start();
});
