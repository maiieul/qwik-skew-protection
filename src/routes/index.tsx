import { component$ } from "@builder.io/qwik";
import { Form, routeAction$, type DocumentHead } from "@builder.io/qwik-city";

export const useAddUser = routeAction$(async (data) => {
  // This will only run on the server when the user submits the form (or when the action is called programmatically)

  if (!data.fullName) {
    return {
      success: false,
      // error: 'Please enter your full name',
    };
  }

  return {
    success: true,
    fullName: data.fullName,
    // firstName: data.firstName,
    // lastName: data.lastName,
  };
});

export default component$(() => {
  const action = useAddUser();

  return (
    <>
      <h1>Version 6</h1>
      <div>
        Can't wait to see what you build with qwik!
        <br />
        Happy coding.
      </div>
      <br />

      <Form action={action}>
        <input name="fullName" />
        <button type="submit">Add user</button>
      </Form>
      {action.value?.success && (
        // When the action is done successfully, the `action.value` property will contain the return value of the action
        <p>Hi {action.value.fullName?.toString()}</p>
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
