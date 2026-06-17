import { Extension } from "@tiptap/core";
import Suggestion, { SuggestionOptions } from "@tiptap/suggestion";

export interface CommandsOptions {
  suggestion: Partial<SuggestionOptions>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    commands: {
      /**
       * Add commands suggestions
       */
      commands: () => ReturnType;
    };
  }
}

export default Extension.create<CommandsOptions>({
  name: "commandsForm",

  addOptions() {
    return {
      suggestion: {
        char: "/",
        command: ({ editor, range, props }) => {
          props.command({ editor, range });
        },
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});
