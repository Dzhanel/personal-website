import { useRef, FormEvent, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import Nav from "../Nav/Nav";
import { useParticlesConfig } from "../../configs/ParticlesConfig";
import Particles from "@tsparticles/react";
import ReCAPTCHA from "react-google-recaptcha";

export default function ContactMe() {
  const { contactMeParticlesOptions } = useParticlesConfig();
  const form = useRef<HTMLFormElement>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCaptchaModal, setShowCaptchaModal] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    message: string;
    type: "success" | "error" | "none";
  }>({ message: "", type: "none" });

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!form.current) return;

    const honeypotValue = (
      document.getElementById("website") as HTMLInputElement
    )?.value;
    if (honeypotValue) {
      setFormStatus({ message: "Message sent successfully!", type: "success" });
      return;
    }

    const lastSubmission = localStorage.getItem("lastEmailSubmission");
    const now = Date.now();
    if (lastSubmission && now - parseInt(lastSubmission) < 60000) {
      setFormStatus({
        message: "Please wait a minute before sending another message.",
        type: "error",
      });
      return;
    }

    setShowCaptchaModal(true);
  };

  const sendEmail = async (): Promise<void> => {
    if (!form.current) return;

    try {
      setIsSubmitting(true);

      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      localStorage.setItem("lastEmailSubmission", Date.now().toString());

      form.current?.reset();
      setFormStatus({ message: "Message sent successfully!", type: "success" });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setFormStatus({
        message: `Failed to send message: ${errorMessage}`,
        type: "error",
      });
      console.error("FAILED...", error);
    } finally {
      setIsSubmitting(false);
      setShowCaptchaModal(false);
      recaptchaRef.current?.reset();
    }
  };

  const cancelSubmission = () => {
    setShowCaptchaModal(false);
    recaptchaRef.current?.reset();
  };

  const handleCaptchaChange = (token: string | null) => {
    if (token) {
      const captchaInput = document.createElement("input");
      captchaInput.type = "hidden";
      captchaInput.name = "g-recaptcha-response";
      captchaInput.value = token;
      form.current?.appendChild(captchaInput);

      sendEmail();
    }
  };

  useEffect(() => {
    if (formStatus.type !== "none") {
      const timer = setTimeout(() => {
        setFormStatus({ message: "", type: "none" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [formStatus]);

  return (
    <>
      <div className="relative min-h-screen mt-20">
        <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-[rgba(13,10,11,1)] to-[rgba(13,10,11,0)] z-10" />

        <Particles
          id="tsparticles4"
          className="absolute inset-0 w-full h-full"
          options={contactMeParticlesOptions}
        />

        <div className="relative z-15">
          <Nav section="Contact Me" />
          <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
            <form
              ref={form}
              onSubmit={handleSubmit}
              className="font-[ConsoleNeue] backdrop-blur-sm bg-[rgba(30,30,30,0.5)] border border-lime-700 rounded-lg p-4 sm:p-6 md:p-8 shadow-xl"
            >
              {/* Status message display */}
              {formStatus.type !== "none" && (
                <div
                  className={`mb-4 p-3 rounded-md ${
                    formStatus.type === "success"
                      ? "bg-green-900/50 text-green-400 border border-green-400"
                      : "bg-red-900/50 text-red-400 border border-red-400"
                  }`}
                >
                  {formStatus.message}
                </div>
              )}

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

              {/* Honeypot field - hidden from real users but visible to bots */}
              <div className="opacity-0 absolute top-0 left-0 h-0 w-0 overflow-hidden">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
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
                  disabled={isSubmitting}
                  className="cursor-pointer group bg-[rgba(20,20,20,0.7)] border-2 border-lime-500 text-lime-500 hover:bg-lime-500 hover:text-black text-lg sm:text-xl py-2 px-6 sm:py-3 sm:px-8 rounded-md transition-all duration-300 inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="mr-2 group-hover:translate-x-1 transition-transform duration-300">
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[25vh] bg-gradient-to-t from-[rgba(13,10,11,1)] to-[rgba(13,10,11,0)] z-10" />
      </div>

      {/* CAPTCHA Modal */}
      {showCaptchaModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
          <div className="bg-[rgba(30,30,30,0.95)] border-2 border-lime-500 rounded-lg p-6 max-w-lg w-full mx-4 shadow-2xl">
            <h3 className="text-lime-500 text-xl mb-4 font-[ConsoleNeue]">
              {"=> "}Verify you are human
            </h3>

            <div className="flex justify-center mb-6">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                onChange={handleCaptchaChange}
                theme="dark"
                className="mx-auto"
              />
            </div>

            <div className="flex justify-between">
              <button
                onClick={cancelSubmission}
                className="bg-transparent border border-red-500 text-red-500 cursor-pointer hover:bg-red-900/30 px-4 py-2 rounded transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
