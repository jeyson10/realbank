import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepositoController } from './deposito.controller';
import { DepositoService } from './deposito.service';
import { Deposito } from './deposito.entity';
import { CertificadoBancario } from '../certificado.entity';
import { CertificadoBancarioService } from '../certificado.service';


@Module({
  imports: [TypeOrmModule.forFeature([Deposito,CertificadoBancario])],
  controllers: [DepositoController],
  providers: [DepositoService,CertificadoBancarioService],
})
export class DepositoModule {}
