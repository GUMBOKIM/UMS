import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ForwardService } from './forward.service';
import { CreateForwardDto } from './dto/create-forward.dto';
import { UpdateForwardDto } from './dto/update-forward.dto';

@Controller('forward')
export class ForwardController {
  constructor(private readonly forwardService: ForwardService) {}

  @Post()
  create(@Body() createForwardDto: CreateForwardDto) {
    return this.forwardService.create(createForwardDto);
  }

  @Get()
  findAll() {
    return this.forwardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.forwardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateForwardDto: UpdateForwardDto) {
    return this.forwardService.update(+id, updateForwardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.forwardService.remove(+id);
  }
}
