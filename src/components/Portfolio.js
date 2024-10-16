import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Book, Briefcase, Code, FileText, Phone, Github, Linkedin, Mail, User, ExternalLink } from "lucide-react";
import emailjs from "@emailjs/browser";

emailjs.init("muxrlB08O3FncpfHE");

const PixelFont = ({ children }) => <span className="pixel-font">{children}</span>;

const Section = ({ id, title, children, noBackground }) => (
  <motion.section id={id} className={`mb-16 relative p-6 ${noBackground ? "" : "bg-gray-800 rounded-lg shadow-lg"}`} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
    {title && (
      <h2 className="text-3xl font-bold mb-4 text-green-400 border-b-2 border-green-400 pb-2">
        <PixelFont>{title}</PixelFont>
      </h2>
    )}
    {children}
  </motion.section>
);

const SkillBar = ({ skill, level }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium text-green-300">
        <PixelFont>{skill}</PixelFont>
      </span>
      <span className="text-sm font-medium text-green-300">
        <PixelFont>{level}%</PixelFont>
      </span>
    </div>
    <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
      <motion.div className="bg-green-400 h-2.5" initial={{ width: 0 }} animate={{ width: `${level}%` }} transition={{ duration: 1, delay: 0.2 }}></motion.div>
    </div>
  </div>
);

const ExperienceItem = ({ title, company, date, description }) => (
  <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="mb-6 border-l-2 border-green-400 pl-4 hover:bg-gray-700 p-4 rounded-r-lg transition-all duration-300">
    <h3 className="text-xl font-semibold text-green-300">
      <PixelFont>{title}</PixelFont>
    </h3>
    <p className="text-sm text-green-200 mb-2">
      <PixelFont>
        {company} | {date}
      </PixelFont>
    </p>
    <p className="text-green-100">
      <PixelFont>{description}</PixelFont>
    </p>
  </motion.div>
);

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [formData, setFormData] = useState({ name: "", email: "", whatsapp: "", address: "", message: "" });
  const [formStatus, setFormStatus] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let current = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 60) {
          current = section.getAttribute("id");
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("sending");

    try {
      const result = await emailjs.send(
        "service_7j3uv5e",
        "template_llhpv8x",
        {
          from_name: formData.name,
          from_email: formData.email,
          from_address: formData.address,
          whatsapp_number: formData.whatsapp,
          message: formData.message,
          to_email: "aexpedition@gmail.com",
        },
        "muxrlB08O3FncpfHE"
      );

      console.log(result.text);
      setFormStatus("success");
      setFormData({ name: "", email: "", address: "", whatsapp: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      setFormStatus("error");
    }

    setTimeout(() => setFormStatus(null), 5000);
  };

  return (
    <div className="bg-gray-900 text-green-100 min-h-screen font-pixel">
      <nav className="fixed top-0 left-0 right-0 bg-gray-800 z-50 shadow-lg">
        <ul className="flex justify-center space-x-6 p-4">
          {["home", "about", "skills", "experience", "education", "contact"].map((section) => (
            <li key={section}>
              <a href={`#${section}`} className={`text-sm uppercase transition-colors duration-300 hover:text-green-400 ${activeSection === section ? "text-green-400 border-b-2 border-green-400" : "text-green-200"}`}>
                {section}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main className="container mx-auto px-4 pt-20">
        <Section id="home" noBackground>
          <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
            <motion.img src="pixel.png" alt="8-bit avatar of M. Ramadhan Adi Putra" className="w-40 h-40 rounded-full mb-6 border-4 border-green-400 shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }} />

            <motion.h1 className="text-5xl font-bold mb-4 text-green-400" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <PixelFont>M. Ramadhan Adi Putra</PixelFont>
            </motion.h1>
            <motion.p className="text-2xl mb-6 text-green-300" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
              <PixelFont>IT Enthusiast & Full-Stack Developer</PixelFont>
            </motion.p>
            <motion.div className="flex space-x-6 mb-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
              <a href="https://github.com/madun-it/" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 transition-colors">
                <Github size={28} />
              </a>
              <a href="https://www.linkedin.com/in/mrap0812" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 transition-colors">
                <Linkedin size={28} />
              </a>
              <a href="mailto:aexpedition@gmail.com" className="text-green-400 hover:text-green-300 transition-colors">
                <Mail size={28} />
              </a>
              <a href="https://wa.me/6285654220922" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 transition-colors">
                <Phone size={28} />
              </a>
            </motion.div>
          </div>
          <motion.div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 mt-20" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <ArrowDown size={24} className="text-green-400" />
          </motion.div>
        </Section>

        <Section id="about" title="About Me">
          <p className="text-green-100 text-lg leading-relaxed">
            <PixelFont>
              As an IT enthusiast with a passion for full-stack web development, I'm constantly seeking to expand my knowledge and skills in the ever-evolving world of technology. My journey in the IT field has equipped me with a good
              foundation in both front-end and back-end technologies, allowing me to create elegant, efficient, and user-friendly solutions.
              <br />
              <br />I thrive on challenges and am always eager to learn new technologies and methodologies. My goal is to contribute to innovative projects that push the boundaries of what's possible in web development while delivering
              exceptional user experiences.
            </PixelFont>
          </p>
        </Section>

        <Section id="skills" title="Skills">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-300">
                <PixelFont>Technical Skills</PixelFont>
              </h3>
              <SkillBar skill="HTML/CSS" level={90} />
              <SkillBar skill="HTML/CSS" level={75} />
              <SkillBar skill="JavaScript" level={70} />
              <SkillBar skill="PHP" level={80} />
              <SkillBar skill="Python" level={70} />
              <SkillBar skill="MySQL" level={85} />
              <SkillBar skill="React" level={60} />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-300">
                <PixelFont>Soft Skills</PixelFont>
              </h3>
              <SkillBar skill="Spoken English" level={85} />
              <SkillBar skill="Discipline" level={80} />
              <SkillBar skill="Communication" level={70} />
              <SkillBar skill="Problem Solving" level={90} />
              <SkillBar skill="Teamwork" level={75} />
              <SkillBar skill="Adaptability" level={65} />
              <SkillBar skill="Time Management" level={85} />
            </div>
          </div>
        </Section>

        <Section id="experience" title="Work Experience">
          <ExperienceItem
            title="Technical Cloud Support"
            company="PT. Helios Informatika Nusantara"
            date="May 2024 - Aug 2024"
            description="Upgraded MS Office to 2021 (O365) on client company devices. Supported Outlook migration from local to Cloud. Collaborated with cross-functional teams to ensure smooth transitions and minimal downtime."
          />
          <ExperienceItem
            title="ICT & Administrative Staff"
            company="Masjid Imam Syafi'i Banjarmasin"
            date="Oct 2022 - Oct 2023"
            description="Managed social media, database, and website. Documented activities and assisted with administration using G-Workspace, Canva, and OBS Studio. Implemented new digital strategies to increase community engagement and streamline internal processes."
          />
          <ExperienceItem
            title="Digital Marketer"
            company="PT. IndiHome, Tbk."
            date="Sep 2018 - Feb 2019"
            description="Conducted social media research, designed digital posters, and sold IndiHome products online and offline. Developed and executed marketing campaigns that resulted in a 20% increase in online sales. Utilized data analytics to optimize campaign performance and target audience engagement."
          />
        </Section>

        <Section id="education" title="Education">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="mb-6 border-l-2 border-green-400 pl-4 hover:bg-gray-700 p-4 rounded-r-lg transition-all duration-300">
            <h3 className="text-xl font-semibold text-green-300">
              <PixelFont>Politeknik Negeri Banjarmasin</PixelFont>
            </h3>
            <p className="text-sm text-green-200 mb-2">
              <PixelFont>D3 Information Technology | GPA: 3.63/4.00</PixelFont>
            </p>
            <p className="text-sm text-green-200">
              <PixelFont>2019 - 2022</PixelFont>
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 border-l-2 border-green-400 pl-4 hover:bg-gray-700 p-4 rounded-r-lg transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-green-300">
              <PixelFont>SMKN 4 Banjarmasin</PixelFont>
            </h3>
            <p className="text-sm text-green-200 mb-2">
              <PixelFont>Software Engineering | GPA: 83/100</PixelFont>
            </p>
            <p className="text-sm text-green-200">
              <PixelFont>2016 - 2018</PixelFont>
            </p>
          </motion.div>
        </Section>

        <Section id="contact" title="Contact Me">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-green-300">
                <PixelFont>Name</PixelFont>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-green-100 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-green-300">
                  <PixelFont>Email</PixelFont>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-green-100 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label htmlFor="whatsapp" className="block mb-2 text-sm font-medium text-green-300">
                  <PixelFont>Whatsapp</PixelFont>
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-green-100 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="address" className="block mb-2 text-sm font-medium text-green-300">
                <PixelFont>Address</PixelFont>
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-green-100 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-green-300">
                <PixelFont>Message</PixelFont>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-green-100 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
                required
              ></textarea>
            </div>
            <motion.button
              type="submit"
              className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300 flex items-center justify-center w-full md:w-auto"
              disabled={formStatus === "sending"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PixelFont>{formStatus === "sending" ? "Sending..." : "Send Message"}</PixelFont>
              {formStatus === "sending" && <motion.div className="ml-2 h-5 w-5 border-t-2 border-r-2 border-white rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />}
            </motion.button>
          </form>
          <AnimatePresence>
            {formStatus === "success" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mt-4 p-4 bg-green-500 text-white rounded-md">
                <PixelFont>Message sent successfully! I'll get back to you soon.</PixelFont>
              </motion.div>
            )}
            {formStatus === "error" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mt-4 p-4 bg-red-500 text-white rounded-md">
                <PixelFont>Oops! Something went wrong. Please try again later.</PixelFont>
              </motion.div>
            )}
          </AnimatePresence>
        </Section>
      </main>

      <footer className="bg-gray-800 text-center py-8 mt-16">
        <div className="container mx-auto px-4">
          <p className="text-green-200 mb-4">
            <PixelFont>&copy; 2024 M. Ramadhan Adi Putra. All rights reserved.</PixelFont>
          </p>
          <div className="flex justify-center space-x-6 mb-4">
            <a href="https://github.com/mrap0812" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 transition-colors">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/mrap0812" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="mailto:aexpedition@gmail.com" className="text-green-400 hover:text-green-300 transition-colors">
              <Mail size={24} />
            </a>
            <a href="https://wa.me/6285654220922" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 transition-colors">
              <Phone size={28} />
            </a>
          </div>
          <p className="text-green-200 text-sm">
            <PixelFont>Designed and built with React and Tailwind CSS</PixelFont>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
