import { useState, useEffect } from 'react'

const API_URL = "http://localhost:5000"

export default function Quiz() {
    const [quizData, setQuizData] = useState(null)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [showResult, setShowResult] = useState(false)
    const [currentStreak, setCurrentStreak] = useState(0)
    const [longestStreak, setLongestStreak] = useState(0)
    const [isPlaying, setIsPlaying] = useState(true)


    const fetchQuestion = async () => {
        try {
            const res = await fetch(`${API_URL}/quiz`)
            if (!res.ok) 
                throw new Error('Failed to fetch quiz data')            
            const data = await res.json()
            console.log(data)
            setQuizData(data)

        } catch (err) {
            console.error("Error fetching quiz data:", err)
        }
    }

    useEffect(() => {
        fetchQuestion()
    }, [])

    const handleAnswer = (answer) => {
        // Function to handle user's answer selection
        setSelectedAnswer(answer)
        setShowResult(true)
        // logic to show a sreak of correct answers
        if (answer === quizData.correctAnswer) {
            const newStreak = currentStreak + 1
            setCurrentStreak(newStreak)
            if (newStreak > longestStreak) {
                setLongestStreak(newStreak)
            }
        } else {
            setCurrentStreak(0)
        }
    }


    const handleQuit = () => setIsPlaying(false)

    const handleStartNewGame = () => {
        setCurrentStreak(0)
        setIsPlaying(true)
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-600 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-2xl font-bold text-center mb-8">
                    Capital Cities Quiz
                </h1>
                <div className="flex justify-between mb-4">
                    <div className="text-gray-600">
                        Current Streak: <span className="font-bold text-blue-600">{currentStreak}</span>
                    </div>
                    <div className="text-gray-600">
                        Longest Streak: <span className="font-bold text-green-600">{longestStreak}</span>
                    </div>
                </div>
                <div className="mb-8">
                    <h2 className="text-xl text-center break-words mb-4">
                        What is the capital of {quizData?.country}?
                    </h2>
                    <div className="space-y-3">
                        {quizData?.answers.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswer(option)}
                                disabled={showResult}
                                className={`w-full p-4 text-center rounded-lg transition break-words ${showResult
                                    ? option === quizData.correctAnswer
                                        ? 'bg-green-100 border-green-500'
                                        : option === selectedAnswer
                                            ? 'bg-red-100 border-red-500'
                                            : 'bg-gray-100'
                                    : 'bg-gray-100 hover:bg-gray-200'
                                    } border`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
                {showResult && (
                    <div className={`text-center mb-6 ${selectedAnswer === quizData.correctAnswer
                        ? 'text-green-600'
                        : 'text-red-600'
                        }`}>
                        {selectedAnswer === quizData.correctAnswer
                            ? 'Correct!'
                            : `Incorrect. The correct answer is ${quizData.correctAnswer}`}
                    </div>
                )}
                <div className='flex flex-row justify-center items-center'>

                    <button
                        onClick={fetchQuestion}
                        className="w-full mx-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
                    >Next Question
                    </button>
                    <button
                        onClick={handleQuit}
                        className="w-full mx-2 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
                    >Quit Game
                    </button>
                </div>
            </div>
        </div>
    )
} 