import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { DepositoService } from './deposito.service';
import { Deposito } from './deposito.entity';
import { DepositoDto } from './dto/create-deposito.dto';

@ApiTags('Balance y Depositos')
@Controller('certificado/deposito')
export class DepositoController {
  constructor(private readonly depositoService: DepositoService) {}

  @Get('certificado/:certificadoId')
  @ApiOperation({ summary: 'Obtener depósitos por certificado' })
  @ApiResponse({
    status: 200,
    description: 'Depósitos obtenidos correctamente',
    type: [DepositoDto],
  })
  @ApiParam({ name: 'certificadoId', required: true, description: 'ID del certificado' })
  async obtenerDepositosPorCertificado(@Param('certificadoId') certificadoId: number) {
    return this.depositoService.obtenerDepositosPorCertificado(certificadoId);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un depósito' })
  @ApiResponse({
    status: 201,
    description: 'Depósito creado correctamente',
    type: DepositoDto,
  })
  @ApiBody({ type: DepositoDto })
  async crearDeposito(@Body() deposito: DepositoDto) {
    return this.depositoService.crearDeposito(deposito);
  }
}