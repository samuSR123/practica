# Sistema de reserva de horas

## Crear node_modules
```
npm i
```
## Iniciar 

Crear la base de datos del archivo aaaaaaa.txt y corroborar las variables de entorno en el archivo .env 
```
npm start
```
## Rutas

[Vista de usuario](http://localhost:3000/usuario)

[Vista de admin](http://localhost:3000/) -> para iniciar sesion primero crar un nuevo usuario

## Consideraciones para que una hora le aparezca a un usuario

No deben estar ya reservados

Tengan al menos 59 minutos de anticipación desde el momento actual.

## Tailwind
```
npx tailwindcss -i ./src/input.css -o ./public/css/output.css --watch
```
