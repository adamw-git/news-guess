export class Article {
  constructor({ title, date, img, section, content, names, country }) {
    this.title = title
    this.date = new Date(date)
    this.img = img
    this.section = section
    this.content = content
    this.names = names
    this.country = country
  }

  getRedactedContent() {
    let redacted = this.content
    // this.names.forEach(name => {
    //   const regex = new RegExp(name, 'gi')
    //   redacted = redacted.replace(
    //     regex,
    //     `<span class="redacted">${'#'.repeat(name.length)}</span>`
    //   )
    // })

    const dateStr = this.date.toISOString().split('T')[0]
    redacted = redacted.replace(
      new RegExp(dateStr, 'g', `<span class="redacted">${dateStr}</span>`)
    )

    if (this.img) {
      const escapedImg = this.img.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      redacted = redacted.replace(
        new RegExp(escapedImg, 'g'),
        `<span class="redacted">${dateStr}</span>`
      )
    }

    return redacted
  }

  getHint(index) {
    switch (index) {
      case 0:
        return `Date: ${this.date.toDateString()}`
      case 1:
        return this.name.length > 0 ? `Name clue: ${this.names[0]}` : null
      case 2:
        return this.img ? `Image hint: ${this.img}` : null
      default:
        return null
    }
  }
}
