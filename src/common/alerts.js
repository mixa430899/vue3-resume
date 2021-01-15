const alertsTypes = { errors: 'danger', warnings: 'warning', success: 'primary' }
export const alerts = {
  errors: {
    dbError: { title: 'Ошибка', text: 'Ошибка при запросе к БД', time: 3000 },
    commentError: { title: 'Ошибка', text: 'Ошибка при подгрузке комментариев', time: 3000 },
    blocksDbError: { title: 'Ошибка', text: 'Ошибка при подгрузке блоков из базы', time: 3000 },
  },
  warnings: {
    blocksDbNull: { title: 'В БД пока пусто', text: 'База данных не вернула никаких блоков', time: 5000 }
  }
}
// нужно динамически добавить type к этим алертам, вроде так работает гг
Object.keys(alerts).forEach(key => {
  Object.keys(alerts[key]).forEach(innerKey => {
    alerts[key][innerKey]['type'] = alertsTypes[key]
  })
})
// алерты-методы
alerts.success = {
  newBlock(block) { 
    return { 
      type: 'primary',
      title: 'Новый блок', 
      text: `${block} успешно добавлен`, 
      time: 2000 
    } 
  },
  loadBlocks(count) { 
    return { 
      type: 'primary',
      title: 'Блоки загружены', 
      text: `${count} блоков загружено из базы`, 
      time: 2000
    } 
  }
}