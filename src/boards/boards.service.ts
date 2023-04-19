import { CreateBoardDto } from './dto/create-board.dto'
import { Injectable } from '@nestjs/common'
import { BoardStatus, Board } from './board.model'
import { v1 as uuid } from 'uuid'

@Injectable()
export class BoardsService {
  // 다른곳에서 접근하지 못하게 Private 사용
  private boards: Board[] = []

  getAllBoards(): Board[] {
    return this.boards
  }

  createBoard(CreateBoardDto: CreateBoardDto) {
    const { title, description } = CreateBoardDto
    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    }
    this.boards.push(board)
    return board
  }

  getBoardById(id: string): Board {
    return this.boards.find((board) => board.id === id)
  }

  deleteBoard(id: string): void {
    this.boards = this.boards.filter((board) => board.id !== id)
  }

  // 내가 만든거 getBoardById 메서드 사용하지 않음..
  // updateBoardStatus(id: string, status: BoardStatus): void {
  //   this.boards.map((board) =>
  //     board.id === id ? (board.status = status) : board
  //   )
  // }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id)
    board.status = status
    return board
  }
}
