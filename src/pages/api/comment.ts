import type { APIRoute } from "astro";
import type { FormData } from "../../components/CommentForm";

const { SANITY_PROJECT_ID, SANITY_DATASET, SANITY_TOKEN } = import.meta.env;

// Function to check if email exists
const checkIfEmailExists = async (email: string) => {
  try {
    const query = `*[_type == "comment" && email == "${email}"]`;
    const response = await fetch(
      `https://${SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/${SANITY_DATASET}?query=${encodeURIComponent(query)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const POST: APIRoute = async ({ request }) => {
  const formData: FormData = await request.json();
  const { name, postId, email, content } = formData;

  if (!name || !email || !content) {
    return new Response(JSON.stringify({ error: "All fields are required" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // check if the user is already subscribed
  const existingSubscriber = await checkIfEmailExists(email);

  if (existingSubscriber.result.length > 0) {
    return new Response(JSON.stringify({ error: "Email already exists" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  //  create new subscription
  const mutations = {
    mutations: [
      {
        create: {
          _type: "comment",
          name,
          email,
          content,
          post: {
            _type: "reference",
            _ref: postId,
          },
          createdAt: new Date().toISOString(),
        },
      },
    ],
  };

  try {
    const response = await fetch(
      `https://${SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${SANITY_DATASET}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SANITY_TOKEN}`,
        },
        body: JSON.stringify(mutations),
      },
    );

    const result = await response.json();
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
