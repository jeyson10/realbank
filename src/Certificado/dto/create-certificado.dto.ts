import { ApiProperty } from '@nestjs/swagger';

export class CreateCertificadoDto {
  @ApiProperty({ description: 'Monto del certificado bancario', type: 'number' })
  monto: number;

  @ApiProperty({ description: 'Meses del certificado bancario', type: 'integer' })
  meses: number;

  @ApiProperty({ description: 'Interés del certificado bancario', type: 'number' })
  interes: number;

  @ApiProperty({ description: 'Penalización del certificado bancario', type: 'number' })
  penalizacion: number;

  @ApiProperty({ description: 'Fecha de inicio del certificado bancario', format: 'date' })
  fechaInicio: Date;

  @ApiProperty({ description: 'Fecha de vencimiento del certificado bancario', format: 'date' })
  fechaVencimiento: Date;

  @ApiProperty({ description: 'Estado del certificado bancario', type: 'boolean' })
  estado: boolean;

  @ApiProperty({ description: 'ID del cliente asociado al certificado bancario', type: 'integer' })
  clienteId: number;
}
