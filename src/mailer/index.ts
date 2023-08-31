import nodemailer from "nodemailer";

const { smtp } = useRuntimeConfig();

const client = nodemailer.createTransport({
  port: smtp.port,
  host: smtp.host,
});

export default client;
