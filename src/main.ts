import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const reflector = app.get(Reflector);

    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

    await app.listen(3000);
}
bootstrap();