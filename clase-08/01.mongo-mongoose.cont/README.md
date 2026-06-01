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

## Filtrar o listar un único documento
Me va a encontrar el primer documento que coincida con el filtro

```js
db.productos.findOne()
db.productos.findOne({})
```

## insertMany(): Inserta uno o varios documentos

```js
db.productos.insertMany([{}, {}]) // Le paso al insertMany, una lista de documentos
db.productos.insertMany(
    [
        {
            nombre: 'Heladera',
            categoria: 'Electro',
            stock: 45,
            disponibilidad: true,
            precio: 389.22
        }, 
        {
            nombre: 'Televisor',
            categoria: 'Electro',
            stock: 20,
            disponibilidad: true,
            precio: 299.88
        }
    ]
)

// ----------------------
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('6a177ff0c0858ba712abc11a'),
    '1': ObjectId('6a177ff0c0858ba712abc11b')
  }
}
// ---------------------
```  

## Contar cantidad de documentos dentro de la colección

```js
db.productos.countDocuments()
```

## Insertando más documentos

```js
db.productos.insertMany(
    [
        {
            nombre: 'Heladera',
            categoria: 'Electro',
            stock: 45,
            disponibilidad: true,
            precio: 389.22,
            dimensiones: {
                ancho: 80,
                alto: 1.5,
                profundidad: 50
            }
        }, 
        {
            nombre: 'Televisor',
            categoria: 'Electro',
            stock: 20,
            disponibilidad: true,
            precio: 299.88,
            dimensiones: {
                ancho: 80,
                alto: 50,
            }
        }
    ]
)

// ---------------------------
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('6a178224c0858ba712abc11c'),
    '1': ObjectId('6a178224c0858ba712abc11d')
  }
}
// ---------------------------
```  

## Crear un documento que no tenga ObjectID

```js
db.productos.insertOne(
    {
        _id: 22,
        nombre: 'PC Gamer',
        categoria: 'Computación',
        stock: 13,
        disponibilidad: false,
        precio: 599.88
    }
)
// -------------------------------
{ acknowledged: true, insertedId: 22 }
```

## ObjectID

<https://www.geeksforgeeks.org/mongodb/what-is-objectid-in-mongodb/>

## Conversor de ObjectID a fecha y hora

<https://nddapp.com/object-id-to-timestamp-converter>

## Operadores ($)

> Set de datos

```js
db.usuarios.insertMany(
    [
        {
            nombre: "Ana",
            edad: 25
        },
        {
            nombre: "Carlos",
            edad: 32
        },
        {
            nombre: "Lucía",
            edad: 28
        },
        {
            nombre: "Mateo",
            edad: 41
        },
        {
            nombre: "Sofía",
            edad: 19
        },
        {
            nombre: "Javier",
            edad: 36
        },
        {
            nombre: "Valentina",
            edad: 22
        },
        {
            nombre: "Diego",
            edad: 30
        },
        {
            nombre: "Camila",
            edad: 27
        },
        {
            nombre: "Fernando",
            edad: 45
        }
    ]
)
```

# Operadores de comparación

<https://www.mongodb.com/es/docs/manual/reference/mql/query-predicates/comparison/>

## $eq (Igual a...)

```js
db.usuarios.find({
    edad: {
        $eq: 36
    }
})
```

## $gt (Mayor que...)

```js
db.usuarios.find(
    {
        edad: {
            $gt: 22
        }
    }
)
```

## $gte (Mayor o igual que...)

```js
db.usuarios.find(
    {
        edad: {
            $gte: 22
        }
    }
)
```

> Contar cantidad de elementos que devuelve el find()


```js
// count()
db.usuarios.find(
    {
        edad: {
            $gte: 22
        }
    }
).count()

// size()
db.usuarios.find(
    {
        edad: {
            $gte: 22
        }
    }
).size()
``` 

## $lt (Menor que)

```js
db.usuarios.find(
    {
        edad: {
            $lt: 22
        }
    }
)
```

## $lte (Menor o igual que)

```js
db.usuarios.find(
    {
        edad: {
            $lte: 22
        }
    }
)
```

## $ne (No igual que)

```js
db.usuarios.find(
    {
        edad: {
            $ne: 22
        }
    }
)
```
## $in (Incluido en la lista...)

```js
db.usuarios.find(
    {
        edad: {
            $in: [22, 45, 27, 30, 100, 150]
        }
    }
)
```

## $nin (No incluido en la lista...)

```js
db.usuarios.find(
    {
        edad: {
            $nin: [22, 45, 27, 30, 100, 150]
        }
    }
)
```

# Operadores lógicos

<https://www.mongodb.com/es/docs/manual/reference/mql/query-predicates/logical/>

## $and (Operador lógico 'y' -> 'and')

> Encuentra
```js
db.usuarios.find({
    $and: [
        { edad: 22 },
        { nombre: 'Valentina' }
    ]
})
``` 
> No encuentra

```js
db.usuarios.find({
    $and: [
        { edad: 22 },
        { nombre: 'Roberto' }
    ]
})
```

## $or (Operador lógico 'o' -> 'or')

```js
db.usuarios.find({
    $or: [
        { edad: 22 },
        { nombre: 'Ana' }
    ]
})
```

## $nor (Ninguna condición)
Sirve para excluir documentos que no quiero que aparezcan en la query

```js
db.usuarios.find({
    $nor: [
        { edad: 22 },
        { nombre: 'Ana' }
    ]
})
```

## $not (Lo opuesto a lo que indico en la query)

```js
db.usuarios.find({
    edad: { $not: {  $gt: 22 } }
})
```

## Combianndo $and y $or

```js
db.usuarios.find({
    $and: [
        { active: true },
        {
            $or: [
                { role: 'admin' },
                { role: 'docente' }
            ]
        }
    ]
})
```

# Métodos de Mongo

## limit(): Me permite limitar la cantidad de documentos que devuelve la query

```js
db.productos.find().limit(3) // me muestra los primeros 3 elementos
```

## skip(): Me permite descartar documentos que están al principio de la consulta

```js
db.productos.find().skip(2)
```

## Paginado

> Quiero mostrar 2 productos por página

```js
db.productos.find().skip(0).limit(2)
db.productos.find().skip(2).limit(2)
db.productos.find().skip(4).limit(2)
```

## sort(): Me permite ordenar la información en forma ascedente o descendente

```js
db.usuarios.find().sort( { edad: 1 } ) /// 1 -> asc (menor a mayor)
db.usuarios.find().sort( { edad: -1 } ) /// -1 -> desc (mayor a menor)
db.usuarios.find().sort( { nombre: 1, edad: 1 } ) // 1 -> asc (a a la z)
```

# Proyección

> Proyección en SQL

```sql
SELECT * FROM usuarios -- Todos los usuarios de la tabla
SELECT nombre, apellido FROM usuarios -- Todos los usuarios pero solo las columnas nombre y apellido
```

```js
// db.productos.find({<patrón-de-búsqueda/filtro>}, {<proyección>})
// 0 o false -> no muestra el field
// 1 o true -> muestra el field
```

```js
db.productos.find({}, { _id: 0, nombre: 1})
db.productos.find({}, { _id: 0, nombre: 1, categoria: 1})
db.productos.find({}, { _id: 0, categoria: 0})
```

## Búsquedas con expresiones regulares

Son una herramienta para buscar, validar y manipular textos con reglas (patrones).

1. Definir patrón de búsqueda
2. Regex lo que hace es con ese patrón buscar dentro de texto
3. Si coincide o no con ese patrón

> ¿Para qué sirve?
* Buscar textos sin importan el case
* Validar emails, contraseñas, DNI, teléfonos
* Detectar formatos
* Reemplazar partes de una cadena
* Filtrar datos en bases de datos Mongo

<https://regexr.com/>
<https://regex101.com/>

```js
db.productos.find({
  nombre: /mouse/i
})
const palabraABuscar = 'mouse'
db.productos.find({
  nombre: { $regex: palabraABuscar, $options: 'i' }
})
```
# CRUD -> C:CREATE | U:UPDATE | D:DELETE

## insertOne(): Me inserta dentro de una colección un solo documento
## insertMany(): Me inserta dentro de una colección uno o varios documentos
## deleteOne(): Me permite borrar un documento dado un patrón de búsqueda

```js
// db.usuarios.deleteOne({<filtro-patrón-de-busqueda>})
db.usuarios.deleteOne({ nombre: 'Ana' })
```

## deleteMany(): Me permite borrar varios documentos dado un patrón de búsqueda

```js
db.usuarios.deleteMany( { edad: { $gte: 25 })
``` 

## updateOne(): Me permite editar (actualizar) un documento
## updateMany(): Me permite editar (actualizar) uno o varios documentos