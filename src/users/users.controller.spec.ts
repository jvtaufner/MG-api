import { PrismaService } from '../db';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController Unit Testing', () => {
  let prismaService: PrismaService;
  let usersService: UsersService;
  let usersController: UsersController;

  beforeEach(() => {
    prismaService = new PrismaService();
    usersService = new UsersService(prismaService);
    usersController = new UsersController(usersService);
  });

  it('Should create a user', async () => {
    const mockUser = {
      id: 'aabbcc',
      email: 'foo@email.com',
      password: 'foobar',
      name: 'foo',
      createdAt: new Date(Date.now()),
    };

    jest
      .spyOn(usersService, 'create')
      .mockImplementation(() => new Promise((resolve) => resolve(mockUser)));

    expect(await usersController.create(mockUser)).toStrictEqual(mockUser);
  });

  it('Should return a list of users', async () => {
    const mockUsers = [
      {
        id: 'aabbcc',
        email: 'foo@email.com',
        password: 'foobar',
        name: 'foo',
        createdAt: new Date(Date.now()),
      },
      {
        id: 'bbccdd',
        email: 'bar@email.com',
        password: 'foobar',
        name: 'bar',
        createdAt: new Date(Date.now()),
      },
    ];

    jest
      .spyOn(usersService, 'findAll')
      .mockImplementation(() => new Promise((resolve) => resolve(mockUsers)));

    expect(await usersController.findAll()).toHaveLength(2);
  });

  it('Should return a list of users by a criteria', async () => {
    const mockUsers = [
      {
        id: 'aabbcc',
        email: 'foo@email.com',
        password: 'foobar',
        name: 'foo',
        createdAt: new Date(Date.now()),
      },
      {
        id: 'bbccdd',
        email: 'bar@email.com',
        password: 'foobar',
        name: 'bar',
        createdAt: new Date(Date.now()),
      },
    ];

    jest
      .spyOn(usersService, 'findAll')
      .mockImplementation(
        ({ email }) =>
          new Promise((resolve) =>
            resolve(mockUsers.filter((value) => value.email === email)),
          ),
      );
    expect(
      await usersController.findAll({ email: 'foo@email.com' }),
    ).toHaveLength(1);
  });

  it('Should update a user', async () => {
    const mockUser = {
      id: 'aabbcc',
      email: 'foo@email.com',
      password: 'foobar',
      name: 'foo',
      createdAt: new Date(Date.now()),
    };

    jest
      .spyOn(usersService, 'update')
      .mockImplementation(() => new Promise((resolve) => resolve(mockUser)));

    expect(await usersController.update('aabbcc', mockUser)).toStrictEqual(
      mockUser,
    );
  });

  it('Shoud delete a user', async () => {
    const mockUser = {
      id: 'aabbcc',
      email: 'foo@email.com',
      password: 'foobar',
      name: 'foo',
      createdAt: new Date(Date.now()),
    };

    jest
      .spyOn(usersService, 'delete')
      .mockImplementation(() => new Promise((resolve) => resolve(mockUser)));

    expect(await usersController.delete('aabbcc')).toStrictEqual(mockUser);
  });
});
