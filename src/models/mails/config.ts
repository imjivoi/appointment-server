import {config}from "vue-email/compiler";
import path from "path";

const vueEmail = config(path.resolve("./email-templates"));

export { vueEmail };
