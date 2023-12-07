import Form from "components/Form";
import { useState } from "react";

export interface FormFieldData {
  name: string;
  password: string;
  nameError: string;
  passwordError: string;
}

type FormFieldName = keyof FormFieldData;

export default function FormPage() {
  const initForm = [
    { name: "", password: "", nameError: "", passwordError: "" },
  ];
  const [formFields, setFormFields] = useState<FormFieldData[]>(initForm);
  const [isValidated, setIsValidated] = useState<boolean>(false);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  const MIN_NAME_LENGTH = 3;
  const MIN_PASSWORD_LENGTH = 6;

  const changeEventValidateName = (
    value: string,
    data: FormFieldData[],
    index: number
  ) => {
    const isKorean = (text: string): boolean => {
      const hangulRegex = /[ㄱ-ㅎㅏ-ㅣ가-힣]/;
      return hangulRegex.test(text);
    };

    if (isKorean(value.charAt(value.length - 1))) {
      if (
        isKorean(value.charAt(value.length - 2)) &&
        value.length < MIN_NAME_LENGTH
      ) {
        data[index]["nameError"] =
          "The name must be at least 3 characters long.";
      } else {
        console.log("nameError1");
        data[index]["nameError"] = "";
      }
    } else {
      if (value.length < MIN_NAME_LENGTH) {
        data[index]["nameError"] =
          "The name must be at least 3 characters long.";
      } else {
        console.log("nameError2");
        data[index]["nameError"] = "";
      }
    }
  };

  const changeEventValidatePassword = (
    value: string,
    data: FormFieldData[],
    index: number
  ) => {
    if (value.length < MIN_PASSWORD_LENGTH) {
      data[index]["passwordError"] =
        "Password must be at least 6 characters long.";
    } else {
      data[index]["passwordError"] = "";
    }
  };

  const blurEventValidateName = (
    data: FormFieldData[],
    index: number,
    value: string
  ) => {
    const isNameDuplicated = data.some((field, i) => {
      return i !== index && field.name === value;
    });

    if (isNameDuplicated) {
      data.forEach((field, i) => {
        if (field.name === value && value.length > 0) {
          data[i]["nameError"] = `The name "${value}" is duplicated`;
        }
      });
    } else {
      data.forEach((field, i) => {
        if (field.name === value && value.length > 0) {
          data[i]["nameError"] = "";
        }
      });

      if (value.length < MIN_NAME_LENGTH) {
        data[index]["nameError"] =
          "The name must be at least 3 characters long.";
      }
    }
  };

  const blurEventValidatePassword = (
    data: FormFieldData[],
    index: number,
    value: string
  ) => {
    if (value.length < 1) {
      data[index]["passwordError"] = "Password is required";
    } else if (value.length < MIN_PASSWORD_LENGTH) {
      data[index]["passwordError"] =
        "Password must be at least 6 characters long.";
    } else {
      data[index]["passwordError"] = "";
    }
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (isConfirmed) {
      return;
    }
    const {
      target: { name, value },
    } = e;

    let data = [...formFields];
    const fieldName = name as FormFieldName;
    if (fieldName === "name") {
      changeEventValidateName(value, data, index);
    }

    if (fieldName === "password") {
      changeEventValidatePassword(value, data, index);
    }

    data[index][fieldName] = value;

    setFormFields(data);
    updateValidationStatus(data);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>, index: number) => {
    if (isConfirmed) {
      return;
    }

    const {
      target: { name, value },
    } = e;

    let data = [...formFields];
    const fieldName = name as FormFieldName;

    if (fieldName === "name") {
      blurEventValidateName(data, index, value);
    }

    if (fieldName === "password") {
      blurEventValidatePassword(data, index, value);
    }

    setFormFields(data);
    updateValidationStatus(data);
  };

  const addFields = () => {
    if (isConfirmed) {
      return;
    }
    let fieldObj = { name: "", password: "", nameError: "", passwordError: "" };

    setFormFields((prevFormFields) => {
      const newFormFields = [...prevFormFields, fieldObj];
      updateValidationStatus(newFormFields);
      return newFormFields;
    });
  };

  const removeFields = (index: number) => {
    if (isConfirmed) {
      return;
    }

    let data = [...formFields];
    data.splice(index, 1);

    // 중복값 제거 되었을때 에러 메세지 갱신
    data.forEach((field, i) => {
      blurEventValidateName(data, i, field.name);
    });

    setFormFields(data);
  };

  const updateValidationStatus = (formFieldsToUpdate: FormFieldData[]) => {
    if (isConfirmed) {
      return;
    }

    const isValid = formFieldsToUpdate.every(
      (field) =>
        field.name.trim() !== "" &&
        field.password.trim() !== "" &&
        field.nameError === "" &&
        field.passwordError === ""
    );

    setIsValidated(isValid);
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
          form={initForm[0]}
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
          {formFields.map(({ name, password }, index) => {
            return (
              <div key={index} className="app-mb-2 ">
                <p className="app-m-0">
                  <span className="app-font-bold">Name</span>: {name}
                </p>
                <p className="app-m-0">
                  <span className="app-font-bold">Password</span>:{" "}
                  {convertToAsterisk(password)}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
