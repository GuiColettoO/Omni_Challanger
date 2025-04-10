import { IUseCase } from "src/core/@shared/application/use-case.interface";
import { IUserRepository } from "../../domain/user.repository";
import { UserOutputMapper } from "../common/user-output";
import { InvalidCredentialsError } from "src/core/@shared/domain/errors/invalidCredentialsError";
import { JsonWebToken } from "src/core/@shared/infra/sessionToken/json-web-token/jsonWebToken.token";


export class LoginUseCase implements IUseCase<LoginInput, LoginOutput> {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(input: LoginInput): Promise<LoginOutput> {
    let user = await this.userRepo.findByUsername(input.username);

    if (input.username != user?.username) {
      throw new InvalidCredentialsError('Username not registered');
    } else if (input.password != user.password) {
      throw new InvalidCredentialsError('Password is incorrect');
    }

    UserOutputMapper.toOutput(user);

    const jwt = new JsonWebToken();

    const access_token = await jwt.sign(
      { user_id: user.user_id },
      process.env.JSON_WEB_TOKEN_SECRET || 'fjbgkhnlknl953u93hugfngi',
      { expiresIn: '24h' }
    );

    const expiresIn = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    return {
      token: access_token,
      expiresIn,
    };
  }
}

type LoginInput = {
  username: string;
  password: string;
};

type LoginOutput = {
  token: string;
  expiresIn: string;
};
