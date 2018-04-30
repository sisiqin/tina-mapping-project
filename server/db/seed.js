const {Log, db}= require('./index');

async function seed () {
    await db.sync({force: true})
    console.log('db synced!')

    const log = await Promise.all([
        Log.create({ date: Date.now(), coffeeBean: 'starbucks Pike Place', 'grindLevel': "Medium Grind", coffeeBeanAmount: 20, waterAmount: 350, comment: 'good enough', love: true}),
        Log.create({ date: Date.now(), coffeeBean: 'starbucks Pike Place', 'grindLevel': "Medium Grind", coffeeBeanAmount: 25, waterAmount: 400, comment: 'good enough', love: true}),
        Log.create({ date: Date.now(), coffeeBean: 'starbucks Pike Place', 'grindLevel': "Medium Grind", coffeeBeanAmount: 18, waterAmount: 320, comment: 'good enough', love: true}),
        Log.create({ date: Date.now(), coffeeBean: 'starbucks Pike Place', 'grindLevel': "Medium Grind", coffeeBeanAmount: 20, waterAmount: 350, comment: 'good enough', love: true}),
        Log.create({ date: Date.now(), coffeeBean: 'starbucks Pike Place', 'grindLevel': "Medium Grind", coffeeBeanAmount: 20, waterAmount: 350, comment: 'good enough', love: true}),
        Log.create({ date: Date.now(), coffeeBean: 'starbucks Pike Place', 'grindLevel': "Medium Grind", coffeeBeanAmount: 20, waterAmount: 350, comment: 'good enough', love: true}),
        Log.create({ date: Date.now(), coffeeBean: 'starbucks Pike Place', 'grindLevel': "Medium Grind", coffeeBeanAmount: 20, waterAmount: 350, comment: 'good enough', love: true}),
        Log.create({ date: Date.now(), coffeeBean: 'starbucks Pike Place', 'grindLevel': "Medium Grind", coffeeBeanAmount: 20, waterAmount: 350, comment: 'good enough', love: true}),
        Log.create({ date: Date.now(), coffeeBean: 'starbucks Pike Place', 'grindLevel': "Medium Grind", coffeeBeanAmount: 20, waterAmount: 350, comment: 'good enough', love: true}),
        Log.create({ date: Date.now(), coffeeBean: 'starbucks Pike Place', 'grindLevel': "Medium Grind", coffeeBeanAmount: 20, waterAmount: 350, comment: 'good enough', love: true})
        
    ])
    console.log(`seeded ${log.length} reviews`)
    
}


seed()
.catch(err => {
  console.error(err.message)
  console.error(err.stack)
  process.exitCode = 1
})
.then(() => {
  console.log('closing db connection')
  db.close()
  console.log('db connection closed')
})
