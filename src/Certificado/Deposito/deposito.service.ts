import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deposito } from './deposito.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { DepositoDto } from './dto/create-deposito.dto';
import { CertificadoBancario } from '../certificado.entity';



@Injectable()
export class DepositoService {
  constructor(
    @InjectRepository(Deposito)
    private depositoRepository: Repository<Deposito>,
    @InjectRepository(CertificadoBancario)
    private readonly certificadoRepository: Repository<CertificadoBancario>,
  ) {}

  async obtenerDepositosPorCertificado(certificadoId: number): Promise<Deposito[]> {
    const depositos = await this.depositoRepository.find({ where: { certificadoId } });
  
    return depositos;
  }

  async crearDeposito(deposito: DepositoDto): Promise<Deposito> {
    if (!deposito.certificadoId) {
        throw new BadRequestException('Falta el campo \'certificadoId\'');
      }

      const certificado = await this.certificadoRepository.findOne({where: {id: deposito.certificadoId}});
      if (!certificado) {
        throw new NotFoundException(`El certificado con ID '${deposito.certificadoId}' no existe`);
      }
    
    const nuevoDeposito = this.depositoRepository.create(deposito);
    return this.depositoRepository.save(nuevoDeposito);
  }
}
