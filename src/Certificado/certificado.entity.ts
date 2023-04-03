import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn,OneToMany } from 'typeorm';
import { Cliente } from '../Cliente/cliente.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class CertificadoBancario {

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'float' })
  monto: number;

  @ApiProperty()
  @Column({ type: 'integer' })
  meses: number;

  @ApiProperty()
  @Column({ type: 'float' })
  interes: number;

  @ApiProperty()
  @Column({ type: 'float' })
  penalizacion: number;

  @ApiProperty()
  @Column({ type: 'date' })
  fechaInicio: Date;

  @ApiProperty({ type: () => String, format: 'date' })
  @Column({ type: 'date' })
  fechaVencimiento: Date;

  @ApiProperty()
  @Column({ default: true })
  estado: boolean;

  @ApiProperty({ type: () => Cliente })
  @ManyToOne(() => Cliente)
  @JoinColumn({ name: 'clienteId' })
  cliente: Cliente;

  @ApiProperty()
  @Column()
  clienteId: number;


}