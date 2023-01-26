import { config as configEnv } from 'dotenv';

const envVariables = [
    'POSTGRES_HOST', 'POSTGRES_PORT', 'POSTGRES_USERNAME', 'POSTGRES_PASSWORD', 'POSTGRES_DB_NAME',
    'JWT_SECRET',
];

type cfgType = {
    postgresHost: string,
    postgresPort: number,
    postgresUsername: string,
    postgresPassword: string,
    postgresDbName: string,
    jwtSecret: string,
};

let cfg: cfgType;

configEnv({ path: './.testenv' });

envVariables.forEach(envVariable => {
    if (process.env[envVariable] === undefined) {
        throw new Error(`The following ENV variable is undefined ${envVariable}`);
    }
});

cfg = {
    postgresHost: process.env.POSTGRES_HOST!,
    postgresPort: Number(process.env.POSTGRES_PORT!),
    postgresUsername: process.env.POSTGRES_USERNAME!,
    postgresPassword: process.env.POSTGRES_PASSWORD!,
    postgresDbName: process.env.POSTGRES_DB_NAME!,
    jwtSecret: process.env.JWT_SECRET!,
};

export default cfg;