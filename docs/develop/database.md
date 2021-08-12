# 数据库

Mirage使用NoSQL数据库MongoDB。

## MongoDB

MongoDB是一个文档型NoSQL数据库，其使用一种改良过的JSON格式也就是BSON格式，作为数据存储方式。就像SQL数据一样，它也包含数据库服务器（Server）与驱动（Driver）两个主要的部分。数据库服务器负责数据的存储与查询等，驱动为各种语言开发一套访问数据库服务器的API。

### 数据库和集合

MongoDB中储存的数据记录的单位是文档（Document），文档是以BSON格式存储的。相同类型的文档储存为集合（Collection），多个集合组成一个数据库（Database）。一个MongoDB实例可以有多个数据库。

### 文档 Document

一个文档可以类比为关系型数据库中的一行记录，文档由多个键值对组成。文档的格式是类似于JSON的BSON。

<div style="text-align:center;margin:20px;"><img src="./img/document.svg" width=550 /></div>

文档的优势是：

* 文档的数据类型与许多编程语言的原生类型更加接近
* 内嵌文档和数组减少了很多浪费资源的多表join
* 自由的表定义可以很自然的支持多态等情况

下面是一个文档的例子：

```js
var mydoc = {
  _id: ObjectId("5099803df3f4948bd2f98391"),
  name: { first: "Alan", last: "Turing" },
  birth: new Date('Jun 23, 1912'),
  death: new Date('Jun 07, 1954'),
  contribs: [ "Turing machine", "Turing test", "Turingery" ],
  views : NumberLong(1250000)
}
```

上方文档每个键对应值的类型：
* `_id`是MongoDB会默认为每个文档创建的键，它的类型是MongoDB特有的`ObjectId`
* `name`的类型是内嵌文档，也就是说一个文档里可以有某个属性的值为另一个文档，这样就可以直接查到数据而非使用多表连接
* `birth`和`death`都是日期类型
* `contribs`的类型是字符串数组
* `views`的类型是`NumberLong `

文档内值的访问可以直接使用`.`来进行，例如：
* 为了获取`_id`可以使用`data._id`
* 为了获取`name`内的`first`可以使用`data.name.first`
* 为了获取`contribs`的第三个元素可以使用`data.contribs.2`

文档有限制大小，BSON文档最大16MB，但是建议大于2M时可以考虑将较大字段分出去。

BSON支持的文档内值类型可以参考MongoDB的官方文档：https://docs.mongodb.com/manual/reference/bson-types/


## MongoDB Compass

MongoDB Compass是MongoDB官方使用的数据库管理工具，方便用户使用图形界面对MongoDB数据进行查看和管理。[官方文档](https://docs.mongodb.com/compass/current/)

## Mongoose

