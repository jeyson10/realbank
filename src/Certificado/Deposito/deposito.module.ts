import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepositoController } from './deposito.controller';
import { DepositoService } from './deposito.service';
import { Deposito } from './deposito.entity';
import { CertificadoBancario } from '../certificado.entity';
import { CertificadoBancarioService } from '../certificado.service';
import { ClienteService } from 'src/Cliente/cliente.service';
import { Cliente } from 'src/Cliente/cliente.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Deposito,CertificadoBancario,Cliente])],
  controllers: [DepositoController],
  providers: [DepositoService,CertificadoBancarioService,ClienteService],
})
export class DepositoModule {}
