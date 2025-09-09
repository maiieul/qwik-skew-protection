import { component$, useVisibleTask$ } from "@builder.io/qwik";
import {
  Form,
  routeAction$,
  server$,
  type DocumentHead,
} from "@builder.io/qwik-city";

export const useAddUser = routeAction$(async (data, { fail }) => {
  if (!data.fullName) {
    return fail(500, {
      message: "Please enter your full name",
    });
  }

  if (!data.firstName || !data.lastName) {
    return fail(500, {
      message: "User could not be added",
    });
  }

  return {
    success: true,
    fullName: data.fullName,
    firstName: data.firstName,
    lastName: data.lastName,
  };
});

export const serverGreeter = server$(function ({ planet }: { planet: string }) {
  if (!planet) {
    throw new Error("Please provide a planet");
  }
  const greeting = `Hello ${planet}`;
  return greeting;
});

export default component$(() => {
  const action = useAddUser();

  useVisibleTask$(() => {
    document.addEventListener("qerror", (event) => {
      console.error(event);
    });
  });

  return (
    <>
      <h1>Version 21</h1>
      <div>
        Can't wait to see what you build with qwik!
        <br />
        Happy coding.
      </div>
      <br />

      <Form action={action}>
        <input name="fullName" />
        <input name="firstName" />
        <input name="lastName" />
        <button
          type="submit"
          onClick$={async () => {
            const message = await serverGreeter({ planet: "world" });
            alert(message);
          }}
        >
          Add user
        </button>
      </Form>
      {action.value?.success && (
        <>
          <p>Hi {action.value.fullName.toString()}</p>
          <p>
            Hi{" "}
            {action.value.firstName.toString() +
              " " +
              action.value.lastName.toString()}
          </p>
        </>
      )}
      {action.value?.failed && <p>{action.value.message}</p>}
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
