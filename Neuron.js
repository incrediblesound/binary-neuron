module.exports = class Neuron {
  constructor(goal, threshold){
    this.threshold = threshold
    this.weights = {}
    this.goal = goal
  }
  addWeight(name, value){
    this.weights[name] = value
  }
  adjustWeight(name, value){
    this.weights[name] += value
  }
  trigger(inputs){
    const keys = Object.keys(this.weights)
    if(keys.length !== inputs.length) throw new Error('Num inputs must match num keys')

    const weights = keys.map(key => this.weights[key])

    const results = weights.map((val, idx) => val * inputs[idx])
    this.previousResults = results

    const weightedOutput = results.reduce((sum, current) => (sum + current), 0)
    this.previousOutput = weightedOutput

    return weightedOutput < this.threshold ? 0 : 1
  }
  train(){
    const keys = Object.keys(this.weights)
    let minContributor = [null, null]
    let maxContributor = [null, null]

    const contributions = this.previousResults.reduce((result, value, idx) => {
      const percentContribution = Math.floor((value / this.previousOutput) * 100)
      const weightName = keys[idx]
      result[weightName] = percentContribution

      if((value > 0 && percentContribution < minContributor[1]) || !minContributor[1]){
        minContributor[0] = weightName
        minContributor[1] = percentContribution
      } else if((value > 0 && percentContribution > maxContributor[1]) || !maxContributor[1]){
        maxContributor[0] = weightName
        maxContributor[1] = percentContribution
      }
      return result
    }, {})

    if (this.previousOutput < this.threshold) {
      // output was lower than threshold, first drop the threshold by 1
      this.threshold -= 1;
      // then increase the weight of the lowest contributor by 1
      if(minContributor[0]){
        this.adjustWeight(minContributor[0], 1)
      }
    } else if (this.previousOutput >= this.threshold) {
      // output was greater than threshold, increase threshold by 1
      this.threshold += 1;
      // then decrease the largest contributing weight by 1
      if(maxContributor[0]){
        this.adjustWeight(maxContributor[0], -1)
      }
    }
  }
}
