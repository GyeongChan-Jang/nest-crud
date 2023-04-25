import { Module } from '@nestjs/common'
import { BoardsModule } from './boards/boards.module'
import { TypeORMConfig } from './configs/typeorm.config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [TypeOrmModule.forRoot(TypeORMConfig), BoardsModule, AuthModule],
})
export class AppModule {}
