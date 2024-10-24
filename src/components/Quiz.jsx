import { useState, useEffect } from 'react'

const API_URL = "http://localhost:5000"

export default function Quiz() {
    const [quizData, setQuizData] = useState(null)


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


    return (
        <h1>Quiz Page</h1>
    )
} 