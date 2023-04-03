import { ApiProperty } from '@nestjs/swagger';

export class RetirarFondosDto {
  @ApiProperty({ description: 'ID del certificado bancario' })
  idCertificado: number;

  @ApiProperty({ description: 'Fecha de retiro', format: 'date-time' })
  fechaRetiro: Date;
}
