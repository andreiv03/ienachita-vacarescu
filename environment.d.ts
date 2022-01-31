declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GRAPHCMS_API: string;
      GRAPHCMS_TOKEN: string;
    }
  }
};

export {};