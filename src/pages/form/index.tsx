import Form from "components/Form";
import { useState } from "react";

export interface FormFieldData {
  name: string;
  password: string;
  nameError: string;
  passwordError: string;
}

export interface ErrorType {}

type FormFieldName = keyof FormFieldData;

export default function FormPage() {
  const [formFields, setFormFields] = useState<FormFieldData[]>([
    { name: "", password: "", nameError: "", passwordError: "" },
  ]);
  const [isValidated, setIsValidated] = useState<boolean>(false);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const {
      target: { name, value },
    } = e;

    let data = [...formFields];
    const fieldName = name as FormFieldName;

    const isKorean = (text: string): boolean => {
      const hangulRegex = /[ㄱ-ㅎㅏ-ㅣ가-힣]/;
      return hangulRegex.test(text);
    };

    if (fieldName === "name") {
      if (isKorean(value.charAt(value.length - 1))) {
        if (isKorean(value.charAt(value.length - 2)) && value.length < 3) {
          data[index]["nameError"] =
            "The name must be at least 3 characters long.";
        } else {
          data[index]["nameError"] = "";
        }
      } else {
        if (value.length < 3) {
          data[index]["nameError"] =
            "The name must be at least 3 characters long.";
        } else {
          data[index]["nameError"] = "";
        }
      }
    }

    if (fieldName === "password" && value.length < 6) {
      data[index]["passwordError"] =
        "Password must be at least 6 characters long.";
    } else {
      data[index]["passwordError"] = "";
    }

    data[index][fieldName] = value;

    setFormFields(data);
    updateConfirmationStatus(data);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>, index: number) => {
    const {
      target: { name, value },
    } = e;

    let data = [...formFields];
    const fieldName = name as FormFieldName;

    const isNameDuplicated = data.some(
      (field, i) => i !== index && field.name === value
    );

    if (fieldName === "name") {
      if (isNameDuplicated) {
        data.forEach((field, i) => {
          if (field.name === value && value.length > 0) {
            data[i]["nameError"] = `The name "${value}" is duplicated`;
          }
        });
      } else {
        data.forEach((field, i) => {
          if (field.name === value) {
            data[i]["nameError"] = "";
          }
        });
      }
    }

    if (fieldName === "password") {
      if (value.length < 1) {
        data[index]["passwordError"] = "Password is required";
      } else {
        data[index]["passwordError"] = "";
      }
    }

    setFormFields(data);
    updateConfirmationStatus(data);
  };

  const updateConfirmationStatus = (formFieldsToUpdate: FormFieldData[]) => {
    const isValid = formFieldsToUpdate.every(
      (field) =>
        field.name.trim() !== "" &&
        field.password.trim() !== "" &&
        field.nameError === "" &&
        field.passwordError === ""
    );

    setIsValidated(isValid);
  };

  const addFields = () => {
    let fieldObj = { name: "", password: "", nameError: "", passwordError: "" };

    setFormFields((prevFormFields) => {
      const newFormFields = [...prevFormFields, fieldObj];
      updateConfirmationStatus(newFormFields);
      return newFormFields;
    });
  };

  const removeFields = (index: number) => {
    let data = [...formFields];
    data.splice(index, 1);

    setFormFields(data);
  };

  const handleConfirmation = () => {
    setIsConfirmed(true);
    setIsValidated(false);
  };

  const convertToAsterisk = (text: string) => {
    return text.length <= 3
      ? text
      : text.substring(0, 3) + "*".repeat(text.length - 3);
  };
  return (
    <div className="app-w-full app-max-w-[500px] app-m-auto app-pt-[100px]">
      {!isConfirmed ? (
        formFields.map((form, index) => {
          return (
            <Form
              key={index}
              index={index}
              form={form}
              handleFormChange={handleFormChange}
              handleBlur={handleBlur}
              removeFields={removeFields}
            />
          );
        })
      ) : (
        <Form
          index={0}
          form={formFields[0]}
          handleFormChange={handleFormChange}
          handleBlur={handleBlur}
          removeFields={removeFields}
        />
      )}

      <div className="app-flex app-gap-1">
        <button
          className="app-py-1 app-px-3 app-bg-white app-text-[12px] app-font-semibold"
          onClick={addFields}
        >
          Add User
        </button>
        <button
          className="app-py-1 app-px-3 app-bg-white app-text-[12px] app-font-semibold"
          disabled={!isValidated}
          onClick={handleConfirmation}
        >
          Confirm
        </button>
      </div>

      {isConfirmed && (
        <div className="app-p-4 app-bg-[#f0f0f0] app-mt-6">
          {formFields.map((form, index) => {
            return (
              <div key={index} className="app-mb-2 ">
                <p className="app-m-0">
                  <span className="app-font-bold">Name</span>: {form.name}
                </p>
                <p className="app-m-0">
                  <span className="app-font-bold">Password</span>:{" "}
                  {convertToAsterisk(form.password)}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
