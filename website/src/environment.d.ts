declare global {
    namespace NodeJS {
      interface ProcessEnv {
        INFURA_API_KEY: string;
        NODE_ENV: 'development' | 'production';
      }
    }
  }
  