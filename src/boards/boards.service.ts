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
}
