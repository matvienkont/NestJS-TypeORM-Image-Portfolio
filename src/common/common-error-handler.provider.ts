import { BadRequestException, HttpStatus, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DBRepositories, PostgresErrorCodes } from '../constants';
import { Dictionary } from 'ts-essentials';

export class CommonProvider {
    static handleError(err: any, funcName: string, responseObject: Dictionary<string>) {
        if (err.status === HttpStatus.NOT_FOUND) {
            throw new NotFoundException(responseObject);
        }

        if (err.code === PostgresErrorCodes.ForeignKeyMismatch) {
            throw new NotFoundException(responseObject);
        } else if (err.code === PostgresErrorCodes.DuplicateCode) {
            throw new BadRequestException(responseObject);
        }

        console.error(funcName, err);
        throw new InternalServerErrorException();
    }
}