# Development
Pasos para levantar la app en desarrollo


1. Levantar la base de datos

    ```
    docker compose up -d
    ```

    Primero se configura Docker para montar la imagen de PostgreS, se crea el archivo docker-compose.yml, luego para crear la imagen Docker  se debe usar el comando: docker compose up -d  y listo, la base de datos esta creada, para probarla se utiliza TablePlus la cual se conecta cargandole los datos que están en docker-compose.yml.

    # TablePlus
    - click en + para crear => cargar datos de docker-compose.yml => test => conectar



2. Conectar Prisma con Next: (puente entre la BD y Next )

    # Prisma commnads
    ```
    1. npx prisma init ( crea .env y el directorio prisma)
        - se debe crear otro .env.template y reemplazar las variables de entorno  (puede ser util para configurar usuarios independientes)

        ``` si notiene la carpeta 
        modules se debe ejecutar antes  npm install y luego npm run dev ```


    2. npx prisma migrate dev
        - refrescar (ctrl+r) en tablePlus y ver la tabla
        - esto se debe hacer cada vez que se modifique los campos (agregar o remover modelos y/o propiedades) y al cambiar propiedades por defecto 

    3. npx prisma generate (para hacer las manipulaciones con la DB, se debe hacer cadavez que se actualize el archivo schema.prisma con el comando npx prisma db pull )
        - crear archivo: src/lib/prisma.ts 
        se copia y pega la conficuracion desde  https://vercel.com/guides/nextjs-prisma-postgres cambiando (global as any) 



    4. Ejecutar el SEED para [cargar la base de datos local](localhost:3000/api/seed)


    ```



    # Prod


    # Stage
