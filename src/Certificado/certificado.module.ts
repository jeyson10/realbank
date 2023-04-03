import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CertificadoBancario } from './certificado.entity';
import { CertificadoBancarioController } from './certificado.controller';
import { CertificadoBancarioService } from './certificado.service';
import { Cliente } from '../Cliente/cliente.entity';
import { Deposito } from './Deposito/deposito.entity';
import { DepositoService } from './Deposito/deposito.service';




@Module({
  imports: [
    TypeOrmModule.forFeature([CertificadoBancario, Cliente,Deposito]),
  ],
  controllers: [CertificadoBancarioController],
  providers: [CertificadoBancarioService,DepositoService],
})
export class CertificadoBancarioModule {}