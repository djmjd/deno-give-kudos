// format_users.ts

import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

export const FormatUsersFunction = DefineFunction({
  callback_id: "format_users_function",
  title: "Format Users for Message",
  description: "Formats a list of user IDs to mention them in Slack",
  source_file: "functions/format_users.ts", // Path relative to the root
  input_parameters: {
    properties: {
      user_ids: {
        type: Schema.types.array,
        items: { type: Schema.slack.types.user_id },
        description: "List of user IDs to mention",
      },
    },
    required: ["user_ids"],
  },
  output_parameters: {
    properties: {
      formatted_user_mentions: {
        type: Schema.types.string,
        description: "Formatted user mentions",
      },
    },
    required: ["formatted_user_mentions"],
  },
});

export default SlackFunction(FormatUsersFunction, ({ inputs }) => {
  const formatted_user_mentions = inputs.user_ids
    .map((id: string) => `<@${id}>`)
    .join(", ");
  return { outputs: { formatted_user_mentions } };
});