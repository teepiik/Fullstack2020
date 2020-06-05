interface BmiValues {
    weight: number
    height: number
}

// To validate input
const parseArguments = (args: Array<string>): BmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments')
    if (args.length > 4) throw new Error('Too many arguments')

    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            weight: Number(args[2]),
            height: Number(args[3])
        }
    } else {
        throw new Error('Incorrect arguments, give weight and height')
    }
}

const calculateBmi = (height: number, weight: number) => {

    const bmi = (weight / Math.pow((height/100),2))
    console.log('Bmi: ', bmi)
    if (bmi < 18.5) {
        console.log('underweight')
    } else if (bmi >= 18.5 && bmi <= 25 ) {
        console.log('normal weight')
    } else if (bmi > 25 && bmi <= 30 ) {
        console.log('overweight')
    } else {
        console.log('obese')
    }
}

try {
    const { weight, height } = parseArguments(process.argv)
    calculateBmi( weight, height )
} catch (e) {
    console.log('Error: ', e.message)
}