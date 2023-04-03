import { CertificadoBancario } from 'src/Certificado/certificado.entity';
import { Entity, Column, PrimaryGeneratedColumn,OneToMany } from 'typeorm';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  correo: string;

  @Column()
  identificacion: string;

  @Column()
  telefono: string;

  @Column({ default: true })
  estado: boolean;

  @OneToMany(() => CertificadoBancario, certificado => certificado.cliente)
  certificados: CertificadoBancario[];

  
}