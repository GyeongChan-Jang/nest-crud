import { CreateBoardDto } from './dto/create-board.dto'
import { Injectable, NotFoundException } from '@nestjs/common'
import { BoardStatus } from './board-status.enum'
import { v1 as uuid } from 'uuid'
import { BoardRepository } from './board.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { Board } from './board.entity'

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository) private boardRepository: BoardRepository
  ) {}

  // 다른곳에서 접근하지 못하게 Private 사용
  // private boards: Board[] = []
  // getAllBoards(): Board[] {
  //   return this.boards
  // }
  // // DTO 사용
  // createBoard(createBoardDto: CreateBoardDto) {
  //   const { title, description } = createBoardDto
  //   const board: Board = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //   }
  //   this.boards.push(board)
  //   return board
  // }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne(id)
    if (!found) {
      throw new NotFoundException(`Cna't find Board with id ${id}`)
    }
    return found
  }

  // getBoardById(id: string): Board {
  //   const found = this.boards.find((board) => board.id === id)
  //   if (!found) {
  //     throw new NotFoundException(`Can't find Board with id ${id}`)
  //   }
  //   return found
  // }
  // deleteBoard(id: string): void {
  //   // 없는 게시물을 지우려 할 때 결과 값 예외처리
  //   // getBoardById에서 존재 여부를 체크하기 때문에 따로 예외처리를 하지 않아도됨
  //   const found = this.getBoardById(id)
  //   this.boards = this.boards.filter((board) => board.id !== found.id)
  // }
  // // 내가 만든거 getBoardById 메서드 사용하지 않음..
  // // updateBoardStatus(id: string, status: BoardStatus): void {
  // //   this.boards.map((board) =>
  // //     board.id === id ? (board.status = status) : board
  // //   )
  // // }
  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id)
  //   board.status = status
  //   return board
  // }
}
