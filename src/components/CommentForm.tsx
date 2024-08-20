import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Spinner } from "./Spinner";

interface CommentFormProps {
  postId: string | undefined;
}

export interface FormData {
  postId: string;
  name: string;
  email: string;
  content: string;
}

const CommentForm = ({ postId }: CommentFormProps) => {
  if (!postId) {
    throw new Error("No post id");
  }

  const [formData, setFormData] = useState<FormData>({
    postId,
    name: "",
    email: "",
    content: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timeout = setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [successMessage, errorMessage]);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      const response = await fetch("/api/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.error) {
        setErrorMessage("You've already added a comment");
      } else {
        setSuccessMessage("✅ Your comment has been submitted for review");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }

    setFormData({
      postId,
      name: "",
      email: "",
      content: "",
    });
  };

  return (
    <div className="mt-8">
      <form className="mx-auto mb-4 max-w-[700px]" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block">
            Name
          </label>
          <input
            className="mb-4 h-[45px] w-full rounded-lg pl-4 text-black placeholder-black"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block" htmlFor="email">
            Email
          </label>
          <input
            className="mb-4 h-[45px] w-full rounded-lg pl-4 text-black placeholder-black"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email Address"
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="mb-2 block">
            Content
          </label>
          <textarea
            className="mb-4 h-[70px] w-full rounded-lg pl-4 text-black placeholder-black"
            value={formData.content}
            name="content"
            onChange={handleInputChange}
            placeholder="Content"
            required
          />
        </div>

        <button
          className="w-full rounded-lg bg-primary-400 px-4 py-3 font-500"
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : "Submit"}
        </button>
      </form>

      {successMessage && (
        <p className="mx-auto mt-4 max-w-[500px] rounded-lg bg-[green] p-3 text-center font-600 text-white">
          {successMessage}
        </p>
      )}

      {errorMessage && (
        <p className="mx-auto mt-4 max-w-[500px] rounded-lg bg-[red] p-3 text-center font-600 text-white">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default CommentForm;
