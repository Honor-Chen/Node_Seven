const amqp = require('amqplib')

;(async function () {
  // 1：创建连接对象
  const connect = await amqp.connect('amqp://localhost:5672')

  // 2：获取通道
  const channel = await connect.createChannel()

  // 3：声明参数
  const queueName = 'helloHonorQueue'

  // 4：声明队列，交换机为默认
  await channel.assertQueue(queueName)

  // 5：消费
  await channel.consume(
    queueName,
    (msg) => {
      console.log(`Consumer:`, msg.content.toString())
    },
    { noAck: true }
  )

  process.once('SIGINT', async () => {
    await channel.close()
    await connect.close()
  })

  console.log('[*] Waiting for Message. To Exit press Ctrl + C')
})()
