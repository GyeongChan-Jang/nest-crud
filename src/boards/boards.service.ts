import { Injectable } from '@nestjs/common'

@Injectable()
export class BoardsService {
  // 다른곳에서 접근하지 못하게 Private 사용
  private boards = []

  getAllBoards() {
    return this.boards
  }
}
