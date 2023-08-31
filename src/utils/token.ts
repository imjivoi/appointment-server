import crypto from "node:crypto";

export function generateConfirmToken() {
  return crypto.randomBytes(32).toString("hex");
}
