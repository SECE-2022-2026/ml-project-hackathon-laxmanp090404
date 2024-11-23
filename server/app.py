from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import re
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the model and vectorizer
with open('trained_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

with open('vectorizer.pkl', 'rb') as vectorizer_file:
    vectorizer = pickle.load(vectorizer_file)

port_stem = PorterStemmer()

# Preprocess function
def preprocess_text(content):
    stemmed_content = re.sub('[^a-zA-Z]', ' ', content)
    stemmed_content = stemmed_content.lower()
    stemmed_content = stemmed_content.split()
    stemmed_content = [port_stem.stem(word) for word in stemmed_content if not word in stopwords.words('english')]
    stemmed_content = ' '.join(stemmed_content)
    return stemmed_content

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    headline = data.get('headline', '')

    if not headline:
        return jsonify({'error': 'No headline provided'}), 400

    # Preprocess and vectorize the input
    cleaned_headline = preprocess_text(headline)
    vectorized_headline = vectorizer.transform([cleaned_headline])

    # Predict using the model
    prediction = model.predict(vectorized_headline)
    result = "Fake" if prediction[0] == 1 else "Real"

    return jsonify({'headline': headline, 'prediction': result})

if __name__ == '__main__':
    app.run(debug=True)
