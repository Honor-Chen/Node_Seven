const amqp = require('amqplib')

;(async function () {
  /* // 1：创建连接对象
  const connect = await amqp.connect('amqp://localhost:5672')

  // 2：获取通道
  const channel = await connect.createChannel()

  // 3：声明需要传递的参数
  const routingKey = 'helloHonorQueue'
  const msg = 'hello honor'

  for (let i = 0; i < 100; i++) {
    await channel.publish('', routingKey, Buffer.from(`${msg} 第${i}条消息`))
  }

  await channel.close()
  await connect.close() */

  let connect
  try {
    connect = await amqp.connect('amqp://localhost:5672')
    const channel = await connect.createChannel()

    const routingKey = 'helloHonorQueue'
    const msg = 'hello honor'

    for (let i = 0; i < 200; i++) {
      await channel.publish('', routingKey, Buffer.from(`${msg} 第${i}条消息`))
    }

    await channel.close()
  } catch (error) {
    console.error(error)
  } finally {
    if (connect) await connect.close()
  }
})()
