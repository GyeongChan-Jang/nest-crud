import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { BoardsService } from './boards.service'
import { BoardStatus } from './board-status.enum'
import { CreateBoardDto } from './dto/create-board.dto'
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe'
import { Board } from './board.entity'

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  // @Get('/')
  // getAllBoard(): Board[] {
  //   return this.boardsService.getAllBoards()
  // }

  // @Post()

  // // DTO 사용
  // @UsePipes(ValidationPipe)
  // createBoard(@Body() createBoardDto: CreateBoardDto): Board {
  //   console.log(createBoardDto)

  //   return this.boardsService.createBoard(createBoardDto)
  // }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id)
  }

  // @Get('/:id')
  // getBoardById(@Param('id') id: string): Board {
  //   return this.boardsService.getBoardById(id)
  // }

  // @Delete('/:id')
  // deleteBoard(@Param('id') id: string): void {
  //   console.log(id)
  //   this.boardsService.deleteBoard(id)
  // }

  // @Patch('/:id/status')
  // updateBoardStatus(
  //   @Param('id') id: string,
  //   @Body('status', BoardStatusValidationPipe) status: BoardStatus
  // ) {
  //   this.boardsService.updateBoardStatus(id, status)
  // }
}
