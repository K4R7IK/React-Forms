import React, { useState } from "react";

const SurveyForm2 = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    position: "",
    relevantExperience: "",
    portfolioUrl: "",
    managementExperience: "",
    additionalSkills: [],
    preferredInterviewTime: "",
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        additionalSkills: checked
          ? [...formData.additionalSkills, value]
          : formData.additionalSkills.filter((skill) => skill !== value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone Number is required";
    else if (!/^\d+$/.test(formData.phoneNumber))
      newErrors.phoneNumber = "Phone Number is invalid";

    if (
      (formData.position === "Developer" || formData.position === "Designer") &&
      !formData.relevantExperience
    ) {
      newErrors.relevantExperience = "Relevant Experience is required";
    } else if (
      (formData.position === "Developer" || formData.position === "Designer") &&
      formData.relevantExperience <= 0
    ) {
      newErrors.relevantExperience =
        "Relevant Experience must be a number greater than 0";
    }

    if (formData.position === "Designer" && !formData.portfolioUrl) {
      newErrors.portfolioUrl = "Portfolio URL is required";
    } else if (
      formData.position === "Designer" &&
      !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(formData.portfolioUrl)
    ) {
      newErrors.portfolioUrl = "Portfolio URL is invalid";
    }

    if (formData.position === "Manager" && !formData.managementExperience) {
      newErrors.managementExperience = "Management Experience is required";
    }

    if (formData.additionalSkills.length === 0) {
      newErrors.additionalSkills = "At least one skill must be selected";
    }

    if (!formData.preferredInterviewTime) {
      newErrors.preferredInterviewTime = "Preferred Interview Time is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmittedData(formData);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md"
      >
        <h2 className="text-2xl font-bold mb-4">Job Application Form</h2>
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border ${errors.fullName ? "border-red-500" : "border-gray-300"} rounded-md`}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-md`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border ${errors.phoneNumber ? "border-red-500" : "border-gray-300"} rounded-md`}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="position"
            className="block text-sm font-medium text-gray-700"
          >
            Applying for Position
          </label>
          <select
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border ${errors.position ? "border-red-500" : "border-gray-300"} rounded-md`}
          >
            <option value="">Select a position</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
          {errors.position && (
            <p className="text-red-500 text-sm">{errors.position}</p>
          )}
        </div>

        {(formData.position === "Developer" ||
          formData.position === "Designer") && (
          <div className="mb-4">
            <label
              htmlFor="relevantExperience"
              className="block text-sm font-medium text-gray-700"
            >
              Relevant Experience (years)
            </label>
            <input
              type="number"
              id="relevantExperience"
              name="relevantExperience"
              value={formData.relevantExperience}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.relevantExperience ? "border-red-500" : "border-gray-300"} rounded-md`}
            />
            {errors.relevantExperience && (
              <p className="text-red-500 text-sm">
                {errors.relevantExperience}
              </p>
            )}
          </div>
        )}

        {formData.position === "Designer" && (
          <div className="mb-4">
            <label
              htmlFor="portfolioUrl"
              className="block text-sm font-medium text-gray-700"
            >
              Portfolio URL
            </label>
            <input
              type="text"
              id="portfolioUrl"
              name="portfolioUrl"
              value={formData.portfolioUrl}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.portfolioUrl ? "border-red-500" : "border-gray-300"} rounded-md`}
            />
            {errors.portfolioUrl && (
              <p className="text-red-500 text-sm">{errors.portfolioUrl}</p>
            )}
          </div>
        )}

        {formData.position === "Manager" && (
          <div className="mb-4">
            <label
              htmlFor="managementExperience"
              className="block text-sm font-medium text-gray-700"
            >
              Management Experience
            </label>
            <textarea
              id="managementExperience"
              name="managementExperience"
              value={formData.managementExperience}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.managementExperience ? "border-red-500" : "border-gray-300"} rounded-md`}
            ></textarea>
            {errors.managementExperience && (
              <p className="text-red-500 text-sm">
                {errors.managementExperience}
              </p>
            )}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Additional Skills
          </label>
          <div className="flex flex-wrap gap-4 mt-2">
            {["JavaScript", "CSS", "Python", "React", "Node.js"].map(
              (skill) => (
                <label key={skill} className="flex items-center">
                  <input
                    type="checkbox"
                    name="additionalSkills"
                    value={skill}
                    checked={formData.additionalSkills.includes(skill)}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  {skill}
                </label>
              ),
            )}
          </div>
          {errors.additionalSkills && (
            <p className="text-red-500 text-sm">{errors.additionalSkills}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="preferredInterviewTime"
            className="block text-sm font-medium text-gray-700"
          >
            Preferred Interview Time
          </label>
          <input
            type="datetime-local"
            id="preferredInterviewTime"
            name="preferredInterviewTime"
            value={formData.preferredInterviewTime}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border ${errors.preferredInterviewTime ? "border-red-500" : "border-gray-300"} rounded-md`}
          />
          {errors.preferredInterviewTime && (
            <p className="text-red-500 text-sm">
              {errors.preferredInterviewTime}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      {submittedData && (
        <div className="mt-6 p-6 bg-green-100 rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-4">Submitted Data</h2>
          <pre className="bg-gray-200 p-4 rounded-md">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default SurveyForm2;
