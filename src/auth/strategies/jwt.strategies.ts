import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt";
import { UserPayload } from "../models/user.payload";
import { UserFromJwt } from "../models/user-from-jwt";
import { Strategy } from "passport-jwt";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    })
  }

  async validate(payload: UserPayload): Promise<UserFromJwt> {
    
    console.log(payload)
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      rules: payload.rules,
    }
  }
}
