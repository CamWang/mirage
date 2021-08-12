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

Mongoose是一个MongoDB的对象数据映射框架（ODM），虽然MongoDB的原生存储方式（BSON）已经十分接近JavaScript对象，但是仍有许多操作可以被简化。它管理数据之间的关系，提供数据验证，将MongoDB的对象形式转换为Node.js的对象形式。

### 快速入门

下面是Mongoose基本使用的例子，摘取自Mongoose的官方文档Quick Start
#### 准备动作

首先要保证Node.js与MongoDB已经被正确的安装，然后使用npm安装Mongoose依赖。
```shell
npm install --save mongoose
```
如果我们想保存所有小猫到MongoDB里，首先要做的是在项目中引入Mongoose依赖，并告诉Mongoose如何连接本机的MongoDB服务器。
```js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
```
由于数据库连接是异步的，所以我们为连接数据库过程的各个事件绑定处理器，来获取连接状态。如果你不想在连接后进行操作，那这一步大可省略
```js
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});
```

#### 操作数据

在Mongoose里，所有数据对象都是由Schema（一种类似于面向对象编程中接口的概念的东西）衍生而来。让我们定义一个Kitten小猫Schema。
```js
const kittySchema = new mongoose.Schema({
  name: String,
  color: String
});
```
::: tip
更多关于Mongoose Schema的内容，请参考Mongoose的Schema、SchemaType文档。
:::
很明显，上面的小猫Schema具有name名字和color颜色两个属性，这将搭建MongoDB和JavaScript代码中对象的桥梁。然后我们在JavaScript代码中使用这个桥梁为模板，新建一个Model
```js
const Kitten = mongoose.model('Kitten', kittySchema);
```
::: tip
更多关于Mongoose Model的内容，请参考Mongoose的Model文档。
:::
Model类似于类的概念，我们接下来使用Model来创建真正具有数据的Document
```js
const bill = new Kitten({ name: 'Bill', color: 'orange' });
console.log(bill.name); // 'Bill'
```
::: tip
更多关于Mongoose Document的内容，请参考Mongoose的Document、Subdocument文档。
:::
此时，我们就可以调用`save()`方法来保存我们的小猫Bill了。调用`save()`方法将令Mongoose对MongoDB发出新建Kitten集合（Collection）指令并在该集合中写入一条Bill文档（Document）。  
从Kitten集合（在MongoDB的集合，是在Mongoose里的Model）内查找Bill，我们可以使用Model上的`find()`方法。
```js
Kitten.find({ name: 'Bill' }, callback);
```
::: tip
更多关于Mongoose数据查询内容，请参考Mongoose的Queries文档。
:::
