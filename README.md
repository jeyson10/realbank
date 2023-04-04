# RealBank API

## Descripción
Esta es una API creada con NestJS para la Gestion de Certificados bancarios de la empresa RealBank.

## Configurar Base de Datos (PostgreSQL)

1. Crear Base de Datos: 
    ```
    CREATE DATABASE realbank;

    ```
2. Entrar al Area donde se crean los Queries Dentro de la BD (realbank): 

3. Ejecutar todo el Codigo que se encuentra dentro del archivo "realbank3.sql" en la raiz del proyecto  

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


