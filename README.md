# Binary Neuron

Binary neuron is a simple binary decision making model. It includes a "verbose" module that explains via console log what is happening, and a non-verbose model for reading the code. In main.js you'll find a simple narrative that shows you how to use the model.

To read the narrative run:
```shell
npm install
node main.js
```

## methods

### constructor(goal, threshold)
Initializes a decision model for a particular goal with the given threshold

### addWeight(name, value)
This adds a named weight to the model. Each weight must be paired with a binary input when calling `trigger()`.

### adjustWeight(name, value)
This adjusts a weight by a given value

### trigger(inputs[ 0 | 1 ])
Trigger takes an array of binary inputs and uses them to calculate a positive or negative output. The inputs are multiplied by the weights and then added up to be compared with the threshold. If the sum is equal to or greater than the threshold a positive output is returned.

### train()
If the output is incorrect, the train method may be called to adjust the decision model. This method finds the weight that contributed most to the incorrect result and adjusts it either up or down depending on the direction of the error. It also adjusts the threshold by one.
