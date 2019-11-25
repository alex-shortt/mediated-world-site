import { Environment } from "world/Environment"
import { Entity } from "world/Entity"
import Color from "world/Color"

function sketch(p) {
  const environment = new Environment()

  const human1 = new Entity({ pos: [0, 0, -275] })
  const human2 = new Entity({ pos: [0, 0, 275] })
  const control1 = new Entity({ pos: [-275, 0, 0] })
  const control2 = new Entity({ pos: [275, 0, 0] })
  const prophet = new Entity({
    light: new Color({
      h: Math.floor(Math.random() * 360),
      s: 90,
      b: 30
    })
  })

  p.setup = () => {
    p.createCanvas(800, 600, p.WEBGL)
    p.setAttributes("perPixelLighting", true)
    p.colorMode(p.HSB)
    environment.addEntity(human1)
    environment.addEntity(human2)
    environment.addEntity(control1)
    environment.addEntity(control2)
    environment.addEntity(prophet)
    console.log(prophet)
  }

  p.draw = () => {
    // rotate scene from an angle
    p.camera(0, -400, -550, 0, 0, 0, 0, 1, 0)
    p.rotateY(p.frameCount * 0.005)

    // render beings in world
    environment.update()
  }
}

function renderWorld(p, world) {
  // world basics
  p.background(255)
  p.ambientLight(255)

  const beings = world.getBeings()

  // render lights
  for (const being of beings) {
    if (being.getBox().light) {
      renderBeing(p, being)
    }
  }

  // render boxes
  for (const being of beings) {
    if (!being.getBox().light) {
      renderBeing(p, being)
    }
  }
}

function renderBeing(p, box) {
  const { pos, rot, fill, size, light } = box.getBox()
  if (light) {
    const lightColor = light.getColor()
    p.pointLight(p.color(lightColor.h, lightColor.s, lightColor.b), 0, 0, 0)
  }
  p.push()

  p.translate(p.createVector(pos[0], pos[1], pos[2]))
  p.rotateX(rot[0])
  p.rotateY(rot[1])

  // p.specularMaterial(255, 255, 255)
  p.ambientMaterial(0)

  const fillColor = light ? light.getColor() : fill.getColor()
  p.fill(p.color(fillColor.h, fillColor.s, fillColor.b))
  p.stroke(0)
  p.strokeWeight(4)

  p.box(size)

  p.pop()
}

const title = "Source of Information (Revised)"
const date = "11-12-19"
const description =
  "Another look at source of information, this time whittling down those last details."

export default { type: "p5", title, description, date, sketch }
