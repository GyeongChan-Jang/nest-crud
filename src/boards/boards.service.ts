import { CreateBoardDto } from './dto/create-board.dto'
import { Injectable, NotFoundException } from '@nestjs/common'
import { BoardStatus } from './board-status.enum'
import { BoardRepository } from './board.repository'
import { Board } from './board.entity'
import { User } from 'src/auth/user.entity'

@Injectable()
export class BoardsService {
  constructor(private readonly boardRepository: BoardRepository) {}

  async getAllBoards(): Promise<Board[]> {
    // TypeORM 메서디인 find() 사용
    return this.boardRepository.find()
  }

  async getMyBoards(user: User): Promise<Board[]> {
    const query = this.boardRepository.createQueryBuilder('board') // 쿼리를 날릴 테이블명

    query.where('board.userId = :userId', { userId: user.id })

    const boards = await query.getMany()

    return boards
  }

  createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user)
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne({
      where: {
        id,
      },
    })
    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`)
    }
    return found
  }

  async updateBoard(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id)

    board.status = status
    // 상태 업데이트 후 다시 저장
    await this.boardRepository.save(board)
    return board
  }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id)

    // DB에 해당 데이터가 없는경우 에러 처리
    if (result.affected === 0) {
      throw new NotFoundException(`Cant't find Board with id ${id}`)
    }
  }
}
