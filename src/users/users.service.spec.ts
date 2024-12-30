import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User, UserRole } from './entities/user.entity';
import { UpdateUserEntity } from './entities/update_user.entity';
import { UsersController } from './users.controller';
import { NotFoundException } from '@nestjs/common';

const mockId = 1;
const mockUser: User = {
  "id": mockId,
  "name": "jonathan kuminga",
  "email": "jonathan@example.com",
  "role": UserRole.EMPLOYEE,
  "created_at": new Date(),
  "update_at": new Date(),
}

const mockPartialUser: UpdateUserEntity = {
  "name": "andrew kuminga",
  "email": "andrew@example.com",
  "update_at": new Date(),
}
class MockedUsersModel {
  constructor(private _: any) { }
  new = jest.fn().mockResolvedValue({});
  static findAll = jest.fn().mockReturnValue([mockUser]);
  static findOne = jest.fn().mockReturnValue(mockUser);
  static create = jest.fn().mockReturnValue(mockUser);
  static update = jest.fn().mockReturnValue({ ...mockUser, ...mockPartialUser });
  static delete = jest.fn().mockReturnValue(mockUser);
}


describe('UsersService', () => {
  let controller: UsersController;
  let service: UsersService;

  const UsererviceProvider = {
    provide: UsersService,
    useValue: MockedUsersModel,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsererviceProvider],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all user data', async () => {
    const expectedOutput = await controller.findAll();
    expect(service.findAll).toHaveBeenCalledTimes(1);
    expect(expectedOutput).toContain(mockUser);
  });

  it('should find user data by id', async () => {
    const expectedOutput = await controller.findOne(mockId);
    expect(service.findOne).toHaveBeenCalledTimes(1);
    expect(service.findOne).toHaveBeenCalledWith(mockId);
    expect(expectedOutput).toEqual(mockUser);
  });

  it('should create user data', async () => {
    const expectedOutput = await controller.create(mockUser);
    expect(service.create).toHaveBeenCalledTimes(1);
    expect(service.create).toHaveBeenCalledWith(mockUser);
    expect(expectedOutput).toEqual(mockUser);
  });

  it('should update user data by id and payload', async () => {
    const expectedOutput = await controller.update(mockId, mockPartialUser);
    expect(service.update).toHaveBeenCalledTimes(1);
    expect(service.update).toHaveBeenCalledWith(mockId, mockPartialUser);
    expect(expectedOutput).toEqual({ ...mockUser, ...mockPartialUser });
  });

  it('should delete user data by id', async () => {
    const expectedOutput = await controller.delete(mockId);
    expect(service.delete).toHaveBeenCalledTimes(1);
    expect(service.delete).toHaveBeenCalledWith(mockId);
    expect(expectedOutput).toEqual(mockUser);
  });
});
