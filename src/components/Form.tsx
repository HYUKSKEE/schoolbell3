import { FormFieldData } from "pages/form";
import { AiOutlineCloseSquare } from "react-icons/ai";

interface FormProps {
  form: FormFieldData;
  index: number;

  handleFormChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>, index: number) => void;
  removeFields: (index: number) => void;
}

export default function Form({
  form,
  index,
  handleFormChange,
  handleBlur,
  removeFields,
}: FormProps) {
  return (
    <>
      <div className="app-border app-border-solid app-border-black app-p-3 app-mb-3">
        <div className="app-flex app-justify-between app-items-center app-mb-3">
          <p className="app-font-bold app-m-0">User - {index}</p>
          <AiOutlineCloseSquare
            className="app-text-xl app-cursor-pointer"
            onClick={() => removeFields(index)}
          />
        </div>
        <form>
          <div className="app-flex app-flex-col app-mb-3">
            <label
              htmlFor={`name${index}`}
              className="app-text-[14px] app-font-medium"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id={`name${index}`}
              className={`app-border app-border-solid app-border-[#505050] app-p-2 focus:app-outline-none ${
                form.nameError.length > 0
                  ? "app-bg-[rgba(255,0,0,0.1)] app-border-2 app-border-solid app-border-[red]"
                  : "app-bg-[#ffffff]"
              }`}
              value={form.name}
              onChange={(event) => handleFormChange(event, index)}
              onBlur={(e) => handleBlur(e, index)}
            />
            {form.nameError && (
              <p className="app-m-0 app-text-[10px] app-text-[red] app-font-bold">
                {form.nameError}
              </p>
            )}
          </div>
          <div className="app-flex app-flex-col app-mb-3">
            <label
              htmlFor={`password${index}`}
              className="app-text-[14px] app-font-medium"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id={`password${index}`}
              className={`app-border app-border-solid app-border-[#505050] app-p-2 focus:app-outline-none ${
                form.passwordError.length > 0
                  ? "app-bg-[rgba(255,0,0,0.1)] app-border-2 app-border-solid app-border-[red]"
                  : "app-bg-[#ffffff]"
              }`}
              value={form.password}
              onChange={(event) => handleFormChange(event, index)}
              onBlur={(e) => handleBlur(e, index)}
            />
            {form.passwordError && (
              <p className="app-m-0 app-text-[10px] app-text-[red] app-font-bold">
                {form.passwordError}
              </p>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
