# RealBank API

## Descripción
Esta es una API creada con NestJS para la Gestion de Certificados bancarios de la empresa RealBank.

## Configurar Base de Datos

1. Crear Base de Datos: 
    ```
    CREATE DATABASE realbank;

    ```

2. Crear la tabla certificado_bancario: 

    ```

      CREATE TABLE IF NOT EXISTS public.certificado_bancario
      (
          id integer NOT NULL DEFAULT 'nextval('certificado_bancario_id_seq'::regclass)',
          monto double precision NOT NULL,
          meses integer NOT NULL,
          interes double precision NOT NULL,
          penalizacion double precision NOT NULL,
          "fechaVencimiento" date NOT NULL,
          estado boolean NOT NULL DEFAULT 'true',
          "clienteId" integer NOT NULL,
          "fechaInicio" date NOT NULL,
          CONSTRAINT "PK_469a4537492b266f0b5a73bf90d" PRIMARY KEY (id),
          CONSTRAINT "FK_4f6bac4a37235fc073e98ad469a" FOREIGN KEY ("clienteId")
              REFERENCES public.cliente (id) MATCH SIMPLE
              ON UPDATE NO ACTION
              ON DELETE NO ACTION
      )


      ALTER TABLE IF EXISTS public.certificado_bancario
      
    ```

3. Crear la tabla cliente: 

    ```

      CREATE TABLE IF NOT EXISTS public.cliente
      (
          id integer NOT NULL DEFAULT 'nextval('cliente_id_seq'::regclass)',
          nombre character varying COLLATE pg_catalog."default" NOT NULL,
          apellido character varying COLLATE pg_catalog."default" NOT NULL,
          correo character varying COLLATE pg_catalog."default" NOT NULL,
          identificacion character varying COLLATE pg_catalog."default" NOT NULL,
          telefono character varying COLLATE pg_catalog."default" NOT NULL,
          estado boolean NOT NULL DEFAULT 'true',
          CONSTRAINT "PK_18990e8df6cf7fe71b9dc0f5f39" PRIMARY KEY (id)
      )
    

    ALTER TABLE IF EXISTS public.cliente

    ```

4. Crear la tabla deposito: 
    ```

      CREATE TABLE IF NOT EXISTS public.deposito
      (
          id integer NOT NULL DEFAULT 'nextval('deposito_id_seq'::regclass)',
          monto double precision NOT NULL,
          fecha date NOT NULL,
          "certificadoId" integer NOT NULL,
          CONSTRAINT "PK_6b3dfe64ef12ee03ff8cab435f3" PRIMARY KEY (id),
          CONSTRAINT "FK_60a21637ca7497825ff9f3e7659" FOREIGN KEY ("certificadoId")
              REFERENCES public.certificado_bancario (id) MATCH SIMPLE
              ON UPDATE NO ACTION
              ON DELETE NO ACTION
      )

  ALTER TABLE IF EXISTS public.deposito

    ```
## Instalación
Para instalar esta API, siga estos pasos:
1. Clonar el repositorio.
2. Ejecutar 'npm install' para instalar las dependencias.
3. Configurar las credenciales de la base de datos en el archivo: realbank/src/app.module.ts.

 ## Ejemplo:

        imports: [
          TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: '12345',
            database: 'realbank',
            entities: [Cliente,CertificadoBancario,Deposito],
            synchronize: true,
          }),
 
4. Ejecutar 'npm run start:dev' para iniciar el servidor de desarrollo.

## Uso
Puedes probar los endpoints de la API desde Swagger:
- Acceder a Swagger: http://localhost:3000/api-docs.


