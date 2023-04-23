const port = process.env.PORT || 3000;
const app = require('./app');
const { conn, Product, User, Note } = require('./db');

app.listen(port, async()=> {
  try {
    console.log(`listening on port ${port}`)
    //seed data
    await conn.sync({ force: true });
    const [foo, foop, bar, bazz, quq, quqq, moe, lucy] = await Promise.all([
      Product.create({ name: 'foo' }),
      Product.create({ name: 'foop', inStock: false }),
      Product.create({ name: 'bar', inStock: false }),
      Product.create({ name: 'bazz'}),
      Product.create({ name: 'quq'}),
      Product.create({ name: 'quq!!', inStock: false}),
      User.create({ username: 'moe', password: 'm', luckyNumber: 8}), 
      User.create({ username: 'lucy', password: 'l' }), 
    ]);
    await Promise.all([
      Note.create({title: "Moe's First Note", content: "Oh man I love writing notes. This is great so far.", userId: moe.id}),
      Note.create({title: "Moe's Second Note", content: "I am still just really loving this notes app. Kudos to whoever created it.", userId: moe.id}),
      Note.create({title: "Lucy's First Note", content: "I am Lucy and I love things like being Lucy and Lucying around and telling people my name is Lucy", userId: lucy.id})
    ])
    console.log('seeded');
  }
  catch(ex){
    console.log(ex);
  }
});
