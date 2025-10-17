import { PartialType } from '@nestjs/mapped-types';
import { CreateVocDto } from './create-voc.dto';

export class UpdateVocDto extends PartialType(CreateVocDto) {}
