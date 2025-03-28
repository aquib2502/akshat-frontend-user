
import { useState, useEffect } from "react";
import axios from "axios";
import Router from "next/router";
import { useRouter } from "next/navigation";

export default function AdaptiveQuestionnaire() {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [responses, setResponses] = useState({});
  const [error, setError] = useState("");
  const [category, setCategory] = useState("Career Guidance");
  const [token, setToken] = useState("");
  const [appointmentId, setAppointmentId] = useState("");
  const [questionCount, setQuestionCount] = useState(0);

  const router = useRouter()

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
    }

    const appointmentIdParam = new URLSearchParams(window.location.search).get("appointmentId");
    setAppointmentId(appointmentIdParam);
  }, []);

  useEffect(() => {
    if (!token || !appointmentId) return;

    const fetchStartingQuestion = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3046/api/questionnaire/start?category=${encodeURIComponent(category)}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data.success) {
          setCurrentQuestion(res.data.question);
        } else {
          setError("No starting question found.");
        }
      } catch (err) {
        setError("Failed to load the starting question.");
      }
    };
    fetchStartingQuestion();
  }, [category, token, appointmentId]);

  const handleAnswerSubmit = async (answer) => {
    setResponses((prev) => ({ ...prev, [currentQuestion.questionId]: answer }));

    setQuestionCount((prevCount) => prevCount + 1);

    if (questionCount + 1 === 10) {
      // Submit questionnaire and redirect after success
      try {
        const response = await axios.post(
          'http://localhost:3046/api/questionnaire/submit',
          { appointmentId, responses: { ...responses, [currentQuestion.questionId]: answer } },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.data.success) {
          setError("Questionnaire submitted successfully!");

          // Redirect to the completion page
          router.push("/questionnaire/completion");
        }
      } catch (err) {
        setError("Error submitting the questionnaire.");
      }
      return;
    }

    // Proceed to the next question
    const nextQuestionId = currentQuestion.nextRule[answer];
    if (!nextQuestionId) {
      setError("Invalid next question.");
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:3046/api/questionnaire/${nextQuestionId}?category=${encodeURIComponent(category)}&currentQuestionId=${encodeURIComponent(currentQuestion.questionId)}&answer=${encodeURIComponent(answer)}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setCurrentQuestion(res.data.question);
      } else {
        setError("Next question not found.");
      }
    } catch (err) {
      setError("Error fetching the next question.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-6">
      <div className="w-full sm:w-1/2 md:w-1/3 bg-white p-6 rounded-lg shadow-lg">
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        {!currentQuestion ? (
          <div className="text-center text-lg text-gray-500">Loading question...</div>
        ) : (
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">{currentQuestion.text}</h3>
            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSubmit(option)}
                  className="w-full py-2 px-4 text-lg font-semibold text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
