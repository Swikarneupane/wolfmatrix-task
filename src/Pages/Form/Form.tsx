import React, { useState } from "react"

const Form = () => {
  const [count, setCount] = useState(1)
  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    age: null,
    gender: "",
    phoneNumber: "",
    companyName: "",
    companyAddress: "",
    jobTitle: "",
    province: "",
    district: "",
    localMunicipality: "",
    streetAddress: "",
  })
  const [status, setStatus] = useState("")

  const phoneRegex = /^\+?[1-9]\d{1,14}$/

  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validate = () => {
    const newErrors: { [key: string]: string } = {}
    if (count === 1) {
      if (!form.firstName) newErrors.firstName = "First Name is required"
      if (!form.lastName) newErrors.lastName = "Last Name is required"
      if (!form.age) newErrors.age = "Age is required"
      if (!form.phoneNumber) newErrors.phoneNumber = "Phone Number is required"
    }
    if (count === 2) {
      if (!form.companyName) newErrors.companyName = "Company Name is required"
      if (!form.companyAddress)
        newErrors.companyAddress = "Company Address  is required"
      if (!form.jobTitle) newErrors.jobTitle = "Job Title is required"
    }
    if (count === 3) {
      if (!form.province) newErrors.province = "Province is required"
      if (!form.district) newErrors.district = "District is required"
      if (!form.localMunicipality)
        newErrors.localMunicipality = "Local Municipality is required"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleStepUp = () => {
    if (validate()) {
      setCount(count + 1)
    }
  }
  const handleStepDown = () => {
    if (validate()) {
      setCount(count - 1)
    }
  }

  const updateChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    if (name === "phoneNumber") {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }))
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handlePhoneNumberValidation = (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    const phoneValue = e.target.value

    if (phoneValue === "" || phoneRegex.test(phoneValue)) {
      setStatus("completed")
    } else {
      setStatus("error")
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Form final details: ", form)
    if (!phoneRegex.test(form.phoneNumber)) {
      setStatus("error")
      alert("Please enter a valid phone number")
      setCount(1)
      return
    }
    alert("Form submitted successfully")
    setForm({
      firstName: "",
      middleName: "",
      lastName: "",
      age: null,
      gender: "",
      phoneNumber: "",
      companyName: "",
      companyAddress: "",
      jobTitle: "",
      province: "",
      district: "",
      localMunicipality: "",
      streetAddress: "",
    })
    setCount(1)
  }

  return (
    <div className="md:w-[60%] md:mx-auto mx-5">
      <form
        onSubmit={handleSubmit}
        className="border rounded-sm border-gray-300 px-3 sm:px-10 py-5 flex flex-col gap-5">
        <p className="text-center text-lg font-medium">Step {count} of 3</p>
        {count === 1 && (
          <>
            <div className="flex flex-col ">
              <label htmlFor="firstName" className="font-medium">
                First Name <span className="text-red-600">*</span>
              </label>
              <input
                id="firstName"
                name="firstName"
                onChange={updateChange}
                type="text"
                value={form.firstName}
                className="border border-gray-300 outline-none p-1"
                required
              />
              {errors.firstName && (
                <p className="text-red-600 text-sm">{errors.firstName}</p>
              )}
            </div>
            <div className="flex flex-col ">
              <label htmlFor="middleName" className="font-medium">
                Middle Name
              </label>
              <input
                id="middleName"
                name="middleName"
                value={form.middleName}
                type="text"
                className="border border-gray-300 outline-none p-1"
                onChange={updateChange}
              />
            </div>
            <div className="flex flex-col ">
              <label htmlFor="lastName" className="font-medium">
                Last Name <span className="text-red-600">*</span>
              </label>
              <input
                id="lastName"
                type="text"
                value={form.lastName}
                name="lastName"
                className="border border-gray-300 outline-none p-1"
                onChange={updateChange}
                required
              />
              {errors.lastName && (
                <p className="text-red-600 text-sm">{errors.lastName}</p>
              )}
            </div>
            <div className="flex flex-col ">
              <label htmlFor="age" className="font-medium">
                Age <span className="text-red-600">*</span>
              </label>
              <input
                id="age"
                name="age"
                value={form.age ? form.age : ""}
                required
                onChange={updateChange}
                className="border border-gray-300 outline-none p-1"
                type="number"
              />
              {errors.age && (
                <p className="text-red-600 text-sm">{errors.age}</p>
              )}
            </div>
            <div className="flex flex-col ">
              <label htmlFor="gender" className="font-medium">
                Gender
              </label>
              <select
                value={form.gender}
                onChange={updateChange}
                id="gender"
                className="border border-gray-300 outline-none p-1 text-sm"
                name="gender">
                <option value="" disabled className="text-sm">
                  Select a gender
                </option>
                <option value="male" className="text-sm">
                  Male
                </option>
                <option value="female" className="text-sm">
                  Female
                </option>
                <option value="other" className="text-sm">
                  Other
                </option>
                <option value="preferNotToSay" className="text-sm">
                  Prefer not to say
                </option>
              </select>
            </div>
            <div className="flex flex-col ">
              <label htmlFor="phoneNumber" className="font-medium">
                Phone Number <span className="text-red-600">*</span>
              </label>
              <input
                id="phoneNumber"
                placeholder="+1234567890"
                required
                className="border border-gray-300 outline-none p-1"
                type="tel"
                value={form.phoneNumber}
                name="phoneNumber"
                onChange={updateChange}
                onBlur={handlePhoneNumberValidation}
              />
              {status === "error" && (
                <p className="text-sm text-red-700">
                  Phone number format incorrect
                </p>
              )}
              {errors.phoneNumber && (
                <p className="text-red-600 text-sm">{errors.phoneNumber}</p>
              )}
            </div>
          </>
        )}
        {count === 2 && (
          <>
            <div className="flex flex-col ">
              <label htmlFor="companyName" className="font-medium">
                Company Name <span className="text-red-600">*</span>
              </label>
              <input
                id="companyName"
                className="border border-gray-300 outline-none p-1"
                type="text"
                value={form.companyName}
                name="companyName"
                onChange={updateChange}
                required
              />
              {errors.companyName && (
                <p className="text-red-600 text-sm">{errors.companyName}</p>
              )}
            </div>
            <div className="flex flex-col ">
              <label htmlFor="companyAddress" className="font-medium">
                Company Address <span className="text-red-600">*</span>
              </label>
              <input
                id="companyAddress"
                name="companyAddress"
                value={form.companyAddress}
                className="border border-gray-300 outline-none p-1"
                type="text"
                onChange={updateChange}
                required
              />
              {errors.companyAddress && (
                <p className="text-red-600 text-sm">{errors.companyAddress}</p>
              )}
            </div>
            <div className="flex flex-col ">
              <label htmlFor="jobTitle" className="font-medium">
                Job Title <span className="text-red-600">*</span>
              </label>
              <input
                id="jobTitle"
                value={form.jobTitle}
                type="text"
                className="border border-gray-300 outline-none p-1"
                name="jobTitle"
                onChange={updateChange}
                required
              />
              {errors.jobTitle && (
                <p className="text-red-600 text-sm">{errors.jobTitle}</p>
              )}
            </div>
          </>
        )}
        {count === 3 && (
          <>
            <div className="flex flex-col ">
              <label htmlFor="province" className="font-medium">
                Province <span className="text-red-600">*</span>
              </label>
              <input
                id="province"
                type="text"
                value={form.province}
                className="border border-gray-300 outline-none p-1"
                name="province"
                onChange={updateChange}
                required
              />
              {errors.province && (
                <p className="text-red-600 text-sm">{errors.province}</p>
              )}
            </div>
            <div className="flex flex-col ">
              <label htmlFor="district" className="font-medium">
                District <span className="text-red-600">*</span>
              </label>
              <input
                id="district"
                value={form.district}
                type="text"
                className="border border-gray-300 outline-none p-1"
                name="district"
                onChange={updateChange}
                required
              />
              {errors.district && (
                <p className="text-red-600 text-sm">{errors.district}</p>
              )}
            </div>
            <div className="flex flex-col ">
              <label htmlFor="localMunicipality" className="font-medium">
                Local Municipality <span className="text-red-600">*</span>
              </label>
              <input
                id="localMunicipality"
                type="text"
                value={form.localMunicipality}
                className="border border-gray-300 outline-none p-1"
                name="localMunicipality"
                onChange={updateChange}
                required
              />
              {errors.localMunicipality && (
                <p className="text-red-600 text-sm">
                  {errors.localMunicipality}
                </p>
              )}
            </div>
            <div className="flex flex-col ">
              <label htmlFor="streetAddress" className="font-medium">
                Street Address
              </label>
              <input
                id="streetAddress"
                value={form.streetAddress}
                type="text"
                className="border border-gray-300 outline-none p-1"
                name="streetAddress"
                onChange={updateChange}
              />
            </div>
          </>
        )}
        {count === 3 && (
          <button
            type="submit"
            className="border-gray-300 border py-2 w-max mx-auto px-5 hover:bg-gray-300 cursor-pointer duration-300">
            Submit
          </button>
        )}
      </form>
      <div className="flex justify-between mt-3">
        <button
          onClick={handleStepDown}
          disabled={count < 2}
          className="border-gray-300 border py-2 w-max px-5 hover:bg-gray-300 cursor-pointer duration-300 disabled:cursor-not-allowed">
          Back
        </button>
        <button
          onClick={handleStepUp}
          disabled={count > 2}
          className="border-gray-300 border py-2 w-max px-5 hover:bg-gray-300 cursor-pointer duration-300 disabled:cursor-not-allowed">
          Next
        </button>
      </div>
    </div>
  )
}

export default Form
