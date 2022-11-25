export interface Schedule {
  initValue?: string,
  title: string,
  city: string,
  startDate: string,
  endDate: string,
  email: string,
  id?: number,
  postId?: number
}

export interface EditSchedule {
  title?: string,
  city?: string,
  startDate?: string,
  endDate?: string,
}

export interface Room {
  id?: number,
  name: string,
  city: string,
  hostName: string,
  phone: string,
  price: string,
  images: string,
  nthOfPeople: number,
  hompage: string,
  description: string,
  memo?: string,
  travelId?: number
}

export interface Reserve extends Room {
  checkIn?: string,
  checkOut?: string,
  total?: string
}

export interface ReservaionList extends Schedule {
  reserves: Room[] | []
}

export interface PinedsList extends Schedule {
  pineds: Room[] | []
}


export interface Diary {
  id?: number,
  roomId: number,
  theme: string,
  name: string,
  images: string[] | [],
  url: string,
  description: string
}