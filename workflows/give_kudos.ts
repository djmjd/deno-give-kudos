// give_kudos.ts

import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { FindGIFFunction } from "../functions/find_gif.ts";
import { FormatUsersFunction } from "../functions/format_users.ts";

export const GiveKudosWorkflow = DefineWorkflow({
  callback_id: "give_kudos_workflow",
  title: "Give Kudos",
  description: "Acknowledge the impact someone had on you",
  input_parameters: {
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
    },
    required: ["interactivity"],
  },
});

const kudo = GiveKudosWorkflow.addStep(Schema.slack.functions.OpenForm, {
  title: "Give someone kudos",
  interactivity: GiveKudosWorkflow.inputs.interactivity,
  submit_label: "Share",
  description: "Continue the positive energy",
  fields: {
    elements: [
      {
        name: "doers_of_good_deeds",
        title: "Who deserves kudos?",
        type: Schema.types.array,
        items: { type: Schema.slack.types.user_id },
      },
      {
        name: "kudo_message",
        title: "Message",
        type: Schema.types.string,
        long: true,
      },
      {
        name: "kudo_vibe",
        title: "Vibe",
        type: Schema.types.string,
        enum: [
          "Appreciation for someone 🫂",
          "Celebrating a victory 🏆",
          "Thankful for great teamwork ⚽️",
          "Amazed at awesome work ☄️",
          "Excited for the future 🎉",
          "No vibes, just plants 🪴",
        ],
      },
    ],
    required: ["doers_of_good_deeds", "kudo_message"],
  },
});

const formattedUsers = GiveKudosWorkflow.addStep(FormatUsersFunction, {
  user_ids: kudo.outputs.fields.doers_of_good_deeds,
});

const gif = GiveKudosWorkflow.addStep(FindGIFFunction, {
  vibe: kudo.outputs.fields.kudo_vibe,
});

GiveKudosWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: "C07TY3V9Z0V", // Adjust this channel ID as needed
  message: `*Hey ${formattedUsers.outputs.formatted_user_mentions}!* Someone shared kind words with you :otter:\n> ${kudo.outputs.fields.kudo_message}\n${gif.outputs.URL}`,
});

// Ensure this export statement is at the bottom
export default GiveKudosWorkflow;