# Base de datos MONGO

Son bases de datos no relacionales (mal llamadas NoSQL) a bases de datos que no usan tablas relacionadas con claves foráneas. Sirven para resolver problemas del modelo relacional cuando se manejan grandes volumens de datos, estructuras cambiantes y velocidad.

En lugar de tablas, usan otros modelos datos

* Documentos (Mongo) -> JSON/BSON
* Clave-Valor (Redis)
* Columnas
* Grafos

## Diferencias entre Relaciones y no relacionales

Relacionales. (Fija|Schema)
Relaciones -> (Explicitas FK, JOIN)
Escalidad -> Vertical (principalmente)
Cambio de estrucutra -> Costoso y lento
Control de datos -> Estrico

No Relacionales. (Flexible o inexistente) 
Relaciones -> Implicitas o manuales
Escalidad -> Horizontal (nativa)
Cambio de la estructura -> Rápido y simple
Control de datos -> Más laxo

# MONGO

<https://www.mongodb.com/>


# JSON -> Javascript Object Notation
JSON (JavaScript Object Notation - Notación de Objetos de JavaScript) es un formato ligero de intercambio de datos. Leerlo y escribirlo es simple para humanos, mientras que para las máquinas es simple interpretarlo y generarlo.

<https://www.json.org/json-es.html>

# JSON vs BSON

<https://www.mongodb.com/resources/basics/json-and-bson>


# Empezando a trabajar con MONGO

## Levantar el motor de MONGO

```sh
mongod
```  

## Tengo que conectarme al motor

```sh
mongosh
```

## Listar a DBs

```js
show dbs
show databases
```

## Crear o seleccionar una DB

```js
use <nombre-db>
use mongo_84487
```

## Creamos una colección

```js
db.createCollection("<nombre-colección>")
db.createCollection("productos") // Nombre en minusculas y plural (guión bajo para separar 2 palabras)
```

## Listar colecciones

```js
show collections
```

## Crear un documento dentro de una colección

```js
db.<nombre-collection>.insertOne(
    {
        field1: 'value1',
        field2: 'value2'
    }
)
``` 

```js
db.productos.insertOne(
    {
        nombre: 'Notebook Gamer',
        categoria: 'Computación',
        stock: 20,
        disponibilidad: true,
        precio: 889.88
    }
)

// ------------------------
{
  acknowledged: true,
  insertedId: ObjectId('6a177831c0858ba712abc114')
}
// ------------------------

db.productos.insertOne(
    {
        nombre: 'PC Gamer',
        categoria: 'Computación',
        stock: 13,
        disponibilidad: false,
        precio: 599.88
    }
)

// ------------------------
{
  acknowledged: true,
  insertedId: ObjectId('6a177896c0858ba712abc115')
}
// ------------------------
```

## Listar documentos dentro de una colección

```js
// todos los documentos
db.<nombre-colección>.find() 
db.<nombre-colección>.find({}) 
// todos los documentos dentro de la colección productos
db.productos.find({})
// ----------------------
[
  {
    _id: ObjectId('6a177831c0858ba712abc114'),
    nombre: 'Notebook Gamer',
    categoria: 'Computación',
    stock: 20,
    disponibilidad: true,
    precio: 889.88
  },
  {
    _id: ObjectId('6a177896c0858ba712abc115'),
    nombre: 'PC Gamer',
    categoria: 'Computación',
    stock: 13,
    disponibilidad: false,
    precio: 599.88
  }
]
```

## Filtrar documentos obtenidos

```js
db.productos.find({ nombre: 'Notebook Gamer' })
db.productos.find({ disponibilidad: true })

``` 
