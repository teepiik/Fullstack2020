interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDesc: string,
    target: number,
    avg: number
}

const calculate = (hours: number[], target: number): Result => {
    const periodLength = hours.length
    const trainingDays = hours.filter(h => h > 0).length
    const totalHours = hours.reduce((a, b) => a + b, 0)
    const avg = totalHours/periodLength
    const success = avg>=target
    const percentage = avg / target * 100
    let rating = 0
    let ratingDesc = ''

    if(percentage >= 100 ) {
        rating = 3
        ratingDesc = 'good job'
    } else if(percentage >= 60 && percentage < 100 ) {
        rating = 2
        ratingDesc = 'Close but no donught'
    } else {
        rating = 1
        ratingDesc = 'Did you even try'
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDesc,
        target,
        avg
    }
}

export const calculateExercises = (hours: number[], target: number) => {
    try {
        return calculate(hours, target)  
    } catch (e) {
        return 'Error' + e.message
    }
}

