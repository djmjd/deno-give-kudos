// manifest.ts

import { Manifest } from "deno-slack-sdk/mod.ts";
import { FindGIFFunction } from "./functions/find_gif.ts";
import { GiveKudosWorkflow } from "./workflows/give_kudos.ts";
import { FormatUsersFunction } from "./functions/format_users.ts";

export default Manifest({
  name: "Give some kudos",
  description: "Brighten someone's day with a thank you",
  icon: "assets/icon.png",
  functions: [FindGIFFunction, FormatUsersFunction],
  workflows: [GiveKudosWorkflow],
  outgoingDomains: [],
  botScopes: ["commands", "chat:write", "chat:write.public", "users:read"],
});