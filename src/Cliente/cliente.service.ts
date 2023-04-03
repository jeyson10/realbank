import { Injectable } from '@nestjs/common';
import { BadRequestException, ConflictException , NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './cliente.entity';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async create(cliente: Cliente): Promise<Cliente> {
    // Comprobar si faltan campos requeridos
    if (!cliente.nombre || !cliente.correo || !cliente.identificacion) {
      throw new BadRequestException('Faltan campos requeridos');
    }
  
    // Comprobar si el correo ya existe en la base de datos
    const existingEmail = await this.clienteRepository.findOne({
      where: { correo: cliente.correo},
    });
    if (existingEmail) {
      throw new ConflictException('El correo ya existe en la base de datos');
    }
  
    // Comprobar si la identificación ya existe en la base de datos
    const existingId = await this.clienteRepository.findOne({
      where: { identificacion: cliente.identificacion},
    });
    if (existingId) {
      throw new ConflictException('La identificación ya existe en la base de datos');
    }
  
    // Guardar el cliente en la base de datos
    return this.clienteRepository.save(cliente);
  }

  async findAll(): Promise<Cliente[]> {
    const clientes = this.clienteRepository.find();
    if (!clientes || (await clientes).length === 0) {
      throw new BadRequestException('No existen clientes en la Base de datos');
    }
    return clientes;
  }

  async update(id: number, cliente: Cliente): Promise<Cliente> {

    const existingCliente = await this.clienteRepository.findOne({ where: { id } });
    if (!existingCliente) {
      throw new NotFoundException('El cliente no existe');
    }
  
    // Comprobar si el correo ya existe en otro cliente en la base de datos
    const existingEmail = await this.clienteRepository.findOne({ where: { correo: cliente.correo } });
    if (existingEmail && existingEmail.id !== id) {
      throw new ConflictException('El correo ya existe en la base de datos');
    }

        // Comprobar si el correo ya existe en otro cliente en la base de datos
        const existingId = await this.clienteRepository.findOne({ where: { correo: cliente.identificacion } });
        if (existingId && existingId.id !== id) {
          throw new ConflictException('La identificacion ya existe en la base de datos');
        }
  
    await this.clienteRepository.update(id, cliente);
    return this.clienteRepository.findOne({ where: { id } });
  }
}