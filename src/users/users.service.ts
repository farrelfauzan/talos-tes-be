import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  private readonly users = [
    {
      id: 1,
      email: 'farrelfauzan',
      firstName: 'Farrel',
      lastName: 'Fauzan',
      password: '123123123',
    },
    {
      id: 2,
      email: 'fahrulfebrian',
      firstName: 'Fahrul',
      lastName: 'Febrian',
      password: '123123123',
    },
    {
      id: 3,
      email: 'fahraina',
      firstName: 'Siti',
      lastName: 'Faddiya',
      password: '123123123',
    },
  ];

  async create(createUserInput: CreateUserInput) {
    const user = await this.prisma.user.create({
      data: {
        ...createUserInput,
        id: uuidv4(),
      },
    });
    return {
      success: true,
      status: 201,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }

  async findAll() {
    const user = await this.prisma.user.findMany({
      where: {
        deletedAt: null,
      },
    });
    return {
      success: true,
      status: 200,
      user,
    };
  }

  findOne(email: string) {
    return this.users.find((user) => user.email === email);
  }
}
