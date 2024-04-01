import { useStorage } from "@vueuse/core";

const server_api = useStorage("server_api"); // Default = "http://localhost:57621"
// server_api.value = null;

export { server_api };
