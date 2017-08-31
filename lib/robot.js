class Robot {

  constructor(bearing, coordinates=[0,0]) {
    this.bearing = bearing
    this.coordinates = coordinates
  }

  at(x,y) {
    this.coordinates = [x,y]
  }

  orient(direction) {
    const directions = ['east', 'west', 'north', 'south']
    if (directions.includes(direction)) {
      this.bearing = direction
    } else {
      throw Error("Invalid Robot Bearing")
    }
  }

  turnRight() {
    const directions = ['north', 'east', 'south', 'west']
    if (directions.indexOf(this.bearing) === 3) {
      this.bearing = directions[0]
    } else {
      this.bearing = directions[directions.indexOf(this.bearing)+1]
    }
  }

  turnLeft() {
    const directions = ['north', 'east', 'south', 'west']
    if (directions.indexOf(this.bearing) === 0) {
      this.bearing = directions[3]
    } else {
      this.bearing = directions[directions.indexOf(this.bearing)-1]
    }
  }

  advance() {
    switch (this.bearing) {
      case 'north':
        this.coordinates[1] += 1;
        break
      case 'south':
        this.coordinates[1] -= 1;
        break
      case 'east':
        this.coordinates[0] += 1;
        break
      case 'west':
        this.coordinates[0] -= 1;
        break
    }
  }

  instructions(james) {
    let instructions = []
    let translate = james.split("")

    for (let i = 0; i < translate.length; i++) {
      if (translate[i].toUpperCase() === "L") {
        instructions.push("turnLeft")
      } else if (translate[i].toUpperCase() === "R") {
        instructions.push("turnRight")
      } else if (translate[i].toUpperCase() === "A") {
        instructions.push("advance")
      }
    }
  return instructions
  }

  place(obj) {
    this.coordinates = [obj.x, obj.y]
    this.bearing = obj.direction
  }

  evaluate(args) {
    let instr = this.instructions(args)
    instr.forEach((ins) => {
      this[ins]()
    })
  }
}

var robot = new Robot();
robot.orient('west')