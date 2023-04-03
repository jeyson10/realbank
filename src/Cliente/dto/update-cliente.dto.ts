import { ApiProperty } from '@nestjs/swagger';

export class UpdateClienteDto {
  @ApiProperty({ description: 'Nombre del Cliente', type: 'string' })
  nombre: string;

  @ApiProperty({ description: 'Apellido del Cliente', type: 'string' })
  apellido: string;
     
  @ApiProperty({ description: 'Correo del Cliente', type: 'string' })
  correo: string;

  @ApiProperty({ description: 'Identificacion del Cliente', type: 'string' })
  identificacion: string;

  @ApiProperty({ description: 'Telefono del Cliente', type: 'string' })
  telefono: string;

  @ApiProperty({ description: 'Estado del Cliente (Activo/Inactivo)', type: 'boolean' })
  estado: boolean;
}
