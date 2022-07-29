export class evoGrid {
    constructor(groups) {
        this.groups = groups
    }

    getValues(stringed) {
        let values = []

        this.groups.forEach(group => {

            values.push(Math.ceil(group.length / 2))
        })

        if (stringed) {
            let string = this.getStringified(values)

            return string
        }
        

        return values

    }

    getStringified(values) {
        let string = ""

        values.forEach(col => {
            string += `${col}fr `
        })

        return string
    }
}

export class groupGrid {
    constructor(group) {
        this.group = group
    }

    getColumnNo() {
        let len = this.group.length

        let cols = Math.ceil(len / 2)

        return cols

    }
}