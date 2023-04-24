import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@ObjectType()
export class FindAllResponse {
  @Field(() => [User])
  users: User[];

  @Field()
  status: number;

  @Field()
  success: boolean;
}
