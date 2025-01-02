
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';

describe('Users Module (E2E)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let userId: Number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // Ensure AppModule imports your database module
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    dataSource = moduleFixture.get<DataSource>(DataSource);
  });

  afterAll(async () => {
    // Clean up database
    await dataSource.query("TRUNCATE TABLE \"user\" RESTART IDENTITY;");
    await app.close();
  });

  it('should create a new user', async () => {
    const newUser = {
      name: 'Jonathan Kuminga',
      email: 'jonathan@example.com',
      role: 'EMPLOYEE',
    };

    const response = await request(app.getHttpServer())
      .post('/users')
      .send(newUser)
      .expect(201);

    expect(response.body).toMatchObject({
      id: expect.any(Number),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    });

    userId = response.body.id;
  });

  it('should retrieve all users', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should throw error for non-existing user with given role filter', async () => {
    await request(app.getHttpServer())
      .get('/users?role=ADMIN')
      .expect(404);
  });

  it('should retrieve a user by ID', async () => {
    const response = await request(app.getHttpServer())
      .get(`/users/${userId}`)
      .expect(200);

    expect(response.body).toMatchObject({
      id: userId,
      name: expect.any(String),
      email: expect.any(String),
      role: expect.any(String),
    });
  });

  it('should update a user', async () => {
    const updatePayload = {
      name: 'Andrew Kuminga',
      email: 'andrew@example.com',
    };

    const response = await request(app.getHttpServer())
      .patch(`/users/${userId}`)
      .send(updatePayload)
      .expect(200);

    expect(response.body).toMatchObject({
      id: userId,
      name: updatePayload.name,
      email: updatePayload.email,
    });
  });

  it('should delete a user', async () => {
    await request(app.getHttpServer())
      .delete(`/users/${userId}`)
      .expect(200);

    await request(app.getHttpServer())
      .get(`/users/${userId}`)
      .expect(404);
  });

  it('should throw not acceptable id parameters for update, delete, and get', async () => {
    const nonNumericId = 'abc';
    const updatePayload = {
      name: 'Andrew Kuminga',
      email: 'andrew@example.com',
    };
    await request(app.getHttpServer())
      .patch(`/users/${nonNumericId}`)
      .send(updatePayload)
      .expect(406);

    await request(app.getHttpServer())
      .delete(`/users/${nonNumericId}`)
      .expect(406);

    await request(app.getHttpServer())
      .get(`/users/${nonNumericId}`)
      .expect(406);
  });
});
