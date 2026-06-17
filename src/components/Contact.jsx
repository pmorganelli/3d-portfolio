import { useState, useRef } from "react"
import { motion } from "framer-motion"
import emailjs from '@emailjs/browser'
import { styles } from "../styles"
import { EarthCanvas } from "./canvas"
import { SectionWrapper } from "../hoc"
import { slideIn } from "../utils/motion"

const emailJsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

const requiredEmailJsVars = {
  VITE_EMAILJS_SERVICE_ID: emailJsConfig.serviceId,
  VITE_EMAILJS_TEMPLATE_ID: emailJsConfig.templateId,
  VITE_EMAILJS_PUBLIC_KEY: emailJsConfig.publicKey,
};

const missingEmailJsVars = Object.entries(requiredEmailJsVars)
  .filter(([, value]) => !value)
  .map(([name]) => name);

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // null | { type: 'success' | 'error', message: string }
  const isFormValid =
    form.name.trim() !== "" &&
    form.email.trim() !== "" &&
    form.message.trim() !== "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value })
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(null);

    if (!isFormValid) {
      return;
    }

    if (missingEmailJsVars.length > 0) {
      setStatus({
        type: 'error',
        message: 'Contact form is not configured. Please email me directly.',
      });
      return;
    }

    setLoading(true);

    emailjs.send(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        {
          from_name: form.name,
          to_name: 'Peter',
          from_email: form.email,
          to_email: 'petercarlmorganelli@gmail.com',
          message: form.message,
        },
        { publicKey: emailJsConfig.publicKey },
      )
      .then(
        () => {
          setLoading(false);
          setStatus({
            type: 'success',
            message: "Message sent to my inbox! I'll get back to you soon. —Peter",
          });
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          setLoading(false);
          setStatus({
            type: 'error',
            message: error?.text || 'Something went wrong. Please try again or email me directly.',
          });
        }
      );
  };

  return (
    <div className="xl:mt-12 flex flex-col xl:flex-row-reverse items-center xl:items-stretch justify-center gap-8 xl:gap-12 overflow-visible">
      <motion.div
        variants={slideIn('right', "tween", 0.2, 1)}
        className="w-full max-w-[520px] sm:max-w-[640px] xl:max-w-[560px] h-[300px] sm:h-[380px] lg:h-[460px] xl:h-auto xl:min-h-[560px] xl:flex-1"
      >
        <EarthCanvas />
      </motion.div>

      <motion.div variants={slideIn('left', "tween", 0.2, 1)}
      className="w-full max-w-3xl xl:max-w-[620px] bg-black-100 p-5 sm:p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input 
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="What's your name?"
              className="bg-tertiary py-4 px-4 sm:px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-transparent focus-visible:border-[#3fe9ff] focus-visible:ring-2 focus-visible:ring-[#3fe9ff]/30 font-medium transition-colors"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Email</span>
            <input 
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="What's your email?"
              className="bg-tertiary py-4 px-4 sm:px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-transparent focus-visible:border-[#3fe9ff] focus-visible:ring-2 focus-visible:ring-[#3fe9ff]/30 font-medium transition-colors"
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Message</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              required
              placeholder='What would you like to say?'
              className='bg-tertiary py-4 px-4 sm:px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-transparent focus-visible:border-[#3fe9ff] focus-visible:ring-2 focus-visible:ring-[#3fe9ff]/30 font-medium transition-colors'
            />
          </label>

          <button
            type="submit"
            disabled={!isFormValid || loading}
            className="bg-tertiary py-3 px-8 outline-none text-white font-bold rounded-xl border border-white/10 hover:border-[#3fe9ff]/60 focus-visible:ring-2 focus-visible:ring-[#3fe9ff]/40 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Sending...' : 'Send'}
          </button>

          {status?.type === 'success' && (
            <p className="text-green-400 text-[14px] font-medium break-words">
              {status.message}
            </p>
          )}
          {status?.type === 'error' && (
            <p className="text-red-400 text-[14px] font-medium break-words" role="alert">
              {status.message}
            </p>
          )}
        </form>
      </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact, "contact");
