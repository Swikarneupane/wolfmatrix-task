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

  const updateChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target.name === "phoneNumber" && !phoneRegex.test(e.target.value)) {
      setStatus("error")
      return
    } else {
      setStatus("completed")
    }
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handlePhoneNumberValidation = (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    const phoneValue = e.target.value

    if (phoneValue === "") {
      setStatus("completed")
      return
    }
    if (e.target.name === "phoneNumber" && !phoneRegex.test(e.target.value)) {
      setStatus("error")
    } else {
      setStatus("completed")
    }

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  //   const handlePhoneNumberValidation = (
  //     e: React.FocusEvent<HTMLInputElement>
  //   ) => {
  //     if (e.target.name === "phoneNumber" && !phoneRegex.test(e.target.value)) {
  //       alert("Invalid phone number format")
  //       return
  //     }

  //     setForm({
  //       ...form,
  //       [e.target.name]: e.target.value,
  //     })
  //   }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(form)
    if (!phoneRegex.test(form.phoneNumber)) {
      setStatus("error")
      alert("Please enter a valid phone number")
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
    <div className="md:w-[60%] mx-auto">
      <form
        onSubmit={handleSubmit}
        className="border rounded-sm border-red-300  px-10 py-5 flex flex-col gap-5">
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
                className="border border-red-300 outline-none p-1"
                required
              />
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
                className="border border-red-300 outline-none p-1"
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
                className="border border-red-300 outline-none p-1"
                onChange={updateChange}
                required
              />
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
                className="border border-red-300 outline-none p-1"
                type="number"
              />
            </div>
            <div className="flex flex-col ">
              <label htmlFor="gender" className="font-medium">
                Gender
              </label>
              {/* <input id="gender" name="gender" onChange={updateChange} /> */}
              <select
                value={form.gender}
                onChange={updateChange}
                id="gender"
                className="border border-red-300 outline-none p-1 text-sm"
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
                className="border border-red-300 outline-none p-1"
                type="tel"
                value={form.phoneNumber}
                name="phoneNumber"
                // onChange={updateChange}
                onChange={handlePhoneNumberValidation}
              />
              {status === "error" && <p>Phone number format incorrect</p>}
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
                className="border border-red-300 outline-none p-1"
                type="text"
                value={form.companyName}
                name="companyName"
                onChange={updateChange}
                required
              />
            </div>
            <div className="flex flex-col ">
              <label htmlFor="companyAddress" className="font-medium">
                Company Address <span className="text-red-600">*</span>
              </label>
              <input
                id="companyAddress"
                name="companyAddress"
                value={form.companyAddress}
                className="border border-red-300 outline-none p-1"
                type="text"
                onChange={updateChange}
                required
              />
            </div>
            <div className="flex flex-col ">
              <label htmlFor="jobTitle" className="font-medium">
                Job Title <span className="text-red-600">*</span>
              </label>
              <input
                id="jobTitle"
                value={form.jobTitle}
                type="text"
                className="border border-red-300 outline-none p-1"
                name="jobTitle"
                onChange={updateChange}
                required
              />
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
                className="border border-red-300 outline-none p-1"
                name="province"
                onChange={updateChange}
                required
              />
            </div>
            <div className="flex flex-col ">
              <label htmlFor="district" className="font-medium">
                District <span className="text-red-600">*</span>
              </label>
              <input
                id="district"
                value={form.district}
                type="text"
                className="border border-red-300 outline-none p-1"
                name="district"
                onChange={updateChange}
                required
              />
            </div>
            <div className="flex flex-col ">
              <label htmlFor="localMunicipality" className="font-medium">
                Local Municipality <span className="text-red-600">*</span>
              </label>
              <input
                id="localMunicipality"
                type="text"
                value={form.localMunicipality}
                className="border border-red-300 outline-none p-1"
                name="localMunicipality"
                onChange={updateChange}
                required
              />
            </div>
            <div className="flex flex-col ">
              <label htmlFor="streetAddress" className="font-medium">
                Street Address
              </label>
              <input
                id="streetAddress"
                value={form.streetAddress}
                type="text"
                className="border border-red-300 outline-none p-1"
                name="streetAddress"
                onChange={updateChange}
              />
            </div>
          </>
        )}
        {count === 3 && (
          <button
            type="submit"
            className="border-red-300 border py-2 w-max mx-auto px-5 hover:bg-red-300 cursor-pointer duration-300">
            Submit
          </button>
        )}
      </form>
      <div className="flex justify-between mt-3">
        <button
          onClick={() => setCount(count - 1)}
          disabled={count < 2}
          className="border-red-300 border py-2 w-max px-5 hover:bg-red-300 cursor-pointer duration-300 disabled:cursor-not-allowed">
          Back
        </button>
        <button
          onClick={() => setCount(count + 1)}
          disabled={count > 2}
          className="border-red-300 border py-2 w-max px-5 hover:bg-red-300 cursor-pointer duration-300 disabled:cursor-not-allowed">
          Next
        </button>
      </div>
    </div>
  )
}

export default Form
