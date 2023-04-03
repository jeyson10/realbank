import { Controller, Get, Post, Param, Body, Patch } from '@nestjs/common';
import { CertificadoBancarioService } from './certificado.service';
import { CertificadoBancario } from './certificado.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBody,ApiParam } from '@nestjs/swagger';
import { RetirarFondosDto } from './dto/retirar-fondos.dto';
import { CreateCertificadoDto } from './dto/create-certificado.dto';



@Controller('certificado')
export class CertificadoBancarioController {
  constructor(private certificadoService: CertificadoBancarioService) {}

  @ApiTags('certificado')
  @Post('request')
  @ApiOperation({ summary: 'Crear un nuevo certificado bancario' })
  @ApiResponse({ status: 201, description: 'Certificado bancario creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Error: Faltan campos requeridos en el objeto CertificadoBancario' })
  async create(@Body() createCertificadoDto: CreateCertificadoDto): Promise<CertificadoBancario> {
    return this.certificadoService.create(createCertificadoDto);
  }


    @ApiTags('certificado')
    @Get('list')
    @ApiOperation({ summary: 'Obtener lista de certificados bancarios' })
    @ApiResponse({ status: 200, description: 'Lista de certificados bancarios' })
    @ApiResponse({ status: 400, description: 'No se encontraron certificados' })
    async getAllCertificados(): Promise<CertificadoBancario[]> {
      return this.certificadoService.findAll();
    }

    @ApiTags('Balance y Depositos')
    @Get('balancecliente/:clienteId')
    @ApiOperation({ summary: 'Obtener balance de todos los certificados por ID de cliente (Sumando intereses acumulados hasta el dia actual)' })
    @ApiResponse({
      status: 200,
      description: 'Balance del cliente obtenido correctamente',
    })
    @ApiParam({ name: 'clienteId', required: true, description: 'ID del cliente' })
    async balancePorIdCliente(
      @Param('clienteId') clienteId: number,
    ): Promise<{ idCertificado: number; balance: number }[]> {
      return this.certificadoService.balancePorIdCliente(clienteId);
    }

  @ApiTags('certificado')
  @ApiOperation({ summary: 'Listado de ganancias por mes para un certificado (Interes Reinvertido)' })
  @ApiParam({ name: 'id', description: 'ID del certificado', type: Number })
  @Get('/ganancia/:id')
  async generarTablaGanancias(@Param('id') id: number) {
    return this.certificadoService.generarTablaGanancias(id);
  }

  @ApiTags('Balance y Depositos')
  @ApiOperation({ summary: 'Balance para un certificado en especifico (Sumando intereses acumulados hasta el dia actual)' })
  @ApiParam({ name: 'id', description: 'ID del certificado', type: Number })
  @Get('/balance/:id')
  async balancePorIdCertificado(@Param('id') id: number) {
    const balanceObj = [];
    balanceObj.push({
      idCertificado: id,
      balance: (await this.certificadoService.balancePorIdCertificado(id)).toFixed(2)
    });

    return balanceObj;
  }

  @ApiTags('Balance y Depositos')
  @ApiOperation({ summary: 'Retirar fondos de un certificado bancario (Cancelacion de certificado)' })
  @ApiResponse({ status: 200, description: 'Fondos retirados con éxito' })
  @ApiBody({ type: RetirarFondosDto })
  @Post('retirar')
  async retirarFondos(
    @Body('idCertificado') idCertificado: number,
    @Body('fechaRetiro') fechaRetiro: Date,
  ) {
    return this.certificadoService.retirarFondos(idCertificado, fechaRetiro);
  }
}


