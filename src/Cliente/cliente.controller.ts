import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Cliente } from './cliente.entity';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Controller('cliente')
@ApiTags('Cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

@ApiOperation({ summary: 'Crear un nuevo cliente' })
@ApiBody({ type: CreateClienteDto })
@ApiResponse({ status: 201, description: 'Cliente creado' })
  @Post('created')
  async crearCliente(@Body() cliente: Cliente): Promise<Cliente> {
    return this.clienteService.create(cliente);
  }

@ApiOperation({ summary: 'Obtener lista de clientes' })
@ApiResponse({ status: 200, description: 'Lista de clientes obtenida' })
@Get('list')
  async obtenerClientes(): Promise<Cliente[]> {
    return this.clienteService.findAll();
  }

  @ApiOperation({ summary: 'Actualizar cliente' })
  @ApiResponse({ status: 200, description: 'Cliente actualizado correctamente' })
  @ApiBody({ type: UpdateClienteDto })
  @Patch('update/:id')
  async actualizarCliente(
    @Param('id') id: string,
    @Body() cliente: Cliente,
  ): Promise<Cliente> {
    return this.clienteService.update(parseInt(id), cliente);
  }
}