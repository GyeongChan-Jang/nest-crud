import { Module } from '@nestjs/common'
import { BoardsModule } from './boards/boards.module'
import { TypeORMConfig } from './configs/typeorm.config'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forRoot(TypeORMConfig), BoardsModule],
})
export class AppModule {}
