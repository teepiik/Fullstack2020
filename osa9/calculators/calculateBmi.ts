const calculate = (height: number, weight: number) => {
    const bmi = (weight / Math.pow((height/100),2))
    console.log('Bmi: ', bmi)

    if(isNaN(bmi)) {
        return 'Malformatted parameters'
    }

    if (bmi < 18.5) {
        return 'underweight'
    } else if (bmi >= 18.5 && bmi <= 25 ) {
        return 'normal weight'
    } else if (bmi > 25 && bmi <= 30 ) {
        return 'overweight'
    } else {
        return 'obese'
    }
}

export const calculateBmi = (height: number, weight: number) => {
    try {
        return calculate( height, weight )
        
    } catch (e) {
        return 'Error' + e.message
    }
}