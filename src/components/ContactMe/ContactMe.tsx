import { useRef, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import Nav from "../Nav/Nav";
import { useParticlesConfig } from "../../configs/ParticlesConfig";
import Particles from "@tsparticles/react";

export default function ContactMe() {
  const { contactMeParticlesOptions } = useParticlesConfig();

  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!form.current) return;

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      )
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error: { text: string }) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <>
      <div className="relative min-h-screen mt-20">
        <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-[rgba(13,10,11,1)] to-[rgba(13,10,11,0)] z-10" />

        <Particles
          id="tsparticles4"
          className="absolute inset-0 w-full h-full"
          options={contactMeParticlesOptions}
        />

        <div className="relative z-20">
          <Nav section="ContactMe" />
        </div>
        <div className="relative z-20 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <form
            ref={form}
            onSubmit={sendEmail}
            className="font-[ConsoleNeue] backdrop-blur-sm bg-[rgba(30,30,30,0.5)] border border-lime-700 rounded-lg p-4 sm:p-6 md:p-8 shadow-xl"
          >
            <div className="mb-5 sm:mb-6">
              <label
                htmlFor="user_name"
                className="block text-2xl sm:text-3xl md:text-4xl text-white mb-2"
              >
                {"=> "}Name
              </label>
              <input
                type="text"
                name="user_name"
                id="user_name"
                required
                className="w-full bg-[rgba(20,20,20,0.7)] text-white text-lg sm:text-xl md:text-2xl border border-lime-700 focus:border-lime-500 focus:bg-[rgba(30,30,30,0.7)] rounded-md px-3 py-2 sm:px-4 sm:py-3 outline-none transition-colors duration-300"
              />
            </div>

            <div className="mb-5 sm:mb-6">
              <label
                htmlFor="user_email"
                className="block text-2xl sm:text-3xl md:text-4xl text-white mb-2"
              >
                {"=> "}Email
              </label>
              <input
                type="email"
                name="user_email"
                id="user_email"
                required
                className="w-full bg-[rgba(20,20,20,0.7)] text-white text-lg sm:text-xl md:text-2xl border border-lime-700 focus:border-lime-500 focus:bg-[rgba(30,30,30,0.7)] rounded-md px-3 py-2 sm:px-4 sm:py-3 outline-none transition-colors duration-300"
              />
            </div>

            <div className="mb-6 sm:mb-8">
              <label
                htmlFor="message"
                className="block text-2xl sm:text-3xl md:text-4xl text-white mb-2"
              >
                {"=> "}Message
              </label>
              <textarea
                name="message"
                id="message"
                required
                rows={6}
                className="w-full bg-[rgba(20,20,20,0.7)] text-white text-lg sm:text-xl border border-lime-500 focus:border-lime-500 focus:bg-[rgba(30,30,30,0.7)] rounded-md px-3 py-2 sm:px-4 sm:py-3 outline-none transition-colors duration-300 resize-none"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="cursor-pointer group bg-[rgba(20,20,20,0.7)] border-2 border-lime-500 text-lime-500 hover:bg-lime-500 hover:text-black text-lg sm:text-xl py-2 px-6 sm:py-3 sm:px-8 rounded-md transition-all duration-300 inline-flex items-center"
              >
                <span className="mr-2 group-hover:translate-x-1 transition-transform duration-300">
                  Send Message
                </span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </button>
            </div>
          </form>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[25vh] bg-gradient-to-t from-[rgba(13,10,11,1)] to-[rgba(13,10,11,0)] z-10" />
      </div>
    </>
  );
}
