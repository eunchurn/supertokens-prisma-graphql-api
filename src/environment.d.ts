declare global {
  namespace NodeJS {
    /* Extending the NodeJS.ProcessEnv interface with the new properties. */
    export interface ProcessEnv extends NodeJS.ProcessEnv {
      /**
       * `PORT`: App port number
       */
      PORT?: string;
      /**
       * `NODE_ENV`: NodeJS environment (`production`, `development`, `test`) Node 실행 환경을 의미합니다.
       */
      NODE_ENV?: string;
      /**
       * `APOLLO_KEY`: Apollo Studio Key
       */
      APOLLO_KEY: string;
      /**
       * `APOLLO_GRAPH_REF`: Apollo Graph Ref Name
       */
      APOLLO_GRAPH_REF: string;
      POSTGRESQL_HOST: string;
      POSTGRESQL_PORT: string;
      POSTGRESQL_DATABASE_NAME: string;
      POSTGRESQL_USER: string;
      POSTGRESQL_PASSWORD: string;
      /**
       * `DATABASE_URL`: writable DB URL
       */
      DATABASE_URL: string;
      API_SECRET: string;
      /**
       * SuperTokens container domain: https://auth.mydomain.com
       */
      AUTH_DOMAIN: string;
      /**
       * API Domain: https://api.mydomain.com
       */
      API_DOMAIN: string;
      /**
       * Web domain: https://mydomain.io
       */
      WEB_DOMAIN: string;
    }
  }
}

export {};
