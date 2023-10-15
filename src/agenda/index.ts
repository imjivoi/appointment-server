import { Agenda } from "@hokify/agenda";

const uri = process.env.MONGO_DB_URI;

const agenda = new Agenda({
  db: { address: uri, collection: "jobs" },
  processEvery: 60,
});

agenda
  .on("ready", () => {
    console.log("Agenda is ready");
  })
  .on("error", (err) => {
    console.log("Agenda error", err);
  });

export default agenda;
