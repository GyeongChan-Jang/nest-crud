import { Controller } from '@nestjs/common';

@Controller('boards')
export class BoardsController {
  constructor(private boardsServie: BoardsService)

  @Get()
  getAllBoard() {
    return this.boardsServie
  }
}
