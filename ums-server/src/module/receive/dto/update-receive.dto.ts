import { PartialType } from '@nestjs/mapped-types';
import { CreateReceiveDto } from './create-receive.dto';

export class UpdateReceiveDto extends PartialType(CreateReceiveDto) {}
