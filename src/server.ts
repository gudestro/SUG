import { makeApp } from './main/AppFactory'

const app = makeApp()

const server = app.listen().then(() => {
  console.log(
    '\x1b[36mApplication is running at http://localhost:%d in %s mode\x1b[0m',
    app.app.get('port'),
    app.app.get('env')
  )
})

export default server
