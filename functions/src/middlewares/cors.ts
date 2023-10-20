const domainList = {
  clientLimited : {
    origin: ['https://week-17-renaldipb.web.app','https://week-17-renaldipb.firebaseapp.com'],
    methods: ['GET', 'POST']
  },
  clientGlobal: {
    origin: ['https://week-17-renaldipb.web.app', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  }
}

export default domainList