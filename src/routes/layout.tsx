import { component$, Slot } from "@builder.io/qwik";
import { Link, type RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async () => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
  // cacheControl({
  //   public: true,
  //   // Always serve a cached response by default, up to a week stale
  //   staleWhileRevalidate: 60 * 60 * 24 * 7,
  //   // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
  //   maxAge: 60 * 60 * 24,
  // });
};

export default component$(() => {
  return (
    <>
      <h1>Version 34</h1>
      <Link prefetch={false} href="/">
        Home
      </Link>
      <Link prefetch={false} href="/about/">
        About
      </Link>
      <Slot />
    </>
  );
});
