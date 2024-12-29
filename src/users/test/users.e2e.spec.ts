import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "../users.module";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";


// beforeAll(async () => {
//   let app: INestApplication;
//   let repository: Repository<User>;

//   const module = await Test.createTestingModule({
//     imports: [
//       TypeOrmModule.forRoot({
//         type: process.env.DB_TYPE as any,
//         host: process.env.POSTGRES_HOST,
//         port: process.env.POSTGRES_PORT as any,
//         username: process.env.POSTGRES_USER,
//         password: process.env.POSTGRES_PASSWORD,
//         database: process.env.POSTGRES_DATABASE_TEST,
//         autoLoadEntities: true,
//         synchronize: process.env.ENV != "prod",
//       }),
//       UsersModule,
//     ],
//   }).compile();

//   app = module.createNestApplication();
//   repository = module.get('UserRepository');
//   await app.init();
// });
