import Image from "@tiptap/extension-image";

export interface UploadFn {
  (file: File): Promise<string>;
}

export interface CustomImageOptions {
  uploadFn: UploadFn;
}

export const UploadImage = Image.extend<CustomImageOptions>({
  name: "uploadImage",

  addCommands() {
    return {
      ...this.parent?.(),
      addImage: () => () => {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*";
        fileInput.style.visibility = "hidden";
        document.body.appendChild(fileInput);

        fileInput.addEventListener("change", async (event: Event) => {
          const file = (event.target as HTMLInputElement).files?.[0];
          if (!file) return;

          const { uploadFn } = this.options;
          const url = await uploadFn(file); // Upload et récupère l’URL

          if (url) {
            this.editor.commands.setImage({ src: url });
          }

          document.body.removeChild(fileInput); // Nettoyage
        });

        fileInput.click();
        return true;
      },
    };
  },
});

export default UploadImage;
