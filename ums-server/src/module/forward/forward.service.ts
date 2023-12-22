import { Injectable } from '@nestjs/common';
import { CreateForwardDto } from './dto/create-forward.dto';
import { UpdateForwardDto } from './dto/update-forward.dto';

@Injectable()
export class ForwardService {
  create(createForwardDto: CreateForwardDto) {
    return 'This action adds a new forward';
  }

  findAll() {
    return `This action returns all forward`;
  }

  findOne(id: number) {
    return `This action returns a #${id} forward`;
  }

  update(id: number, updateForwardDto: UpdateForwardDto) {
    return `This action updates a #${id} forward`;
  }

  remove(id: number) {
    return `This action removes a #${id} forward`;
  }
}
