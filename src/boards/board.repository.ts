import { DataSource, Repository } from 'typeorm'
import { Board } from './board.entity'
import { CustomRepository } from './CustomRepository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private dataSource: DataSource) {
    super(Board, dataSource.createEntityManager())
  }
}

// @CustomRepository(Board)
// export class BoardRepository extends Repository<Board> {}

// @Injectable()
// export class BoardRepository {
//   constructor(
//     @InjectRepository(Board)
//     private boardRepository: Repository<Board>
//   ) {}
// }
