interface ImportMetaEnv {
  readonly VITE_BASE_URL: string,
  readonly VITE_HOME_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}