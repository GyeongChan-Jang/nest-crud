import { CreateBoardDto } from './dto/create-board.dto'
import { Injectable, NotFoundException } from '@nestjs/common'
import { BoardStatus, Board } from './board.model'
import { v1 as uuid } from 'uuid'

@Injectable()
export class BoardsService {
  // 다른곳에서 접근하지 못하게 Private 사용
  private boards: Board[] = []

  getAllBoards(): Board[] {
    return this.boards
  }

  createBoard(createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto
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
    const found = this.boards.find((board) => board.id === id)
    if (!found) {
      throw new NotFoundException(`cant't not found with ${id}`)
    }
    return found
  }

  deleteBoard(id: string): void {
    const found = this.getBoardById(id)
    this.boards = this.boards.filter((board) => board.id !== found.id)
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
