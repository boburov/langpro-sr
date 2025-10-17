import { Injectable } from '@nestjs/common';

@Injectable()
export class NameSanitizerService {
  sanitize(name: string) {
    return name
      .replace(/\(\d+\)/g, '') // remove (number) like (4)
      .replace(/[<>:"/\\|?*\x00-\x1F]/g, '') // remove harmful characters
      .replace(/\s+/g, '_') // replace spaces with underscores
      .trim();
  }
}
