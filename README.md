# BaldeCash Front - Desafío

![login](https://github.com/jrosasr/balde-front/blob/master/public/screens/login.png?raw=true "login")

![dashboard](https://github.com/jrosasr/balde-front/blob/master/public/screens/dashboard.png?raw=true "dashboard")

![modal form](https://github.com/jrosasr/balde-front/blob/master/public/screens/create.png?raw=true "modal form")

![row option](https://github.com/jrosasr/balde-front/blob/master/public/screens/options.png?raw=true "row option")

![email example](https://github.com/jrosasr/balde-front/blob/master/public/screens/email1.png?raw=true "email example")


Esta aplicación Nuxt fue desarrollada como una prueba técnica, demostrando habilidades en el desarrollo frontend con Nuxt.js y NuxtUI. La aplicación permite gestionar usuarios, incluyendo creación, edición, eliminación y visualización de un listado. Todo esto delimitado por roles *admin* y *reviewer*

### Tecnologías Utilizadas

Frontend: Vue.js (Nuxt.js), NuxtUI y Pinia.

## Iniciar el proyecto

### Configuración
1. Clonar el repositorio

2. Crea un archivo .env en la raíz del proyecto y agrega la siguiente variable:

    `APP_ENV=production`
    `API_URL=http://tu-api-url`
    `RESEND_API_KEY=resend_key`

3. Instalar dependencias

    `npm install`

4. Iniciar el desarrollo

    `npm run dev`

### En modo desarrollo
En en archivo server/api/sendEmail.js el valor de la variable **body.email** debe ser sustituido por el correo registrado en resend, de lo contrario fallara el envio de correos


`    
    to: [body.email] --> to: ['pruebas@gmail.com']
`