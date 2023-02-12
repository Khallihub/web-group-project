import { Body,HttpCode,UseGuards , HttpStatus , Controller, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { Tokens } from "./types";
import { AuthGuard} from '@nestjs/passport';
import { Public } from "src/common/decorators";

@Controller ('auth')
export class AuthController {
    constructor(private authService: AuthService) {}


    @Public()
    @Post('/Local/signup')
    @HttpCode(HttpStatus.CREATED)
    signupLocal(@Body() dto:AuthDto): Promise<Tokens> {
        return this.authService.signupLocal(dto);

        }
    
  @Public()     
   @Post('/Local/signin')
   @HttpCode(HttpStatus.OK)
   signinLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signinLocal(dto);
  }
   @Post('logout')
   @HttpCode(HttpStatus.OK)
   logout() {
    // const user = req.user;
    // return this.authService.logout();


   }

   @Post('refresh') 
   refreshTokens() {
    return this.authService.refreshTokens();

   }

}