import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CertificadoBancario } from './certificado.entity';
import { Cliente } from '../Cliente/cliente.entity';
import { DepositoService } from './Deposito/deposito.service';
import { BadRequestException } from '@nestjs/common';
import { CreateCertificadoDto } from './dto/create-certificado.dto';

@Injectable()
export class CertificadoBancarioService {
  constructor(
    @InjectRepository(CertificadoBancario)
    private certificadoRepository: Repository<CertificadoBancario>,
    private readonly depositoService: DepositoService,
  ) {}

  async create(certificadoDto: CreateCertificadoDto): Promise<CertificadoBancario> {
    // Verificar si alguno de los campos requeridos falta en el objeto 'certificadoDto'
    if (!certificadoDto.monto || !certificadoDto.meses || !certificadoDto.interes || !certificadoDto.penalizacion || !certificadoDto.fechaInicio || !certificadoDto.fechaVencimiento || certificadoDto.estado === undefined || !certificadoDto.clienteId) {
      throw new BadRequestException('Faltan campos requeridos en el objeto CertificadoBancario');
    }
  
    // Crear una nueva instancia de CertificadoBancario y asignar las propiedades del DTO
    const certificado = new CertificadoBancario();
    certificado.monto = certificadoDto.monto;
    certificado.meses = certificadoDto.meses;
    certificado.interes = certificadoDto.interes;
    certificado.penalizacion = certificadoDto.penalizacion;
    certificado.fechaInicio = certificadoDto.fechaInicio;
    certificado.fechaVencimiento = certificadoDto.fechaVencimiento;
    certificado.estado = certificadoDto.estado;
    certificado.clienteId = certificadoDto.clienteId;
  
    // Guardar el certificado en la base de datos
    return this.certificadoRepository.save(certificado);

  }


  async findAll(): Promise<CertificadoBancario[]> {
    return this.certificadoRepository.find();
  }

  async findOne(certificadoId: number): Promise<CertificadoBancario> {

    const certificado = this.certificadoRepository.findOneOrFail({
      where: { id: certificadoId},
    });

    if(!certificado || (await certificado).estado === false)
    {
      throw new BadRequestException('El certificado no existe o esta cerrado');
    }

    return  certificado;
  }


   async calcularGananciaPorMes(monto: number, interes: number, meses: number): Promise<number[]> {
      const gananciaTotal = monto * (interes / 100) * (meses / 12);
      const gananciaPorMes = [];
  
      for (let i = 1; i <= meses; i++) {
        const ganancia = gananciaTotal / meses;
        gananciaPorMes.push({
            mes: i,
            ganancia: parseFloat(ganancia.toFixed(2))
        });
      }
  
      return gananciaPorMes;
    }


  async getAllCertificados(): Promise<CertificadoBancario[]> {
    const certificados = await this.certificadoRepository.find();

    if (certificados.length === 0) {
      throw new BadRequestException('No se encontraron certificados');
    }
  
    return certificados;
  }

  async calcularInteres(certificadoId: number): Promise<number> {
    const certificado = await this.certificadoRepository.findOne({
        where: { id: certificadoId},
      });
  
    // Calcular el número de días transcurridos desde la fecha de inicio
    const hoy = new Date();
    const fechaInicio = new Date(certificado.fechaInicio); 
    const diasTranscurridos = Math.floor((hoy.getTime() - fechaInicio.getTime()) / (1000 * 60 * 60 * 24));
  
    // Calcular el interés generado hasta la fecha actual
    const interesGenerado = certificado.monto * (certificado.interes / 100) * (diasTranscurridos / 365);

    const balanceTotal = certificado.monto + interesGenerado;
  
    return parseFloat(balanceTotal.toFixed(2));
  }

  async findAllByCliente(clienteId: number): Promise<{ idCertificado: number, balance: number }[]> {
    const certificados = await this.certificadoRepository.find({ where: { clienteId: clienteId } });
  
    // Para cada certificado, calcular el balance total y devolver un objeto con el id y el balance
    const balances = await Promise.all(certificados.map(async (certificado) => {
      const balanceTotal = await this.calcularInteres(certificado.id);
      return { idCertificado: certificado.id, balance: balanceTotal };
    }));
  
    return balances;
  }

  async generarTablaGanancias(id: number): Promise<any[]> {

    const certificado = await this.certificadoRepository.findOne({
      where: { id: id},
    });

    if (!certificado) {
      throw new BadRequestException('Certificado no encontrado');
    }

   
   

    const depositos = await this.depositoService.obtenerDepositosPorCertificado(id);
    const tablaGanancias = [];
    let montoActual = certificado.monto;
    let fechaActual = new Date(certificado.fechaInicio);
    fechaActual.setDate(fechaActual.getDate() + 1);
    const interesMensual = (certificado.interes / 100 / 12);

    for (let mes = 1; mes <= certificado.meses; mes++) {
      // Agregar depósitos realizados en este mes al monto actual
      depositos.forEach(deposito => {
        const fechaDeposito = new Date(deposito.fecha);
        if (fechaDeposito.getMonth() === fechaActual.getMonth() &&
            fechaDeposito.getFullYear() === fechaActual.getFullYear()) {
          montoActual += deposito.monto;
        }
      });

      const intereses = montoActual * interesMensual;
      const total = montoActual + intereses;
      
      const nextMonth = fechaActual.getMonth() + 1;
      const nextYear = fechaActual.getFullYear() + Math.floor(nextMonth / 12);
      fechaActual.setFullYear(nextYear, nextMonth % 12);

      tablaGanancias.push({
        mes,
        fecha: new Date(fechaActual).toLocaleDateString("ES-DO"),
        ganancias: intereses.toFixed(2) ,
        total: total.toFixed(2),
      });

      montoActual = total;
    }

    return tablaGanancias;
  }

  async balancePorIdCertificado(id: number): Promise<number> {
    const certificado = await this.certificadoRepository.findOne({
      where: { id: id},
    });

    if (!certificado) {
      throw new BadRequestException('Certificado no encontrado');
    }

 
    const depositos = await this.depositoService.obtenerDepositosPorCertificado(id);
    const tablaGanancias = [];
    let balance=0;
    let montoActual = certificado.monto;
    let fechaActual = new Date(certificado.fechaInicio);
    fechaActual.setDate(fechaActual.getDate() + 1);
    const interesMensual = (certificado.interes / 100 / 12);
    const fechaHoy = new Date();

    for (let mes = 1; mes <= certificado.meses; mes++) {

      if(fechaActual.getMonth()<= fechaHoy.getMonth())
      {
      // Agregar depósitos realizados en este mes al monto actual
      depositos.forEach(deposito => {
        const fechaDeposito = new Date(deposito.fecha);
        if (fechaDeposito.getMonth() === fechaActual.getMonth() &&
            fechaDeposito.getFullYear() === fechaActual.getFullYear()) {
          montoActual += deposito.monto;
        }
      });

      const intereses = montoActual * interesMensual;
      const total = montoActual + intereses;
      balance = montoActual + intereses;
      const nextMonth = fechaActual.getMonth() + 1;
      const nextYear = fechaActual.getFullYear() + Math.floor(nextMonth / 12);
      fechaActual.setFullYear(nextYear, nextMonth % 12);

      tablaGanancias.push({
        mes,
        fecha: new Date(fechaActual),
        ganancias: intereses ,
        total,
      });

      montoActual = total;
    }
    }

    return parseFloat(balance.toFixed(2));
  }

  async balancePorIdCliente(clienteId: number): Promise<{ idCertificado: number, balance: number }[]> {
    const certificados = await this.certificadoRepository.find({ where: { clienteId: clienteId } });
  
    if (certificados.length === 0) {
      throw new NotFoundException(`No hay Certificados para el Cliente con ID ${clienteId}.`);
    }
  
   
    const balances = await Promise.all(certificados.map(async (certificado) => {
      const balanceTotal = await this.balancePorIdCertificado(certificado.id);
      return { idCertificado: certificado.id, balance: balanceTotal };
    }));
  
    return balances;
  }
  
  async retirarFondos(idCertificado: number, fechaRetiro: Date) {
    const certificado = await this.certificadoRepository.findOne({
      where: { id: idCertificado},
    });
  
    if (!certificado) {
      throw new BadRequestException('Certificado no encontrado');
    }
  
    if (!certificado.estado) {
      throw new BadRequestException('El certificado ya está cerrado');
    }
  
    const fechaRetiroObj = new Date(fechaRetiro);
    const fechaVencimientoObj = new Date(certificado.fechaVencimiento);
    const balance = await this.balancePorIdCertificado(idCertificado);
    let montoARetirar = balance;
    let penalizacion = 0;
  
    if (fechaRetiroObj < fechaVencimientoObj) {
      montoARetirar -= montoARetirar * certificado.penalizacion / 100;
      penalizacion= certificado.penalizacion;
    }
  
    certificado.estado = false;
    await this.certificadoRepository.save(certificado);
  
    return {
      balance: balance,
      balanceRetirable: parseInt(montoARetirar.toFixed(2)),
      penalizacion: penalizacion,
      estado: certificado.estado
    };
}
}




