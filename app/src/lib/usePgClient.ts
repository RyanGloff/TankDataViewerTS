import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

type Credential = {
  name: string;
  password: string;
};
type PGConfig = {
  host: string;
  port: number;
  username: string;
  password: string;
  db: string;
};

const credentialLookup: Map<string, Credential> = new Map();
if (!process.env["PG_POSTGRES_USER"])
  throw new Error("PG_POSTGRES_USER environment variable is not set");
if (!process.env["PG_POSTGRES_PASSWORD"])
  throw new Error("PG_POSTGRES_PASSWORD environment variable is not set");
if (!process.env["PG_TANK_DATA_INJECTOR_USER"])
  throw new Error("PG_TANK_DATA_INJECTOR_USER environment variable is not set");
if (!process.env["PG_TANK_DATA_INJECTOR_PASSWORD"])
  throw new Error(
    "PG_TANK_DATA_INJECTOR_PASSWORD environment variable is not set",
  );
if (!process.env["PG_HOST"])
  throw new Error("PG_HOST environment variable is not set");
if (!process.env["PG_PORT"])
  throw new Error("PG_PORT environment variable is not set");
if (!process.env["PG_DB_NAME"])
  throw new Error("PG_DB_NAME environment variable is not set");

credentialLookup.set("postgres", {
  name: process.env["PG_POSTGRES_USER"],
  password: process.env["PG_POSTGRES_PASSWORD"],
});
credentialLookup.set("tank_data_injector", {
  name: process.env["PG_TANK_DATA_INJECTOR_USER"],
  password: process.env["PG_TANK_DATA_INJECTOR_PASSWORD"],
});

export default async function usePgClient<T>(
  username: string,
  fn: (client: Client) => Promise<T>,
): Promise<T> {
  if (!credentialLookup.has(username)) {
    throw new Error(`Unknown username: ${username}`);
  }
  const credentials: Credential = credentialLookup.get(username) as Credential;

  const pgConfig: PGConfig = {
    host: process.env["PG_HOST"] as string,
    port: Number(process.env["PG_PORT"]),
    username: credentials.name,
    password: credentials.password,
    db: process.env["PG_DB_NAME"] as string,
  };
  const conString = `postgres://${pgConfig.username}:${pgConfig.password}@${pgConfig.host}:${pgConfig.port}/${pgConfig.db}`;
  let client = new Client(conString);
  try {
    client.connect();
  } catch (error) {
    throw new PGConnectionError(error, pgConfig);
  }
  let result;
  try {
    result = await fn(client);
  } catch (err) {
    throw new PGBusinessLogicError(err);
  }

  try {
    await client.end();
  } catch (error) {
    throw new PGConnectionCloseError(error);
  }
  return result;
}

export class PGConnectionCloseError extends Error {
  constructor(error: any) {
    super(error);
  }
}

export class PGConnectionError extends Error {
  public error: any;
  public config: PGConfig;

  constructor(error: any, config: PGConfig) {
    super(
      `Failed to connect to postgres. Config: Host -> ${config.host}, Port -> ${config.port}, Username -> ${config.username}, Password -> ${config.password}, Database -> ${config.db}`,
    );
    this.error = error;
    this.config = config;
  }
}

export class PGBusinessLogicError extends Error {
  public error: any;

  constructor(error: any) {
    super(error);
    this.error = error;
  }
}
