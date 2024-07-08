import { useEffect, useState, type FormEvent } from "react";
import { Spinner } from "./Spinner";

const Newsletter = () => {
  const [email, setEmail] = useState("");
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

  const createSubscription = async (email: string) => {
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      return result;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!email) return;

    try {
      setIsLoading(true);

      const response = await createSubscription(email);

      if (response.error) {
        setErrorMessage("This user is already subscribed");
      } else {
        setSuccessMessage("✅ You've been subscribed");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }

    setEmail("");
  };

  return (
    <section className="mb-8 mt-12 bg-black">
      <div className="container py-8">
        <div className="mx-auto mb-8 max-w-[650px] text-center">
          <h2 className="mb-2 text-500 font-500 md:text-650">
            Lexicon Newsletter
          </h2>
          <p>
            A bi-weekly newsletter of design inspiration, resources and anything
            related to career development.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="relative mx-auto max-w-[500px] md:flex"
        >
          <input
            className="mb-4 h-[45px] w-full rounded-lg pl-4 text-black placeholder-black"
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email Address"
            required
          />
          <button
            className="w-full rounded-lg bg-primary-400 px-4 py-3 font-500 md:absolute md:right-0 md:top-0 md:h-[45px] md:w-fit md:rounded-bl-none md:rounded-tl-none"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : "Subscribe"}
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
    </section>
  );
};

export default Newsletter;
