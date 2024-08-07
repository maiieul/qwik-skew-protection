import { component$ } from "@builder.io/qwik";
import {
  Form,
  routeAction$,
  server$,
  type DocumentHead,
} from "@builder.io/qwik-city";

export const useAddUser = routeAction$(async (data, { fail }) => {
  // if (!data.fullName) {
  //   throw new Error("Please enter your full name");
  // }

  if (!data.firstName || !data.lastName) {
    return fail(500, {
      message: "User could not be added",
    });
  }

  return {
    success: true,
    // fullName: data.fullName,
    firstName: data.firstName,
    lastName: data.lastName,
  };
});

export const serverGreeter = server$(function (name: string) {
  const greeting = `Hello ${name}`;
  return greeting;
});

export default component$(() => {
  const action = useAddUser();

  return (
    <>
      <h1>Version 11</h1>
      <div>
        Can't wait to see what you build with qwik!
        <br />
        Happy coding.
      </div>
      <br />

      <Form action={action}>
        {/* <input name="fullName" /> */}
        <input name="firstName" />
        <input name="lastName" />
        <button
          type="submit"
          onClick$={async () => {
            const message = await serverGreeter("world");
            alert(message);
          }}
        >
          Add user
        </button>
      </Form>
      {action.value?.success && (
        // When the action is done successfully, the `action.value` property will contain the return value of the action
        <>
          {/* <p>Hi {action.value.fullName.toString()}</p> */}
          <p>
            Hi{" "}
            {action.value.firstName.toString() +
              " " +
              action.value.lastName.toString()}
          </p>
        </>
      )}
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
