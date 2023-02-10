import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status: HttpStatus;

    /**
     * Prisma Client error codes:
     * @see https://www.prisma.io/docs/reference/api-reference/error-reference#prisma-client-query-engine
     */
    switch (exception.code) {
      case 'P2002':
        status = HttpStatus.BAD_REQUEST;

        response.status(status).json({
          statusCode: status,
          message: 'Unique constraint violation',
          fields: exception.meta.target,
        });
        break;

      case 'P2025':
        status = HttpStatus.NOT_FOUND;

        response.status(status).json({
          statusCode: status,
          message: exception.meta.cause,
        });
        break;

      default:
        super.catch(exception, host);
        break;
    }
  }
}
