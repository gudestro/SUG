import axios from 'axios'

export const EmailService = {
  _url: 'https://events.sendpulse.com/events/id/c40d6f13ec054e7bea2b01120613c813/8625080',

  async sendEmail (
    email: string,
    name: string,
    nameConstruction: string,
    event: string,
    date: string,
    sub: string,
    preHeader: string
  ): Promise<boolean> {
    const payload = {
      email,
      phone: '+123456789',
      firstname: getFirstName(name),
      nameConstruction,
      event,
      date,
      sub,
      preHeader
    }

    try {
      const result: { result: boolean } = await axios.post(this._url, payload)

      return result.result
    } catch (e) {}
  }
}

const getFirstName = (name: string): string => {
  if (!name) return null
  const names = name.split(' ')
  return names[0].charAt(0).toUpperCase() + names[0].slice(1).toLowerCase()
}
