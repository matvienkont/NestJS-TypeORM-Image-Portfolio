import { UserEntity } from "./users/users.entity";

declare global {
    namespace Express {
        export interface AuthenticatedRequest {
            user: UserEntity;
        }
    }
}