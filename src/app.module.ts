import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CertificadoBancario } from './Certificado/certificado.entity';
import { CertificadoBancarioModule } from './Certificado/certificado.module';
import { Deposito } from './Certificado/Deposito/deposito.entity';
import { DepositoModule } from './Certificado/Deposito/deposito.module';
import { Cliente } from './Cliente/cliente.entity';
import { ClienteModule } from './Cliente/cliente.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'realbank',
      entities: [Cliente,CertificadoBancario,Deposito],
      synchronize: true,
    }),
    ClienteModule,
    CertificadoBancarioModule,
    DepositoModule
  ],
})
export class AppModule {}
