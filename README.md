# MyFinance App

MyFinance es una aplicación móvil diseñada para ayudarte a gestionar tu presupuesto mensual y realizar un seguimiento de tus gastos. Desarrollada con React Native y Expo, esta app ofrece una experiencia sencilla y eficiente para mantener tus finanzas personales organizadas.

## Características

- **Gestión de Presupuesto:** Define un presupuesto mensual inicial.
- **Seguimiento de Gastos:** Agrega gastos fácilmente y el monto se descontará automáticamente de tu presupuesto.
- **Lista de Gastos:** Visualiza y organiza todos tus gastos registrados.
- **Base de Datos Local:** Utiliza SQLite para almacenar datos de manera segura en tu dispositivo.
- **Interfaz Personalizada:** Experiencia de usuario fluida con estilos modernos y funcionalidad reactiva.

## Tecnologías Utilizadas

- **React Native:** Para la interfaz de usuario.
- **Expo:** Para la gestión del proyecto y compatibilidad multiplataforma.
- **SQLite:** Base de datos local para almacenar la información del presupuesto y los gastos.
- **TailwindCSS (NativeWind):** Para estilización eficiente.

## Requisitos

- Node.js 16 o superior
- Expo CLI
- Android SDK 51 o superior (para pruebas en dispositivos Android)

## Instalación

1. Clona este repositorio:

   ```bash
   git clone <URL-del-repositorio>
   cd myfinance
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el proyecto:

   ```bash
   expo start
   ```

## Estructura del Proyecto

```
myfinance/
├── assets/          # Recursos estáticos como imágenes y bases de datos
├── components/      # Componentes reutilizables
├── context/         # Proveedores de contexto para la gestión de estados globales
├── db/              # Herramientas y configuración de la base de datos
├── screens/         # Pantallas principales de la aplicación
├── styles/          # Estilos globales
└── App.tsx          # Punto de entrada principal
```

## Dependencias Principales

```json
{
  "expo": "~51.0.24",
  "react-native": "0.74.3",
  "expo-sqlite": "~14.0.6",
  "@react-navigation/native": "^6.0.2",
  "tailwindcss": "^3.3.2"
}
```

Para más detalles, consulta el archivo `package.json`.

## Uso

1. Al abrir la aplicación, define tu presupuesto mensual inicial.
2. Registra tus gastos a medida que los realices.
3. Observa cómo se ajusta automáticamente tu presupuesto y organiza la lista de gastos.

## Scripts Disponibles

- `npm start`: Inicia el servidor de desarrollo.
- `npm run android`: Ejecuta la aplicación en un emulador o dispositivo Android.
- `npm run ios`: Ejecuta la aplicación en un emulador o dispositivo iOS.
- `npm run web`: Inicia la aplicación en el navegador.

## Funcionalidad de la Base de Datos

La app incluye una función para cargar la base de datos SQLite desde los activos del proyecto:

```javascript
export const loadDatabase = async () => {
    const dbName = 'myFinance.db';
    const dbAsset = require('@/assets/db/myFinance.db');
    const dbUri = Asset.fromModule(dbAsset).uri;
    const dbDir = FileSystem.documentDirectory + 'SQLite/' + dbName;

    const dbInfo = await FileSystem.getInfoAsync(dbDir);

    if (!dbInfo.exists) {
        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite/', { intermediates: true });
        await FileSystem.downloadAsync(dbUri, dbDir);
    }
};
```

## Próximas Funcionalidades

- Gráficas para visualizar gastos por categoría.
- Sincronización en la nube para respaldo de datos.
- Notificaciones de presupuesto excedido.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más información.

---

¡Gracias por usar MyFinance! Si tienes sugerencias o encuentras algún problema, no dudes en abrir un issue o contribuir al proyecto.

