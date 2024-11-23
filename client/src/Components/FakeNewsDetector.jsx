import React, { useState } from 'react'
import axios from 'axios'
import { Newspaper } from 'lucide-react'

export default function NewsSentinel() {
  const [headline, setHeadline] = useState('')
  const [result, setResult] = useState('')

  const checkNews = async () => {
    try {
      
      const response = await axios.post('http://localhost:5000/predict', {
        headline: headline,
      })
      setResult(response.data.prediction)
    } catch (error) {
      console.error('Error predicting fake news:', error)
      setResult('Error in prediction. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <Newspaper className="h-12 w-12 text-blue-600 mr-4" />
            <h1 className="text-4xl font-bold text-gray-900 font-serif">NewsSentinel</h1>
          </div>
          <p className="text-xl text-gray-600">Your Guardian Against Misinformation</p>
        </header>

        <main className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Fact Check a Headline</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter news headline here"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full text-lg py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              required
            />
            <button
              onClick={checkNews}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Check Authenticity
            </button>
          </div>

          {result && (
            <div
              className={`mt-8 p-4 rounded-lg ${
                result.includes('Fake') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
              }`}
            >
              <h3 className="text-xl font-semibold mb-2">Result:</h3>
              <p className="text-lg">{result}</p>
            </div>
          )}
        </main>

        <footer className="mt-12 text-center text-gray-600">
          <p>© 2024 NewsSentinel. All rights reserved.</p>
         
        </footer>
      </div>
    </div>
  )
}

// import React, { useState } from "react";
// import axios from "axios";

// const FakeNewsDetector = () => {
//   const [headline, setHeadline] = useState("");
//   const [prediction, setPrediction] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:5000/predict", {
//         headline: headline,
      
//       });
//       setPrediction(response.data.prediction);
//     } catch (error) {
//       console.error("Error predicting fake news:", error);
//       setPrediction("Error in prediction.");
//     }
//   };

//   return (
//     <div>
//       <h1>Fake News Detector</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={headline}
//           onChange={(e) => setHeadline(e.target.value)}
//           placeholder="Enter news headline"
//           required
//         />
//         <button type="submit">Check</button>
//       </form>
//       {prediction && <h2>Result: {prediction}</h2>}
//     </div>
//   );
// };

// export default FakeNewsDetector;
