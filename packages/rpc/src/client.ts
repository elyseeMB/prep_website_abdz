import { api } from "@website/prep_website_abdz/api";
import { createTuyau as Tuyau } from "@tuyau/client";

export const client = Tuyau({
  api,
  baseUrl: "http://localhost:3333",
});
