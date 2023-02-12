import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import { Tokens } from "./types";
import { JwtService } from "@nestjs/jwt/dist";
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    hashData(data: string): Promise<string>;
    getTokens(userId: number, email: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    signupLocal(dto: AuthDto): Promise<Tokens>;
    updateRtHash(userId: number, rt: string): Promise<void>;
    signinLocal(dto: AuthDto): Promise<Tokens>;
    logout(userId: number): Promise<boolean>;
    refreshTokens(): void;
}
