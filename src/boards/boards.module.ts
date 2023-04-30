import { Module } from '@nestjs/common'
import { BoardsController } from './boards.controller'
import { BoardsService } from './boards.service'
import { BoardRepository } from './board.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Board } from './board.entity'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  // 생성한 Repository를 다른 곳에서도 사용할 수 있기 위해서 imports
  imports: [TypeOrmModule.forFeature([Board]), AuthModule],
  controllers: [BoardsController],
  providers: [BoardsService, BoardRepository],
})
export class BoardsModule {}
