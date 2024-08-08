/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EXCHANGERATE_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
