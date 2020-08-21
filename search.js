import Splitwise from 'splitwise'

const sw = Splitwise({
  consumerKey: process.env.KEY,
  consumerSecret: process.env.SECRET,
})

const GROUP_ID = '1462863'

async function search() {
  const expenses = await sw.getExpenses({ id: GROUP_ID, limit: 200 })
  const optIn = expenses.filter(({ description }) =>
    /opt.{0,2}in/i.test(description)
  )

  console.log('\n```')

  optIn.forEach(({ cost, date, description }) => {
    const when = new Date(date).toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
    })
    console.log(`${when}\t$ ${cost}\t${description}`)
  })

  console.log('```')
  console.log(`\nhttps://secure.splitwise.com/#/groups/${GROUP_ID}\n`)

  // Promise.all([
  //   sw.getGroup({ id: group_id }),
  //   sw.getExpenses({ id: group_id }),
  //   sw.getCurrentUser(),
  // ])
  // .then(([group, expenses, me]) =>
  //   sw.createDebt({
  //     from: group.members[0].id,
  //     to: me.id,
  //     group_id: group_id,
  //     description: expenses[0].description,
  //     amount: 100,
  //   })
  // )
  // .then(console.log)
  // .catch(console.error)
}

search()
