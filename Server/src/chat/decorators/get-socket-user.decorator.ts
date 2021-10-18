import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "src/user/schemas/user.schema";

export const GetSocketUser = createParamDecorator((_data, ctx: ExecutionContext): User => {
    return ctx['args'][0].handshake.user;
});