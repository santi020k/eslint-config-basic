import { Controller, Get } from '@nestjs/common'

@Controller('cats')
export class CatsController {
  // Method intentionally missing @ApiResponse decorator — rule still active
  // eslint-disable-next-line @darraghor/nestjs-typed/api-method-should-specify-api-response
  @Get()
  findAll(): string[] {
    return []
  }
}
