import {
    ArgumentsHost,
    Catch,
    HttpException,
    HttpServer,
    HttpStatus,
    Logger,
  } from '@nestjs/common';
  import { BaseExceptionFilter } from '@nestjs/core';
  import { Prisma } from '@prisma/client';
  
  export type ErrorCodesStatusMapping = {
    [key: string]: number;
  };
  
  /**
   * {@link PrismaClientExceptionFilter}
   * catches {@link Prisma.PrismaClientKnownRequestError}
   * and {@link Prisma.NotFoundError} exceptions.
   */
  @Catch(Prisma?.PrismaClientKnownRequestError, Prisma?.PrismaClientKnownRequestError )
  export class PrismaClientExceptionFilter extends BaseExceptionFilter {
    /**
     * default error codes mapping
     *
     * Error codes definition for Prisma Client (Query Engine)
     * @see https://www.prisma.io/docs/reference/api-reference/error-reference#prisma-client-query-engine
     * @see https://docs.paloaltonetworks.com/saas-security/saas-security-admin/saas-security-api/syslog-and-api-integration/api-client-integration/public-api-references/http-request-methods-and-status-codes
    */
    private errorCodesStatusMapping: ErrorCodesStatusMapping = {

    //Common
    //Prisma Client (Query Engine)
      P2000: HttpStatus.BAD_REQUEST,
      P2002: HttpStatus.CONFLICT,
      P2025: HttpStatus.NOT_FOUND,
    };

    private logger: Logger = new Logger('all-exceptions-filter')
  
    /**
     * @param applicationRef
     * @param errorCodesStatusMapping
     */
    constructor(
      applicationRef?: HttpServer,
      errorCodesStatusMapping?: ErrorCodesStatusMapping,
    ) {
      super(applicationRef);

      
  
      if (!errorCodesStatusMapping) {
        this.errorCodesStatusMapping = Object.assign(
          this.errorCodesStatusMapping,
          errorCodesStatusMapping,
        );
      }
    }
  
    /**
     * @param exception
     * @param host
     * @returns
     */
    catch(
      exception: Prisma.PrismaClientKnownRequestError | Prisma.PrismaClientKnownRequestError  | any,
      host: ArgumentsHost,
    ) {

      //console.log(exception.message);
        
      if (exception instanceof Prisma.PrismaClientKnownRequestError) {
        return this.catchClientKnownRequestError(exception, host);
      }
      /* if (exception instanceof Prisma.NotFoundError ) {
        error = this.catchNotFoundError(exception, host);
      }
      return error; */
    }
  
    private catchClientKnownRequestError(
      exception: Prisma.PrismaClientKnownRequestError,
      host: ArgumentsHost,
    ) {
      const statusCode = this.errorCodesStatusMapping[exception.code];
      const message = `[${exception.code}]: ${this.exceptionShortMessage(exception.message)}`;
  
      this.logger.error(message);
      if (!Object.keys(this.errorCodesStatusMapping).includes(exception.code)) {
        super.catch(exception, host);
      }
  
      //console.error(statusCode, exception.message);
      //throw new HttpException({ statusCode, message }, statusCode);
      super.catch(new HttpException({ statusCode, message }, statusCode), host);
    }
  
    private catchNotFoundError(
      { message }: Prisma.PrismaClientKnownRequestError ,
      host: ArgumentsHost,
    ) {
      const statusCode = HttpStatus.NOT_FOUND;
      //throw new HttpException({ statusCode, message }, statusCode);
      super.catch(new HttpException({ statusCode, message }, statusCode), host);
    }
  
    private exceptionShortMessage(message: string): string {
      const shortMessage = message.substring(message.indexOf('→'));

      return shortMessage
        .substring(shortMessage.indexOf('\n'))
        .replace(/\n/g, '')
        .trim();
    }
  }