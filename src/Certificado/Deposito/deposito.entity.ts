// deposito.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { CertificadoBancario } from '../certificado.entity';

@Entity()
export class Deposito {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float' })
  monto: number;

  @Column({ type: 'date' })
  fecha: Date;

  @ManyToOne(() => CertificadoBancario)
  @JoinColumn({ name: 'certificadoId' })
  certificado: CertificadoBancario;

  @Column()
  certificadoId: number;
}
