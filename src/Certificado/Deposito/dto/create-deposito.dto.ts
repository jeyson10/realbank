import { ApiProperty } from '@nestjs/swagger';
import { CertificadoBancario } from '../../certificado.entity';


export class DepositoDto {

  @ApiProperty({ description: 'Monto del depósito' })
  monto: number;

  @ApiProperty({ description: 'Fecha del depósito' })
  fecha: Date;

  @ApiProperty({ description: 'ID del certificado bancario asociado al depósito' })
  certificadoId: number;
}
