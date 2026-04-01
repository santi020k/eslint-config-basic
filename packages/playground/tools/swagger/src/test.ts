import { Controller, Get } from '@nestjs/common'

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
@Controller('cats')
export class CatsController {
  // Method intentionally missing @ApiResponse decorator — rule still active
  // eslint-disable-next-line @darraghor/nestjs-typed/api-method-should-specify-api-response, @typescript-eslint/no-unsafe-call
  @Get()
  findAll(): string[] {
    return []
  }
}
