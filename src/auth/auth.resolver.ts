import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { CreateResponse } from 'src/users/dto/create-user-response';
import { FindAllResponse } from 'src/users/dto/find-all-response';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth-guard/jwt.auth.guard';
import { emailValidationSchema } from 'src/validation/email.validation';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    const { email } = loginUserInput;
    const { error } = emailValidationSchema.validate(email);
    if (error) {
      throw new Error(`Invalid email: ${error.message}`);
    }
    return this.authService.login(loginUserInput);
  }

  @Mutation(() => CreateResponse)
  signup(@Args('createUserInput') createUserInput: CreateUserInput) {
    const { email } = createUserInput;
    const { error } = emailValidationSchema.validate(email);
    if (error) {
      throw new Error(`Invalid email: ${error.message}`);
    }
    return this.authService.signup(createUserInput);
  }

  @Query(() => FindAllResponse)
  @UseGuards(JwtAuthGuard)
  async findAll() {
    const users = await this.authService.findAll();
    return {
      success: true,
      status: 200,
      users,
    };
  }
}
