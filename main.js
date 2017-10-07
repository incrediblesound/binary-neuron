const colors = require('colors/safe')
const Neuron = require('./Neuron.verbose')
const bold = colors.bold

const timeout = (index, ...fns) => {
  setTimeout(() => {
    if(!fns[index]) return
    fns[index]()
    timeout(index+1, ...fns)
  }, 6000)
}

const test = new Neuron('"go to a concert"', 4)

const setUp = () => {
  console.log(bold('\nLets make a binary neuron that helps us decide whether or not to go to a concert!'))
}

const addWeights = () => {
  console.log(bold('\nFirst we add "weights" that represent different factors affecting the decision:'))
  test.addWeight('nice weather', 2) // weather isn't too important
  test.addWeight('good music', 4) // music is important
  test.addWeight('good friend', 2) // friends make it more fun
}

const firstTest = () => {
  console.log(bold('\nLets try triggering the alogrithm with positive inputs for music and good friend:\n'))
  test.trigger([0, 1, 1]) // no nice weather, but good music and a good friend
}
const secondTest = () => {
  console.log(bold('\nThen we trigger the alogrithm with positive inputs for weather and good friend:\n'))
  test.trigger([1, 0, 1]) // nice weather and good friend, but music is bad
}

const trainAlgo = () => {
  console.log(bold(`\nWe aren't happy with that last result so we tell the algorithm to adjust:\n`))
  test.train() // the last test passed, but we decided the decision was wrong, tell the algorithm to adjust
}

const finalTest = () => {
  console.log(bold(`\nThen we replay the tests to see the corrected results:\n`))
  test.trigger([1, 0, 1]) // this should fail now
  test.trigger([0, 1, 1]) // this test should still pass
}

setUp()
timeout(0, addWeights, firstTest, secondTest, trainAlgo, finalTest)
