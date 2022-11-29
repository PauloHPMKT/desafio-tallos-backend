import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { User } from './entities/user';
import { UserService } from './user.service';

const userEntityList: User[] = [
  new User({
    name: 'Paulo teste',
    email: 'paulo@teste.com',
    rules: 'admin',
    password: '123456',
  }),
];

describe('UserService', () => {
  let service: UserService;
  let userRepository: Model<User>;

  beforeEach(async () => {
    const userMockRepository = {
      findAll: jest.fn().mockRejectedValue(userEntityList),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken('User'),
          useValue: userMockRepository,
        },
      ],
    })
      //.overrideProvider(UserService)
      //.useValue(userServiceMock)
      .compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Model<User>>(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });
});
