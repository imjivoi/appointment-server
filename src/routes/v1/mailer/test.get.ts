import mailer from "../../../mailer";

export default defineEventHandler(async (event) => {
  try {
    const info = await mailer.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>",
    });
    console.log(info)
    return "ok";
  } catch (error) {
    return error;
  }
});
