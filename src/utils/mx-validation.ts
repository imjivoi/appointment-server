import * as dnsPromises from "node:dns/promises";

export function isValidMx(email: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (process.env.NODE_ENV === "development") return resolve(true);
    const hostname = email.split("@")[1];

    try {
      dnsPromises
        .resolveMx(hostname)
        .then((addresses) => {
          if (addresses && addresses.length > 0) {
            addresses[0].exchange ? resolve(true) : resolve(false);
          }
        })
        .catch(() => {
          resolve(false);
        });
    } catch (err) {
      resolve(false);
    }
  });
}
