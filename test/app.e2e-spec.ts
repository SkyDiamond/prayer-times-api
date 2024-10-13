import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/prayer-times (POST)', () => {
    return request(app.getHttpServer())
      .post('/prayer-times')
      .send({
        latitude: 21.3891,
        longitude: 39.8579,
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('Fajr');
        expect(res.body).toHaveProperty('Sunrise');
        expect(res.body).toHaveProperty('Dhuhr');
        expect(res.body).toHaveProperty('Asr');
        expect(res.body).toHaveProperty('Maghrib');
        expect(res.body).toHaveProperty('Isha');
      });
  });

  it('/prayer-times/location-name (POST)', () => {
    return request(app.getHttpServer())
      .post('/prayer-times/location-name')
      .send({
        latitude: 21.3891,
        longitude: 39.8579,
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('locationName');
      });
  });
});
