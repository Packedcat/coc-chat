import API from './config'

export interface Rooms {
  id: string
  name: string
  date: Date
}

function getRooms(): Promise<Rooms> {
  return API.get('/api/rooms')
}

export { getRooms }
