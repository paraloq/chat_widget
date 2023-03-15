/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_KEY: string
  readonly VITE_API_URL: string
  readonly VITE_WHITELIST: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
