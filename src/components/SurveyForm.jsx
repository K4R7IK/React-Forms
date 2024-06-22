import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SurveyForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    surveyTopic: '',
    favoriteProgrammingLanguage: '',
    yearsOfExperience: '',
    exerciseFrequency: '',
    dietPreference: '',
    highestQualification: '',
    fieldOfStudy: '',
    feedback: '',
  });

  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (formData.surveyTopic) {
      // Fetch additional questions based on survey topic
      axios.get(`https://api.example.com/questions?topic=${formData.surveyTopic}`)
        .then(response => setAdditionalQuestions(response.data))
        .catch(error => console.error('Error fetching additional questions:', error));
    }
  }, [formData.surveyTopic]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.surveyTopic) newErrors.surveyTopic = 'Survey Topic is required';

    if (formData.surveyTopic === 'Technology') {
      if (!formData.favoriteProgrammingLanguage) newErrors.favoriteProgrammingLanguage = 'Favorite Programming Language is required';
      if (!formData.yearsOfExperience) newErrors.yearsOfExperience = 'Years of Experience is required';
    } else if (formData.surveyTopic === 'Health') {
      if (!formData.exerciseFrequency) newErrors.exerciseFrequency = 'Exercise Frequency is required';
      if (!formData.dietPreference) newErrors.dietPreference = 'Diet Preference is required';
    } else if (formData.surveyTopic === 'Education') {
      if (!formData.highestQualification) newErrors.highestQualification = 'Highest Qualification is required';
      if (!formData.fieldOfStudy) newErrors.fieldOfStudy = 'Field of Study is required';
    }

    if (!formData.feedback || formData.feedback.length < 50) newErrors.feedback = 'Feedback is required and must be at least 50 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form data:', formData);
      console.log('Additional questions:', additionalQuestions);
      // Handle form submission logic
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Survey Form</h2>
      <div className="mb-4">
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className={`mt-1 block w-full p-2 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
        />
        {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`mt-1 block w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md`}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="surveyTopic" className="block text-sm font-medium text-gray-700">Survey Topic</label>
        <select
          id="surveyTopic"
          name="surveyTopic"
          value={formData.surveyTopic}
          onChange={handleChange}
          className={`mt-1 block w-full p-2 border ${errors.surveyTopic ? 'border-red-500' : 'border-gray-300'} rounded-md`}
        >
          <option value="">Select a topic</option>
          <option value="Technology">Technology</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
        </select>
        {errors.surveyTopic && <p className="text-red-500 text-sm">{errors.surveyTopic}</p>}
      </div>

      {formData.surveyTopic === 'Technology' && (
        <div className="mb-4">
          <label htmlFor="favoriteProgrammingLanguage" className="block text-sm font-medium text-gray-700">Favorite Programming Language</label>
          <select
            id="favoriteProgrammingLanguage"
            name="favoriteProgrammingLanguage"
            value={formData.favoriteProgrammingLanguage}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border ${errors.favoriteProgrammingLanguage ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          >
            <option value="">Select a language</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
            <option value="C#">C#</option>
          </select>
          {errors.favoriteProgrammingLanguage && <p className="text-red-500 text-sm">{errors.favoriteProgrammingLanguage}</p>}
        </div>
      )}

      {formData.surveyTopic === 'Technology' && (
        <div className="mb-4">
          <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700">Years of Experience</label>
          <input
            type="number"
            id="yearsOfExperience"
            name="yearsOfExperience"
            value={formData.yearsOfExperience}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border ${errors.yearsOfExperience ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          />
          {errors.yearsOfExperience && <p className="text-red-500 text-sm">{errors.yearsOfExperience}</p>}
        </div>
      )}

      {formData.surveyTopic === 'Health' && (
        <div className="mb-4">
          <label htmlFor="exerciseFrequency" className="block text-sm font-medium text-gray-700">Exercise Frequency</label>
          <select
            id="exerciseFrequency"
            name="exerciseFrequency"
            value={formData.exerciseFrequency}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border ${errors.exerciseFrequency ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          >
            <option value="">Select frequency</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Rarely">Rarely</option>
          </select>
          {errors.exerciseFrequency && <p className="text-red-500 text-sm">{errors.exerciseFrequency}</p>}
        </div>
      )}

      {formData.surveyTopic === 'Health' && (
        <div className="mb-4">
          <label htmlFor="dietPreference" className="block text-sm font-medium text-gray-700">Diet Preference</label>
          <select
            id="dietPreference"
            name="dietPreference"
            value={formData.dietPreference}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border ${errors.dietPreference ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          >
            <option value="">Select diet</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Non-Vegetarian">Non-Vegetarian</option>
          </select>
          {errors.dietPreference && <p className="text-red-500 text-sm">{errors.dietPreference}</p>}
        </div>
      )}

      {formData.surveyTopic === 'Education' && (
        <div className="mb-4">
          <label htmlFor="highestQualification" className="block text-sm font-medium text-gray-700">Highest Qualification</label>
          <select
            id="highestQualification"
            name="highestQualification"
            value={formData.highestQualification}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border ${errors.highestQualification ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          >
            <option value="">Select qualification</option>
            <option value="High School">High School</option>
            <option value="Bachelor's">Bachelor's</option>
            <option value="Master's">Master's</option>
            <option value="PhD">PhD</option>
          </select>
          {errors.highestQualification && <p className="text-red-500 text-sm">{errors.highestQualification}</p>}
        </div>
      )}

      {formData.surveyTopic === 'Education' && (
        <div className="mb-4">
          <label htmlFor="fieldOfStudy" className="block text-sm font-medium text-gray-700">Field of Study</label>
          <input
            type="text"
            id="fieldOfStudy"
            name="fieldOfStudy"
            value={formData.fieldOfStudy}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border ${errors.fieldOfStudy ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          />
          {errors.fieldOfStudy && <p className="text-red-500 text-sm">{errors.fieldOfStudy}</p>}
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">Feedback</label>
        <textarea
          id="feedback"
          name="feedback"
          value={formData.feedback}
          onChange={handleChange}
          className={`mt-1 block w-full p-2 border ${errors.feedback ? 'border-red-500' : 'border-gray-300'} rounded-md`}
        ></textarea>
        {errors.feedback && <p className="text-red-500 text-sm">{errors.feedback}</p>}
      </div>

      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Submit</button>
    </form>
  );
};

export default SurveyForm;
